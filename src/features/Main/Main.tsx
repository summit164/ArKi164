import {
  memo, useRef, useState
} from 'react'
import { ReactComponent as IconLampOn } from '@/shared/assets/images/icons/lampOn.svg'
import { ReactComponent as IconHelpers } from '@/shared/assets/images/icons/helpers.svg'
import { useAppearance } from '@/shared/hooks/useAppearance'
import WebApp from '@twa-dev/sdk'
import s from './Main.module.scss'
import { Header } from '../Header/Header'
import { TAB } from './model/constants'
import { Helpers } from './Helpers/Helpers'
import { Order } from '../Order/Order'

export const Main = memo(() => {
  const [tab, setTab] = useState(TAB.HELPERS)

  const helpersRef = useRef<HTMLDivElement>(null)
  const orderRef = useRef<HTMLDivElement>(null)

  const appearance = useAppearance({
    elements: {
      [TAB.HELPERS]: helpersRef,
      [TAB.ORDER]: orderRef
    },
    state: tab,
    setState: setTab,
    onAfterSetState: () => {
      const scrollStep = -window.scrollY / 15
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep)
        } else {
          clearInterval(scrollInterval)
        }
      }, 16)
    }
  })

  return (
    <div className={s.wrapper}>
      <Header>
        <button
          type="button"
          onClick={() => {
            appearance(TAB.HELPERS)
            WebApp.HapticFeedback.impactOccurred('light')
          }}
          className={s.button}
        >
          <IconHelpers />
          <p className={s.text}>Выбрать хелпера</p>
        </button>
        <button
          type="button"
          onClick={() => {
            appearance(TAB.ORDER)
            WebApp.HapticFeedback.impactOccurred('light')
          }}
          className={s.button}
        >
          <IconLampOn />
          <p className={s.text}>Быстрая заявка</p>
        </button>
      </Header>
      {tab === TAB.HELPERS && (
        <Helpers ref={helpersRef} />
      )}
      {tab === TAB.ORDER && (
        <Order ref={orderRef} />
      )}
    </div>
  )
})
