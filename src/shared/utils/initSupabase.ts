import { createClient } from '@supabase/supabase-js'

export const initSupabase = () => {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!

  return createClient(supabaseUrl, supabaseAnonKey)
}
