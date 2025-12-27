import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'

export const useIdentify = () => {
  useEffect(() => {
    if (process.env.REACT_APP_MODE === 'production') {
      fetch('https://xzbkxthnfksriubmhlfx.supabase.co/functions/v1/identify', {
        headers: {
          method: 'POST',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tgName: WebApp.initDataUnsafe.user?.username })
      })
    }
  }, [])
}
