/* eslint-disable camelcase */
import {
  forwardRef, memo, useCallback, useEffect
} from 'react'
import clsx from 'clsx'
import { ReactComponent as IconLightning } from '@/shared/assets/images/icons/lightning.svg'
import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks'
import { useRedirect } from '@/shared/hooks/useRedirect'
import { setChoiceHelperTransfer } from '@/features/OrderWithHelper/model/OrderWithHelperSlice'
import { ROUTES_PATHS } from '@/providers/AppRouter/routes'
import { EmptyBlock } from '@/features/EmptyBlock/EmptyBlock'
import s from './Helpers.module.scss'
import { Helper } from '../Helper/Helper'
import { MINIMAL_HELPER_VISIBLE } from './model/constants'
import { useGetAnimation } from './model/useGetAnimation'
import { fetchGetHelpersAsyncThunk } from '../model/MainAsyncThunk'
import { selectMainHelpers, selectMainHelpersHasBeenLoaded, selectMainPending } from '../model/MainSelectors'
import { HelpersLoader } from './HelpersLoader/HelpersLoader'
import { TypeHelperTransfer } from './model/types'
import { TypeHelper } from '../model/types'

export const Helpers = memo(forwardRef<HTMLDivElement>((props, ref) => {
  const dispatch = useAppDispatch()
  const redirect = useRedirect()

  const helpers = useAppSelector(selectMainHelpers)
  const pending = useAppSelector(selectMainPending)
  const helpersHasBeenLoaded = useAppSelector(selectMainHelpersHasBeenLoaded)

  const handleHelperClick = useCallback((args: TypeHelperTransfer) => {
    redirect(ROUTES_PATHS.ORDER_WITH_HELPER)
    dispatch(setChoiceHelperTransfer(args))
  }, [dispatch, redirect])

  const loading = useCallback(async () => {
    if (helpersHasBeenLoaded) { return }
    await dispatch(fetchGetHelpersAsyncThunk())
  }, [helpersHasBeenLoaded, dispatch])

  const {
    currentHeight,
    initialHeight,
    handleClick
  } = useGetAnimation({ pending, ref, dataLength: helpers?.length })

  useEffect(() => {
    loading()
  }, [loading])

  if (pending) { return (<HelpersLoader />) }

  return (
    <div
      ref={ref}
      className={clsx(s.wrapper, !helpers?.length && s.wrapper_empty)}
    >
      {
        helpers?.length
          ? (
            <>
              <div
                className={s.list}
                style={{ height: `${currentHeight}px` }}
                data-helpers
              >
                {helpers?.map(({
                  tgPhoto, id, name, second_name, main_subjects
                }: TypeHelper) => (
                  <Helper
                    key={id + name + second_name}
                    onClick={() => handleHelperClick({
                      id, tgPhoto, name, second_name, main_subjects
                    })}
                    tgPhoto={tgPhoto}
                    name={name}
                    secondName={second_name}
                    mainSubjects={main_subjects}
                    data-helper
                  />
                ))}
              </div>
              {!!initialHeight && MINIMAL_HELPER_VISIBLE < helpers?.length && (
                <button
                  type="button"
                  className={s.more}
                  onClick={handleClick}
                >
                  <IconLightning className={s.img} />
                  <div className={s.container}>
                    Другие хелперы
                    <svg className={clsx(s.icon, currentHeight !== initialHeight && s.icon_active)} xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                      <path d="M23.25 6L12.3396 16.6506C12.142 16.8436 11.8253 16.8397 11.6324 16.642L1.25 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </button>
              )}
            </>
          )
          : (
            <EmptyBlock
              title="Хелперы отсутствуют"
              description="В скором времени список хелперов будет расширен"
            />
          )
      }
    </div>
  )
}))
