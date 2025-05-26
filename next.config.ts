import type { Configuration } from 'webpack';
import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/hr-dashboard',
  assetPrefix: '/hr-dashboard/',
  images: {
    unoptimized: true,
  },
  // Ensure CSS modules work correctly
  webpack: (config: Configuration) => {
    config.module?.rules?.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    });
    return config;
  },
};

export default nextConfig;
