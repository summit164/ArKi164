/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from 'react'

export type TypeOption = {
  label: string
  value: string | number
}

export type TypeSelectProps = {
  options: TypeOption[]
  onChange: (val: ChangeEvent<HTMLInputElement>) => void
  onClick: (val: string | number) => void
  value: string
  placeholder?: string
  error?: string | boolean
  className?: string
  listClassName?: string
  onFocus?: (val: any) => void
  onBlur?: (val: any) => void
  withFiltrationOptions?: boolean
}
