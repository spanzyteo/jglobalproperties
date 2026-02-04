import { ReviewPayload, ReviewResponse } from "./types";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://api.jglobalproperties.com/api/v1";

export const submitReview = async (
  payload: ReviewPayload,
): Promise<ReviewResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data: ReviewResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit review");
    }

    if (!data.success) {
      throw new Error(data.message || "API returned unsuccessful response");
    }

    return data;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};
