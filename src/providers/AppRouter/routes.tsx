import { MainPage } from '@/pages/MainPage/MainPage'
import { OrderWithHelperPage } from '@/pages/OrderWithHelperPage/OrderWithHelperPage'
import { HelperPage } from '@/pages/HelperPage/HelperPage'
import { TaskDetailPage } from '@/pages/TaskDetailPage/TaskDetailPage'
import { TasksPage } from '@/pages/TasksPage/TasksPage'
import { SupportPage } from '@/pages/SupportPage/SupportPage'
import { TypeRoute } from './types'

export const DINAMYC_ROUTES_PATHS = {
  TASK_DETAIL: '/task-detail/'
} as const

export const ROUTES_PATHS = {
  MAIN: '/',
  HELPER: '/helper',
  LOGIN: '/login',
  ORDER_WITH_HELPER: '/order-with-helper',
  TASKS: '/tasks',
  TASK_DETAIL: `${DINAMYC_ROUTES_PATHS.TASK_DETAIL}:id`,
  SUPPORT: '/support'
} as const

export const ROUTES: TypeRoute[] = [
  {
    path: ROUTES_PATHS.MAIN,
    element: <MainPage />,
    notAuthOnly: true
  },
  {
    path: ROUTES_PATHS.HELPER,
    element: <HelperPage />,
    notAuthOnly: true
  },
  {
    path: ROUTES_PATHS.TASKS,
    element: <TasksPage />,
    notAuthOnly: true
  },
  {
    path: ROUTES_PATHS.SUPPORT,
    element: <SupportPage />,
    notAuthOnly: true
  },
  {
    path: ROUTES_PATHS.ORDER_WITH_HELPER,
    element: <OrderWithHelperPage />,
    notAuthOnly: true
  },
  {
    path: ROUTES_PATHS.TASK_DETAIL,
    element: <TaskDetailPage />,
    notAuthOnly: true
  }
  // {
  //   path: ROUTES_PATHS.LOGIN,
  //   element: <div>Auth</div>,
  //   notAuthOnly: true
  // }
]
