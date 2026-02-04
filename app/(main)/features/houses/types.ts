export interface HouseUnit {
  id: string;
  size: number;
  unit: string;
  price: string;
  available: boolean;
  houseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface HouseImage {
  id: string;
  url: string;
  publicId: string;
  caption: string | null;
  isPrimary: boolean;
  order: number;
  landId: string | null;
  houseId: string;
  blogId: string | null;
  eventId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface HouseCount {
  reviews: number;
}

export interface HouseAPIData {
  id: string;
  title: string;
  slug: string;
  overview: string; // HTML content from tiptap
  location: string;
  state: string;
  country: string;
  price: string;
  category: string;
  averageRating: number | null;
  totalReviews: number;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
  units: HouseUnit[];
  images: HouseImage[];
  _count: HouseCount;
}

export interface HousePagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface HousesAPIResponse {
  success: boolean;
  data: {
    house: HouseAPIData[];
    pagination: HousePagination;
  };
}

export interface FormattedHouse {
  id: string;
  title: string;
  slug: string;
  overview: string;
  location: string;
  state: string;
  country: string;
  price: string;
  category: string;
  averageRating: number | null;
  totalReviews: number;
  images: HouseImage[];
  units: HouseUnit[];
  createdAt: string;
}
