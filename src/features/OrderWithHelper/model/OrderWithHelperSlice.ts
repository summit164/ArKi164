import { TypeHelperTransfer } from '@/features/Main/Helpers/model/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TypeInitialState = {
  choiceHelperTgName: string
  choiceHelperName: string
  choiceHelperSecondName: string
  choiceHelperTgPhoto: string
  choiceHelperMainSubjects: string
}

const initialState: TypeInitialState = {
  choiceHelperTgName: '',
  choiceHelperName: '',
  choiceHelperSecondName: '',
  choiceHelperTgPhoto: '',
  choiceHelperMainSubjects: ''
}

export const OrderWithHelperSlice = createSlice({
  name: 'orderWithHelper',
  initialState,
  reducers: {
    setChoiceHelperTgName: (state, action: PayloadAction<string>) => ({ ...state, choiceHelperTgName: action.payload }),
    setChoiceHelperName: (state, action: PayloadAction<string>) => ({ ...state, choiceHelperName: action.payload }),
    setChoiceHelperSecondName: (state, action: PayloadAction<string>) => ({ ...state, choiceHelperSecondName: action.payload }),
    setChoiceHelperTgPhoto: (state, action: PayloadAction<string>) => ({ ...state, choiceHelperTgPhoto: action.payload }),
    setChoiceHelperMainSubjects: (state, action: PayloadAction<string>) => ({ ...state, choiceHelperMainSubjects: action.payload }),
    setChoiceHelperTransfer: (state, action: PayloadAction<TypeHelperTransfer>) => ({
      ...state,
      choiceHelperTgName: action.payload.tgName,
      choiceHelperName: action.payload.name,
      choiceHelperSecondName: action.payload.second_name,
      choiceHelperTgPhoto: action.payload.tgPhoto,
      choiceHelperMainSubjects: action.payload.main_subjects
    }),
    setDefaultValues: (state) => ({ ...state, ...initialState })
  }
})

export const {
  setChoiceHelperTgName,
  setChoiceHelperName,
  setChoiceHelperSecondName,
  setChoiceHelperTgPhoto,
  setChoiceHelperTransfer,
  setDefaultValues
} = OrderWithHelperSlice.actions

export default OrderWithHelperSlice.reducer
