import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypeInitialState, TypeToastPayload } from './types'

const initialState: TypeInitialState = {
  toasts: []
}

export const toasterSlice = createSlice({
  name: 'toaster',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<TypeToastPayload>) => ({
      ...state,
      toasts: [
        ...state.toasts.filter(({ id, type }) => !(id === action.payload?.id && type === 'loading')),
        { id: Date.now(), ...action.payload }
      ]
    }),
    removeToast: (state, action) => ({
      ...state, toasts: [...state.toasts.filter(({ id }) => id !== action.payload)]
    })
  }
})

export const { addToast, removeToast } = toasterSlice.actions

export default toasterSlice.reducer
