import { memo, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks'
import { ReactComponent as IconMoney } from '@/shared/assets/images/icons/money.svg'
import { TasksVariants } from './TasksVariants/TasksVariants'
import s from './Tasks.module.scss'
import { TasksList } from './TasksList/TasksList'
import { fetchGetTasksAsyncThunk } from './model/TasksAsyncThunks'
import { selectTasks, selectTasksPending, selectTasksTab } from './model/TasksSelectors'
import { setDefaultValues } from './model/TasksSlice'

export const Tasks = memo(() => {
  const dispatch = useAppDispatch()

  const tab = useAppSelector(selectTasksTab)
  const tasks = useAppSelector(selectTasks)
  const pending = useAppSelector(selectTasksPending)

  const filteredTasks = useMemo(() => tasks.filter(({ role }) => role === tab), [tab, tasks])

  useEffect(() => {
    dispatch(fetchGetTasksAsyncThunk())
  }, [dispatch])

  useEffect(() => () => { dispatch(setDefaultValues()) }, [dispatch])

  return (
    <div className={s.wrapper}>
      <IconMoney className={s.icon} />
      <div className={s.title}>Задания</div>
      <div className={s.description}>Выполняйте задание, отправляйте ответ и получайте призы за правильное выполнение</div>
      <div className={s.container}>
        <TasksVariants />
        <TasksList
          tasks={filteredTasks}
          pending={pending}
        />
      </div>
    </div>
  )
})
