import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
  lands: boolean;
  blogs: boolean;
  categories: boolean;
  houses: boolean;
  reviews: boolean;
  tags: boolean;
  events: boolean;
  newsletter: boolean;
}

const initialState: SidebarState = {
  lands: false,
  blogs: false,
  categories: false,
  houses: false,
  reviews: false,
  tags: false,
  events: false,
  newsletter: false,
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
      state.events = false;
    },
    toggleBlogs: (state) => {
      state.lands = false;
      state.blogs = !state.blogs;
      state.categories = false;
      state.houses = false;
      state.reviews = false;
      state.tags = false;
      state.events = false;
    },
    toggleCategories: (state) => {
      state.lands = false;
      state.blogs = false;
      state.categories = !state.categories;
      state.houses = false;
      state.reviews = false;
      state.tags = false;
      state.events = false;
    },
    toggleHouses: (state) => {
      state.lands = false;
      state.blogs = false;
      state.categories = false;
      state.houses = !state.houses;
      state.reviews = false;
      state.tags = false;
      state.events = false;
    },
    toggleReviews: (state) => {
      state.lands = false;
      state.blogs = false;
      state.categories = false;
      state.houses = false;
      state.reviews = !state.reviews;
      state.tags = false;
      state.events = false;
    },
    toggleTags: (state) => {
      state.lands = false;
      state.blogs = false;
      state.categories = false;
      state.houses = false;
      state.reviews = false;
      state.events = false;
      state.tags = !state.tags;
    },
    toggleEvents: (state) => {
      state.lands = false;
      state.blogs = false;
      state.categories = false;
      state.houses = false;
      state.reviews = false;
      state.tags = false;
      state.events = !state.events;
      state.newsletter = false;
    },
    toggleNewsletter: (state) => {
      state.lands = false;
      state.blogs = false;
      state.categories = false;
      state.houses = false;
      state.reviews = false;
      state.tags = false;
      state.events = false;
      state.newsletter = !state.newsletter;
    },
  },
});

export const {
  toggleLands,
  toggleBlogs,
  toggleCategories,
  toggleHouses,
  toggleReviews,
  toggleTags,
  toggleEvents,
  toggleNewsletter,
} = sidebarSlice.actions;
export default sidebarSlice.reducer;
