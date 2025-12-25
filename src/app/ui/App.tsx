import {
  memo, useEffect, useRef, useState
} from 'react'
import { AppRouter } from '@/providers/AppRouter'
import { Toaster } from '@/features/Toaster/ui/Toaster'
import '../styles/fonts.scss'
import '../styles/index.scss'
import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks'
import { selectPending } from '@/model/global/GlobalSelectors'
import { setPending } from '@/model/global/GlobalSlice'
import { Loader } from '@/features/Loader/Loader'
import sLoader from '@/features/Loader/Loader.module.scss'

export const App = memo(() => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const pending = useAppSelector(selectPending)
  const [renderApp, setRenderApp] = useState(false)

  useEffect(() => {
    throw new Error('privet')
    const onAnimationEnd = (e: AnimationEvent) => {
      const { animationName } = e
      if (animationName?.toLowerCase()?.includes('disappearance') && ref.current) {
        ref.current.removeEventListener('animationend', onAnimationEnd)
        dispatch(setPending(false))
      }
    }

    document.fonts.ready.then(() => {
      setRenderApp(true)
      setTimeout(() => {
        if (!ref?.current) { return }
        ref.current.addEventListener('animationend', onAnimationEnd)
        ref.current.classList.add(sLoader.img_animate_disappearance)
      }, 0)
    }, () => {
      dispatch(setPending(false))
      setRenderApp(true)
    })
  }, [dispatch])

  return (
    <>
      {pending && <Loader ref={ref} />}
      {renderApp && (
        <>
          <AppRouter />
          <Toaster />
        </>
      )}
    </>
  )
})
