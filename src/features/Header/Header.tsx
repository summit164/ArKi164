import {
  memo, PropsWithChildren, useEffect, useRef
} from 'react'
import StudyFlowLogo from '@/shared/assets/images/studyFlowLogo.jpg'
import WebApp from '@twa-dev/sdk'
import s from './Header.module.scss'
import { LampGrid } from './LampGrid/LampGrid'

export const Header = memo(({ children }: PropsWithChildren) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLImageElement>(null)
  const plugRef = useRef<HTMLImageElement>(null)
  const lampGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef.current && controlsRef.current) {
      const point = controlsRef.current.getBoundingClientRect().top

      const switchPoint = point / 2 - 70

      const onScroll = () => {
        if (wrapperRef.current === null || avatarRef.current === null || lampGridRef.current === null) { return }

        const { scrollY } = window
        const isDown = wrapperRef.current?.classList?.contains(s['down-container'])
        const isUp = wrapperRef.current?.classList?.contains(s['up-container'])

        if (!isDown && !isUp && scrollY > switchPoint) {
          wrapperRef.current.classList.add(s['up-container'])
          wrapperRef.current.classList.remove(s['down-container'])

          avatarRef.current?.classList.add(s['small-img'])
          avatarRef.current?.classList.remove(s['large-img'])

          lampGridRef.current?.classList.add(s['small-lamp-grid'])
          lampGridRef.current?.classList.remove(s['large-lamp-grid'])

          WebApp.HapticFeedback.impactOccurred('soft')
        } else if (isUp && scrollY < switchPoint) {
          wrapperRef.current.classList.add(s['down-container'])
          wrapperRef.current.classList.remove(s['up-container'])

          avatarRef.current?.classList.add(s['large-img'])
          avatarRef.current?.classList.remove(s['small-img'])

          lampGridRef.current?.classList.add(s['large-lamp-grid'])
          lampGridRef.current?.classList.remove(s['small-lamp-grid'])

          WebApp.HapticFeedback.impactOccurred('soft')
        } else if (isDown && scrollY > switchPoint) {
          wrapperRef.current.classList.add(s['up-container'])
          wrapperRef.current.classList.remove(s['down-container'])

          avatarRef.current?.classList.add(s['small-img'])
          avatarRef.current?.classList.remove(s['large-img'])

          lampGridRef.current?.classList.add(s['small-lamp-grid'])
          lampGridRef.current?.classList.remove(s['large-lamp-grid'])

          WebApp.HapticFeedback.impactOccurred('soft')
        }
      }

      onScroll()
      document.addEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className={s.overlay}>
      <div
        ref={wrapperRef}
        className={s.wrapper}
      >
        <div className={s.avatar}>
          <LampGrid ref={lampGridRef} />
          <img
            ref={avatarRef}
            className={s.img}
            src={StudyFlowLogo}
            alt="study-flow-logo"
          />
        </div>
        <div className={s.name}>StudyFlow</div>
        <div className={s.description}>@studyFlowwwbot</div>
        <div ref={controlsRef} className={s.controls}>
          {children}
        </div>
      </div>
      <div ref={plugRef} className={s.plug} />
    </div>
  )
})
