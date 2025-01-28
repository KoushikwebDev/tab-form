import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public", // PWA files destination
  disable: false,
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = withPWA({
  eslint: {
    // Disable ESLint during the build process
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  // removeConsole: true,
});

export default nextConfig;
