import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "cms.jglobalproperties.com",
      },
    ],
    // Optimize image delivery
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
