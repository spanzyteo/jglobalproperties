/**
 * Constants for the Add New Land feature
 */

export const STATUS_OPTIONS = [
  { value: "FOR_SALE", label: "For Sale" },
  { value: "SOLD", label: "Sold" },
  { value: "RESERVED", label: "Reserved" },
];

export const UNIT_OPTIONS = ["sqm", "sqft", "acres", "hectares"];

export const DEFAULT_UNIT = {
  size: 0,
  unit: "sqm" as const,
  price: "",
  available: true,
};

export const DEFAULT_COUNTRY = "Nigeria";
export const DEFAULT_STATUS = "FOR_SALE";

// API Configuration
export const LANDS_API_ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/lands`;
