/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * API service for Land endpoints
 */

import axios from "axios";
import { LandApiResponse } from "./types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

export const landApi = {
  /**
   * Create a new land listing
   * @param formData - FormData object containing land details and images
   * @returns Promise with API response
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
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while creating the land";

      throw {
        success: false,
        message: errorMessage,
      };
    }
  },

  /**
   * Fetch all lands (with pagination and filters)
   */
  getLands: async (params?: any): Promise<any> => {
    try {
      const response = await api.get("/lands", { params });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  /**
   * Fetch a single land by ID
   */
  getLandById: async (id: string): Promise<any> => {
    try {
      const response = await api.get(`/lands/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
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
};
