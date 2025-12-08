import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchGetHelpersAsyncThunk } from './MainAsyncThunk'
import { TypeHelper } from './types'

type TypeInitialState = {
  helpers: TypeHelper[]
  helpersHasBeenLoaded: boolean
  pending: boolean
}

const initialState: TypeInitialState = {
  helpers: [],
  pending: true,
  helpersHasBeenLoaded: false
}

export const MainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => builder
    .addCase(fetchGetHelpersAsyncThunk.pending, (state) => ({ ...state, pending: true }))
    .addCase(fetchGetHelpersAsyncThunk.fulfilled, (state, action: PayloadAction<TypeHelper[]>) => ({
      ...state, helpers: action.payload, pending: false, helpersHasBeenLoaded: true
    }))
    .addCase(fetchGetHelpersAsyncThunk.rejected, (state) => ({ ...state, pending: false }))
})

// export const {

// } = MainSlice.actions

export default MainSlice.reducer
