import { corsHeaders } from '../_shared/cors.ts'
import { createServiceSupabaseClient } from '../_shared/supabase.ts'
import { badRequest, jsonResponse, serverError } from '../_shared/responses.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const idRaw = url.searchParams.get('id')
    const id = idRaw ? Number.parseInt(idRaw, 10) : NaN

    if (!idRaw || Number.isNaN(id)) {
      return badRequest('Missing or invalid "id" query param')
    }

    const supabase = createServiceSupabaseClient()

    const { data, error } = await supabase
      .from('tasks')
      .select('id,name,role,description,award,google_form_link')
      .eq('id', id)
      .eq('is_active', true)
      .single()

    if (error) throw new Error(error.message)

    return jsonResponse(
      {
        id: data.id,
        name: data.name,
        role: data.role,
        description: data.description,
        award: data.award,
        googleFormLink: data.google_form_link
      },
      { status: 200 }
    )
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return serverError('task-by-id failed', { message })
  }
})


