/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { memo } from 'react'
import { ReactComponent as IconHelperAvatar } from '@/shared/assets/images/icons/helper-avatar.svg'
import { ReactComponent as IconArrowLeft } from '@/shared/assets/images/icons/arrowLeft.svg'
import { Badge } from '@/shared/ui/Badge/Badge'
import s from './Helper.module.scss'

type TypeHelperProps = {
  tgPhoto: string
  name: string
  secondName: string
  mainSubjects: string
  onClick: () => void
  facult: string
}

export const Helper = memo(({
  tgPhoto,
  name,
  secondName,
  mainSubjects,
  onClick,
  facult,
  ...extraProps
}: TypeHelperProps) => (
  <div
    onClick={() => onClick()}
    className={s.wrapper}
    {...extraProps}
  >
    {
      tgPhoto
        ? (
          <img
            className={s.img}
            src={tgPhoto}
            alt="helper-avatar"
          />
        )
        : (
          <div className={s.icon_container}>
            <IconHelperAvatar className={s.icon} />
          </div>
        )
    }
    <div className={s.container}>
      <div className={s.info}>
        <div className={s.name_container}>
          <div className={s.name}>{`${name || ''} ${secondName || ''}`}</div>
          {facult && (<Badge type="blue" text={facult} />)}
        </div>
        <div className={s.description}>{mainSubjects}</div>
      </div>
      <IconArrowLeft className={s.icon_left} />
    </div>
  </div>
))
