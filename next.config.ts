import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/cnb-okamzite-platby',
  trailingSlash: true,
  output: 'export' // Optional: for static export if needed
};

export default nextConfig;
