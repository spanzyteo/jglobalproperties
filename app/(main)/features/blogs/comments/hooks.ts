"use client";

import { useState, useCallback } from "react";
import { submitBlogComment } from "./api";
import { CommentPayload, CommentResponse } from "./types";

interface UseSubmitCommentResult {
  loading: boolean;
  error: string | null;
  submitComment: (payload: CommentPayload) => Promise<CommentResponse | null>;
}

export const useSubmitBlogComment = (): UseSubmitCommentResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitComment = useCallback(
    async (payload: CommentPayload): Promise<CommentResponse> => {
      console.log("🔄 Hook submitComment called with payload:", payload);
      setLoading(true);
      setError(null);

      try {
        console.log("📝 Calling submitBlogComment API function...");
        const response = await submitBlogComment(payload);
        console.log("✅ API response received:", response);
        setError(null);
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to submit comment";
        console.error("❌ Hook error:", errorMessage);
        console.error("Full error object:", err);
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        console.log("Hook finally block - setting loading to false");
        setLoading(false);
      }
    },
    [],
  );

  return { loading, error, submitComment };
};
