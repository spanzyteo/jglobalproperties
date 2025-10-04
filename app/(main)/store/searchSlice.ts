import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SearchType = "lands" | "houses" 

export interface SearchState {
 searchOption: SearchType
}

const initialState: SearchState = {
  searchOption: 'lands'
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchState: (state, action: PayloadAction<SearchType>) => {
      state.searchOption = action.payload
    }
  }
})

export const { searchState } = searchSlice.actions
export default searchSlice.reducer