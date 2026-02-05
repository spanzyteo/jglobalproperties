import { LandsAPIResponse, FormattedLand, LandAPIData } from "./types";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://api.jglobalproperties.com/api/v1";

const formatLand = (land: LandAPIData): FormattedLand => {
  return {
    id: land.id,
    title: land.title,
    slug: land.slug,
    overview: land.overview,
    location: land.location,
    state: land.state,
    country: land.country,
    status: land.status,
    averageRating: land.averageRating,
    totalReviews: land.totalReviews,
    images: land.images,
    units: land.units,
    createdAt: land.createdAt,
  };
};

export const getLands = async (
  page: number = 1,
  perPage: number = 8,
): Promise<{
  lands: FormattedLand[];
  pagination: LandsAPIResponse["data"]["pagination"];
}> => {
  try {
    const response = await fetch(
      `${BASE_URL}/lands?page=${page}&limit=${perPage}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch lands: ${response.statusText}`);
    }

    const data: LandsAPIResponse = await response.json();

    if (!data.success) {
      throw new Error("API returned unsuccessful response");
    }

    const formattedLands = data.data.lands.map(formatLand);

    return {
      lands: formattedLands,
      pagination: data.data.pagination,
    };
  } catch (error) {
    console.error("Error fetching lands:", error);
    throw error;
  }
};

export const getLandBySlug = async (slug: string): Promise<FormattedLand> => {
  try {
    const response = await fetch(`${BASE_URL}/lands/slug/${slug}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch land: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    if (!data.success) {
      throw new Error("API returned unsuccessful response");
    }

    // Handle both response structures:
    // 1. { success: true, data: { lands: [...] } }
    // 2. { success: true, data: { ...land } }
    let land: LandAPIData;

    if (Array.isArray(data.data.lands)) {
      // If response contains array, take first item
      land = data.data.lands[0];
    } else if (data.data.id) {
      // If response is directly the land object
      land = data.data;
    } else {
      throw new Error("Unexpected API response structure");
    }

    return formatLand(land);
  } catch (error) {
    console.error("Error fetching land by slug:", error);
    throw error;
  }
};

export const getLandsByStatus = async (
  status: string,
  page: number = 1,
  perPage: number = 8,
): Promise<{
  lands: FormattedLand[];
  pagination: LandsAPIResponse["data"]["pagination"];
}> => {
  try {
    const response = await fetch(
      `${BASE_URL}/lands?status=${status}&page=${page}&limit=${perPage}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch lands: ${response.statusText}`);
    }

    const data: LandsAPIResponse = await response.json();

    if (!data.success) {
      throw new Error("API returned unsuccessful response");
    }

    const formattedLands = data.data.lands.map(formatLand);

    return {
      lands: formattedLands,
      pagination: data.data.pagination,
    };
  } catch (error) {
    console.error("Error fetching lands by status:", error);
    throw error;
  }
};
