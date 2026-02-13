/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api/v1";
    const backendResponse = await axios.post(`${backendUrl}/auth/signin`, {
      email,
      password,
    });

    const data = await backendResponse.data;

    if (backendResponse.status !== 200) {
      return NextResponse.json({
        message: "Login failed",
        status: backendResponse.status,
      });
    }

    const response = NextResponse.json({
      success: true,
      user: data.user,
      message: data.message,
      access_token: data.access_token, // Include token from backend for client
    });

    const setCookieHeaders = backendResponse.headers["set-cookie"];

    if (setCookieHeaders && Array.isArray(setCookieHeaders)) {
      setCookieHeaders.forEach((cookie) => {
        response.headers.append("Set-Cookie", cookie);
      });
    }

    return response;
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
