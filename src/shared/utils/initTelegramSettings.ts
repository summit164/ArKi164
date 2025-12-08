import WebApp from '@twa-dev/sdk'

export const initTelegramSettings = () => {
  WebApp.ready()
  WebApp.disableVerticalSwipes()
  WebApp.expand()
}
