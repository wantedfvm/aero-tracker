import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Required for GitHub Pages hosting
  basePath: process.env.NODE_ENV === "production" ? "/aero-tracker" : "",
  images: {
    unoptimized: true, // GitHub Pages does not support Next.js image optimization
  },
};

export default nextConfig;
