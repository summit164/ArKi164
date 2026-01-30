import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks'
import {
  memo, useCallback, useEffect, useMemo, useState
} from 'react'
import Input from '@/shared/ui/Input/Input'
import Button from '@/shared/ui/Button/Button'
import clsx from 'clsx'
import { FileList } from '@/shared/ui/FileList/FileList'
import { Files } from '@/shared/ui/Files/Files'
import { Error } from '@/shared/ui/Error/Error'
import {
  accept, allowedTypes, durations, facults
} from '@/features/Order/model/constants'
import { Select } from '@/shared/ui/Select/Select'
import { setVisible } from '@/features/Navbar/model/NavbarSlice'
import { TypeOption } from '@/shared/ui/Select/model/types'
import s from './HelperForm.module.scss'
import {
  selectHelperCourse,
  selectHelperCourseError,
  selectHelperDirection, selectHelperDirectionError, selectHelperFacult, selectHelperFacultError, selectHelperFilesError, selectHelperMainSubjects, selectHelperMainSubjectsError, selectHelperName, selectHelperNameError, selectHelperSecondName,
  selectHelperSecondNameError
} from '../model/HelperSelectors'
import {
  setCourse,
  setDirection, setFacult, setMainSubjects, setName, setSecondName
} from '../model/HelperSlice'
import { HELPER_MAX_FILES } from '../model/constants'

type TypeHelperFormProps = {
  onSubmit: (args: Record<string, string | boolean | File[]>) => void
}

export const HelperForm = memo(({
  onSubmit
}: TypeHelperFormProps) => {
  const dispatch = useAppDispatch()

  const name = useAppSelector(selectHelperName)
  const nameError = useAppSelector(selectHelperNameError)
  const secondName = useAppSelector(selectHelperSecondName)
  const secondNameError = useAppSelector(selectHelperSecondNameError)
  const facult = useAppSelector(selectHelperFacult)
  const facultError = useAppSelector(selectHelperFacultError)
  const direction = useAppSelector(selectHelperDirection)
  const directionError = useAppSelector(selectHelperDirectionError)
  const mainSubjects = useAppSelector(selectHelperMainSubjects)
  const mainSubjectsError = useAppSelector(selectHelperMainSubjectsError)
  const filesError = useAppSelector(selectHelperFilesError)
  const course = useAppSelector(selectHelperCourse)
  const courseError = useAppSelector(selectHelperCourseError)

  const [files, setFiles] = useState<File[]>([])

  const filteredDurations = useMemo(() => {
    const findedDurations = durations?.find((duration) => duration?.name === facult)?.value
    const allDurations = durations?.reduce((acc: TypeOption[], duration) => [...acc, ...duration.value], [])

    return findedDurations || allDurations
  }, [facult])

  const changeStateNavbar = useCallback((value: boolean) => dispatch(setVisible(value)), [dispatch])

  useEffect(() => {
    changeStateNavbar(true)
  }, [changeStateNavbar])

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Input
          placeholder="Имя"
          onChange={(e) => dispatch(setName(e.target.value))}
          value={name}
          error={nameError}
          onFocus={() => changeStateNavbar(false)}
          onBlur={() => changeStateNavbar(true)}
        />
      </div>
      <div className={s.container}>
        <Input
          className={s.input}
          placeholder="Фамилия"
          onChange={(e) => dispatch(setSecondName(e.target.value))}
          value={secondName}
          error={secondNameError}
          onFocus={() => changeStateNavbar(false)}
          onBlur={() => changeStateNavbar(true)}
        />
      </div>
      <div className={s.container}>
        <Select
          value={facult}
          onClick={(value) => dispatch(setFacult(value?.toString()))}
          onChange={(e) => {
            dispatch(setFacult(e.target.value))
            if (e.target.value === '') {
              dispatch(setDirection(''))
            }
          }}
          options={facults}
          error={facultError}
          placeholder="Факультет"
          onFocus={() => changeStateNavbar(false)}
          onBlur={() => changeStateNavbar(true)}
          withFiltrationOptions
        />
      </div>
      <div className={s.container}>
        <Select
          value={direction}
          onClick={(value) => dispatch(setDirection(value?.toString()))}
          onChange={(e) => dispatch(setDirection(e.target.value))}
          options={filteredDurations}
          error={directionError}
          placeholder="Направление/Кафедра"
          onFocus={() => changeStateNavbar(false)}
          onBlur={() => changeStateNavbar(true)}
          withFiltrationOptions
        />
      </div>
      <div className={s.container}>
        <Input
          inputMode="numeric"
          placeholder="Курс"
          onChange={(e) => dispatch(setCourse(e.target.value))}
          value={course}
          error={courseError}
          onFocus={() => changeStateNavbar(false)}
          onBlur={() => changeStateNavbar(true)}
        />
      </div>
      <div className={s.container}>
        <Input
          placeholder="Основные предметы (топ 3)"
          onChange={(e) => dispatch(setMainSubjects(e.target.value))}
          value={mainSubjects}
          error={mainSubjectsError}
          onFocus={() => changeStateNavbar(false)}
          onBlur={() => changeStateNavbar(true)}
        />
      </div>
      <div className={s.container}>
        <div className={s.heading}>Фото зачетки (последние две сессии)</div>
        <div className={clsx(s.container, s.files_wrapper)}>
          <FileList
            files={files}
            count={HELPER_MAX_FILES}
            onDelete={(deletedFile: File) => {
              const filteredFiles = files.filter((file) => !(file.name === deletedFile.name && file.type === deletedFile.type))
              setFiles([...filteredFiles])
            }}
            containerClassName={s.files_container}
            wrapperClassName={s.files_list}
          />
          <Files
            mode="first"
            filesLength={files?.length}
            maxFilesLength={HELPER_MAX_FILES}
            maxFileSize={50 * 1024 * 1024}
            accept={accept}
            allowedTypes={allowedTypes}
            onChange={(selectFiles: File[]) => {
              setFiles([...files, ...selectFiles])
            }}
            buttonClassName={s.files_button}
            wrapperClassName={s.files}
          />
        </div>
        {filesError && <Error error={filesError} />}
      </div>
      <Button
        onClick={() => onSubmit({
          name,
          course,
          secondName,
          facult,
          direction,
          mainSubjects,
          files
        })}
        mode="first"
      >
        Отправить
      </Button>
    </div>
  )
})
