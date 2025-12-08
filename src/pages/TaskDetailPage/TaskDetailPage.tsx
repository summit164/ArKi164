import { memo } from 'react'
import { TaskDetail } from '@/features/TaskDetail/TaskDetail'
import s from './TaskDetailPage.module.scss'

export const TaskDetailPage = memo(() => (
  <div className={s.wrapper}>
    <TaskDetail />
  </div>
))
