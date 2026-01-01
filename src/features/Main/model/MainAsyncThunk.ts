import { createAsyncThunk } from '@reduxjs/toolkit'
import { getSupabaseFunctionUrl, getTelegramInitDataHeader } from '@/shared/utils/supabaseFunctions'

export const fetchGetHelpersAsyncThunk = createAsyncThunk(
  'Main/fetchGetHelpers',
  async (_, thunkAPI) => {
    try {
      const data = await fetch(getSupabaseFunctionUrl('get-helpers'), {
        method: 'GET',
        headers: {
          ...getTelegramInitDataHeader()
        }
      })

      const response = await data.json()

      return response?.data
    } catch {
      return thunkAPI.rejectWithValue('Ошибка сервера')
    }
  }
)
