import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks'
import { memo, useCallback } from 'react'
import clsx from 'clsx'
import s from './Toaster.module.scss'
import { selectToasts } from '../model/ToasterSelectors'
import { Toast } from './Toast/Toast'
import { removeToast } from '../model/ToasterSlice'

export const Toaster = memo(() => {
  const dispatch = useAppDispatch()
  const toasts = useAppSelector(selectToasts)

  const onRemove = useCallback((id: number) => {
    dispatch(removeToast(id))
  }, [dispatch])

  return (
    <div className={clsx(s.wrapper, s.wrapper_mobile)}>
      {toasts?.map((args) => (
        <Toast
          key={args.id}
          onRemove={() => onRemove(args?.id)}
          {...args}
        />
      ))}
    </div>
  )
})
