import { corsHeaders } from '../_shared/cors.ts'
import { createServiceSupabaseClient } from '../_shared/supabase.ts'
import { jsonResponse, serverError } from '../_shared/responses.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createServiceSupabaseClient()

    const { data, error } = await supabase
      .from('tasks')
      .select('id,name,role')
      .eq('is_active', true)
      .order('id', { ascending: false })

    if (error) throw new Error(error.message)

    // Frontend expects a raw array
    return jsonResponse(data ?? [], { status: 200 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return serverError('all-tasks failed', { message })
  }
})


