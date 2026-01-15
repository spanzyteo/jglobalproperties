/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Redux Slice for Add New Land state management
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageDetail, Unit } from "./types";
import { DEFAULT_COUNTRY, DEFAULT_STATUS, DEFAULT_UNIT } from "./constants";

interface AddNewLandState {
  // Basic information
  title: string;
  overview: string;
  location: string;
  state: string;
  country: string;
  status: "FOR_SALE" | "SOLD" | "RESERVED";
  metaTitle: string;
  metaDescription: string;

  // Images - Store metadata only (serializable)
  imageMetadata: Array<
    {
      id: string;
      name: string;
    } & ImageDetail
  >;

  // Units
  units: Unit[];

  // Loading states
  isLoading: boolean;
  isSubmitting: boolean;
}

const initialState: AddNewLandState = {
  title: "",
  overview: "",
  location: "",
  state: "",
  country: DEFAULT_COUNTRY,
  status: DEFAULT_STATUS as "FOR_SALE" | "SOLD" | "RESERVED",
  metaTitle: "",
  metaDescription: "",
  imageMetadata: [],
  units: [DEFAULT_UNIT],
  isLoading: false,
  isSubmitting: false,
};

const addNewLandSlice = createSlice({
  name: "addNewLand",
  initialState,
  reducers: {
    // Basic information
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setOverview: (state, action: PayloadAction<string>) => {
      state.overview = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload as "FOR_SALE" | "SOLD" | "RESERVED";
    },
    setMetaTitle: (state, action: PayloadAction<string>) => {
      state.metaTitle = action.payload;
    },
    setMetaDescription: (state, action: PayloadAction<string>) => {
      state.metaDescription = action.payload;
    },

    // Images
    setImages: (
      state,
      action: PayloadAction<Array<{ id: string; name: string } & ImageDetail>>
    ) => {
      state.imageMetadata = action.payload;
    },
    setImageDetails: (state, action: PayloadAction<ImageDetail[]>) => {
      state.imageMetadata = state.imageMetadata.map((img, i) => ({
        ...img,
        ...action.payload[i],
      }));
    },
    updateImageDetail: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof ImageDetail;
        value: any;
      }>
    ) => {
      const { index, field, value } = action.payload;
      if (state.imageMetadata[index]) {
        state.imageMetadata[index] = {
          ...state.imageMetadata[index],
          [field]: value,
        };
      }
    },
    removeImage: (state, action: PayloadAction<number>) => {
      state.imageMetadata = state.imageMetadata.filter(
        (_, i) => i !== action.payload
      );
    },
    setPrimaryImage: (state, action: PayloadAction<number>) => {
      state.imageMetadata = state.imageMetadata.map((img, i) => ({
        ...img,
        isPrimary: i === action.payload,
      }));
    },

    // Units
    setUnits: (state, action: PayloadAction<Unit[]>) => {
      state.units = action.payload;
    },
    addUnit: (state) => {
      state.units.push(DEFAULT_UNIT);
    },
    removeUnit: (state, action: PayloadAction<number>) => {
      if (state.units.length > 1) {
        state.units = state.units.filter((_, i) => i !== action.payload);
      }
    },
    updateUnit: (
      state,
      action: PayloadAction<{ index: number; field: keyof Unit; value: any }>
    ) => {
      const { index, field, value } = action.payload;
      if (state.units[index]) {
        state.units[index] = {
          ...state.units[index],
          [field]: value,
        };
      }
    },

    // Loading states
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },

    // Reset form
    resetForm: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setTitle,
  setOverview,
  setLocation,
  setState,
  setCountry,
  setStatus,
  setMetaTitle,
  setMetaDescription,
  setImages,
  setImageDetails,
  updateImageDetail,
  removeImage,
  setPrimaryImage,
  setUnits,
  addUnit,
  removeUnit,
  updateUnit,
  setIsLoading,
  setIsSubmitting,
  resetForm,
} = addNewLandSlice.actions;

export default addNewLandSlice.reducer;
