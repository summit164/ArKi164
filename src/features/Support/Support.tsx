import Button from '@/shared/ui/Button/Button'
import { memo } from 'react'
import { ReactComponent as IconLoupe } from '@/shared/assets/images/icons/loupe.svg'
import WebApp from '@twa-dev/sdk'
import s from './Support.module.scss'

export const Support = memo(() => (
  <div className={s.wrapper}>
    <IconLoupe className={s.icon} />
    <div className={s.title}>Поддержка</div>
    <div className={s.description}>Если у вас возникли вопросы или вы хотите сообщить об ошибке, пожалуйста, свяжитесь с нашим менеджером</div>
    <Button
      className={s.button}
      onClick={() => { WebApp.openTelegramLink(process.env.REACT_APP_SUPPORT_LINK as string) }}
      mode="first"
    >
      Написать в чат
    </Button>
  </div>
))
