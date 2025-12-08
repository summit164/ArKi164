import { Main } from '@/features/Main/Main'
import { Navbar } from '@/features/Navbar/ui/Navbar'
import { memo } from 'react'
import s from './MainPage.module.scss'

export const MainPage = memo(() => (
  <div className={s.wrapper}>
    <Main />
    <Navbar />
  </div>
))
