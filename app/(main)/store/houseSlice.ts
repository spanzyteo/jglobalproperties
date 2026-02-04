import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormattedHouse } from "../features/houses";

interface HouseInfo {
  currentHouse: FormattedHouse | null;
}

const initialState: HouseInfo = {
  currentHouse: null,
};

const houseSlice = createSlice({
  name: "house",
  initialState,
  reducers: {
    setCurrentHouse: (state, action: PayloadAction<FormattedHouse>) => {
      state.currentHouse = action.payload;
    },
    clearCurrentHouse: (state) => {
      state.currentHouse = null;
    },
  },
});

export const { setCurrentHouse, clearCurrentHouse } = houseSlice.actions;
export default houseSlice.reducer;
