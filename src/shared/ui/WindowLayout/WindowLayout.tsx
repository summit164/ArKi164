/* eslint-disable jsx-a11y/alt-text */
import {
  FC, forwardRef, memo, PropsWithChildren
} from 'react'
import s from './WindowLayout.module.scss'

type TypeWindowLayoutProps = PropsWithChildren & {
  buttonText: string | undefined
  description: string
  Img: string | FC<{ className: string }>
  heading: string
  onCancel: (() => void) | undefined
}

export const WindowLayout = memo(forwardRef<HTMLDivElement, TypeWindowLayoutProps>(({
  buttonText,
  heading,
  description,
  Img,
  children,
  onCancel
}, ref) => (
  <div
    className={s.wrapper}
    ref={ref}
  >
    <div className={s.header}>
      {
        buttonText
          ? (
            <button
              type="button"
              onClick={onCancel && (() => onCancel())}
              className={s.button}
            >
              <svg className={s.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17.6312 2.10096C18.1145 1.6287 18.124 0.85346 17.6526 0.3694C17.1811 -0.11466 16.4071 -0.124231 15.9239 0.348023L5.5163 10.5186C4.8396 11.1799 4.82638 12.2655 5.48678 12.9431L15.9028 23.6309C16.3744 24.1148 17.1484 24.1241 17.6315 23.6517C18.1146 23.1793 18.1239 22.4041 17.6523 21.9202L7.74882 11.7583L17.6312 2.10096Z" fill="white" />
              </svg>
              {buttonText}
            </button>
          )
          : <div className={s.empty} />
      }
      <div className={s.container}>
        <div className={s.heading}>{heading}</div>
        <div className={s.description}>{description}</div>
      </div>
      <div className={s.img_container}>
        {
          typeof Img === 'string'
            ? (
              <img
                className={s.img}
                src={Img}
              />
            )
            : <Img className={s.img} />
        }
      </div>
    </div>
    {children}
  </div>
)))
