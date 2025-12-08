import { memo } from 'react'
import clsx from 'clsx'
import s from './FileList.module.scss'
import { FileImage } from './FileImage/FileImage'

type TypeFileListProps = {
  files: File[]
  count: number
  onDelete: (file: File) => void
  containerClassName?: string
  wrapperClassName?: string
}

export const FileList = memo(({
  count, files, onDelete, containerClassName, wrapperClassName
}: TypeFileListProps) => {
  const difference = count - files.length

  return (
    <div className={clsx(s.wrapper, wrapperClassName)}>
      {files?.map((file) => (
        <div
          className={s.block}
          key={file.name + file.type}
        >
          <div
            key={file.name + file.type}
            className={clsx(s.container, containerClassName)}
          >
            {
              file.type.includes('image')
                ? <FileImage file={file} className={s.img} />
                : file.name
            }
          </div>
          <button
            onClick={() => onDelete(file)}
            type="button"
            className={s.icon_container}
          >
            <svg className={s.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22.7914 3.62571C23.4589 2.95824 23.4589 1.87605 22.7914 1.20857C22.124 0.541096 21.0418 0.541096 20.3743 1.20857L12 9.58286L3.62571 1.20857C2.95824 0.541095 1.87605 0.541096 1.20857 1.20857C0.541096 1.87605 0.541096 2.95824 1.20857 3.62571L9.58286 12L1.20857 20.3743C0.541095 21.0418 0.541096 22.124 1.20857 22.7914C1.87605 23.4589 2.95824 23.4589 3.62571 22.7914L12 14.4171L20.3743 22.7914C21.0418 23.4589 22.124 23.4589 22.7914 22.7914C23.4589 22.124 23.4589 21.0418 22.7914 20.3743L14.4171 12L22.7914 3.62571Z" fill="white" />
            </svg>
          </button>
        </div>
      ))}
      {Array.from({ length: difference }).map(() => (<div className={clsx(s.container, containerClassName)} />))}
    </div>
  )
})
