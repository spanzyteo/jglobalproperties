import { configureStore } from "@reduxjs/toolkit";
import mobileSidebarReducer from './mobileSidebarSlice'
import searchReducer from './searchSlice'

export const store = configureStore({
  reducer: {
    mobileSidebar: mobileSidebarReducer,
    search: searchReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch