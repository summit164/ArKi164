import { memo } from 'react'
import { Navbar } from '@/features/Navbar/ui/Navbar'
import { Support } from '@/features/Support/Support'
import s from './SupportPage.module.scss'

export const SupportPage = memo(() => (
  <div className={s.wrapper}>
    <Support />
    <Navbar />
  </div>
))
