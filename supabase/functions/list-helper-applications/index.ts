import { corsHeaders } from '../_shared/cors.ts'
import { createServiceSupabaseClient } from '../_shared/supabase.ts'
import { getTelegramUserFromRequest } from '../_shared/telegram.ts'
import { forbidden, jsonResponse, serverError, unauthorized } from '../_shared/responses.ts'
import { isModerator, upsertProfile } from '../_shared/db.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const tgUser = await getTelegramUserFromRequest(req)
    const supabase = createServiceSupabaseClient()

    await upsertProfile(supabase, tgUser)

    const allowed = await isModerator(supabase, tgUser.id)
    if (!allowed) return forbidden('Not a moderator')

    const url = new URL(req.url)
    const status = url.searchParams.get('status') ?? 'pending'

    const { data, error } = await supabase
      .from('helper_applications')
      .select(
        `
        id,
        profile_id,
        name,
        second_name,
        facult,
        direction,
        course,
        main_subjects,
        status,
        submitted_at,
        moderated_at,
        moderated_by_telegram_id,
        rejection_reason,
        approved_helper_id,
        profiles(telegram_id, telegram_username, telegram_first_name, telegram_last_name, telegram_photo_url),
        helper_application_documents(storage_bucket, storage_path, original_filename, content_type, size_bytes)
      `
      )
      .eq('status', status)
      .order('submitted_at', { ascending: false })

    if (error) throw new Error(error.message)

    return jsonResponse({ data: data ?? [] }, { status: 200 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    if (message.toLowerCase().includes('telegram') || message.toLowerCase().includes('x-telegram')) {
      return unauthorized(message)
    }
    return serverError('list-helper-applications failed', { message })
  }
})


