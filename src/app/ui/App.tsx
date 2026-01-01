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
import { useIdentify } from '@/shared/hooks/useIdentify/useIdentify'

export const App = memo(() => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const pending = useAppSelector(selectPending)
  const [renderApp, setRenderApp] = useState(false)

  useIdentify()

  useEffect(() => {
    const onAnimationEnd = (e: AnimationEvent) => {
      const { animationName } = e
      if (animationName?.toLowerCase()?.includes('disappearance') && ref.current) {
        ref.current.removeEventListener('animationend', onAnimationEnd)
        dispatch(setPending(false))
      }
    }

    // Fallback timeout to ensure app renders even if fonts fail
    const fallbackTimeout = setTimeout(() => {
      dispatch(setPending(false))
      setRenderApp(true)
    }, 3000)

    document.fonts.ready.then(() => {
      clearTimeout(fallbackTimeout)
      setRenderApp(true)
      setTimeout(() => {
        if (!ref?.current) {
          dispatch(setPending(false))

          return
        }
        ref.current.addEventListener('animationend', onAnimationEnd)
        ref.current.classList.add(sLoader.img_animate_disappearance)
      }, 0)
    }, () => {
      clearTimeout(fallbackTimeout)
      dispatch(setPending(false))
      setRenderApp(true)
    })

    return () => {
      clearTimeout(fallbackTimeout)
    }
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
