export interface LandUnit {
  id: string;
  size: number;
  unit: string;
  price: string;
  available: boolean;
  landId: string;
  createdAt: string;
  updatedAt: string;
}

export interface LandImage {
  id: string;
  url: string;
  publicId: string;
  caption: string | null;
  isPrimary: boolean;
  order: number;
  landId: string;
  houseId: string | null;
  blogId: string | null;
  eventId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LandCount {
  reviews: number;
  favorites: number;
}

export interface LandAPIData {
  id: string;
  title: string;
  slug: string;
  overview: string; // HTML content from tiptap
  location: string;
  state: string;
  country: string;
  status: string;
  averageRating: number | null;
  totalReviews: number;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
  units: LandUnit[];
  images: LandImage[];
  _count: LandCount;
}

export interface FormattedLand {
  id: string;
  title: string;
  slug: string;
  overview: string;
  location: string;
  state: string;
  country: string;
  status: string;
  averageRating: number | null;
  totalReviews: number;
  images: LandImage[];
  units: LandUnit[];
  createdAt: string;
}

export interface LandPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface LandsAPIResponse {
  success: boolean;
  data: {
    lands: LandAPIData[];
    pagination: LandPagination;
  };
}
