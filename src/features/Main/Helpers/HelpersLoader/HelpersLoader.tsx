import { memo } from 'react'
import s from './HelpersLoader.module.scss'

export const HelpersLoader = memo(() => (
  <div className={s.wrapper}>
    <div className={s.item}>
      <div className={s.img} />
      <div className={s.container}>
        <div className={s.title} />
        <div className={s.description} />
      </div>
    </div>
    <div className={s.item}>
      <div className={s.img} />
      <div className={s.container}>
        <div className={s.title} />
        <div className={s.description} />
      </div>
    </div>
    <div className={s.item}>
      <div className={s.img} />
      <div className={s.container}>
        <div className={s.title} />
        <div className={s.description} />
      </div>
    </div>
  </div>
))
