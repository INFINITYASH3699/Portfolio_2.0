/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Comment out these lines for development mode
  // output: 'export',
  // distDir: 'out',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
