import { HousesAPIResponse, FormattedHouse, HouseAPIData } from "./types";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://api.jglobalproperties.com/api/v1";

const formatHouse = (house: HouseAPIData): FormattedHouse => {
  return {
    id: house.id,
    title: house.title,
    slug: house.slug,
    overview: house.overview,
    location: house.location,
    state: house.state,
    country: house.country,
    price: house.price,
    category: house.category,
    averageRating: house.averageRating,
    totalReviews: house.totalReviews,
    images: house.images,
    units: house.units,
    createdAt: house.createdAt,
  };
};

export const getHouses = async (
  page: number = 1,
  perPage: number = 8,
): Promise<{
  houses: FormattedHouse[];
  pagination: HousesAPIResponse["data"]["pagination"];
}> => {
  try {
    const response = await fetch(
      `${BASE_URL}/houses?page=${page}&limit=${perPage}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch houses: ${response.statusText}`);
    }

    const data: HousesAPIResponse = await response.json();

    if (!data.success) {
      throw new Error("API returned unsuccessful response");
    }

    const formattedHouses = data.data.house.map(formatHouse);

    return {
      houses: formattedHouses,
      pagination: data.data.pagination,
    };
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
};

export const getHouseById = async (id: string): Promise<FormattedHouse> => {
  try {
    const response = await fetch(`${BASE_URL}/houses/${id}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch house: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    if (!data.success) {
      throw new Error("API returned unsuccessful response");
    }

    // Handle both response structures:
    // Structure 1: { success: true, data: { house: {...} } }
    // Structure 2: { success: true, data: {...house properties} }
    const houseData = data.data.house || data.data;

    if (!houseData) {
      throw new Error("House not found");
    }

    return formatHouse(houseData);
  } catch (error) {
    console.error(`Error fetching house ${id}:`, error);
    throw error;
  }
};

export const getHousesByCategory = async (
  category: string,
  page: number = 1,
  perPage: number = 8,
): Promise<{
  houses: FormattedHouse[];
  pagination: HousesAPIResponse["data"]["pagination"];
}> => {
  try {
    const response = await fetch(
      `${BASE_URL}/houses?category=${category}&page=${page}&limit=${perPage}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch houses: ${response.statusText}`);
    }

    const data: HousesAPIResponse = await response.json();

    if (!data.success) {
      throw new Error("API returned unsuccessful response");
    }

    const formattedHouses = data.data.house.map(formatHouse);

    return {
      houses: formattedHouses,
      pagination: data.data.pagination,
    };
  } catch (error) {
    console.error(`Error fetching houses for category ${category}:`, error);
    throw error;
  }
};
