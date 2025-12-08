import { memo } from 'react'
import { ReactComponent as IconMonkey } from '@/shared/assets/images/icons/monkey.svg'
import clsx from 'clsx'
import s from './EmptyBlock.module.scss'

type TypeEmptyBlockProps = {
  title: string
  description: string
  wrapperClassName?: string
}

export const EmptyBlock = memo(({
  title,
  description,
  wrapperClassName
}: TypeEmptyBlockProps) => (
  <div className={clsx(s.empty, wrapperClassName)}>
    <IconMonkey className={s.icon} />
    <div className={s.title}>{title}</div>
    <div className={s.description}>{description}</div>
  </div>
))
