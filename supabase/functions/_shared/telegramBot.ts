import { getEnv, getEnvOrThrow } from './env.ts'

type TelegramApiOk<T> = { ok: true; result: T }
type TelegramApiErr = { ok: false; description?: string }

export function getTelegramBotTokenOptional(): string | undefined {
  return getEnv('TELEGRAM_BOT_TOKEN')
}

export async function telegramSendMessage(params: {
  chatId: string | number
  text: string
  disableWebPagePreview?: boolean
}) {
  const token = getEnvOrThrow('TELEGRAM_BOT_TOKEN')
  const url = `https://api.telegram.org/bot${token}/sendMessage`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: params.chatId,
      text: params.text,
      disable_web_page_preview: params.disableWebPagePreview ?? true
    })
  })

  const json = (await res.json()) as TelegramApiOk<{ message_id: number }> | TelegramApiErr

  if (!res.ok || !json.ok) {
    throw new Error(`Telegram sendMessage failed: ${(json as TelegramApiErr)?.description ?? res.status}`)
  }

  return { messageId: (json as TelegramApiOk<{ message_id: number }>).result.message_id }
}


