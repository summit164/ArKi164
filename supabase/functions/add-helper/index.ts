import { corsHeaders } from '../_shared/cors.ts'
import { createServiceSupabaseClient } from '../_shared/supabase.ts'
import { getTelegramUserFromRequest } from '../_shared/telegram.ts'
import { badRequest, ok, serverError, unauthorized } from '../_shared/responses.ts'
import { ensureStudent, upsertProfile } from '../_shared/db.ts'
import { sanitizeFilename } from '../_shared/files.ts'

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024 // 50MB
const REQUIRED_FILES_COUNT = 2
const BUCKET = 'helper-documents'

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

    const name = String(form.get('name') ?? '').trim()
    const secondName = String(form.get('secondName') ?? '').trim()
    const facult = String(form.get('facult') ?? '').trim()
    const direction = String(form.get('direction') ?? '').trim()
    const course = String(form.get('course') ?? '').trim()
    const mainSubjects = String(form.get('mainSubjects') ?? '').trim()

    const files = form.getAll('file').filter((v) => v instanceof File) as File[]

    if (!name || !secondName || !facult || !direction || !course || !mainSubjects) {
      return badRequest('Missing required fields')
    }

    if (files.length !== REQUIRED_FILES_COUNT) {
      return badRequest(`Exactly ${REQUIRED_FILES_COUNT} files are required`)
    }

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return badRequest('File too large', { maxBytes: MAX_FILE_SIZE_BYTES })
      }
    }

    // Upsert a single pending application per profile
    const { data: pending, error: pendingError } = await supabase
      .from('helper_applications')
      .select('id')
      .eq('profile_id', profileId)
      .eq('status', 'pending')
      .maybeSingle()

    if (pendingError) throw new Error(pendingError.message)

    let applicationId: string

    if (pending?.id) {
      applicationId = pending.id as string
      const { error: updateError } = await supabase
        .from('helper_applications')
        .update({
          name,
          second_name: secondName,
          facult,
          direction,
          course,
          main_subjects: mainSubjects,
          submitted_at: new Date().toISOString()
        })
        .eq('id', applicationId)

      if (updateError) throw new Error(updateError.message)

      // Replace previously uploaded docs (best-effort cleanup)
      const { data: oldDocs } = await supabase
        .from('helper_application_documents')
        .select('storage_path')
        .eq('application_id', applicationId)

      const oldPaths = (oldDocs ?? []).map((d: any) => d.storage_path).filter(Boolean)
      if (oldPaths.length) {
        await supabase.storage.from(BUCKET).remove(oldPaths)
        await supabase.from('helper_application_documents').delete().eq('application_id', applicationId)
      }
    } else {
      const { data: inserted, error: insertError } = await supabase
        .from('helper_applications')
        .insert({
          profile_id: profileId,
          name,
          second_name: secondName,
          facult,
          direction,
          course,
          main_subjects: mainSubjects,
          status: 'pending'
        })
        .select('id')
        .single()

      if (insertError || !inserted?.id) throw new Error(insertError?.message ?? 'Insert failed')
      applicationId = inserted.id as string
    }

    // Upload documents to storage + register metadata
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i]
      const safeName = sanitizeFilename(file.name || `doc_${i}`)
      const path = `helper-applications/${applicationId}/${i}-${safeName}`

      const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
        contentType: file.type || undefined,
        upsert: true
      })
      if (uploadError) throw new Error(uploadError.message)

      const { error: docError } = await supabase.from('helper_application_documents').insert({
        application_id: applicationId,
        storage_bucket: BUCKET,
        storage_path: path,
        original_filename: file.name,
        content_type: file.type || null,
        size_bytes: file.size
      })
      if (docError) throw new Error(docError.message)
    }

    return ok({ status: 'pending', applicationId })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    if (message.toLowerCase().includes('telegram') || message.toLowerCase().includes('x-telegram')) {
      return unauthorized(message)
    }
    return serverError('add-helper failed', { message })
  }
})


