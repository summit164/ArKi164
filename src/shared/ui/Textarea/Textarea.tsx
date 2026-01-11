/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useCallback } from 'react'
import clsx from 'clsx'
import s from './Textarea.module.scss'

type Props = {
  value?: string
  onChange?: (val: any) => void
  placeholder: string
  className?: string
  error?: string | boolean
  maxLength?: number
  style?: object
  onFocus?: (val: any) => void
  onBlur?: (val: any) => void
}

const Textarea = ({
  value, onChange, placeholder, className, error, maxLength, style, onFocus, onBlur
}: Props) => {
  const resize = useCallback((e: ChangeEvent) => {
    (e.target as HTMLTextAreaElement).style.height = '0px';
    (e.target as HTMLTextAreaElement).style.height = `${e.target.scrollHeight}px`
  }, [])

  return (
    <div className={s.container}>
      <textarea
        className={error ? clsx(s.textarea, s.error, className) : clsx(s.textarea, className)}
        name="textarea"
        style={style}
        value={value}
        onChange={(e) => {
          resize(e)
          onChange?.(e)
        }}
        placeholder={placeholder}
        maxLength={maxLength}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      { error && typeof error === 'string' && <div className={s.error_text}>{error}</div>}
    </div>
  )
}

export default Textarea
