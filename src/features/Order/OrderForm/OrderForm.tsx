import { memo, useEffect, useState } from 'react'
import Input from '@/shared/ui/Input/Input'
import Button from '@/shared/ui/Button/Button'
import Textarea from '@/shared/ui/Textarea/Textarea'
import { Files } from '@/shared/ui/Files/Files'
import { FileList } from '@/shared/ui/FileList/FileList'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks'
import { Select } from '@/shared/ui/Select/Select'
import { setVisible } from '@/features/Navbar/model/NavbarSlice'
import s from './OrderForm.module.scss'
import {
  selectOrderUrgency, selectOrderUrgencyError, selectOrderComment, selectOrderCommentError, selectOrderCondition, selectOrderConditionError, selectOrderCourse, selectOrderCourseError, selectOrderDuration, selectOrderDurationError, selectOrderFacult, selectOrderFacultError, selectOrderService, selectOrderServiceError, selectOrderSubject,
  selectOrderSubjectError
} from '../model/OrderSelectors'
import {
  setUrgency, setComment, setCondition, setCourse, setDefaultValues, setDuration, setFacult, setService, setSubject
} from '../model/OrderSlice'
import {
  accept, allowedTypes, durations, facults, ORDER_MAX_FILES
} from '../model/constants'

type TypeOrderFormProps = {
  onSubmit: (args: Record<string, string | File[]>) => void
  wrapperClassName?: string
}

export const OrderForm = memo(({
  onSubmit,
  wrapperClassName
}: TypeOrderFormProps) => {
  const dispatch = useAppDispatch()

  const course = useAppSelector(selectOrderCourse)
  const courseError = useAppSelector(selectOrderCourseError)
  const duration = useAppSelector(selectOrderDuration)
  const durationError = useAppSelector(selectOrderDurationError)
  const subject = useAppSelector(selectOrderSubject)
  const subjectError = useAppSelector(selectOrderSubjectError)
  const service = useAppSelector(selectOrderService)
  const serviceError = useAppSelector(selectOrderServiceError)
  const condition = useAppSelector(selectOrderCondition)
  const conditionError = useAppSelector(selectOrderConditionError)
  const urgency = useAppSelector(selectOrderUrgency)
  const urgencyError = useAppSelector(selectOrderUrgencyError)
  const facult = useAppSelector(selectOrderFacult)
  const facultError = useAppSelector(selectOrderFacultError)
  const comment = useAppSelector(selectOrderComment)
  const commentError = useAppSelector(selectOrderCommentError)

  const [files, setFiles] = useState<File[]>([])

  const changeStateNavbar = (value: boolean) => dispatch(setVisible(value))

  useEffect(() => () => { dispatch(setDefaultValues()) }, [dispatch])

  return (
    <div className={clsx(s.wrapper, wrapperClassName)}>
      <div className={s.container}>
        <Select
          value={facult}
          onClick={(value) => dispatch(setFacult(value?.toString()))}
          onChange={(e) => dispatch(setFacult(e.target.value))}
          options={facults}
          error={facultError}
          placeholder="Факультет"
          withFiltrationOptions
        />
      </div>
      <div className={s.container}>
        <Select
          value={duration}
          onClick={(value) => dispatch(setDuration(value?.toString()))}
          onChange={(e) => dispatch(setDuration(e.target.value))}
          options={durations}
          error={durationError}
          placeholder="Направление/Кафедра"
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
          onBlur={() => changeStateNavbar(false)}
        />
      </div>
      <div className={s.container}>
        <Input
          placeholder="Предмет"
          onChange={(e) => dispatch(setSubject(e.target.value))}
          value={subject}
          error={subjectError}
        />
      </div>
      <div className={s.container}>
        <Textarea
          placeholder="Услуга (подготовиться к работе, решить задачу и т.п.)"
          onChange={(e) => dispatch(setService(e.target.value))}
          value={service}
          error={serviceError}
        />
      </div>
      <div className={s.container}>
        <Textarea
          placeholder="Условие задачи (нужная тема и т.п.)"
          onChange={(e) => dispatch(setCondition(e.target.value))}
          value={condition}
          error={conditionError}
        />
      </div>
      <div className={clsx(s.container, s.files_wrapper)}>
        <FileList
          files={files}
          count={ORDER_MAX_FILES}
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
          maxFilesLength={ORDER_MAX_FILES}
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
      <div className={s.container}>
        <Input
          placeholder="Срок задачи, дата или период"
          onChange={(e) => dispatch(setUrgency(e.target.value))}
          value={urgency}
          error={urgencyError}
        />
      </div>
      <div className={s.container}>
        <Textarea
          placeholder="Комментарий"
          onChange={(e) => dispatch(setComment(e.target.value))}
          value={comment}
          error={commentError}
        />
      </div>
      <Button
        onClick={() => onSubmit({
          facult,
          course,
          duration,
          subject,
          service,
          condition,
          urgency,
          comment,
          files
        })}
        mode="first"
      >
        Отправить
      </Button>
    </div>
  )
})
