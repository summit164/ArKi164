
import { memo } from 'react'
import { Navbar } from '@/features/Navbar/ui/Navbar'
import { Tasks } from '@/features/Tasks/Tasks'
import s from './TasksPage.module.scss'

export const TasksPage = memo(() => (
  <div className={s.wrapper}>
    <Tasks />
    <Navbar />
  </div>
))
