import { memo } from 'react'
import s from './Error.module.scss'

type TypeErrorProps = {
  error: string
}

export const Error = memo(({
  error
}: TypeErrorProps) => (
  <div className={s.error_text}>{error}</div>
))
