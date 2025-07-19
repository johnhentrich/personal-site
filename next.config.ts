import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/personal-site',
  assetPrefix: '/personal-site',
  images: {
    unoptimized: true
  },
  async generateBuildId() {
    return 'static-build'
  }
};

export default nextConfig;
