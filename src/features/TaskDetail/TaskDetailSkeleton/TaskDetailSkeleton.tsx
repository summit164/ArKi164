import { memo } from 'react'
import s from './TaskDetailSkeleton.module.scss'

export const TaskDetailSkeleton = memo(() => (
  <div className={s.wrapper} />
))
