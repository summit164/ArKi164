import { memo, useEffect } from 'react'
import { TypeToast } from '@/features/Toaster/model/types'
import { ToastIcon } from '@/features/Toaster/ui/ToastIcon/ToastIcon'
import { ReactComponent as ToastButtonIcon } from '@/shared/assets/images/icons/toastButtonIcon.svg'
import s from './Toast.module.scss'

type TypeToastProps = TypeToast & {
  onRemove: () => void
}

export const Toast = memo(({ message, type, onRemove }: TypeToastProps) => {
  useEffect(() => {
    const id = setTimeout(() => {
      onRemove()
    }, 4000)

    return () => {
      clearInterval(id)
    }
  }, [onRemove])

  return (
    <div className={s.toast}>
      <div className={s.svg}>
        <ToastIcon type={type} />
      </div>
      <div className={s.body}>
        {message}
      </div>
      {
        type !== 'loading'
          ? (
            <button
              className={s.button}
              type="button"
              onClick={() => onRemove()}
            >
              <ToastButtonIcon />
            </button>
          )
          : null
      }
    </div>
  )
})
