import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchGetHelpersAsyncThunk = createAsyncThunk(
  'Main/fetchGetHelpers',
  async (_, thunkAPI) => {
    try {
      const data = await fetch('https://xzbkxthnfksriubmhlfx.supabase.co/functions/v1/get-helpers', {
        method: 'GET'
      })

      const response = await data.json()

      return response?.data
    } catch {
      return thunkAPI.rejectWithValue('Ошибка сервера')
    }
  }
)
