import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
  lands: boolean;
  blogs: boolean;
  categories: boolean;
  houses: boolean;
  reviews: boolean;
  tags: boolean;
}

const initialState: SidebarState = {
  lands: false,
  blogs: false,
  categories: false,
  houses: false,
  reviews: false,
  tags: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleLands: (state) => {
      state.lands = !state.lands;
      state.blogs = false;
      state.categories = false;
      state.houses = false;
      state.reviews = false;
      state.tags = false;
    },
    toggleBlogs: (state) => {
      state.lands = false;
      state.blogs = !state.blogs;
      state.categories = false;
      state.houses = false;
      state.reviews = false;
      state.tags = false;
    },
    toggleCategories: (state) => {
      state.lands = false;
      state.blogs = false;
      state.categories = !state.categories;
      state.houses = false;
      state.reviews = false;
      state.tags = false;
    },
    toggleHouses: (state) => {
      state.lands = false;
      state.blogs = false;
      state.categories = false;
      state.houses = !state.houses;
      state.reviews = false;
      state.tags = false;
    },
    toggleReviews: (state) => {
      state.lands = false;
      state.blogs = false;
      state.categories = false;
      state.houses = false;
      state.reviews = !state.reviews;
      state.tags = false;
    },
    toggleTags: (state) => {
      state.lands = false;
      state.blogs = false;
      state.categories = false;
      state.houses = false;
      state.reviews = false;
      state.tags = !state.tags;
    },
  },
});

export const { toggleLands, toggleBlogs, toggleCategories, toggleHouses, toggleReviews, toggleTags} = sidebarSlice.actions;
export default sidebarSlice.reducer;
