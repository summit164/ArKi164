import { createAsyncThunk } from '@reduxjs/toolkit'

type TypeFetchTaskDetailAsyncThunkParams = {
  id: number
}

export const fetchTaskDetailAsyncThunk = createAsyncThunk(
  'TaskDetail/fetchTaskDetail',
  async ({ id }: TypeFetchTaskDetailAsyncThunkParams, thunkAPI) => {
    try {
      const data = await fetch(`https://xzbkxthnfksriubmhlfx.supabase.co/functions/v1/task-by-id?id=${id}`, {
        method: 'GET'
      })

      const response = await data.json()

      return response
    } catch {
      return thunkAPI.rejectWithValue('Ошибка сервера')
    }
  }
)
