import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.77.0'
import type { TelegramWebAppUser } from './telegram.ts'

export async function upsertProfile(
  supabase: SupabaseClient,
  tgUser: TelegramWebAppUser
): Promise<{ profileId: string }> {
  const telegram_id = tgUser.id

  const payload = {
    telegram_id,
    telegram_username: tgUser.username ?? null,
    telegram_first_name: tgUser.first_name ?? null,
    telegram_last_name: tgUser.last_name ?? null,
    telegram_photo_url: tgUser.photo_url ?? null,
    telegram_user_json: tgUser as unknown,
    last_seen_at: new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('profiles')
    .upsert(payload, { onConflict: 'telegram_id' })
    .select('id')
    .single()

  if (error || !data?.id) {
    throw new Error(`profiles upsert failed: ${error?.message ?? 'unknown'}`)
  }

  return { profileId: data.id as string }
}

export async function ensureStudent(supabase: SupabaseClient, profileId: string) {
  const { error } = await supabase.from('students').upsert({ profile_id: profileId })
  if (error) throw new Error(`students upsert failed: ${error.message}`)
}

export async function isModerator(supabase: SupabaseClient, telegramId: number) {
  const { data, error } = await supabase
    .from('moderators')
    .select('telegram_id')
    .eq('telegram_id', telegramId)
    .maybeSingle()

  if (error) throw new Error(`moderators lookup failed: ${error.message}`)
  return !!data?.telegram_id
}


