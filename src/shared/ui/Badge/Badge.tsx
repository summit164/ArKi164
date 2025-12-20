import clsx from 'clsx'
import { memo } from 'react'
import s from './Badge.module.scss'

type TypeBadgeProps = {
  text: string
  type: 'blue' | 'white' | 'red' | 'purple'
}

export const Badge = memo(({
  text,
  type
}: TypeBadgeProps) => (
  <div className={clsx(s.wrapper, s[`type_${type}`])}>{text}</div>
))
