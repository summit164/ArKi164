import { ErrorPage } from '@/pages/ErrorPage/ErrorPage'
import * as Sentry from '@sentry/react'
import { PropsWithChildren } from 'react'

export const SentryErrorBoundary = ({
  children
}: PropsWithChildren) => (
  <Sentry.ErrorBoundary fallback={<ErrorPage />}>
    {children}
  </Sentry.ErrorBoundary>
)
