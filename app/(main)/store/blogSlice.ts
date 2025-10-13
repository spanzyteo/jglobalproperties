import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogsData } from "../utils/blogs";

interface BlogInfo {
  currentBlog: BlogsData | null
}

const initialState: BlogInfo = {
  currentBlog: null
}

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setCurrentBlog: (state, action: PayloadAction<BlogsData>) => {
      state.currentBlog = action.payload;
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
  },
});

export const { setCurrentBlog, clearCurrentBlog } = blogSlice.actions;
export default blogSlice.reducer