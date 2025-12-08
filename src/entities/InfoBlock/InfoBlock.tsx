import { FC, memo } from 'react'
import clsx from 'clsx'
import s from './InfoBlock.module.scss'

type TypeInfoBlockProps = {
  Img?: string | FC<{ className: string }>
  title: string
  description: string
  className?: string
  info?: string
}

export const InfoBlock = memo(({
  Img,
  title,
  description,
  className,
  info
}: TypeInfoBlockProps) => (
  <div className={clsx(s.wrapper, className)}>
    {
      Img
        ? (
          <div className={s.img_container}>
            {
              typeof Img === 'string'
                ? (
                  <img
                    alt="helper-avatar"
                    className={s.img}
                    src={Img}
                  />
                )
                : <Img className={s.img} />
            }
          </div>
        )
        : null
    }
    <div className={s.container}>
      <div className={s.title_container}>
        <div className={s.title}>{title}</div>
        {info && (<div className={s.info} />)}
      </div>
      <div className={s.description}>{description}</div>
    </div>
  </div>
))
