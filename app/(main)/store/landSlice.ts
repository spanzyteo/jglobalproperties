import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormattedLand } from "../features/lands";

interface LandInfo {
  currentLand: FormattedLand | null;
}

const initialState: LandInfo = {
  currentLand: null,
};

const landSlice = createSlice({
  name: "land",
  initialState,
  reducers: {
    setCurrentLand: (state, action: PayloadAction<FormattedLand>) => {
      state.currentLand = action.payload;
    },
    clearCurrentLand: (state) => {
      state.currentLand = null;
    },
  },
});

export const { setCurrentLand, clearCurrentLand } = landSlice.actions;
export default landSlice.reducer;
