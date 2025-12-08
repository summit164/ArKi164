import { configureStore } from '@reduxjs/toolkit'
import toasterReducer from '@/features/Toaster/model/ToasterSlice'
import orderReducer from '@/features/Order/model/OrderSlice'
import globalReducer from '@/model/global/GlobalSlice'
import helperReducer from '@/features/Helper/model/HelperSlice'
import mainReducer from '@/features/Main/model/MainSlice'
import orderWithHelperReducer from '@/features/OrderWithHelper/model/OrderWithHelperSlice'
import taskReducer from '@/features/Tasks/model/TasksSlice'
import taskDetailReducer from '@/features/TaskDetail/model/TaskDetailSlice'

export const store = configureStore({
  reducer: {
    global: globalReducer,
    toaster: toasterReducer,
    order: orderReducer,
    helper: helperReducer,
    main: mainReducer,
    orderWithHelper: orderWithHelperReducer,
    tasks: taskReducer,
    taskDetail: taskDetailReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
