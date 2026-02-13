/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axiosWithAuth from "@/app/utils/axiosWithAuth";
import { toast } from "sonner";
import Link from "next/link";
import { FiArrowLeft, FiMail, FiCheck, FiX, FiClock } from "react-icons/fi";

interface Campaign {
  id: string;
  subject: string;
  content: string;
  status: string;
  totalRecipients: number;
  sentCount: number;
  failedCount: number;
  sentAt: string | null;
  createdAt: string;
}

export default function NewsletterHistory() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await axiosWithAuth.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/newsletter/campaigns`,
      );

      setCampaigns(response.data.campaigns);
    } catch (error: any) {
      console.error("Error fetching campaigns:", error);
      const message =
        error.response?.data?.message || "Failed to load campaign history";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SENT":
        return "bg-green-100 text-green-800";
      case "FAILED":
        return "bg-red-100 text-red-800";
      case "PARTIALLY_SENT":
        return "bg-yellow-100 text-yellow-800";
      case "SENDING":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SENT":
        return <FiCheck className="w-4 h-4" />;
      case "FAILED":
        return <FiX className="w-4 h-4" />;
      case "SENDING":
        return <FiClock className="w-4 h-4" />;
      default:
        return <FiMail className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#941A1A] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading campaign history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto xl:ml-80">
      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-3xl w-full my-8">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                Campaign Details
              </h3>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Subject</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedCampaign.subject}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm font-medium ${getStatusColor(selectedCampaign.status)}`}
                  >
                    {getStatusIcon(selectedCampaign.status)}
                    {selectedCampaign.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Recipients</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedCampaign.totalRecipients}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Sent</p>
                  <p className="text-lg font-semibold text-green-600">
                    {selectedCampaign.sentCount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Failed</p>
                  <p className="text-lg font-semibold text-red-600">
                    {selectedCampaign.failedCount}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Content Preview</p>
                <div
                  className="prose max-w-none bg-gray-50 p-4 rounded border border-gray-200 max-h-96 overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: selectedCampaign.content }}
                />
              </div>

              <div className="text-sm text-gray-600">
                <p>
                  Sent:{" "}
                  {selectedCampaign.sentAt
                    ? new Date(selectedCampaign.sentAt).toLocaleString()
                    : "Not sent yet"}
                </p>
                <p className="mt-1">
                  Created:{" "}
                  {new Date(selectedCampaign.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedCampaign(null)}
                className="w-full bg-gray-200 text-gray-800 px-4 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/admin/newsletter"
          className="text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Campaign History
          </h1>
          <p className="text-gray-600">
            View all sent newsletters and their statistics
          </p>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {campaigns.length === 0 ? (
          <div className="p-12 text-center">
            <FiMail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-6">No campaigns sent yet</p>
            <Link
              href="/admin/newsletter/compose"
              className="inline-block bg-[#941A1A] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#7a1616] transition-colors"
            >
              Send Your First Newsletter
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recipients
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sent / Failed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sent At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {campaign.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(campaign.status)}`}
                      >
                        {getStatusIcon(campaign.status)}
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.totalRecipients}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="text-green-600 font-medium">
                        {campaign.sentCount}
                      </span>
                      {" / "}
                      <span className="text-red-600 font-medium">
                        {campaign.failedCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {campaign.sentAt
                        ? new Date(campaign.sentAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )
                        : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setSelectedCampaign(campaign)}
                        className="text-[#941A1A] hover:text-[#7a1616] font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
