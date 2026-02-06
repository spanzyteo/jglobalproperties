import { EventsAPIResponse, FormattedEvent, EventAPIData } from "./types";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://api.jglobalproperties.com/api/v1";

const formatEvent = (event: EventAPIData): FormattedEvent => {
  return {
    id: event.id,
    title: event.title,
    slug: event.slug,
    description: event.description,
    location: event.location,
    date: event.date,
    organizer: event.organizer,
    isPast: event.isPast,
    image: event.image,
    createdAt: event.createdAt,
  };
};

export const getEvents = async (
  page: number = 1,
  perPage: number = 8,
): Promise<{
  events: FormattedEvent[];
  pagination: EventsAPIResponse["data"]["pagination"];
}> => {
  try {
    const response = await fetch(
      `${BASE_URL}/events?page=${page}&limit=${perPage}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }

    const data: EventsAPIResponse = await response.json();

    if (!data.success) {
      throw new Error("API returned unsuccessful response");
    }

    const formattedEvents = data.data.events.map(formatEvent);

    return {
      events: formattedEvents,
      pagination: data.data.pagination,
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getEventBySlug = async (slug: string): Promise<FormattedEvent> => {
  try {
    const response = await fetch(`${BASE_URL}/events/slug/${slug}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch event: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    if (!data.success) {
      throw new Error("API returned unsuccessful response");
    }

    // Handle both response structures:
    // 1. { success: true, data: { event: {...} } }
    // 2. { success: true, data: { ...event } }
    let eventData: EventAPIData;

    if (data.data.event) {
      // If response contains event property
      eventData = data.data.event;
    } else if (data.data.id) {
      // If response is directly the event object
      eventData = data.data;
    } else {
      throw new Error("Unexpected API response structure");
    }

    return formatEvent(eventData);
  } catch (error) {
    console.error(`Error fetching event by slug ${slug}:`, error);
    throw error;
  }
};

export const getEventsByPastStatus = async (
  isPast: boolean,
  page: number = 1,
  perPage: number = 8,
): Promise<{
  events: FormattedEvent[];
  pagination: EventsAPIResponse["data"]["pagination"];
}> => {
  try {
    const response = await fetch(
      `${BASE_URL}/events?page=${page}&limit=${perPage}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }

    const data: EventsAPIResponse = await response.json();

    if (!data.success) {
      throw new Error("API returned unsuccessful response");
    }

    // Filter events by isPast status on the client side
    const filteredEvents = data.data.events
      .filter((event) => event.isPast === isPast)
      .map(formatEvent);

    return {
      events: filteredEvents,
      pagination: data.data.pagination,
    };
  } catch (error) {
    console.error("Error fetching events by status:", error);
    throw error;
  }
};
