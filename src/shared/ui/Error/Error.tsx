import { memo } from 'react'
import clsx from 'clsx'
import s from './Error.module.scss'

type TypeErrorProps = {
  error: string
  errorClassName?: string
}

export const Error = memo(({
  error,
  errorClassName
}: TypeErrorProps) => (
  <div className={clsx(s.error_text, errorClassName)}>{error}</div>
))
