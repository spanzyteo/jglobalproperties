/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { memo } from "react";

interface PropertyCardProps {
  property: any;
  type: "lands" | "houses";
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, type }) => {
  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === "string" ? parseInt(price) : price;
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  // Safe data extraction with fallbacks
  const href =
    type === "lands" ? `/lands/${property.id}` : `/houses/${property.id}`;

  // Safely get image URL based on type
  const imageUrl =
    type === "lands"
      ? property.images?.[0]?.url || "/placeholder.jpg"
      : property.image?.[0]?.url || "/placeholder.jpg";

  // Safely get price based on type
  const price =
    type === "lands" ? property.units?.[0]?.price || 0 : property.price || 0;

  return (
    <Link
      href={href}
      className="rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group bg-white"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={property.title || "Property"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status badge for lands */}
        {type === "lands" && property.status && (
          <span
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
              property.status === "FOR SALE"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {property.status}
          </span>
        )}

        {/* Category badge for houses */}
        {type === "houses" && property.category && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 shadow-lg">
            {property.category}
          </span>
        )}
      </div>

      <div className="p-5">
        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-[#941A1A] transition-colors">
          {property.title || "Untitled Property"}
        </h3>

        {/* Location */}
        <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
          <svg
            className="w-4 h-4 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="line-clamp-1">
            {property.location || "Location not specified"},{" "}
            {property.state || "N/A"}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-[#941A1A]">
            {formatPrice(price)}
          </p>

          {/* View details arrow */}
          <div className="flex items-center gap-1 text-sm text-gray-500 group-hover:text-[#941A1A] transition-colors">
            <span className="hidden sm:inline">View</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Additional info for lands */}
        {type === "lands" && property.units?.[0] && (
          <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600">
            <span>
              {property.units[0].size} {property.units[0].unit}
            </span>
          </div>
        )}

        {/* Reviews for lands (if available) */}
        {type === "lands" && property.totalReviews > 0 && (
          <div className="mt-3 flex items-center gap-1 text-sm">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(property.averageRating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600">
              ({property.totalReviews} reviews)
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

// Memoize the component to prevent re-renders when props haven't changed
export default memo(PropertyCard, (prevProps, nextProps) => {
  return (
    prevProps.property.id === nextProps.property.id &&
    prevProps.type === nextProps.type
  );
});
