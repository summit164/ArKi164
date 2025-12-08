import { clsx } from 'clsx'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import s from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  disabled?: boolean
  mode?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className, disabled, children, mode, ...otherProps
  } = props

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={
        mode === 'first'
          ? clsx(className, s.button_first, s.button)
          : mode === 'red'
            ? clsx(className, s.button_red, s.button)
            : clsx(className, s.button)
      }
      {...otherProps}
    >
      {children}
    </button>
  )
})

export default Button
