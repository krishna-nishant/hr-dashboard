/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  basePath: '/hr-dashboard',
  assetPrefix: '/hr-dashboard/',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './src/utils/imageLoader.ts',
  },
  trailingSlash: true,
};

export default nextConfig;
