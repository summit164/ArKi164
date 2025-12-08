/* eslint-disable no-plusplus */
import {
  ForwardedRef,
  useCallback, useEffect, useState
} from 'react'
import WebApp from '@twa-dev/sdk'
import { MINIMAL_HELPER_VISIBLE } from './constants'

type TypeUseGetAnimationProps = {
  pending: boolean
  ref: ForwardedRef<HTMLDivElement>
  dataLength: number
}

export const useGetAnimation = ({
  pending,
  dataLength,
  ref
}: TypeUseGetAnimationProps) => {
  const [initialHeight, setInitialHeight] = useState<number>(0)
  const [currentHeight, setCurrentHeight] = useState<number>(0)

  const handleClick = useCallback(() => {
    const element = (ref as React.RefObject<HTMLDivElement>)?.current

    if (element !== null) {
      const helpers = element.querySelector('[data-helpers]')

      if (!helpers) { return }
      if (currentHeight === helpers.scrollHeight) {
        setCurrentHeight(initialHeight)
      } else {
        setCurrentHeight(helpers.scrollHeight)
      }

      WebApp.HapticFeedback.impactOccurred('light')
    }
  }, [ref, currentHeight, initialHeight])

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (pending) { return }
      const element = (ref as React.RefObject<HTMLDivElement>)?.current

      if (element !== null && dataLength) {
        const children = Array.from(element.querySelectorAll('[data-helper]')) as HTMLDivElement[]
        let height = 0
        for (let i = 0; i < MINIMAL_HELPER_VISIBLE; i++) {
          height += children[i]?.scrollHeight || 0
        }

        setInitialHeight(height)
        setCurrentHeight(height)
      }
    })
  }, [ref, dataLength, pending])

  return {
    currentHeight,
    initialHeight,
    handleClick
  }
}
