import { TAB_TASKS } from '@/features/Tasks/model/constants'

export type TaskDetail = {
  award: string
  description: string
  googleFormLink: string
  id: number | null
  name: string
  role: TAB_TASKS
}
