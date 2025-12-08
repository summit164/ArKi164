/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable no-plusplus */
import { memo, useRef } from 'react'
import clsx from 'clsx'
import s from './Files.module.scss'
import Button from '../Button/Button'

type TypeFilesProps = {
  mode?: string
  filesLength: number
  maxFilesLength: number
  maxFileSize: number
  accept: string
  allowedTypes: string[]
  onChange: (files: File[]) => void
  buttonClassName?: string
  wrapperClassName?: string
}

export const Files = memo(({
  mode, filesLength, maxFilesLength, allowedTypes, accept, maxFileSize, onChange, buttonClassName, wrapperClassName
}: TypeFilesProps) => {
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <div className={clsx(s.wrapper, wrapperClassName)}>
      <input
        onChange={(e) => {
          const selectedFiles = e.target.files
          if (selectedFiles) {
            if (selectedFiles.length + filesLength > maxFilesLength) {
              alert('Превышено допустимое количество')

              return
            }

            for (let i = 0; i < selectedFiles.length; i++) {
              if (!allowedTypes.includes(selectedFiles[i].type)) {
                alert('Фотография/ии не подходят по расширению')

                return
              }
              if (selectedFiles[i].size > maxFileSize) {
                alert('Фотография/ии не подходят по размеру')

                return
              }
            }

            console.log(e.target.files)
            const files = [...Array.from(e.target.files || [])]
            onChange?.(files)
            e.target.value = ''
          }
        }}
        accept={accept}
        type="file"
        multiple
        className={s.input}
        ref={fileRef}
      />
      <Button
        onClick={() => fileRef.current?.click()}
        mode={mode}
        className={buttonClassName}
      >
        <span className={s.text}>Добавить файл</span>
        <svg className={s.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 24C11.3373 24 10.8 23.4627 10.8 22.8L10.8 13.2L1.2 13.2C0.537258 13.2 0 12.6627 0 12C0 11.3373 0.537258 10.8 1.2 10.8L10.8 10.8L10.8 1.2C10.8 0.537258 11.3373 0 12 0C12.6627 0 13.2 0.537258 13.2 1.2L13.2 10.8L22.8 10.8C23.4627 10.8 24 11.3373 24 12C24 12.6627 23.4627 13.2 22.8 13.2L13.2 13.2L13.2 22.8C13.2 23.4627 12.6627 24 12 24Z" fill="white" />
        </svg>
      </Button>
    </div>
  )
})
