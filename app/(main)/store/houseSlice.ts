import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HouseData } from "../utils/houses";

interface HouseInfo {
  currentHouse: HouseData | null;
}

const initialState: HouseInfo = {
  currentHouse: null,
};

const houseSlice = createSlice({
  name: "house",
  initialState,
  reducers: {
    setCurrentHouse: (state, action: PayloadAction<HouseData>) => {
      state.currentHouse = action.payload;
    },
    clearCurrentHouse: (state) => {
      state.currentHouse = null
    }
  },
});

export const { setCurrentHouse, clearCurrentHouse } = houseSlice.actions
export default houseSlice.reducer
