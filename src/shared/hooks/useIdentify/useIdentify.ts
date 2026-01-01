/* eslint-disable no-promise-executor-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable padded-blocks */
/* eslint-disable no-plusplus */
import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'

export const useIdentify = () => {
  const identify = async () => {
    if (process.env.REACT_APP_MODE === 'production') {
      const MAX_RETRIES = 10
      const id = WebApp.initDataUnsafe.user?.id

      for (let i = 0; i < MAX_RETRIES; i++) {
        const username = WebApp.initDataUnsafe.user?.username

        if (username) {
          fetch('https://xzbkxthnfksriubmhlfx.supabase.co/functions/v1/identify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tgName: `@${username}${id ? `\nid: ${id}` : ''}` })
          })

          return
        }

        await new Promise((r) => setTimeout(r, 1000))
      }

      fetch('https://xzbkxthnfksriubmhlfx.supabase.co/functions/v1/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tgName: `Без юзернейма${id ? `\nid: ${id}` : ''}` })
      })
    }
  }

  useEffect(() => {
    identify()
  }, [])
}
