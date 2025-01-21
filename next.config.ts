import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Commenting out rewrites functionality
  /*
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match API calls starting with /api
        destination: `${process.env.NEXT_PUBLIC_URL}/v1/api/:path*`, // Use the environment variable for the API URL
      },
    ];
  },
  */
  // Commenting out images configuration
  /*
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL || "")
          .hostname, // Dynamically fetch the hostname from storage URL
        pathname:
          new URL(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL || "").pathname +
          "/**", // Match the storage path dynamically
      },
    ],
  },
  */
};

export default nextConfig;
