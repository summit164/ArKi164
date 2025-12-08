import { memo } from 'react'
import { ReactComponent as IconArrowLeft } from '@/shared/assets/images/icons/arrowLeft.svg'
import { ReactComponent as IconTask } from '@/shared/assets/images/icons/task.svg'
import { NavigateFunction } from 'react-router-dom'
import { DINAMYC_ROUTES_PATHS } from '@/providers/AppRouter/routes'
import s from './Task.module.scss'

type TypeTaskProps = {
  redirect: NavigateFunction
  name: string
  id: number
}

export const Task = memo(({
  redirect,
  name,
  id
}: TypeTaskProps) => (
  <button
    className={s.wrapper}
    type="button"
    onClick={() => redirect(DINAMYC_ROUTES_PATHS.TASK_DETAIL + id)}
  >
    <IconTask className={s.img} />
    <div className={s.title}>{name}</div>
    <p
      className={s.button}
    >
      Перейти
      <IconArrowLeft className={s.icon} />
    </p>
  </button>
))
