import { FC, memo } from 'react'
import clsx from 'clsx'
import { Badge } from '@/shared/ui/Badge/Badge'
import s from './OrderHelper.module.scss'

type TypeOrderHelperProps = {
  Img?: string | FC<{ className: string }>
  title: string
  description: string
  className?: string
  info?: string
  facult: string
  course: string
}

export const OrderHelper = memo(({
  Img,
  title,
  description,
  className,
  info,
  facult,
  course
}: TypeOrderHelperProps) => (
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
        {facult && (<Badge type="blue" text={facult} />)}
        {info && (<div className={s.info} />)}
      </div>
      {course && (<div className={s.course}>{`${course} курс`}</div>)}
      <div className={s.description}>{description}</div>
    </div>
  </div>
))
