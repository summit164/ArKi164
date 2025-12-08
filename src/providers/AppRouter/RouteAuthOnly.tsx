import { memo, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { getToken } from '@/shared/utils/getTokens'
import { ROUTES_PATHS } from '@/providers/AppRouter/routes'

export const RouteAuthOnly = memo(({ children }: PropsWithChildren) => {
  const { authToken } = getToken()

  if (!authToken) { return <Navigate to={ROUTES_PATHS.LOGIN} replace /> }

  return (<>{children}</>)
})
