export interface ReviewPayload {
  name: string;
  email: string;
  rating: number;
  comment: string;
  houseId?: string;
  landId?: string;
}

export interface Review extends ReviewPayload {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewResponse {
  success: boolean;
  message: string;
  data?: Review;
}
