import { corsHeaders } from '../_shared/cors.ts'
import { createServiceSupabaseClient } from '../_shared/supabase.ts'
import { getTelegramUserFromRequest } from '../_shared/telegram.ts'
import { badRequest, forbidden, ok, serverError, unauthorized } from '../_shared/responses.ts'
import { isModerator, upsertProfile } from '../_shared/db.ts'

type Action = 'approve' | 'reject'

type Body = {
  applicationId: string
  action: Action
  rejectionReason?: string
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

    // ensure moderator has a profile row too (helps with auditing)
    await upsertProfile(supabase, tgUser)

    const allowed = await isModerator(supabase, tgUser.id)
    if (!allowed) return forbidden('Not a moderator')

    const body = (await req.json()) as Body
    const applicationId = String(body?.applicationId ?? '').trim()
    const action = body?.action

    if (!applicationId || !['approve', 'reject'].includes(action)) {
      return badRequest('Invalid body', { expected: { applicationId: 'uuid', action: 'approve|reject' } })
    }

    const { data: application, error: appError } = await supabase
      .from('helper_applications')
      .select('*')
      .eq('id', applicationId)
      .single()

    if (appError) throw new Error(appError.message)

    if (application.status !== 'pending') {
      return badRequest('Only pending applications can be moderated', { status: application.status })
    }

    const moderatedAt = new Date().toISOString()

    if (action === 'approve') {
      const { data: helper, error: helperError } = await supabase
        .from('helpers')
        .upsert(
          {
            profile_id: application.profile_id,
            name: application.name,
            second_name: application.second_name,
            facult: application.facult,
            direction: application.direction,
            course: application.course,
            main_subjects: application.main_subjects,
            is_active: true
          },
          { onConflict: 'profile_id' }
        )
        .select('id')
        .single()

      if (helperError || !helper?.id) throw new Error(helperError?.message ?? 'Helper upsert failed')

      const { error: updateError } = await supabase
        .from('helper_applications')
        .update({
          status: 'approved',
          moderated_at: moderatedAt,
          moderated_by_telegram_id: tgUser.id,
          rejection_reason: null,
          approved_helper_id: helper.id
        })
        .eq('id', applicationId)

      if (updateError) throw new Error(updateError.message)

      return ok({ ok: true, action: 'approve', helperId: helper.id })
    }

    // reject
    const rejectionReason = String(body?.rejectionReason ?? '').trim()
    const { error: rejectError } = await supabase
      .from('helper_applications')
      .update({
        status: 'rejected',
        moderated_at: moderatedAt,
        moderated_by_telegram_id: tgUser.id,
        rejection_reason: rejectionReason || 'Rejected'
      })
      .eq('id', applicationId)

    if (rejectError) throw new Error(rejectError.message)

    return ok({ ok: true, action: 'reject' })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    if (message.toLowerCase().includes('telegram') || message.toLowerCase().includes('x-telegram')) {
      return unauthorized(message)
    }
    return serverError('moderate-helper-application failed', { message })
  }
})


