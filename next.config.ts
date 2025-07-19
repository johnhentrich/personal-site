import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.GITHUB_REPOSITORY 
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` 
    : '',
  assetPrefix: process.env.GITHUB_REPOSITORY 
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` 
    : '',
  images: {
    unoptimized: true
  },
  async generateBuildId() {
    return 'static-build'
  }
};

export default nextConfig;
