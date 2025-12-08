import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypeTask } from '@/features/Tasks/model/types'
import { fetchGetTasksAsyncThunk } from './TasksAsyncThunks'
import { TAB_TASKS } from './constants'

type TypeInitialState = {
  tasks: TypeTask[]
  pending: boolean
  tab: TAB_TASKS
}

const initialState: TypeInitialState = {
  tasks: [],
  pending: true,
  tab: TAB_TASKS.USERS
}

export const Tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<TAB_TASKS>) => ({ ...state, tab: action.payload }),
    setDefaultValues: () => ({ ...initialState })
  },
  extraReducers: (builder) => builder
    .addCase(fetchGetTasksAsyncThunk.pending, (state) => ({ ...state, tasks: [], pending: true }))
    .addCase(fetchGetTasksAsyncThunk.fulfilled, (state, action: PayloadAction<TypeTask[]>) => ({ ...state, tasks: action.payload, pending: false }))
    .addCase(fetchGetTasksAsyncThunk.rejected, (state) => ({ ...state, tasks: [], pending: false }))
})

export const {
  setTab,
  setDefaultValues
} = Tasks.actions

export default Tasks.reducer
