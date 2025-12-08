import {
  forwardRef, memo, RefObject, useCallback, useEffect, useRef, useState
} from 'react'
import { ReactComponent as IconConvert } from '@/shared/assets/images/icons/convert.svg'

import WebApp from '@twa-dev/sdk'
import { OrderForm } from '@/features/Order/OrderForm/OrderForm'
import { useAppDispatch } from '@/shared/utils/hooks'
import { useAppearance } from '@/shared/hooks/useAppearance'
import { Notification } from '@/shared/ui/Notification/Notification'
import { ReactComponent as IconLamp } from '@/shared/assets/images/icons/successLamp.svg'
import { ReactComponent as IconFail } from '@/shared/assets/images/icons/orderFail.svg'
import { ReactComponent as IconPen } from '@/shared/assets/images/icons/penIcon.svg'
import s from './Order.module.scss'
import { setDefaultValues, setError } from './model/OrderSlice'
import {
  TAB_FAIL, TAB_FORM, TAB_LOADING, TAB_SUCCESS
} from './model/constants'

export const Order = memo(forwardRef<HTMLDivElement>((_, ref) => {
  const dispatch = useAppDispatch()

  const [tab, setTab] = useState(TAB_FORM)

  const successRef = useRef<HTMLDivElement>(null)
  const failRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)

  const appearance = useAppearance({
    elements: {
      [TAB_FORM]: ref as RefObject<HTMLDivElement | null>,
      [TAB_SUCCESS]: successRef,
      [TAB_FAIL]: failRef,
      [TAB_LOADING]: loadingRef
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

  const replaceTab = useCallback((replacedTab: string) => {
    dispatch(setDefaultValues())
    appearance(replacedTab)
  }, [dispatch, appearance])

  const onSubmit = useCallback(async (args: Record<string, string | File[]>) => {
    try {
      let isErrorFilled = false

      Object.entries(args).forEach(([key, value]) => {
        if (['comment'].includes(key)) { return }

        if (!value) {
          isErrorFilled = true
          dispatch(setError({ key: `${key}Error`, value: 'Обязательное поле' }))
        }
      })

      if (isErrorFilled) { return }

      const formData = new FormData()

      Object.entries(args).forEach(([key, value]) => {
        if (key === 'files') {
          (value as File[]).forEach((file: File, index: number) => formData.append(`file_${index}`, file))
        } else {
          formData.append(key, value as string)
        }
      })

      formData.append('user', `@${WebApp.initDataUnsafe.user?.username as string}`)

      await appearance(TAB_LOADING)

      // ручка для отправки сообщения в чат
      const { status } = await fetch(
        'https://xzbkxthnfksriubmhlfx.supabase.co/functions/v1/send-message-in-telegram-group',
        {
          method: 'POST',
          body: formData
        }
      )

      if (![200, 204]?.includes(status)) { throw new Error() }

      await appearance(TAB_SUCCESS)
      WebApp.HapticFeedback.notificationOccurred('success')
    } catch {
      await appearance(TAB_FAIL)
      WebApp.HapticFeedback.notificationOccurred('error')
    }
  }, [dispatch, appearance])

  useEffect(() => () => {
    dispatch(setDefaultValues())
  }, [dispatch])

  switch (tab) {
  case TAB_FORM: return (
    <div ref={ref} className={s.wrapper}>
      <IconConvert className={s.icon} />
      <div className={s.title}>Новая заявка</div>
      <div className={s.description}>Заполните все необходимые поля - и готово</div>
      <OrderForm onSubmit={onSubmit} />
    </div>
  )
  case TAB_SUCCESS: return (
    <Notification
      Icon={IconLamp}
      title="Успех"
      description="Заявка отправлена хелперам. Ожидайте сообщения"
      ref={successRef}
      onClick={() => replaceTab(TAB_FORM)}
    />
  )
  case TAB_FAIL: return (
    <Notification
      Icon={IconFail}
      title="Неполадки"
      description="Попробуйте отправить заявку позднее"
      ref={failRef}
      buttonText="Назад"
      onClick={() => replaceTab(TAB_FORM)}
    />
  )
  case TAB_LOADING: return (
    <Notification
      key={tab}
      className={s.notification}
      Icon={IconPen}
      title="Загрузка"
      containerClassName={s.notification_container}
      description="Немного подождите. Заявка отправляется"
      ref={loadingRef}
    />
  )
  default: return null
  }
}))
