import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TypeInitialState = {
  isVisible: boolean
}

const initialState: TypeInitialState = {
  isVisible: true
}

export const NavbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => ({ ...state, isVisible: action.payload })
  }
})

export const {
  setVisible
} = NavbarSlice.actions

export default NavbarSlice.reducer
