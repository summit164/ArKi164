import { forwardRef, memo } from 'react'
import StudyFlowLogo from '@/shared/assets/images/studyFlowLogo.jpg'
import clsx from 'clsx'
import s from './Loader.module.scss'

export const Loader = memo(forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className={clsx(s.wrapper, s.img_animate_appearance)}>
    <img
      className={clsx(s.img, s.img_animate_pulsar)}
      src={StudyFlowLogo}
      alt="study-flow-logo"
    />
  </div>
)))
