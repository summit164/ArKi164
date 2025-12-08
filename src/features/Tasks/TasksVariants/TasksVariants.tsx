import {
  memo, useCallback, useEffect, useRef
} from 'react'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks'
import WebApp from '@twa-dev/sdk'
import s from './TasksVariants.module.scss'
import { selectTasksTab } from '../model/TasksSelectors'
import { TAB_TASKS } from '../model/constants'
import { setTab } from '../model/TasksSlice'

export const TasksVariants = memo(() => {
  const dispatch = useAppDispatch()

  const tab = useAppSelector(selectTasksTab)

  const firstTab = useRef<HTMLButtonElement>(null)
  const secondTab = useRef<HTMLButtonElement>(null)
  const shadowTab = useRef<HTMLDivElement>(null)

  const changeTab = useCallback((tab: TAB_TASKS) => {
    dispatch(setTab(tab))
    WebApp.HapticFeedback.impactOccurred('light')
  }, [dispatch])

  useEffect(() => {
    const tabs = {
      [TAB_TASKS.USERS]: firstTab,
      [TAB_TASKS.HELPERS]: secondTab
    }

    const activeTab = tabs[tab]

    if (!shadowTab.current || !firstTab.current || activeTab === null) { return }

    shadowTab.current.style.left = `${tabs[tab]?.current?.offsetLeft}px`
    shadowTab.current.style.width = `${tabs[tab]?.current?.offsetWidth}px`
    shadowTab.current.style.height = `${tabs[tab]?.current?.offsetHeight}px`
  }, [tab])

  return (
    <div className={s.wrapper}>
      <button
        ref={firstTab}
        type="button"
        onClick={() => changeTab(TAB_TASKS.USERS)}
        className={clsx(s.button, tab === TAB_TASKS.USERS && s.button_active)}
      >
        <p className={s.text}>Для Студентов</p>
      </button>
      <button
        ref={secondTab}
        type="button"
        onClick={() => changeTab(TAB_TASKS.HELPERS)}
        className={clsx(s.button, tab === TAB_TASKS.HELPERS && s.button_active)}
      >
        <p className={s.text}>Для Хелперов</p>
      </button>
      <div
        className={s.shadow}
        ref={shadowTab}
      />
    </div>
  )
})
