"use client";

import { useEffect, useState, useCallback } from "react";
import { getEvents, getEventBySlug, getEventsByPastStatus } from "./api";
import { FormattedEvent, EventPagination } from "./types";

export const useAllEvents = (perPage: number = 8) => {
  const [events, setEvents] = useState<FormattedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<EventPagination | null>(null);

  const fetchEvents = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);
      try {
        const { events: fetchedEvents, pagination: paginationData } =
          await getEvents(page, perPage);
        setEvents(fetchedEvents);
        setPagination(paginationData);
        setCurrentPage(page);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch events");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    },
    [perPage],
  );

  useEffect(() => {
    fetchEvents(1);
  }, [fetchEvents]);

  const goToPage = (page: number) => {
    if (pagination && page >= 1 && page <= pagination.totalPages) {
      fetchEvents(page);
    }
  };

  return {
    events,
    loading,
    error,
    currentPage,
    pagination,
    goToPage,
    refetch: () => fetchEvents(currentPage),
  };
};

export const useEventBySlug = (slug: string | string[]) => {
  const [event, setEvent] = useState<FormattedEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError(null);
      try {
        const slugStr = Array.isArray(slug) ? slug[0] : slug;
        const fetchedEvent = await getEventBySlug(slugStr);
        setEvent(fetchedEvent);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch event");
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchEvent();
    }
  }, [slug]);

  return {
    event,
    loading,
    error,
  };
};

export const useEventsByPastStatus = (isPast: boolean, perPage: number = 8) => {
  const [events, setEvents] = useState<FormattedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<EventPagination | null>(null);

  const fetchEvents = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);
      try {
        const { events: fetchedEvents, pagination: paginationData } =
          await getEventsByPastStatus(isPast, page, perPage);
        setEvents(fetchedEvents);
        setPagination(paginationData);
        setCurrentPage(page);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch events");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    },
    [isPast, perPage],
  );

  useEffect(() => {
    fetchEvents(1);
  }, [fetchEvents]);

  const goToPage = (page: number) => {
    if (pagination && page >= 1 && page <= pagination.totalPages) {
      fetchEvents(page);
    }
  };

  return {
    events,
    loading,
    error,
    currentPage,
    pagination,
    goToPage,
    refetch: () => fetchEvents(currentPage),
  };
};
