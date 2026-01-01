export const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': [
    'authorization',
    'x-client-info',
    'apikey',
    'content-type',
    'x-telegram-init-data'
  ].join(', '),
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
}


