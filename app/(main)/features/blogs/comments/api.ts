import { CommentPayload, CommentResponse } from "./types";

// Use the Next.js API route as a proxy to avoid CORS issues
const API_URL = "/api/comments";
const WP_BASE_URL = "https://cms.jglobalproperties.com/wp-json/wp/v2";

export const submitBlogComment = async (
  payload: CommentPayload,
): Promise<CommentResponse> => {
  console.log("🌐 submitBlogComment API function called");
  console.log("📋 Payload:", payload);

  try {
    // Use the Next.js API proxy route for better security and CORS handling
    console.log("🔗 Calling fetch to", API_URL);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post: payload.post,
        author_name: payload.author_name,
        author_email: payload.author_email,
        content: payload.content,
        parent: payload.parent || 0,
      }),
    });

    console.log("📬 Fetch completed, status:", response.status);

    if (!response.ok) {
      let errorMessage = `Failed to submit comment: ${response.statusText}`;

      try {
        const errorData = await response.json();
        console.error("❌ API returned error:", errorData);
        if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (parseError) {
        // If response is not JSON, use the default message
        console.error("Could not parse error response:", parseError);
      }

      throw new Error(errorMessage);
    }

    const data: CommentResponse = await response.json();
    console.log("✅ Successfully parsed response:", data);
    return data;
  } catch (error) {
    console.error("Error in submitBlogComment:", error);
    // Provide more helpful error messages
    if (
      error instanceof TypeError &&
      error.message.includes("Failed to fetch")
    ) {
      throw new Error(
        "Network error. Please check your connection or try again later.",
      );
    }
    throw error;
  }
};

export const getBlogComments = async (
  postId: number,
  page: number = 1,
  perPage: number = 10,
): Promise<{
  comments: CommentResponse[];
  total: number;
  totalPages: number;
}> => {
  try {
    const response = await fetch(
      `${WP_BASE_URL}/comments?post=${postId}&per_page=${perPage}&page=${page}&status=approve`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.statusText}`);
    }

    const comments: CommentResponse[] = await response.json();
    const total = parseInt(response.headers.get("x-wp-total") || "0", 10);
    const totalPages = parseInt(
      response.headers.get("x-wp-totalpages") || "0",
      10,
    );

    return { comments, total, totalPages };
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};
