import {
  memo, useCallback, useEffect, useRef, useState
} from 'react'
import { ReactComponent as IconConvert } from '@/shared/assets/images/icons/convert.svg'
import { useAppearance } from '@/shared/hooks/useAppearance'
import { useAppDispatch } from '@/shared/utils/hooks'
import { ReactComponent as IconSuccess } from '@/shared/assets/images/icons/helperSuccess.svg'
import { ReactComponent as IconPen } from '@/shared/assets/images/icons/penIcon.svg'
import { Notification } from '@/shared/ui/Notification/Notification'
import { ReactComponent as IconFail } from '@/shared/assets/images/icons/orderFail.svg'
import WebApp from '@twa-dev/sdk'
import { getSupabaseFunctionUrl, getTelegramInitDataHeader } from '@/shared/utils/supabaseFunctions'
import s from './Helper.module.scss'
import { HelperForm } from './HelperForm/HelperForm'
import {
  TAB_FAIL, TAB_FORM, TAB_LOADING, TAB_SUCCESS
} from './model/constants'
import { setDefaultValues, setError } from './model/HelperSlice'

export const Helper = memo(() => {
  const dispatch = useAppDispatch()

  const [tab, setTab] = useState(TAB_FORM)

  const formRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const failRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)

  const appearance = useAppearance({
    elements: {
      [TAB_FORM]: formRef,
      [TAB_SUCCESS]: successRef,
      [TAB_FAIL]: failRef,
      [TAB_LOADING]: loadingRef
    },
    state: tab,
    setState: setTab
  })

  const replaceTab = useCallback((replacedTab: string) => {
    dispatch(setDefaultValues())
    appearance(replacedTab)
  }, [dispatch, appearance])

  const onSubmit = useCallback(async (args: Record<string, string | boolean | File[]>) => {
    try {
      let isErrorFilled = false

      Object.entries(args).forEach(([key, value]) => {
        if (!value || (key === 'files' && Array.isArray(value) && value?.length !== 2)) {
          isErrorFilled = true
          dispatch(setError({ key: `${key}Error`, value: 'Обязательное поле' }))
        }
      })

      if (isErrorFilled) { return }

      const formData = new FormData()

      Object.entries(args).forEach(([key, value]) => {
        if (key === 'files') {
          (value as File[]).forEach((file) => formData.append('file', file))
        } else {
          formData.append(key, value as string)
        }
      })

      formData.append('tgName', `@${WebApp.initDataUnsafe.user?.username as string}`)
      formData.append('tgPhoto', WebApp.initDataUnsafe.user?.photo_url as string)

      await appearance(TAB_LOADING)

      const { status } = await fetch(getSupabaseFunctionUrl('add-helper'), {
        method: 'POST',
        headers: {
          ...getTelegramInitDataHeader()
        },
        body: formData
      })

      if (![200, 204]?.includes(status)) { throw new Error() }

      await appearance(TAB_SUCCESS)
      WebApp.HapticFeedback.notificationOccurred('success')
    } catch {
      appearance(TAB_FAIL)
      WebApp.HapticFeedback.notificationOccurred('error')
    }
  }, [dispatch, appearance])

  useEffect(() => () => {
    dispatch(setDefaultValues())
  }, [dispatch])

  switch (tab) {
  case TAB_FORM: return (
    <div
      key={tab}
      className={s.wrapper}
      ref={formRef}
    >
      <IconConvert className={s.icon} />
      <div className={s.title}>Стать Хелпером</div>
      <div className={s.description}>Заполните информацию о себе, и мы с вами свяжемся</div>
      <HelperForm onSubmit={onSubmit} />
    </div>
  )
  case TAB_SUCCESS: return (
    <Notification
      key={tab}
      className={s.notification}
      Icon={IconSuccess}
      title="Успех"
      containerClassName={s.notification_container}
      description="Заявка отправлена. Ожидайте сообщения"
      ref={successRef}
      onClick={() => replaceTab(TAB_FORM)}
    />
  )
  case TAB_FAIL: return (
    <Notification
      key={tab}
      className={s.notification}
      Icon={IconFail}
      title="Неполадки"
      containerClassName={s.notification_container}
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
})
