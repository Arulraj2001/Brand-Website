import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Direct CDN loading prevents Next.js dev server SSRF "resolved to private ip" errors on Supabase storage URLs
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
    ],
  },
};

export default nextConfig;
