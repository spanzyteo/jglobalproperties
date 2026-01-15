/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Type definitions for the Add New Land feature
 */

export interface ImageDetail {
  caption: string;
  isPrimary: boolean;
  order: number;
}

export interface Unit {
  size: number;
  unit: string;
  price: string;
  available: boolean;
}

export interface LandFormData {
  title: string;
  overview: string;
  location: string;
  state: string;
  country: string;
  status: "FOR_SALE" | "SOLD" | "RESERVED";
  metaTitle?: string;
  metaDescription?: string;
  images: File[];
  imageDetails: ImageDetail[];
  units: Unit[];
}

export interface LandApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface DropdownOption {
  value: string;
  label: string;
}
