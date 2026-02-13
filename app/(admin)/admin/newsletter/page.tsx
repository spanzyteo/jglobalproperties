/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import axiosWithAuth from "@/app/utils/axiosWithAuth";
import { FiUsers, FiMail, FiDownload, FiTrendingUp } from "react-icons/fi";

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  subscribedAt: string;
  source: string | null;
}

interface Stats {
  active: number;
  inactive: number;
  total: number;
}

export default function NewsletterDashboard() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axiosWithAuth.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/newsletter/subscribers?page=${page}&limit=50`,
      );

      setSubscribers(response.data.subscribers);
      setStats(response.data.stats);
    } catch (error: any) {
      console.error("Error fetching subscribers:", error);
      const message =
        error.response?.data?.message || "Failed to load subscribers";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const response = await axiosWithAuth.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/newsletter/export`,
        {
          responseType: "blob",
        },
      );

      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `newsletter-subscribers-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Subscribers exported successfully!");
    } catch (error: any) {
      console.error("Error exporting:", error);
      const message =
        error.response?.data?.message || "Failed to export subscribers";
      toast.error(message);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#941A1A] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading subscribers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto xl:ml-80">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Newsletter Management
        </h1>
        <p className="text-gray-600">
          Manage your newsletter subscribers and campaigns
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Subscribers</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats?.active || 0}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FiUsers className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Subscribers</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats?.total || 0}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FiTrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Unsubscribed</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats?.inactive || 0}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <FiMail className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Link
          href="/admin/newsletter/compose"
          className="bg-[#941A1A] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#7a1616] transition-colors flex items-center gap-2"
        >
          <FiMail className="w-5 h-5" />
          Compose Newsletter
        </Link>

        <button
          onClick={handleExport}
          disabled={exporting || (stats?.active || 0) === 0}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiDownload className="w-5 h-5" />
          {exporting ? "Exporting..." : "Export Subscribers"}
        </button>

        <Link
          href="/admin/newsletter/history"
          className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          View Campaign History
        </Link>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Subscribers
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscribed At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscribers.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No subscribers yet
                  </td>
                </tr>
              ) : (
                subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {subscriber.name || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        {subscriber.source || "unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(subscriber.subscribedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
