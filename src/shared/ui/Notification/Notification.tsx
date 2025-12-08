import React, { forwardRef, memo } from 'react'
import Button from '@/shared/ui/Button/Button'
import clsx from 'clsx'
import s from './Notification.module.scss'

type TypeNotificationProps = {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  buttonText?: string
  onClick?: () => void
  className?: string
  titleClassName?: string
  containerClassName?: string
  descriptionClassName?: string
}

export const Notification = memo(forwardRef<HTMLDivElement, TypeNotificationProps>(({
  Icon,
  title,
  description,
  buttonText = 'Готово',
  onClick,
  className,
  titleClassName,
  containerClassName,
  descriptionClassName
}, ref) => (
  <div
    className={clsx(s.wrapper, className)}
    ref={ref}
  >
    <div className={clsx(s.container, containerClassName)}>
      <Icon className={s.icon} />
      <div className={clsx(s.title, titleClassName)}>{title}</div>
      <div className={clsx(s.description, descriptionClassName)}>{description}</div>
    </div>
    {onClick && (
      <Button
        onClick={onClick}
        mode="first"
      >
        {buttonText}
      </Button>
    )}
  </div>
)))
