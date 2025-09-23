import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const backendUrl =
      process.env.BACKEND_URL || "http://localhost:3000/api/v1";
    const response = await axios.post(`${backendUrl}/auth/logout`, {
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
    });

    // Create response
    const nextResponse = NextResponse.json({
      success: true,
      message: "Logout successful",
    });

    // Clear all authentication cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: 0, // Expire immediately
      path: "/",
    };

    nextResponse.cookies.set("access_token", "", cookieOptions);
    nextResponse.cookies.set("user_id", "", cookieOptions);
    nextResponse.cookies.set("user_email", "", {
      ...cookieOptions,
      httpOnly: false,
    });
    nextResponse.cookies.set("user_name", "", {
      ...cookieOptions,
      httpOnly: false,
    });
    nextResponse.cookies.set("is_authenticated", "", {
      ...cookieOptions,
      httpOnly: false,
    });

    return nextResponse;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
