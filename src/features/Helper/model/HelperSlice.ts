import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TypeInitialState = {
  name: string
  nameError: string
  secondName: string
  secondNameError: string
  facult: string
  facultError: string
  direction: string
  directionError: string
  mainSubjects: string
  mainSubjectsError: string
  filesError: string
  course: string
  courseError: string
}

const initialState: TypeInitialState = {
  name: '',
  nameError: '',
  secondName: '',
  secondNameError: '',
  facult: '',
  facultError: '',
  direction: '',
  directionError: '',
  mainSubjects: '',
  mainSubjectsError: '',
  filesError: '',
  course: '',
  courseError: ''
}

export const HelperSlice = createSlice({
  name: 'helper',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => ({ ...state, name: action.payload, nameError: '' }),
    setNameError: (state, action: PayloadAction<string>) => ({ ...state, nameError: action.payload }),
    setSecondName: (state, action: PayloadAction<string>) => ({ ...state, secondName: action.payload, secondNameError: '' }),
    setSecondNameError: (state, action: PayloadAction<string>) => ({ ...state, secondNameError: action.payload }),
    setFacult: (state, action: PayloadAction<string>) => ({ ...state, facult: action.payload, facultError: '' }),
    setFacultError: (state, action: PayloadAction<string>) => ({ ...state, facultError: action.payload }),
    setDirection: (state, action: PayloadAction<string>) => ({ ...state, direction: action.payload, directionError: '' }),
    setDirectionError: (state, action: PayloadAction<string>) => ({ ...state, directionError: action.payload }),
    setMainSubjects: (state, action: PayloadAction<string>) => ({ ...state, mainSubjects: action.payload, mainSubjectsError: '' }),
    setMainSubjectsError: (state, action: PayloadAction<string>) => ({ ...state, mainSubjectsError: action.payload }),
    setCourse: (state, action: PayloadAction<string>) => ({ ...state, course: action.payload, courseError: '' }),
    setCourseError: (state, action: PayloadAction<string>) => ({ ...state, courseError: action.payload }),
    setFilesError: (state, action: PayloadAction<string>) => ({ ...state, filesError: action.payload }),
    setError: (state, action: PayloadAction<{ key: string, value: string }>) => ({ ...state, [action.payload.key]: action.payload.value }),
    setDefaultValues: (state) => ({ ...state, ...initialState })
  }
})

export const {
  setName,
  setNameError,
  setSecondName,
  setSecondNameError,
  setFacult,
  setFacultError,
  setDirection,
  setDirectionError,
  setMainSubjects,
  setMainSubjectsError,
  setCourse,
  setCourseError,
  setFilesError,
  setError,
  setDefaultValues
} = HelperSlice.actions

export default HelperSlice.reducer
