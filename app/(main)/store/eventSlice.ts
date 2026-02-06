import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormattedEvent } from "../features/events";

interface EventInfo {
  currentEvent: FormattedEvent | null;
}

const initialState: EventInfo = {
  currentEvent: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setCurrentEvent: (state, action: PayloadAction<FormattedEvent>) => {
      state.currentEvent = action.payload;
    },
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    },
  },
});

export const { setCurrentEvent, clearCurrentEvent } = eventSlice.actions;
export default eventSlice.reducer;
