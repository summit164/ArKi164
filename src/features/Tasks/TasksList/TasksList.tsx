import { memo } from 'react'
import { useRedirect } from '@/shared/hooks/useRedirect'
import { EmptyBlock } from '@/features/EmptyBlock/EmptyBlock'
import { Task } from './Task/Task'
import s from './TasksList.module.scss'
import { TypeTask } from '../model/types'
import { TasksListSkeleton } from './TasksListSkeleton/TasksListSkeleton'

type TypeTasksListProps = {
  tasks: TypeTask[]
  pending: boolean
}

export const TasksList = memo(({
  tasks,
  pending
}: TypeTasksListProps) => {
  const redirect = useRedirect()

  if (pending) { return <TasksListSkeleton /> }

  return (
    tasks?.length
      ? (
        <div className={s.wrapper}>
          {tasks?.map(({ name, id }) => (
            <Task
              key={id}
              id={id}
              name={name}
              redirect={redirect}
            />
          ))}
        </div>
      )
      : (
        <EmptyBlock
          title="Заданий нет"
          description="В скором времени список заданий будет пополняться"
        />
      )
  )
})
