import { memo } from 'react'
import { OrderWithHelper } from '@/features/OrderWithHelper/OrderWithHelper'
import s from './OrderWithHelperPage.module.scss'

export const OrderWithHelperPage = memo(() => (
  <div className={s.wrapper}>
    <OrderWithHelper />
  </div>
))
