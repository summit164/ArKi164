import { corsHeaders } from '../_shared/cors.ts'
import { createServiceSupabaseClient } from '../_shared/supabase.ts'
import { ok, serverError } from '../_shared/responses.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createServiceSupabaseClient()

    const { data, error } = await supabase
      .from('helpers')
      .select('id,name,second_name,main_subjects,rating,facult,course,profiles(telegram_photo_url)')
      .eq('is_active', true)

    if (error) throw new Error(error.message)

    const mapped = (data ?? []).map((row) => ({
      id: row.id,
      name: row.name,
      second_name: row.second_name,
      main_subjects: row.main_subjects,
      rating: String(row.rating ?? 0),
      tgPhoto: (row as any)?.profiles?.telegram_photo_url ?? '',
      facult: row.facult,
      course: row.course
    }))

    // Frontend expects { data: [...] }
    return ok({ data: mapped })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return serverError('get-helpers failed', { message })
  }
})


