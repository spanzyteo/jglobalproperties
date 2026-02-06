export interface EventImage {
  id: string;
  url: string;
  publicId: string;
  caption: string | null;
  isPrimary: boolean;
  order: number;
  landId: string | null;
  houseId: string | null;
  blogId: string | null;
  eventId: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventCount {
  reviews: number;
}

export interface EventAPIData {
  id: string;
  title: string;
  slug: string;
  description: string; // HTML content from tiptap
  location: string;
  date: string;
  organizer: string;
  isPast: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
  image: EventImage[];
  _count?: EventCount;
}

export interface FormattedEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  date: string;
  organizer: string;
  isPast: boolean;
  image: EventImage[];
  createdAt: string;
}

export interface EventPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface EventsAPIResponse {
  success: boolean;
  data: {
    events: EventAPIData[];
    pagination: EventPagination;
  };
}
