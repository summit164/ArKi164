import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'

export const useIdentify = () => {
  const identify = async () => {
    console.log(1)
    if (process.env.REACT_APP_MODE === 'production') {
      console.log(123)
      const r = await fetch('https://xzbkxthnfksriubmhlfx.supabase.co/functions/v1/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tgName: WebApp.initDataUnsafe.user?.username })
      })
      console.log(r)
    }
  }
  useEffect(() => {
    identify()
  }, [])
}
