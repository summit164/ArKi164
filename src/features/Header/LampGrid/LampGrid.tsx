import { forwardRef, memo } from 'react'
import { ReactComponent as IconLamp } from '@/shared/assets/images/icons/lamp-grid2.svg'
import clsx from 'clsx'
import s from './LampGrid.module.scss'

export const LampGrid = memo(forwardRef<HTMLDivElement>((_, ref) => (
  <div
    className={s.wrapper}
    ref={ref}
  >
    <div className={clsx(s.row, s.row_first)}>
      <IconLamp className={clsx(s.icon, s.icon_1)} />
      <IconLamp className={clsx(s.icon, s.icon_2)} />
      <IconLamp className={clsx(s.icon, s.icon_1)} />
    </div>
    <div className={clsx(s.row, s.row_second)}>
      <IconLamp className={clsx(s.icon, s.icon_2)} />
      <IconLamp className={clsx(s.icon, s.icon_1)} />
    </div>
    <div className={clsx(s.row, s.row_third)}>
      <div className={clsx(s.container, s.container_1)}>
        <IconLamp className={clsx(s.icon, s.icon_1)} />
        <IconLamp className={clsx(s.icon, s.icon_3)} />
      </div>
      <div className={s.container}>
        <IconLamp className={clsx(s.icon, s.icon_1)} />
        <IconLamp className={clsx(s.icon, s.icon_4)} />
      </div>
    </div>
    <div className={clsx(s.row, s.row_fourth)}>
      <IconLamp className={clsx(s.icon, s.icon_2)} />
      <IconLamp className={clsx(s.icon, s.icon_2)} />
    </div>
    <div className={clsx(s.row, s.row_fifth)}>
      <IconLamp className={clsx(s.icon, s.icon_1)} />
      <IconLamp className={clsx(s.icon, s.icon_1)} />
      <IconLamp className={clsx(s.icon, s.icon_1)} />
    </div>
    <div className={clsx(s.row, s.row_sixth)}>
      <IconLamp className={clsx(s.icon, s.icon_2)} />
      <IconLamp className={clsx(s.icon, s.icon_1)} />
    </div>
  </div>
)))
