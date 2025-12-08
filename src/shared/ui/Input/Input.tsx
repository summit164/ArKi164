/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, forwardRef } from 'react'
import clsx from 'clsx'
import s from './Input.module.scss'
import { Error } from '../Error/Error'

interface InputProps {
  className?: string
  placeholder?: string
  type?: string
  onChange?: (val: any) => void
  value?: string
  name?: string
  id?: string
  inputMode?: any
  autoComplete?: string
  maxLength?: number
  pattern?: string
  ref?: any
  onKeyDown?: (val: any) => void
  onFocus?: (val: any) => void
  onBlur?: (val: any) => void
  error?: string | boolean
}

const Input: FC<InputProps> = forwardRef((props, ref) => {
  const {
    // eslint-disable-next-line react/prop-types
    className, placeholder, type, onChange, value, name, id, autoComplete, maxLength, pattern, onKeyDown, onFocus, onBlur, error, inputMode
  } = props

  return (
    <div className={s.container}>
      <input
        ref={ref as any}
        className={clsx(s.input, className, error && s.error)}
        placeholder={placeholder}
        inputMode={inputMode}
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        maxLength={maxLength}
        id={id}
        autoComplete={autoComplete || 'off'}
        pattern={pattern}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      { error && typeof error === 'string' && <Error error={error} />}
    </div>
  )
})

export default Input
