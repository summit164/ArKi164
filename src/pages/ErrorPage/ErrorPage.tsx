import { memo } from 'react'
import { ReactComponent as ErrorFace } from '@/shared/assets/images/icons/errorFace.svg'
import Button from '@/shared/ui/Button/Button'
import s from './ErrorPage.module.scss'

export const ErrorPage = memo(() => (
  <div className={s.wrapper}>
    <ErrorFace className={s.icon} />
    <div className={s.title}>Ошибка</div>
    <div className={s.description}>Пожалуйста, перезапустите приложение</div>
    <Button
      className={s.button}
      onClick={() => { window.location.href = '/' }}
      mode="first"
    >
      Перезапустить
    </Button>
  </div>
))
