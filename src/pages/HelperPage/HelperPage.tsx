import { memo } from 'react'
import { Helper } from '@/features/Helper/Helper'
import { Navbar } from '@/features/Navbar/ui/Navbar'
import s from './HelperPage.module.scss'

export const HelperPage = memo(() => (
  <div className={s.wrapper}>
    <Helper />
    <Navbar />
  </div>
))
