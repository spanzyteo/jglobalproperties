import { configureStore } from "@reduxjs/toolkit";
import mobileSidebarReducer from "./mobileSidebarSlice";
import searchReducer from "./searchSlice";
import blogsReducer from "./blogSlice";

export const store = configureStore({
  reducer: {
    mobileSidebar: mobileSidebarReducer,
    search: searchReducer,
    blogs: blogsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
