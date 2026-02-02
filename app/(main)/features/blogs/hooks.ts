"use client";

import { useEffect, useState, useCallback } from "react";
import { getBlogs } from "./api";
import { FormattedBlog } from "./types";

export const usePaginatedBlogs = (perPage: number = 8) => {
  const [blogs, setBlogs] = useState<FormattedBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchBlogs = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);
      try {
        const {
          blogs: fetchedBlogs,
          totalPages: pages,
          total: count,
        } = await getBlogs(page, perPage);
        setBlogs(fetchedBlogs);
        setTotalPages(pages);
        setTotal(count);
        setCurrentPage(page);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch blogs");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    },
    [perPage],
  );

  useEffect(() => {
    fetchBlogs(1);
  }, [fetchBlogs]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchBlogs(page);
    }
  };

  return {
    blogs,
    loading,
    error,
    currentPage,
    totalPages,
    total,
    goToPage,
    refetch: () => fetchBlogs(currentPage),
  };
};

export const useHomepageBlogs = (limit: number = 8) => {
  const [blogs, setBlogs] = useState<FormattedBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const { blogs: fetchedBlogs } = await getBlogs(1, limit);
        setBlogs(fetchedBlogs);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch blogs");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [limit]);

  return { blogs, loading, error };
};
