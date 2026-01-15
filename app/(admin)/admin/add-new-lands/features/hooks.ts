/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Custom hooks for Add New Land feature
 */

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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
  addUnit,
  removeUnit,
  updateUnit,
  setIsSubmitting,
  resetForm,
} from "./addNewLandSlice";
import { handleImageFiles } from "./formUtils";
import { ImageDetail, Unit } from "./types";
import { RootState } from "./store";

/**
 * Hook to access all land form state
 */
export const useAddNewLandState = () => {
  return useSelector((state: RootState) => state.addNewLand);
};

/**
 * Hook to dispatch land form actions
 */
export const useAddNewLandActions = () => {
  const dispatch = useDispatch();

  return {
    setTitle: useCallback(
      (title: string) => dispatch(setTitle(title)),
      [dispatch]
    ),
    setOverview: useCallback(
      (overview: string) => dispatch(setOverview(overview)),
      [dispatch]
    ),
    setLocation: useCallback(
      (location: string) => dispatch(setLocation(location)),
      [dispatch]
    ),
    setState: useCallback(
      (state: string) => dispatch(setState(state)),
      [dispatch]
    ),
    setCountry: useCallback(
      (country: string) => dispatch(setCountry(country)),
      [dispatch]
    ),
    setStatus: useCallback(
      (status: string) => dispatch(setStatus(status)),
      [dispatch]
    ),
    setMetaTitle: useCallback(
      (metaTitle: string) => dispatch(setMetaTitle(metaTitle)),
      [dispatch]
    ),
    setMetaDescription: useCallback(
      (metaDescription: string) =>
        dispatch(setMetaDescription(metaDescription)),
      [dispatch]
    ),

    // Image actions
    setImages: useCallback(
      (imageMetadata: Array<{ id: string; name: string } & ImageDetail>) =>
        dispatch(setImages(imageMetadata)),
      [dispatch]
    ),
    updateImageDetail: useCallback(
      (index: number, field: keyof ImageDetail, value: any) => {
        dispatch(updateImageDetail({ index, field, value }));
      },
      [dispatch]
    ),
    removeImage: useCallback(
      (index: number) => dispatch(removeImage(index)),
      [dispatch]
    ),
    setPrimaryImage: useCallback(
      (index: number) => dispatch(setPrimaryImage(index)),
      [dispatch]
    ),

    // Unit actions
    addUnit: useCallback(() => dispatch(addUnit()), [dispatch]),
    removeUnit: useCallback(
      (index: number) => dispatch(removeUnit(index)),
      [dispatch]
    ),
    updateUnit: useCallback(
      (index: number, field: keyof Unit, value: any) => {
        dispatch(updateUnit({ index, field, value }));
      },
      [dispatch]
    ),

    // Form state actions
    setIsSubmitting: useCallback(
      (isSubmitting: boolean) => dispatch(setIsSubmitting(isSubmitting)),
      [dispatch]
    ),
    resetForm: useCallback(() => dispatch(resetForm()), [dispatch]),
  };
};
