import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchGetTasksAsyncThunk = createAsyncThunk(
  'Tasks/fetchGetTasks',
  async (_, thunkAPI) => {
    try {
      const data = await fetch('https://xzbkxthnfksriubmhlfx.supabase.co/functions/v1/all-tasks', {
        method: 'GET'
      })

      const response = await data.json()

      return response
    } catch {
      return thunkAPI.rejectWithValue('Ошибка сервера')
    }
  }
)
