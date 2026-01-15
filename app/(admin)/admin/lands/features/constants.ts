/**
 * Shared constants for the entire Land management section
 * Located at: app/(admin)/admin/lands/features/constants.ts
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

// Pagination
export const ITEMS_PER_PAGE = 10;

// Table columns for lands list
export const LAND_TABLE_COLUMNS = [
  { key: "title", label: "Title", sortable: true },
  { key: "location", label: "Location", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "units", label: "Units", sortable: false },
  { key: "createdAt", label: "Created", sortable: true },
  { key: "actions", label: "Actions", sortable: false },
];
