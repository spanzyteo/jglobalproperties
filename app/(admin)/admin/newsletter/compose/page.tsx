/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosWithAuth from "@/app/utils/axiosWithAuth";
import { toast } from "sonner";
import TipTapEditor from "@/app/(admin)/admin/components/editor/TipTapEditor";
import { FiSend, FiEye, FiAlertTriangle } from "react-icons/fi";

export default function ComposeNewsletter() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [sending, setSending] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axiosWithAuth.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/newsletter/statistics`,
        );
        setSubscriberCount(response.data.totalActive || 0);
      } catch (error: any) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchStatistics();
  }, []);

  const handleSend = async () => {
    if (!subject.trim()) {
      toast.error("Please enter a subject line");
      return;
    }

    if (!content.trim()) {
      toast.error("Please enter newsletter content");
      return;
    }

    // Show warning first
    setShowWarning(true);
  };

  const confirmSend = async () => {
    try {
      setSending(true);
      setShowWarning(false);

      const response = await axiosWithAuth.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/newsletter/send`,
        {
          subject,
          content,
        },
      );

      if (response.data.success) {
        toast.success(response.data.message, {
          description: `Sent to ${response.data.sentCount} subscribers${
            response.data.failedCount > 0
              ? `. ${response.data.failedCount} failed.`
              : ""
          }`,
          duration: 6000,
        });

        // Redirect to history page
        setTimeout(() => {
          router.push("/admin/newsletter/history");
        }, 2000);
      } else {
        toast.error("Failed to send newsletter", {
          description: response.data.message || "Please try again later",
        });
      }
    } catch (error: any) {
      console.error("Error sending newsletter:", error);
      const message =
        error.response?.data?.message || "Failed to send newsletter";
      toast.error(message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto xl:ml-80">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Compose Newsletter
        </h1>
        <p className="text-gray-600">
          Create and send a newsletter to{" "}
          {subscriberCount !== null ? subscriberCount : "..."} active
          subscribers
        </p>
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <FiAlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Confirm Send</h3>
            </div>

            <p className="text-gray-600 mb-2">
              You are about to send this newsletter to{" "}
              <span className="font-bold text-gray-900">
                {subscriberCount} subscribers
              </span>
              .
            </p>

            {subscriberCount && subscriberCount > 100 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> You have {subscriberCount} subscribers.
                  Due to Resend&apos;s free tier limit (100 emails/day), sending
                  will be done in batches:
                </p>
                <ul className="text-sm text-yellow-800 mt-2 ml-4 list-disc">
                  <li>First batch: 100 emails (sent immediately)</li>
                  <li>
                    Remaining {subscriberCount - 100} emails in subsequent
                    batches
                  </li>
                </ul>
              </div>
            )}

            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone. Make sure you&apos;ve reviewed the
              content and subject line.
            </p>

            <div className="flex gap-3">
              <button
                onClick={confirmSend}
                disabled={sending}
                className="flex-1 bg-[#941A1A] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#7a1616] transition-colors disabled:opacity-50"
              >
                {sending ? "Sending..." : "Yes, Send Newsletter"}
              </button>
              <button
                onClick={() => setShowWarning(false)}
                disabled={sending}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-3xl w-full my-8">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Email Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {/* Email Preview */}
              <div
                style={{
                  fontFamily: "Arial, sans-serif",
                  backgroundColor: "#f4f4f4",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    maxWidth: "600px",
                    margin: "0 auto",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      backgroundColor: "#941A1A",
                      padding: "30px",
                      textAlign: "center",
                    }}
                  >
                    <h1
                      style={{ color: "#ffffff", margin: 0, fontSize: "24px" }}
                    >
                      JGlobal Properties Newsletter
                    </h1>
                  </div>

                  {/* Subject */}
                  <div
                    style={{
                      padding: "20px 30px",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    <p
                      style={{ margin: 0, fontSize: "14px", color: "#666666" }}
                    >
                      Subject:
                    </p>
                    <p
                      style={{
                        margin: "5px 0 0 0",
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#333333",
                      }}
                    >
                      {subject || "No subject"}
                    </p>
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      padding: "40px 30px",
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#333333",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: content || "<p>No content</p>",
                    }}
                  />

                  {/* Footer */}
                  <div
                    style={{
                      backgroundColor: "#f8f8f8",
                      padding: "30px",
                      textAlign: "center",
                      borderTop: "1px solid #e0e0e0",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 10px",
                        fontSize: "14px",
                        color: "#666666",
                      }}
                    >
                      JGlobal Properties - Your Trusted Real Estate Partner
                    </p>
                    <p
                      style={{
                        margin: "0 0 10px",
                        fontSize: "12px",
                        color: "#999999",
                      }}
                    >
                      S Deasant Valley Lekki Ajah Expressway, Lagos, Nigeria
                    </p>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "12px",
                        color: "#999999",
                      }}
                    >
                      © {new Date().getFullYear()} JGlobal Properties. All
                      rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowPreview(false)}
                className="w-full bg-gray-200 text-gray-800 px-4 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject Line *
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter newsletter subject..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#941A1A]"
            maxLength={100}
          />
          <p className="text-sm text-gray-500 mt-1">
            {subject.length}/100 characters
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Newsletter Content *
          </label>
          <TipTapEditor value={content} onChange={setContent} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleSend}
          disabled={sending || !subject.trim() || !content.trim()}
          className="bg-[#941A1A] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#7a1616] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiSend className="w-5 h-5" />
          {sending ? "Sending..." : "Send Newsletter"}
        </button>

        <button
          onClick={() => setShowPreview(true)}
          disabled={!subject.trim() && !content.trim()}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <FiEye className="w-5 h-5" />
          Preview Email
        </button>

        <button
          onClick={() => router.push("/admin/newsletter")}
          className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
