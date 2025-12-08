import { ElementType, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import s from './NavbarItem.module.scss'

type TypeNavbarItemProps = {
  Icon: ElementType,
  text: string,
  path: string
}

export const NavbarItem = memo(({
  Icon,
  text,
  path
}: TypeNavbarItemProps) => {
  const { pathname } = useLocation()

  return (
    <Link to={path} className={clsx(s.wrapper, pathname === path && s.wrapper_active)}>
      <Icon className={s.icon} />
      <p className={s.text}>
        {text}
      </p>
    </Link>
  )
})
