import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LandData } from "../utils/lands";

interface LandInfo {
  currentLand: LandData | null
}

const initialState: LandInfo = {
  currentLand: null
}

const landSlice = createSlice({
  name: 'land',
  initialState,
  reducers: {
    setCurrentLand: (state, action: PayloadAction<LandData>) => {
      state.currentLand = action.payload
    },
    clearCurrentLand: (state) => {
      state.currentLand = null
    }
  }
})

export const { setCurrentLand, clearCurrentLand } = landSlice.actions
export default landSlice.reducer