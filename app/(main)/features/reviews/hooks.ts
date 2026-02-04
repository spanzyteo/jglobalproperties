import { useState } from "react";
import { submitReview } from "./api";
import { ReviewPayload } from "./types";

export const useSubmitReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (payload: ReviewPayload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await submitReview(payload);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to submit review";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
};
