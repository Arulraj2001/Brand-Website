import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All images come from Supabase CDN or Unsplash — already optimized.
    // Disabling Next.js optimizer prevents "upstream image resolved to private ip" errors.
    unoptimized: true,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
