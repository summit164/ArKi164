import { ChangeEvent, memo } from 'react'
import clsx from 'clsx'
import { ReactComponent as IconCheckmark } from '@/shared/assets/images/icons/checkmark.svg'
import s from './Checkbox.module.scss'
import { Error } from '../Error/Error'

type TypeCheckboxProps = {
  value: boolean
  error: string,
  id: string
  name: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  text: string
  errorClassName?: string
  className?: string
}

export const Checkbox = memo(({
  value,
  error,
  id,
  name,
  onChange,
  text,
  errorClassName,
  className
}: TypeCheckboxProps) => (
  <div className={clsx(s.wrapper, className)}>
    <input
      className={s.input}
      name={name}
      type="checkbox"
      id={id}
      checked={value}
      onChange={onChange}
    />
    <label
      htmlFor={name}
      className={s.label}
    >
      <div className={s.box}>
        <IconCheckmark className={s.icon} />
      </div>
      {text}
    </label>
    { error && typeof error === 'string' && (
      <Error
        error={error}
        errorClassName={errorClassName}
      />
    )}
  </div>
))
