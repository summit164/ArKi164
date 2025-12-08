import { memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from './routes'
import { RouteAuthOnly } from './RouteAuthOnly'
import { RouteNotAuthOnly } from './RouteNotAuthOnly'

export const AppRouter = memo(() => (
  <Routes>
    {
      ROUTES.map(({ path, element, ...route }) => (
        <Route
          path={path}
          element={
            route?.authOnly
              ? <RouteAuthOnly>{element}</RouteAuthOnly>
              : route?.notAuthOnly
                ? <RouteNotAuthOnly>{element}</RouteNotAuthOnly>
                : element
          }
        />
      ))
    }
  </Routes>
))
