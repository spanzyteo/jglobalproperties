/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axiosWithAuth from "@/app/utils/axiosWithAuth";
import { toast } from "sonner";
import Link from "next/link";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);
  const [unsubscribed, setUnsubscribed] = useState(false);

  const handleUnsubscribe = async () => {
    if (!email) {
      toast.error("No email address provided");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosWithAuth.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/newsletter/unsubscribe`,
        { email },
      );

      if (response.data.success) {
        setUnsubscribed(true);
        toast.success("Successfully unsubscribed from newsletter");
      } else {
        toast.error(response.data.message || "Failed to unsubscribe");
      }
    } catch (error: any) {
      console.error("Error unsubscribing:", error);
      const message =
        error.response?.data?.message ||
        "Failed to unsubscribe. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Invalid Request
          </h1>
          <p className="text-gray-600 mb-6">No email address was provided.</p>
          <Link
            href="/"
            className="inline-block bg-[#941A1A] text-white px-6 py-3 rounded-lg hover:bg-[#7a1616] transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  if (unsubscribed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Unsubscribed Successfully
          </h1>
          <p className="text-gray-600 mb-6">
            You&apos;ve been removed from our newsletter list. We&apos;re sorry
            to see you go!
          </p>
          <Link
            href="/"
            className="inline-block bg-[#941A1A] text-white px-6 py-3 rounded-lg hover:bg-[#7a1616] transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Unsubscribe from Newsletter
        </h1>
        <p className="text-gray-600 mb-6">
          We&apos;re sorry to see you go! Click the button below to unsubscribe
          from our newsletter.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600">Email address:</p>
          <p className="font-medium text-gray-900">{email}</p>
        </div>

        <button
          onClick={handleUnsubscribe}
          disabled={loading}
          className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3 cursor-pointer"
        >
          {loading ? "Unsubscribing..." : "Unsubscribe"}
        </button>

        <Link
          href="/"
          className="block w-full text-center bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#941A1A]"></div>
        </div>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  );
}
