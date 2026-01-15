/**
 * Redux Store index file
 * Located at: app/(admin)/admin/add-new-lands/features/store/index.ts
 */

import { configureStore } from "@reduxjs/toolkit";
import addNewLandReducer from "../addNewLandSlice";

export const store = configureStore({
  reducer: {
    addNewLand: addNewLandReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
