import { corsHeaders } from '../_shared/cors.ts'
import { createServiceSupabaseClient } from '../_shared/supabase.ts'
import { getTelegramUserFromRequest } from '../_shared/telegram.ts'
import { ensureStudent, upsertProfile } from '../_shared/db.ts'
import { badRequest, noContent, serverError, unauthorized } from '../_shared/responses.ts'

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

    // Optional payload (current frontend sends { tgName })
    let payload: unknown = {}
    try {
      payload = await req.json()
    } catch {
      payload = {}
    }

    await supabase.from('events').insert({
      profile_id: profileId,
      event_type: 'identify',
      payload: payload as unknown
    })

    return noContent()
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    if (message.toLowerCase().includes('missing x-telegram-init-data')) {
      return unauthorized(message)
    }
    if (message.toLowerCase().includes('telegram')) {
      return unauthorized(message)
    }
    return serverError('Identify failed', { message })
  }
})


