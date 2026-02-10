/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/contact/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { ContactEmail } from "@/app/(main)/emails/ContactEmails";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: "JGlobal Properties <info@app.jglobalproperties.com>",
      to: ["jglobalrealestate@gmail.com"],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      react: await ContactEmail({ name, email, phone, message }), // This line needs @react-email/render
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully!",
        data,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
