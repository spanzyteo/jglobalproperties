import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("📨 Comment API route received POST request");

  try {
    const body = await request.json();
    console.log("📩 Request body:", body);

    // Validate required fields
    const { post, author_name, author_email, content } = body;

    console.log("✓ Extracted fields:", {
      post,
      author_name,
      author_email,
      content,
    });

    if (!post || !author_name || !author_email || !content) {
      console.warn("❌ Missing required fields");
      return NextResponse.json(
        {
          error:
            "Missing required fields: post, author_name, author_email, content",
        },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(author_email)) {
      console.warn("❌ Invalid email format:", author_email);
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Call WordPress REST API from the server side
    // This avoids CORS issues and allows for better error handling
    const wordPressUrl =
      process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
      "https://cms.jglobalproperties.com/wp-json/wp/v2";

    // Try with unauthenticated request first
    const commentPayload = {
      post: parseInt(post),
      author_name: author_name.trim(),
      author_email: author_email.trim(),
      content: content.trim(),
      parent: body.parent || 0,
    };

    // Build Authorization header if credentials are provided in environment
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // If WordPress credentials are available, use them
    if (process.env.WORDPRESS_USERNAME && process.env.WORDPRESS_PASSWORD) {
      try {
        // Properly encode credentials with special characters
        const username = process.env.WORDPRESS_USERNAME;
        const password = process.env.WORDPRESS_PASSWORD;
        const credentials = Buffer.from(`${username}:${password}`).toString(
          "base64",
        );
        headers["Authorization"] = `Basic ${credentials}`;
        console.log("✓ Using Basic Authentication");
      } catch (error) {
        console.error("Error encoding credentials:", error);
      }
    } else {
      console.log(
        "⚠ No WordPress credentials provided, attempting unauthenticated request",
      );
    }

    console.log("📤 Sending comment to WordPress:", {
      url: `${wordPressUrl}/comments`,
      hasAuth: !!headers["Authorization"],
      payload: commentPayload,
    });

    const response = await fetch(`${wordPressUrl}/comments`, {
      method: "POST",
      headers,
      body: JSON.stringify(commentPayload),
    });

    // Log response details for debugging
    console.log("📥 WordPress Response Status:", response.status);

    if (!response.ok) {
      let errorMessage = `Failed to submit comment (Status: ${response.status})`;
      let fullError: Record<string, unknown> = {};

      try {
        const errorData = await response.json();
        console.error("❌ WordPress Error Response:", errorData);

        fullError = errorData;

        if (errorData.message) {
          errorMessage = errorData.message;
        }

        // Handle specific error codes
        if (errorData.code === "rest_cannot_create") {
          errorMessage =
            "You don't have permission to create comments. Please check WordPress settings.";
        } else if (errorData.code === "rest_authentication_required") {
          errorMessage =
            "Authentication failed. Please verify your credentials.";
        } else if (errorData.code === "rest_invalid_param") {
          errorMessage =
            "Invalid comment data. Please check all fields and try again.";
        } else if (errorData.message?.includes("authenticated")) {
          errorMessage =
            "Authentication required. Your comment will be reviewed by an administrator.";
        }
      } catch {
        // Response is not JSON
        const text = await response.text();
        console.error("❌ Non-JSON Error Response:", text);
      }

      return NextResponse.json(
        { error: errorMessage, details: fullError },
        { status: response.status },
      );
    }

    const result = await response.json();
    console.log("✅ Comment created successfully:", result.id);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("❌ Comment API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 },
    );
  }
}
