import WebApp from '@twa-dev/sdk'

export const initTelegramSettings = () => {
  try {
    // When running outside Telegram WebApp (e.g. localhost in browser), these calls may throw.
    // Guard on presence of Telegram WebApp object.
    const maybeTelegram = (window as unknown as { Telegram?: { WebApp?: unknown } }).Telegram
    if (!maybeTelegram?.WebApp) {
      return
    }

    WebApp.ready()
    WebApp.disableVerticalSwipes()
    WebApp.expand()
  } catch {
    // noop
  }
}
