import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['10.79.195.158', 'localhost:3000'],
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
  async redirects() {
    return [
      {
        source: '/portfolio/realstate-website',
        destination: '/portfolio/real-estate-website',
        permanent: true,
      },
      {
        source: '/portfolio/Full-stack-web-app',
        destination: '/portfolio/full-stack-web-app',
        permanent: true,
      },
      {
        source: '/portfolio/yourchoiceproperties-real-estate-portal',
        destination: '/portfolio/real-estate-website',
        permanent: true,
      },
      {
        source: '/portfolio/Yourchoiceproperties-real-estate-portal',
        destination: '/portfolio/real-estate-website',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
