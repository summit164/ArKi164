import { memo, useLayoutEffect, useState } from 'react'

type TypeFileImage = {
  className: string
  file: File
}

export const FileImage = memo(({ className, file }: TypeFileImage) => {
  const [url, setUrl] = useState<string>('')

  useLayoutEffect(() => {
    setUrl(URL.createObjectURL(file))

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <img
      className={className}
      src={url}
      alt="Добавленное фото"
    />
  )
})
