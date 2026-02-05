"use client";

import { useEffect, useState, useCallback } from "react";
import { getLands, getLandBySlug, getLandsByStatus } from "./api";
import { FormattedLand, LandPagination } from "./types";

export const useLandsByStatus = (status: string, perPage: number = 8) => {
  const [lands, setLands] = useState<FormattedLand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<LandPagination | null>(null);

  const fetchLands = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);
      try {
        const { lands: fetchedLands, pagination: paginationData } =
          await getLandsByStatus(status, page, perPage);
        setLands(fetchedLands);
        setPagination(paginationData);
        setCurrentPage(page);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch lands");
        setLands([]);
      } finally {
        setLoading(false);
      }
    },
    [status, perPage],
  );

  useEffect(() => {
    fetchLands(1);
  }, [fetchLands]);

  const goToPage = (page: number) => {
    if (pagination && page >= 1 && page <= pagination.totalPages) {
      fetchLands(page);
    }
  };

  return {
    lands,
    loading,
    error,
    currentPage,
    pagination,
    goToPage,
    refetch: () => fetchLands(currentPage),
  };
};

export const useAllLands = (perPage: number = 8) => {
  const [lands, setLands] = useState<FormattedLand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<LandPagination | null>(null);

  const fetchLands = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);
      try {
        const { lands: fetchedLands, pagination: paginationData } =
          await getLands(page, perPage);
        setLands(fetchedLands);
        setPagination(paginationData);
        setCurrentPage(page);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch lands");
        setLands([]);
      } finally {
        setLoading(false);
      }
    },
    [perPage],
  );

  useEffect(() => {
    fetchLands(1);
  }, [fetchLands]);

  const goToPage = (page: number) => {
    if (pagination && page >= 1 && page <= pagination.totalPages) {
      fetchLands(page);
    }
  };

  return {
    lands,
    loading,
    error,
    currentPage,
    pagination,
    goToPage,
    refetch: () => fetchLands(currentPage),
  };
};

export const useLandBySlug = (slug: string) => {
  const [land, setLand] = useState<FormattedLand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchLand = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedLand = await getLandBySlug(slug);
        setLand(fetchedLand);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch land");
        setLand(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLand();
  }, [slug]);

  return { land, loading, error };
};

export const useFeaturedLands = (limit: number = 8) => {
  const [lands, setLands] = useState<FormattedLand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLands = async () => {
      setLoading(true);
      setError(null);
      try {
        const { lands: fetchedLands } = await getLands(1, limit);
        setLands(fetchedLands);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch lands");
        setLands([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLands();
  }, [limit]);

  return { lands, loading, error };
};
