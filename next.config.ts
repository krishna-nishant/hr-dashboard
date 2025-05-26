/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  basePath: '/hr-dashboard',
  assetPrefix: '/hr-dashboard/',
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
