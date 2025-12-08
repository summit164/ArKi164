import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAB_TASKS } from '@/features/Tasks/model/constants'
import { fetchTaskDetailAsyncThunk } from './TaskDetailAsyncThunk'
import { TaskDetail } from './types'

type TypeInitialState = {
  pending: boolean
  award: string
  description: string
  googleFormLink: string
  id: number | null
  name: string
  role: TAB_TASKS | null
}

const initialState: TypeInitialState = {
  pending: true,
  award: '',
  description: '',
  googleFormLink: '',
  id: null,
  name: '',
  role: null
}

export const TaskDetailSlice = createSlice({
  name: 'taskDetail',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => builder
    .addCase(fetchTaskDetailAsyncThunk.pending, (state) => ({ ...state, pending: true }))
    .addCase(fetchTaskDetailAsyncThunk.fulfilled, (state, action: PayloadAction<TaskDetail>) => ({
      ...state,
      pending: false,
      award: action.payload.award,
      description: action.payload.description,
      googleFormLink: action.payload.googleFormLink,
      id: action.payload.id,
      name: action.payload.name,
      role: action.payload.role
    }))
    .addCase(fetchTaskDetailAsyncThunk.rejected, (state) => ({ ...state, pending: false }))
})

export default TaskDetailSlice.reducer
