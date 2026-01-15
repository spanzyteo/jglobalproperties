/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Shared API service for all Land operations
 * Located at: app/(admin)/admin/lands/features/landApi.ts
 */

import axios from "axios";
import { Land, LandApiResponse, LandsListResponse } from "./types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

export const landApi = {
  /**
   * Create a new land listing
   */
  createLand: async (formData: FormData): Promise<LandApiResponse> => {
    try {
      const response = await api.post("/lands", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error: any) {
      throw {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while creating the land",
      };
    }
  },

  /**
   * Fetch all lands with pagination and filters
   */
  getLands: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<LandsListResponse> => {
    try {
      const response = await api.get("/lands", { params });
      return response.data;
    } catch (error: any) {
      throw {
        success: false,
        message: error.response?.data?.message || "Failed to fetch lands",
      };
    }
  },

  /**
   * Fetch a single land by ID
   */
  getLandById: async (
    id: string
  ): Promise<{ success: boolean; data: Land }> => {
    try {
      const response = await api.get(`/lands/${id}`);
      return response.data;
    } catch (error: any) {
      throw {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch land details",
      };
    }
  },

  /**
   * Update a land listing
   */
  updateLand: async (
    id: string,
    formData: FormData
  ): Promise<LandApiResponse> => {
    try {
      const response = await api.put(`/lands/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error: any) {
      throw {
        success: false,
        message:
          error.response?.data?.message ||
          "An error occurred while updating the land",
      };
    }
  },

  /**
   * Delete a land listing
   */
  deleteLand: async (id: string): Promise<LandApiResponse> => {
    try {
      const response = await api.delete(`/lands/${id}`);
      return {
        success: response.data.success,
        message: response.data.message,
      };
    } catch (error: any) {
      throw {
        success: false,
        message:
          error.response?.data?.message ||
          "An error occurred while deleting the land",
      };
    }
  },

  /**
   * Delete a specific image from a land
   */
  deleteImage: async (
    landId: string,
    imageId: string
  ): Promise<LandApiResponse> => {
    try {
      const response = await api.delete(`/lands/${landId}/images/${imageId}`);
      return {
        success: response.data.success,
        message: response.data.message,
      };
    } catch (error: any) {
      throw {
        success: false,
        message:
          error.response?.data?.message ||
          "An error occurred while deleting the image",
      };
    }
  },

  /**
   * Update a specific image metadata
   */
  updateImage: async (
    landId: string,
    imageId: string,
    imageData: { caption: string; order: number }
  ): Promise<LandApiResponse> => {
    try {
      const response = await api.put(
        `/lands/${landId}/images/${imageId}`,
        imageData
      );
      return {
        success: response.data.success,
        message: response.data.message,
      };
    } catch (error: any) {
      throw {
        success: false,
        message:
          error.response?.data?.message ||
          "An error occurred while updating the image",
      };
    }
  },

  /**
   * Update a specific unit
   */
  updateUnit: async (
    landId: string,
    unitId: string,
    unitData: any
  ): Promise<LandApiResponse> => {
    try {
      const response = await api.put(
        `/lands/${landId}/units/${unitId}`,
        unitData
      );
      return {
        success: response.data.success,
        message: response.data.message,
      };
    } catch (error: any) {
      throw {
        success: false,
        message:
          error.response?.data?.message ||
          "An error occurred while updating the unit",
      };
    }
  },
};
