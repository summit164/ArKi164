import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  pending: true
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setPending: (state, action: PayloadAction<boolean>) => ({ ...state, pending: action.payload })
  }
})

export const {
  setPending
} = globalSlice.actions

export default globalSlice.reducer
