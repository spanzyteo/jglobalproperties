import { configureStore } from "@reduxjs/toolkit";
import mobileSidebarReducer from './mobileSidebarSlice'

export const store = configureStore({
  reducer: {
    mobileSidebar: mobileSidebarReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch