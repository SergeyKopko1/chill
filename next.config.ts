import type { NextConfig } from 'next';

const path = require('path');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['tsx'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

export default nextConfig;
