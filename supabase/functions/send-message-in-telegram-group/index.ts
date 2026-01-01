import { corsHeaders } from '../_shared/cors.ts'
import { createServiceSupabaseClient } from '../_shared/supabase.ts'
import { getTelegramUserFromRequest } from '../_shared/telegram.ts'
import { badRequest, noContent, serverError, unauthorized } from '../_shared/responses.ts'
import { ensureStudent, upsertProfile } from '../_shared/db.ts'
import { sanitizeFilename } from '../_shared/files.ts'
import { getBoolEnv, getEnv, getIntEnv } from '../_shared/env.ts'
import { getTelegramBotTokenOptional, telegramSendMessage } from '../_shared/telegramBot.ts'

const BUCKET = 'order-files'
const MAX_FILES = 5
const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024 // 50MB

function readRequiredText(form: FormData, key: string): string {
  const value = String(form.get(key) ?? '').trim()
  if (!value) throw new Error(`Missing required field: ${key}`)
  return value
}

function readOptionalText(form: FormData, key: string): string | null {
  const value = String(form.get(key) ?? '').trim()
  return value ? value : null
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return badRequest('Method not allowed')
  }

  try {
    const tgUser = await getTelegramUserFromRequest(req)
    const supabase = createServiceSupabaseClient()

    const { profileId } = await upsertProfile(supabase, tgUser)
    await ensureStudent(supabase, profileId)

    const form = await req.formData()

    // Frontend field names:
    // - facult, duration (direction), course, subject, service, condition, amount (budget), comment (optional)
    const facult = readRequiredText(form, 'facult')
    const direction = readRequiredText(form, 'duration')
    const course = readRequiredText(form, 'course')
    const subject = readRequiredText(form, 'subject')
    const service = readRequiredText(form, 'service')
    const condition = readRequiredText(form, 'condition')
    const budget = readRequiredText(form, 'amount')
    const comment = readOptionalText(form, 'comment')

    const helperId = readOptionalText(form, 'id')
    const kind = helperId ? 'direct' : 'broadcast'

    let helperDisplay: string | null = null
    if (helperId) {
      const { data: helper, error: helperError } = await supabase
        .from('helpers')
        .select('id,name,second_name')
        .eq('id', helperId)
        .single()

      if (helperError) throw new Error(`Unknown helper id: ${helperId}`)
      helperDisplay = `${helper.name} ${helper.second_name}`.trim()
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        created_by_profile_id: profileId,
        kind,
        target_helper_id: helperId,
        status: 'new',
        facult,
        direction,
        course,
        subject,
        service,
        condition,
        budget,
        comment
      })
      .select('id')
      .single()

    if (orderError || !order?.id) throw new Error(orderError?.message ?? 'Order insert failed')
    const orderId = order.id as string

    // Collect files: file_0, file_1, ...
    const fileItems: Array<{ idx: number; file: File }> = []
    for (const [key, value] of form.entries()) {
      const match = /^file_(\d+)$/.exec(key)
      if (!match) continue
      if (!(value instanceof File)) continue
      const idx = Number.parseInt(match[1], 10)
      fileItems.push({ idx, file: value })
    }

    fileItems.sort((a, b) => a.idx - b.idx)

    if (fileItems.length > MAX_FILES) {
      return badRequest('Too many files', { max: MAX_FILES })
    }

    const signedUrlTtlSeconds = getIntEnv('ORDER_FILE_SIGNED_URL_TTL_SECONDS', 60 * 60 * 24 * 7) // 7 days
    const attachmentLinks: string[] = []

    for (const { idx, file } of fileItems) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return badRequest('File too large', { maxBytes: MAX_FILE_SIZE_BYTES })
      }

      const safeName = sanitizeFilename(file.name || `file_${idx}`)
      const path = `orders/${orderId}/${idx}-${safeName}`

      const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
        contentType: file.type || undefined,
        upsert: true
      })
      if (uploadError) throw new Error(uploadError.message)

      const { error: metaError } = await supabase.from('order_files').insert({
        order_id: orderId,
        storage_bucket: BUCKET,
        storage_path: path,
        original_filename: file.name,
        content_type: file.type || null,
        size_bytes: file.size
      })
      if (metaError) throw new Error(metaError.message)

      const { data: signed, error: signedError } = await supabase.storage.from(BUCKET).createSignedUrl(path, signedUrlTtlSeconds)
      if (signedError) throw new Error(signedError.message)
      if (signed?.signedUrl) {
        attachmentLinks.push(signed.signedUrl)
      }
    }

    const chatId = getEnv('TELEGRAM_HELPERS_GROUP_CHAT_ID')
    const token = getTelegramBotTokenOptional()
    const allowStoreOnly = getBoolEnv('ALLOW_ORDER_STORE_ONLY', false)

    if (!chatId || !token) {
      if (!allowStoreOnly) {
        throw new Error('Telegram is not configured (TELEGRAM_BOT_TOKEN / TELEGRAM_HELPERS_GROUP_CHAT_ID)')
      }
      return noContent()
    }

    const fromText = tgUser.username
      ? `@${tgUser.username}`
      : `${tgUser.first_name ?? ''} ${tgUser.last_name ?? ''}`.trim() || `tg:${tgUser.id}`

    const lines: string[] = []
    lines.push('📝 Новая заявка')
    lines.push(`ID: ${orderId}`)
    lines.push(`От: ${fromText}`)
    if (helperDisplay) lines.push(`Для хелпера: ${helperDisplay}`)
    lines.push('')
    lines.push(`Факультет: ${facult}`)
    lines.push(`Направление/Кафедра: ${direction}`)
    lines.push(`Курс: ${course}`)
    lines.push(`Предмет: ${subject}`)
    lines.push(`Услуга: ${service}`)
    lines.push(`Условие: ${condition}`)
    lines.push(`Бюджет: ${budget}`)
    if (comment) lines.push(`Комментарий: ${comment}`)
    if (attachmentLinks.length) {
      lines.push('')
      lines.push('Файлы:')
      attachmentLinks.forEach((link, i) => lines.push(`${i + 1}) ${link}`))
    }

    const { messageId } = await telegramSendMessage({
      chatId,
      text: lines.join('\n'),
      disableWebPagePreview: true
    })

    await supabase
      .from('orders')
      .update({
        status: 'sent',
        telegram_message_chat_id: Number(chatId),
        telegram_message_id: messageId
      })
      .eq('id', orderId)

    return noContent()
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    if (message.toLowerCase().includes('missing required field')) {
      return badRequest(message)
    }
    if (message.toLowerCase().includes('telegram') || message.toLowerCase().includes('x-telegram')) {
      return unauthorized(message)
    }
    return serverError('send-message-in-telegram-group failed', { message })
  }
})


