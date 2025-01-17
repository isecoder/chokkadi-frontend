import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match API calls starting with /api
        destination: `${process.env.NEXT_PUBLIC_URL}/api/:path*`, // Use the environment variable for the API URL
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wypeydidbspluuiqhjua.supabase.co", // Allow images from your Supabase host
        pathname: "/storage/v1/object/public/harihara_image/images/**", // Match the public Supabase storage image path
      },
    ],
  },
};

export default nextConfig;
