import { createAsyncThunk } from '@reduxjs/toolkit'
import { getSupabaseFunctionUrl, getTelegramInitDataHeader } from '@/shared/utils/supabaseFunctions'

export const fetchGetTasksAsyncThunk = createAsyncThunk(
  'Tasks/fetchGetTasks',
  async (_, thunkAPI) => {
    try {
      const data = await fetch(getSupabaseFunctionUrl('all-tasks'), {
        method: 'GET',
        headers: {
          ...getTelegramInitDataHeader()
        }
      })

      const response = await data.json()

      return response
    } catch {
      return thunkAPI.rejectWithValue('Ошибка сервера')
    }
  }
)
