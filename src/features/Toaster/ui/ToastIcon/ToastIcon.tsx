import { memo } from 'react'
import { TypeToast } from '@/features/Toaster/model/types'
import { ReactComponent as ToastGreenIcon } from '@/shared/assets/images/icons/toastGreenIcon.svg'
import { ReactComponent as ToastYellowIcon } from '@/shared/assets/images/icons/toastYellowIcon.svg'
import { ReactComponent as ToastRedIcon } from '@/shared/assets/images/icons/toastRedIcon.svg'
import { ReactComponent as ToastLoadingIcon } from '@/shared/assets/images/icons/toastLoadingIcon.svg'

type TypeToastIconProps = Pick<TypeToast, 'type'>

export const ToastIcon = memo(({ type }: TypeToastIconProps) => {
  switch (type) {
  case 'green': return <ToastGreenIcon />
  case 'yellow': return <ToastYellowIcon />
  case 'red': return <ToastRedIcon />
  case 'loading': return <ToastLoadingIcon />
  default: return null
  }
})
