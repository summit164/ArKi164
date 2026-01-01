import { createAsyncThunk } from '@reduxjs/toolkit'
import { getSupabaseFunctionUrl, getTelegramInitDataHeader } from '@/shared/utils/supabaseFunctions'

type TypeFetchTaskDetailAsyncThunkParams = {
  id: number
}

export const fetchTaskDetailAsyncThunk = createAsyncThunk(
  'TaskDetail/fetchTaskDetail',
  async ({ id }: TypeFetchTaskDetailAsyncThunkParams, thunkAPI) => {
    try {
      const data = await fetch(`${getSupabaseFunctionUrl('task-by-id')}?id=${id}`, {
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
