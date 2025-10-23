import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventData } from "../utils/events";

interface EventInfo {
  currentEvent: EventData | null
}

const initialState: EventInfo = {
  currentEvent: null
}

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setCurrentEvent: (state, action: PayloadAction<EventData>) => {
      state.currentEvent = action.payload
    },
    clearCurrentEvent: (state) => {
      state.currentEvent = null
    }
  }
})

export const { setCurrentEvent, clearCurrentEvent } = eventSlice.actions
export default eventSlice.reducer