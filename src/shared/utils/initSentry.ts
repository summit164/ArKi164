import * as Sentry from '@sentry/react'

export const initSentry = () => {
  try {
    if (process.env.REACT_APP_MODE !== 'production') { return }

    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,

      environment: 'production',

      integrations: [
        Sentry.consoleLoggingIntegration({
          levels: ['error']
        })
      ],
      enableLogs: false
    })
  } catch (e) {
    console.error('Sentry failed:', e)
  }
}
