import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'
import { getSupabaseFunctionUrl, getTelegramInitDataHeader } from '@/shared/utils/supabaseFunctions'

export const useIdentify = () => {
  const identify = async () => {
    if (process.env.REACT_APP_MODE === 'production') {
      const username = WebApp.initDataUnsafe.user?.username

      fetch(getSupabaseFunctionUrl('identify'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getTelegramInitDataHeader()
        },
        body: JSON.stringify({ tgName: `@${username || 'Без юзернейма'}` })
      })
    }
  }

  useEffect(() => {
    identify()
  }, [])
}
