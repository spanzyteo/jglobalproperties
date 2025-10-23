import { configureStore } from "@reduxjs/toolkit";
import mobileSidebarReducer from "./mobileSidebarSlice";
import searchReducer from "./searchSlice";
import blogsReducer from "./blogSlice";
import houseReducer from './houseSlice'
import landReducer from './landSlice'
import eventsReducer from './eventSlice'

export const store = configureStore({
  reducer: {
    mobileSidebar: mobileSidebarReducer,
    search: searchReducer,
    blogs: blogsReducer,
    house: houseReducer,
    land: landReducer,
    events: eventsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
