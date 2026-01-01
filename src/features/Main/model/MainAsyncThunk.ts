import { createAsyncThunk } from '@reduxjs/toolkit'
import { getSupabaseFunctionUrl, getTelegramInitDataHeader } from '@/shared/utils/supabaseFunctions'
import { TypeHelper } from './types'

export const fetchGetHelpersAsyncThunk = createAsyncThunk<TypeHelper[], void, { rejectValue: string }>(
  'Main/fetchGetHelpers',
  async (_, thunkAPI) => {
    try {
      const data = await fetch(getSupabaseFunctionUrl('get-helpers'), {
        method: 'GET',
        headers: {
          ...getTelegramInitDataHeader()
        }
      })

      if (!data.ok) {
        throw new Error(`get-helpers failed: ${data.status}`)
      }

      const response = await data.json()
      const list = Array.isArray(response?.data) ? response.data : []

      return list
    } catch {
      return thunkAPI.rejectWithValue('Ошибка сервера')
    }
  }
)
