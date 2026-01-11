import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TypeInitialState = {
  course: string
  courseError: string
  duration: string
  durationError: string
  subject: string
  subjectError: string
  service: string
  serviceError: string
  condition: string
  conditionError: string
  urgency: string
  urgencyError: string
  facult: string
  facultError: string
  comment: string
  commentError: string
}

const initialState: TypeInitialState = {
  course: '',
  courseError: '',
  duration: '',
  durationError: '',
  subject: '',
  subjectError: '',
  service: '',
  serviceError: '',
  condition: '',
  conditionError: '',
  urgency: '',
  urgencyError: '',
  facult: '',
  facultError: '',
  comment: '',
  commentError: ''
}

export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCourse: (state, action: PayloadAction<string>) => ({ ...state, course: action.payload, courseError: '' }),
    setCourseError: (state, action: PayloadAction<string>) => ({ ...state, courseError: action.payload }),
    setDuration: (state, action: PayloadAction<string>) => ({ ...state, duration: action.payload, durationError: '' }),
    setDurationError: (state, action: PayloadAction<string>) => ({ ...state, durationError: action.payload }),
    setSubject: (state, action: PayloadAction<string>) => ({ ...state, subject: action.payload, subjectError: '' }),
    setSubjectError: (state, action: PayloadAction<string>) => ({ ...state, subjectError: action.payload }),
    setService: (state, action: PayloadAction<string>) => ({ ...state, service: action.payload, serviceError: '' }),
    setServiceError: (state, action: PayloadAction<string>) => ({ ...state, serviceError: action.payload }),
    setCondition: (state, action: PayloadAction<string>) => ({ ...state, condition: action.payload, conditionError: '' }),
    setConditionError: (state, action: PayloadAction<string>) => ({ ...state, conditionError: action.payload }),
    setUrgency: (state, action: PayloadAction<string>) => ({ ...state, urgency: action.payload, urgencyError: '' }),
    setUrgencyError: (state, action: PayloadAction<string>) => ({ ...state, urgencyError: action.payload }),
    setFacult: (state, action: PayloadAction<string>) => ({ ...state, facult: action.payload, facultError: '' }),
    setComment: (state, action: PayloadAction<string>) => ({ ...state, comment: action.payload, commentError: '' }),
    setCommentError: (state, action: PayloadAction<string>) => ({ ...state, commentError: action.payload }),
    setError: (state, action: PayloadAction<{ key: string, value: string }>) => ({ ...state, [action.payload.key]: action.payload.value }),
    setDefaultValues: (state) => ({ ...state, ...initialState })
  }
})

export const {
  setCourse,
  setDuration,
  setSubject,
  setService,
  setCondition,
  setUrgency,
  setFacult,
  setComment,
  setCommentError,
  setError,
  setDefaultValues
} = OrderSlice.actions

export default OrderSlice.reducer
