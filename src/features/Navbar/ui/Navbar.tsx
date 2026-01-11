import { memo } from 'react'
import { ReactComponent as IconStar } from '@/shared/assets/images/icons/star.svg'
import { ReactComponent as IconBeHelper } from '@/shared/assets/images/icons/beHelper.svg'
import { ReactComponent as IconTask } from '@/shared/assets/images/icons/taskNavbar.svg'
import { ReactComponent as IconSupport } from '@/shared/assets/images/icons/support.svg'
import { useAppSelector } from '@/shared/utils/hooks'
import s from './Navbar.module.scss'
import { NavbarItem } from './Item/NavbarItem'
import { selectNavbarIsVisible } from '../model/NavbarSelectors'

const items = [
  {
    text: 'Помощь',
    Icon: IconStar,
    path: '/'
  },
  {
    text: 'Стать Хелпером',
    Icon: IconBeHelper,
    path: '/helper'
  },
  {
    text: 'Задания',
    Icon: IconTask,
    path: '/tasks'
  },
  {
    text: 'Поддержка',
    Icon: IconSupport,
    path: '/support'
  }
]

export const Navbar = memo(() => {
  const isVisible = useAppSelector(selectNavbarIsVisible)

  return isVisible
    ? (
      <div className={s.wrapper}>
        <div className={s.container}>
          {items.map((args) => <NavbarItem {...args} />)}
        </div>
      </div>
    )
    : null
})
