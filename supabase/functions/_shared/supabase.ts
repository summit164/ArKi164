import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.77.0'
import { getEnvOrThrow } from './env.ts'

export function createServiceSupabaseClient() {
  const supabaseUrl = getEnvOrThrow('SUPABASE_URL')
  const serviceKey = getEnvOrThrow('SUPABASE_SERVICE_ROLE_KEY')

  return createClient(supabaseUrl, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  })
}


