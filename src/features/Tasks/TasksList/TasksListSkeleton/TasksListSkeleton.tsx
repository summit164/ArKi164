import { memo } from 'react'
import s from './TasksListSkeleton.module.scss'

export const TasksListSkeleton = memo(() => (
  <div className={s.wrapper}>
    <div className={s.item} />
    <div className={s.item} />
    <div className={s.item} />
    <div className={s.item} />
  </div>
))
