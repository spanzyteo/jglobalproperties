/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { searchState } from "../../store/searchSlice";
import { state as nigeriaState } from "locations-ng";
import { useSearchParams } from "next/navigation";
import lands from "../../utils/lands";
import houses from "../../utils/houses";
import PropertyCard from "./PropertyCard";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface FilterState {
  location: string;
  title: string;
  state: string;
  status?: string;
  category?: string;
}

const MapResults = ({
  onFilteredResults,
}: {
  onFilteredResults: (results: any[]) => void;
}) => {
  const search = useAppSelector((state) => state.search.searchOption);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const states = nigeriaState.all();

  const [filters, setFilters] = useState<FilterState>({
    location: "",
    title: "",
    state: "",
    status: "",
    category: "",
  });

  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize filters from URL params
  useEffect(() => {
    const type = searchParams.get("type");
    const title = searchParams.get("title");
    const location = searchParams.get("location");
    const state = searchParams.get("state");

    if (type === "lands" || type === "houses") {
      dispatch(searchState(type));
    }

    setFilters({
      location: location || "",
      title: title || "",
      state: state || "",
      status: "",
      category: "",
    });
  }, [searchParams, dispatch]);

  // Filter results whenever filters or search type changes
  useEffect(() => {
    setIsLoading(true);

    // Simulate slight delay for better UX (remove in production with real API)
    const timer = setTimeout(() => {
      const dataSource = search === "lands" ? lands : houses;

      const results = dataSource.filter((item) => {
        const matchesTitle =
          !filters.title ||
          item.title.toLowerCase().includes(filters.title.toLowerCase());

        const matchesLocation =
          !filters.location ||
          item.location.toLowerCase().includes(filters.location.toLowerCase());

        const matchesState =
          !filters.state ||
          item.state.toLowerCase() === filters.state.toLowerCase();

        // For lands - check status
        const matchesStatus =
          search === "lands" && filters.status
            ? (item as any).status ===
              filters.status.toUpperCase().replace("-", " ")
            : true;

        // For houses - check category
        const matchesCategory =
          search === "houses" && filters.category
            ? (item as any).category.toLowerCase().replace(" ", "-") ===
              filters.category
            : true;

        return (
          matchesTitle &&
          matchesLocation &&
          matchesState &&
          matchesStatus &&
          matchesCategory
        );
      });

      setFilteredResults(results);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [filters, search]); // Remove onFilteredResults from dependencies

  // Separate effect to notify parent - only when results actually change
  useEffect(() => {
    onFilteredResults(filteredResults);
  }, [filteredResults]); // Only depend on filteredResults, not the callback

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      title: "",
      state: "",
      status: "",
      category: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div className="flex flex-col w-full md:w-1/2 lg:w-2/5 px-4 py-6 gap-6">
      {/* Filter Panel - Sticky on scroll */}
      <div className="rounded-lg p-5 bg-white shadow-md  top-[4.1875rem] lg:top-[6rem] z-10">
        {/* Main Location Search */}
        <div className="mb-4">
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            placeholder="Search by location..."
            className="w-full border border-gray-200 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#941A1A]/20 focus:border-[#941A1A] transition-all duration-300"
          />
        </div>

        {/* Property Type Toggle */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => dispatch(searchState("lands"))}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-300 ${
              search === "lands"
                ? "bg-black text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Lands
          </button>
          <button
            onClick={() => dispatch(searchState("houses"))}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-300 ${
              search === "houses"
                ? "bg-black text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Houses
          </button>
        </div>

        {/* Advanced Filters */}
        {search === "lands" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <input
              type="text"
              name="title"
              value={filters.title}
              onChange={handleInputChange}
              placeholder="Property title..."
              className="w-full border border-gray-200 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#941A1A]/20 focus:border-[#941A1A] transition-all"
            />
            <select
              name="state"
              value={filters.state}
              onChange={handleInputChange}
              className="w-full border border-gray-200 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#941A1A]/20 focus:border-[#941A1A] transition-all"
            >
              <option value="">All States</option>
              {states.map((st) => (
                <option key={st.name} value={st.name}>
                  {st.name}
                </option>
              ))}
            </select>
            <select
              name="status"
              value={filters.status}
              onChange={handleInputChange}
              className="w-full border border-gray-200 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#941A1A]/20 focus:border-[#941A1A] transition-all lg:col-span-2"
            >
              <option value="">All Status</option>
              <option value="for-sale">For Sale</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        )}

        {search === "houses" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <input
              type="text"
              name="title"
              value={filters.title}
              onChange={handleInputChange}
              placeholder="Property title..."
              className="w-full border border-gray-200 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#941A1A]/20 focus:border-[#941A1A] transition-all"
            />
            <select
              name="state"
              value={filters.state}
              onChange={handleInputChange}
              className="w-full border border-gray-200 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#941A1A]/20 focus:border-[#941A1A] transition-all"
            >
              <option value="">All States</option>
              {states.map((st) => (
                <option key={st.name} value={st.name}>
                  {st.name}
                </option>
              ))}
            </select>
            <select
              name="category"
              value={filters.category}
              onChange={handleInputChange}
              className="w-full border border-gray-200 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#941A1A]/20 focus:border-[#941A1A] transition-all lg:col-span-2"
            >
              <option value="">All Categories</option>
              <option value="finished-homes">Finished Homes</option>
              <option value="off-plan-homes">Off Plan Homes</option>
            </select>
          </div>
        )}

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="mt-3 w-full py-2 text-sm text-gray-600 hover:text-[#941A1A] transition-colors"
          >
            Clear all filters
          </button>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mt-5 pt-5 border-t">
          <h1
            className={`${playfair.className} text-2xl md:text-3xl font-medium`}
          >
            Advanced Search
          </h1>
          <span className="text-lg font-semibold text-[#941A1A]">
            ({filteredResults.length})
          </span>
        </div>
      </div>

      {/* Results Grid - Scrollable */}
      <div className="w-full pb-6">
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <p className="text-gray-600 text-lg font-medium mb-2">
              No properties found
            </p>
            <p className="text-gray-400 text-sm">
              Try adjusting your filters to see more results
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredResults.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                type={search}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapResults;
