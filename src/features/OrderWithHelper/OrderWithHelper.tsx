import {
  memo, useCallback, useEffect, useRef, useState
} from 'react'
import { ROUTES_PATHS } from '@/providers/AppRouter/routes'
import { useRedirect } from '@/shared/hooks/useRedirect'
import { ReactComponent as IconConvert } from '@/shared/assets/images/icons/convert.svg'
import { OrderForm } from '@/features/Order/OrderForm/OrderForm'
import WebApp from '@twa-dev/sdk'
import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks'
import { Notification } from '@/shared/ui/Notification/Notification'
import { ReactComponent as IconLamp } from '@/shared/assets/images/icons/successLamp.svg'
import { ReactComponent as IconPen } from '@/shared/assets/images/icons/penIcon.svg'
import { useAppearance } from '@/shared/hooks/useAppearance'
import { ReactComponent as IconFail } from '@/shared/assets/images/icons/orderFail.svg'
import { ReactComponent as IconHelperAvatar } from '@/shared/assets/images/icons/helper-avatar.svg'
import s from './OrderWithHelper.module.scss'
import { setError } from '../Order/model/OrderSlice'
import {
  selectOrderWithHelperChoiceHelperMainSubjects, selectOrderWithHelperChoiceHelperName, selectOrderWithHelperChoiceHelperSecondName, selectOrderWithHelperChoiceHelperId, selectOrderWithHelperChoiceHelperTgPhoto,
  selectOrderWithHelperChoiceHelperFacult,
  selectOrderWithHelperChoiceHelperCourse
} from './model/OrderWithHelperSelectors'
import { setDefaultValues } from './model/OrderWithHelperSlice'
import {
  TAB_FAIL, TAB_FORM, TAB_LOADING, TAB_NO_USERNAME, TAB_SUCCESS
} from './model/constatns'
import { OrderHelper } from './OrderHelper/OrderHelper'

export const OrderWithHelper = memo(() => {
  const dispatch = useAppDispatch()
  const redirect = useRedirect()

  const [tab, setTab] = useState(TAB_FORM)

  const formRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const failRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)
  const noUsernameRef = useRef<HTMLDivElement>(null)

  // FIXME сохранить айдишник хелпера и из списка хелперов тянуть данные о нем
  const choiceHelperName = useAppSelector(selectOrderWithHelperChoiceHelperName)
  const choiceHelperSecondName = useAppSelector(selectOrderWithHelperChoiceHelperSecondName)
  const choiceHelperId = useAppSelector(selectOrderWithHelperChoiceHelperId)
  const choiceHelperTgPhoto = useAppSelector(selectOrderWithHelperChoiceHelperTgPhoto)
  const choiceHelperMainSubjects = useAppSelector(selectOrderWithHelperChoiceHelperMainSubjects)
  const choiceHelperMainFacult = useAppSelector(selectOrderWithHelperChoiceHelperFacult)
  const choiceHelperMainCourse = useAppSelector(selectOrderWithHelperChoiceHelperCourse)

  const appearance = useAppearance({
    elements: {
      [TAB_FORM]: formRef,
      [TAB_SUCCESS]: successRef,
      [TAB_FAIL]: failRef,
      [TAB_LOADING]: loadingRef,
      [TAB_NO_USERNAME]: noUsernameRef
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

  const onSubmit = useCallback(async (args: Record<string, string | File[]>) => {
    try {
      const username = WebApp.initDataUnsafe.user?.username

      if (!username) {
        await appearance(TAB_NO_USERNAME)

        return
      }

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

      formData.append('userTgName', WebApp.initDataUnsafe.user?.username || '')
      formData.append('id', choiceHelperId)

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
  }, [appearance, choiceHelperId, dispatch])

  useEffect(() => () => {
    dispatch(setDefaultValues())
  }, [dispatch])

  useEffect(() => {
    if (!(choiceHelperName && choiceHelperSecondName && choiceHelperId && choiceHelperMainSubjects)) {
      redirect(ROUTES_PATHS.MAIN)
    }
  }, [redirect, choiceHelperName, choiceHelperSecondName, choiceHelperId, choiceHelperTgPhoto, choiceHelperMainSubjects])

  useEffect(() => {
    const handler = () => {
      redirect(ROUTES_PATHS.MAIN)
      WebApp.BackButton?.hide()
    }

    WebApp.BackButton?.onClick(handler)
    WebApp.BackButton?.show()

    return () => { WebApp.BackButton?.offClick(handler) }
  }, [redirect])

  switch (tab) {
  case TAB_FORM: return (
    <div
      className={s.wrapper}
      ref={formRef}
    >
      <IconConvert className={s.icon} />
      <div className={s.title}>Заявка Хелперу</div>
      <div className={s.description}>Заполните все поля - и заявка будет отправлена выбранному Хелперу</div>
      <OrderHelper
        Img={choiceHelperTgPhoto || IconHelperAvatar}
        title={`${choiceHelperName} ${choiceHelperSecondName}`}
        description={choiceHelperMainSubjects}
        facult={choiceHelperMainFacult}
        course={choiceHelperMainCourse}
      />
      <OrderForm onSubmit={onSubmit} />
    </div>
  )
  case TAB_SUCCESS: return (
    <Notification
      Icon={IconLamp}
      title="Успех"
      description="Заявка отправлена хелперу. Ожидайте сообщения"
      ref={successRef}
      className={s.notification}
      containerClassName={s.notification_container}
      onClick={() => redirect(ROUTES_PATHS.MAIN)}
    />
  )
  case TAB_FAIL: return (
    <Notification
      Icon={IconFail}
      title="Неполадки"
      className={s.notification}
      containerClassName={s.notification_container}
      description="Попробуйте отправить заявку позднее"
      ref={failRef}
      buttonText="Назад"
      onClick={() => appearance(TAB_FORM)}
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
  case TAB_NO_USERNAME: return (
    <Notification
      Icon={IconFail}
      title="Нет юзернейма"
      className={s.notification}
      containerClassName={s.notification_container}
      description="У вас не указан Telegram username (@username). Пожалуйста, добавьте его в настройках Telegram."
      ref={noUsernameRef}
      buttonText="Назад"
      onClick={() => appearance(TAB_FORM)}
    />
  )
  default: return null
  }
})
