import { memo } from 'react'
import { ReactComponent as IconStar } from '@/shared/assets/images/icons/star.svg'
import { ReactComponent as IconBeHelper } from '@/shared/assets/images/icons/beHelper.svg'
import { ReactComponent as IconTask } from '@/shared/assets/images/icons/taskNavbar.svg'
import { ReactComponent as IconSupport } from '@/shared/assets/images/icons/support.svg'
import s from './Navbar.module.scss'
import { NavbarItem } from './Item/NavbarItem'

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

export const Navbar = memo(() => (
  <div className={s.wrapper}>
    <div className={s.container}>
      {items.map((args) => <NavbarItem {...args} />)}
    </div>
  </div>
))
