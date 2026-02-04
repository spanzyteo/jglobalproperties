/**
 * Image Optimization Utility
 * Provides optimized image props and configurations for faster loading
 */

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  loading?: "lazy" | "eager";
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

/**
 * Get optimized image props for Next.js Image component
 * Automatically applies best practices for performance
 */
export const getOptimizedImageProps = (
  src: string,
  alt: string,
  options?: {
    priority?: boolean;
    width?: number;
    height?: number;
    quality?: number;
    sizes?: string;
  },
): OptimizedImageProps => {
  const {
    priority = false,
    width,
    height,
    quality = 75, // Balance between quality and file size
    sizes,
  } = options || {};

  return {
    src,
    alt,
    width,
    height,
    priority,
    quality,
    sizes: sizes || getResponsiveSizes(),
    loading: priority ? "eager" : "lazy",
    placeholder: "empty",
  };
};

/**
 * Get responsive image sizes for srcset
 * Optimized for common breakpoints
 */
export const getResponsiveSizes = (): string => {
  return "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 80vw, 1200px";
};

/**
 * Optimize image URL for backend images
 * Adds query parameters for image optimization
 */
export const optimizeImageUrl = (
  url: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "webp" | "auto";
  },
): string => {
  if (!url) return url;

  // For Cloudinary URLs
  if (url.includes("res.cloudinary.com")) {
    const {
      width = 1200,
      height,
      quality = 75,
      format = "auto",
    } = options || {};
    const baseUrl = url.split("/upload/")[0];
    const imagePath = url.split("/upload/")[1];

    if (!imagePath) return url;

    // Build Cloudinary transformation
    const transformations = [
      `w_${width}`, // Width
      `q_${quality}`, // Quality
      `f_${format}`, // Format (auto will serve WebP to browsers that support it)
      "c_limit", // Don't upscale
    ];

    if (height) {
      transformations.push(`h_${height}`);
      transformations.push("c_fill"); // Fill the dimensions
    }

    return `${baseUrl}/upload/${transformations.join(",")}/${imagePath}`;
  }

  // For other URLs, return as-is (Next.js will optimize them)
  return url;
};

/**
 * Image quality presets for different use cases
 */
export const IMAGE_QUALITY = {
  THUMBNAIL: 60, // Small preview images
  STANDARD: 75, // Most images
  HIGH: 85, // Hero images, important content
  LOSSLESS: 100, // Icons, logos
} as const;

/**
 * Image dimension presets for responsive design
 */
export const IMAGE_SIZES = {
  THUMBNAIL: { width: 150, height: 150 },
  CARD: { width: 400, height: 300 },
  HERO: { width: 1200, height: 600 },
  FULL_WIDTH: { width: 1920, height: 1080 },
} as const;

/**
 * Get optimized sizes prop for common image layouts
 */
export const getSizesForLayout = (layout: keyof typeof IMAGE_SIZES): string => {
  switch (layout) {
    case "THUMBNAIL":
      return "(max-width: 640px) 100px, 150px";
    case "CARD":
      return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px";
    case "HERO":
      return "100vw";
    case "FULL_WIDTH":
      return "100vw";
    default:
      return getResponsiveSizes();
  }
};
