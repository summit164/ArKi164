/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  memo, useCallback, useEffect, useMemo, useRef, useState
} from 'react'
import clsx from 'clsx'
import s from './Select.module.scss'
import Input from '../Input/Input'
import { TypeOption, TypeSelectProps } from './model/types'

export const Select = memo(({
  value,
  onClick,
  onChange,
  options,
  className,
  listClassName,
  placeholder,
  error,
  withFiltrationOptions
}: TypeSelectProps) => {
  const [open, setOpen] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const filteredOptions = useMemo(() => {
    if (!withFiltrationOptions) { return options }

    return options?.filter(({ value: optionValue }) => optionValue?.toString()?.startsWith(value) || optionValue?.toString()?.includes(value))
  }, [options, value, withFiltrationOptions])

  const focusHandler = useCallback(() => {
    setOpen(true)
  }, [])

  const disappearanceList = useCallback(() => {
    listRef.current?.addEventListener('animationend', () => {
      setOpen(false)
      listRef.current?.classList?.remove(s.animation_disappearance)
    })

    listRef.current?.classList?.add(s.animation_disappearance)
  }, [])

  const clickItemHanlder = useCallback((value: string | number) => {
    if (!listRef.current) { return }

    onClick(value)
    disappearanceList()
  }, [disappearanceList, onClick])

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const element = e.target as Element
      if (wrapperRef.current && wrapperRef.current.contains(element)) { return }
      disappearanceList()
    }

    window.addEventListener('click', close)

    return () => {
      window.removeEventListener('click', close)
    }
  }, [disappearanceList])

  return (
    <div
      className={clsx(s.wrapper, className)}
      ref={wrapperRef}
    >
      <Input
        value={value}
        onFocus={focusHandler}
        onChange={onChange}
        error={error}
        placeholder={placeholder}
      />
      {open && !!filteredOptions?.length && (
        <div
          className={clsx(s.list, listClassName)}
          ref={listRef}
        >
          {filteredOptions?.map(({ label, value }: TypeOption) => (
            <div
              key={value}
              onClick={() => clickItemHanlder(value)}
              className={s.item}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
})
