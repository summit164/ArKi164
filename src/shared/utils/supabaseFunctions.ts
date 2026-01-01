import WebApp from '@twa-dev/sdk'

const DEFAULT_FUNCTIONS_BASE_URL = 'https://xzbkxthnfksriubmhlfx.supabase.co/functions/v1'

export const SUPABASE_FUNCTIONS_BASE_URL = (
  process.env.REACT_APP_SUPABASE_FUNCTIONS_URL || DEFAULT_FUNCTIONS_BASE_URL
).replace(/\/$/, '')

export const getSupabaseFunctionUrl = (name: string) => `${SUPABASE_FUNCTIONS_BASE_URL}/${name}`

export const getTelegramInitDataHeader = () => ({
  'x-telegram-init-data': WebApp.initData
})


