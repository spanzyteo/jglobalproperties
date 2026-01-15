/**
 * Shared types for the entire Land management section
 * Located at: app/(admin)/admin/lands/features/types.ts
 */

// ===== Basic Land Data =====
export interface LandImage {
  id: string;
  url: string;
  publicId: string;
  caption: string | null;
  isPrimary: boolean;
  order: number;
}

export interface LandUnit {
  id: string;
  size: number;
  unit: string;
  price: string;
  available: boolean;
  landId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LandReview {
  id: string;
  rating: number;
  comment: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Land {
  id: string;
  title: string;
  slug: string;
  overview: string;
  location: string;
  state: string;
  country: string;
  status: "FOR_SALE" | "SOLD" | "RESERVED";
  averageRating: number | null;
  totalReviews: number;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
  units: LandUnit[];
  images: LandImage[];
  reviews?: LandReview[];
  _count?: {
    reviews: number;
    favorites: number;
  };
}

// ===== Form Data Types =====
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

// ===== API Response Types =====
export interface LandApiResponse {
  success: boolean;
  message: string;
  data?: Land | Land[];
}

export interface LandsListResponse {
  success: boolean;
  data: Land[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

// ===== Utility Types =====
export interface DropdownOption {
  value: string;
  label: string;
}

export interface ImagePreviewData {
  file: File;
  preview: string;
  details: ImageDetail;
}
