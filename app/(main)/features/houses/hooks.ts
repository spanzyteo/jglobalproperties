"use client";

import { useEffect, useState, useCallback } from "react";
import { getHouses, getHousesByCategory, getHouseById } from "./api";
import { FormattedHouse, HousePagination } from "./types";

export const useHousesByCategory = (category: string, perPage: number = 8) => {
  const [houses, setHouses] = useState<FormattedHouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<HousePagination | null>(null);

  const fetchHouses = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);
      try {
        const { houses: fetchedHouses, pagination: paginationData } =
          await getHousesByCategory(category, page, perPage);
        setHouses(fetchedHouses);
        setPagination(paginationData);
        setCurrentPage(page);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch houses");
        setHouses([]);
      } finally {
        setLoading(false);
      }
    },
    [category, perPage],
  );

  useEffect(() => {
    fetchHouses(1);
  }, [fetchHouses]);

  const goToPage = (page: number) => {
    if (pagination && page >= 1 && page <= pagination.totalPages) {
      fetchHouses(page);
    }
  };

  return {
    houses,
    loading,
    error,
    currentPage,
    pagination,
    goToPage,
    refetch: () => fetchHouses(currentPage),
  };
};

export const useAllHouses = (perPage: number = 8) => {
  const [houses, setHouses] = useState<FormattedHouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<HousePagination | null>(null);

  const fetchHouses = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);
      try {
        const { houses: fetchedHouses, pagination: paginationData } =
          await getHouses(page, perPage);
        setHouses(fetchedHouses);
        setPagination(paginationData);
        setCurrentPage(page);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch houses");
        setHouses([]);
      } finally {
        setLoading(false);
      }
    },
    [perPage],
  );

  useEffect(() => {
    fetchHouses(1);
  }, [fetchHouses]);

  const goToPage = (page: number) => {
    if (pagination && page >= 1 && page <= pagination.totalPages) {
      fetchHouses(page);
    }
  };

  return {
    houses,
    loading,
    error,
    currentPage,
    pagination,
    goToPage,
    refetch: () => fetchHouses(currentPage),
  };
};

export const useHouseById = (houseId: string) => {
  const [house, setHouse] = useState<FormattedHouse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHouse = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedHouse = await getHouseById(houseId);
        setHouse(fetchedHouse);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch house");
        setHouse(null);
      } finally {
        setLoading(false);
      }
    };

    if (houseId) {
      fetchHouse();
    }
  }, [houseId]);

  return { house, loading, error };
};

export const useFeaturedHouses = (limit: number = 8) => {
  const [houses, setHouses] = useState<FormattedHouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHouses = async () => {
      setLoading(true);
      setError(null);
      try {
        const { houses: fetchedHouses } = await getHouses(1, limit);
        setHouses(fetchedHouses);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch houses");
        setHouses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, [limit]);

  return { houses, loading, error };
};
