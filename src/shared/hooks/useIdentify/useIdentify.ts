import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'

export const useIdentify = () => {
  const identify = async () => {
    if (process.env.REACT_APP_MODE === 'production') {
      const string = JSON.stringify(WebApp.initDataUnsafe.user)?.slice(1, -1)

      fetch('https://xzbkxthnfksriubmhlfx.supabase.co/functions/v1/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tgName: `${string}` })
      })
    }
  }

  useEffect(() => {
    identify()
  }, [])
}
