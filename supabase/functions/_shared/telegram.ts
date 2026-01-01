import { getBoolEnv, getEnv, getEnvOrThrow, getIntEnv } from './env.ts'

export type TelegramWebAppUser = {
  id: number
  is_bot?: boolean
  first_name?: string
  last_name?: string
  username?: string
  language_code?: string
  photo_url?: string
}

type VerifiedInitData = {
  user: TelegramWebAppUser
  authDate?: number
  queryId?: string
  raw: Record<string, string>
}

const encoder = new TextEncoder()

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function hmacSha256Raw(keyBytes: Uint8Array, message: string): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message))
  return new Uint8Array(signature)
}

export async function verifyTelegramInitData(initData: string, botToken: string): Promise<VerifiedInitData> {
  const params = new URLSearchParams(initData)
  const providedHash = params.get('hash')

  if (!providedHash) {
    throw new Error('Telegram initData is missing "hash"')
  }

  const entries: Array<[string, string]> = []
  const raw: Record<string, string> = {}

  for (const [key, value] of params.entries()) {
    raw[key] = value
    if (key !== 'hash') entries.push([key, value])
  }

  entries.sort(([a], [b]) => a.localeCompare(b))
  const dataCheckString = entries.map(([k, v]) => `${k}=${v}`).join('\n')

  // secret_key = HMAC_SHA256("WebAppData", bot_token)
  const secretKey = await hmacSha256Raw(encoder.encode('WebAppData'), botToken)

  // hash = HMAC_SHA256(secret_key, data_check_string)
  const computedHash = toHex(await hmacSha256Raw(secretKey, dataCheckString))

  if (computedHash !== providedHash) {
    throw new Error('Telegram initData signature mismatch')
  }

  const maxAgeSeconds = getIntEnv('TELEGRAM_INITDATA_MAX_AGE_SECONDS', 60 * 60 * 24) // 24h
  const authDateRaw = params.get('auth_date')
  const authDate = authDateRaw ? Number.parseInt(authDateRaw, 10) : undefined
  if (authDate) {
    const nowSeconds = Math.floor(Date.now() / 1000)
    const ageSeconds = nowSeconds - authDate
    if (ageSeconds > maxAgeSeconds) {
      throw new Error('Telegram initData is too old')
    }
  }

  const userRaw = params.get('user')
  if (!userRaw) throw new Error('Telegram initData is missing "user"')

  const user = JSON.parse(userRaw) as TelegramWebAppUser
  if (!user?.id) throw new Error('Telegram initData user is missing "id"')

  return {
    user,
    authDate,
    queryId: params.get('query_id') ?? undefined,
    raw
  }
}

export async function getTelegramUserFromRequest(req: Request): Promise<TelegramWebAppUser> {
  const requireAuth = getBoolEnv('REQUIRE_TELEGRAM_AUTH', true)

  const initData = req.headers.get('x-telegram-init-data') ?? ''
  if (initData) {
    const botToken = getEnvOrThrow('TELEGRAM_BOT_TOKEN')
    const verified = await verifyTelegramInitData(initData, botToken)
    return verified.user
  }

  // Local/dev escape hatch (do NOT enable in prod):
  // pass a JSON user object in header:
  //   x-dev-telegram-user: {"id":123,"username":"alice"}
  const devUserHeader = req.headers.get('x-dev-telegram-user')
  if (!requireAuth && devUserHeader) {
    const parsed = JSON.parse(devUserHeader) as TelegramWebAppUser
    if (!parsed?.id) throw new Error('x-dev-telegram-user must include "id"')
    return parsed
  }

  // Helpful error based on configuration
  const botToken = getEnv('TELEGRAM_BOT_TOKEN')
  if (requireAuth && !botToken) {
    throw new Error('Missing TELEGRAM_BOT_TOKEN env var (required when REQUIRE_TELEGRAM_AUTH=true)')
  }

  throw new Error('Missing x-telegram-init-data header')
}


