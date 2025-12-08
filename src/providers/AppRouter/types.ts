import { ReactNode } from 'react'
import { ROUTES_PATHS } from './routes'

 type RouteKey = keyof typeof ROUTES_PATHS

type RoutePath = (typeof ROUTES_PATHS)[RouteKey]

export type TypeRoute = {
  path: RoutePath,
  element: ReactNode,
  notAuthOnly?: true
  authOnly?: true
}
