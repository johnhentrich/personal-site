import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '',
  assetPrefix: '',
  images: {
    unoptimized: true
  },
  async generateBuildId() {
    return 'static-build'
  }
};

export default nextConfig;
