import { memo, useEffect, useState } from 'react'
import Input from '@/shared/ui/Input/Input'
import Button from '@/shared/ui/Button/Button'
import Textarea from '@/shared/ui/Textarea/Textarea'
import { Files } from '@/shared/ui/Files/Files'
import { FileList } from '@/shared/ui/FileList/FileList'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks'
import s from './OrderForm.module.scss'
import {
  selectOrderAmount, selectOrderAmountError, selectOrderComment, selectOrderCommentError, selectOrderCondition, selectOrderConditionError, selectOrderCourse, selectOrderCourseError, selectOrderDuration, selectOrderDurationError, selectOrderFacult, selectOrderFacultError, selectOrderService, selectOrderServiceError, selectOrderSubject,
  selectOrderSubjectError
} from '../model/OrderSelectors'
import {
  setAmount, setComment, setCondition, setCourse, setDefaultValues, setDuration, setFacult, setService, setSubject
} from '../model/OrderSlice'
import { accept, allowedTypes, ORDER_MAX_FILES } from '../model/constants'

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
  const amount = useAppSelector(selectOrderAmount)
  const amountError = useAppSelector(selectOrderAmountError)
  const facult = useAppSelector(selectOrderFacult)
  const facultError = useAppSelector(selectOrderFacultError)
  const comment = useAppSelector(selectOrderComment)
  const commentError = useAppSelector(selectOrderCommentError)

  const [files, setFiles] = useState<File[]>([])

  useEffect(() => () => { dispatch(setDefaultValues()) }, [dispatch])

  return (
    <div className={clsx(s.wrapper, wrapperClassName)}>
      <div className={s.container}>
        <Input
          placeholder="Факультет"
          onChange={(e) => dispatch(setFacult(e.target.value))}
          value={facult}
          error={facultError}
        />
      </div>
      <div className={s.container}>
        <Input
          placeholder="Направление/Кафедра"
          onChange={(e) => dispatch(setDuration(e.target.value))}
          value={duration}
          error={durationError}
        />
      </div>
      <div className={s.container}>
        <Input
          inputMode="numeric"
          placeholder="Курс"
          onChange={(e) => dispatch(setCourse(e.target.value))}
          value={course}
          error={courseError}
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
          inputMode="numeric"
          placeholder="Ваш бюджет на услугу"
          onChange={(e) => dispatch(setAmount(e.target.value))}
          value={amount}
          error={amountError}
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
          amount,
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
