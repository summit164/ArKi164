import { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks'
import { useRedirect } from '@/shared/hooks/useRedirect'
import { ROUTES_PATHS } from '@/providers/AppRouter/routes'
import { ReactComponent as IconTask } from '@/shared/assets/images/icons/task.svg'
import { InfoBlock } from '@/entities/InfoBlock/InfoBlock'
import Button from '@/shared/ui/Button/Button'
import WebApp from '@twa-dev/sdk'
import { fetchTaskDetailAsyncThunk } from './model/TaskDetailAsyncThunk'
import s from './TaskDetail.module.scss'
import {
  selectTaskDetailAward, selectTaskDetailDescription, selectTaskDetailGoogleFormLink, selectTaskDetailName, selectTaskDetailPending
} from './model/TaskDetailSelectors'
import { TaskDetailSkeleton } from './TaskDetailSkeleton/TaskDetailSkeleton'

export const TaskDetail = memo(() => {
  const dispatch = useAppDispatch()
  const redirect = useRedirect()

  const pending = useAppSelector(selectTaskDetailPending)
  const award = useAppSelector(selectTaskDetailAward)
  const description = useAppSelector(selectTaskDetailDescription)
  const googleFormLink = useAppSelector(selectTaskDetailGoogleFormLink)
  const name = useAppSelector(selectTaskDetailName)
  // const role = useAppSelector(selectTaskDetailRole)

  const { id } = useParams()

  useEffect(() => {
    if (id) {
      dispatch(fetchTaskDetailAsyncThunk({ id: +id }))
    } else {
      redirect(ROUTES_PATHS.TASKS)
    }
  }, [id, dispatch, redirect])

  useEffect(() => {
    const handler = () => {
      redirect(ROUTES_PATHS.TASKS)
      WebApp.BackButton?.hide()
    }

    WebApp.BackButton?.onClick(handler)
    WebApp.BackButton?.show()

    return () => { WebApp.BackButton?.offClick(handler) }
  }, [redirect])

  return (
    <div className={s.wrapper}>
      <IconTask className={s.icon} />
      <div className={s.title}>Задание</div>
      <div className={s.description}>Выполните задание, отправьте ответ и получите приз за правильное выполнение</div>
      {
        pending
          ? (
            <>
              <TaskDetailSkeleton />
              <TaskDetailSkeleton />
            </>
          )
          : (
            <>
              <InfoBlock
                className={s.info}
                title={name}
                description={description}
              />
              <InfoBlock
                className={s.info}
                title="Награда"
                description={award}
              />
            </>
          )
      }
      <Button
        className={s.button}
        onClick={() => {
          if (googleFormLink) {
            if (googleFormLink?.includes('https://t.me')) {
              WebApp.openTelegramLink(googleFormLink)
            } else {
              WebApp.openLink(googleFormLink)
            }
          }
        }}
        mode="first"
      >
        Выполнить
      </Button>
    </div>
  )
})
