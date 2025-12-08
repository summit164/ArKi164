/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch, RefObject, SetStateAction, useRef
} from 'react'

type TypeUseAppearanceProps = {
  elements: Record<string, RefObject<HTMLDivElement | null>>,
  state: string | number,
  setState: Dispatch<SetStateAction<any>>
  onAfterSetState?: () => void
}

export const useAppearance = ({
  elements,
  state,
  setState,
  onAfterSetState
}: TypeUseAppearanceProps) => {
  const currentStateRef = useRef(state)

  return (newState: any) => new Promise((resolve) => {
    if (newState !== currentStateRef.current) {
      const ref = elements?.[currentStateRef.current]
      if (ref.current !== null) {
        ref.current.addEventListener('transitionend', () => {
          if (currentStateRef.current) {
            currentStateRef.current = newState
            setState(newState)
            onAfterSetState?.()
            setTimeout(() => {
              requestAnimationFrame(() => {
                resolve(undefined)
              })
            }, 0)
          }
        }, { once: true })
        ref.current.style.transition = 'opacity .3s'
        requestAnimationFrame(() => {
          if (ref.current !== null) {
            ref.current.style.opacity = '0'
          }
        })
      }
    } else { resolve(undefined) }
  })
}
