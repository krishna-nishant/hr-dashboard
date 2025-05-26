/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/hr-dashboard' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/hr-dashboard/' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'dist',
};

export default nextConfig;
