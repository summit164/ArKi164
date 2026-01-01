import { createClient, SupabaseClient } from '@supabase/supabase-js'

export const initSupabase = (): SupabaseClient | null => {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

  // Allow running locally without Supabase env vars (UI should still render).
  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}
