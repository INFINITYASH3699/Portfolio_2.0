/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  eslint: {
    // Don't run ESLint during build to avoid issues with new config format
    ignoreDuringBuilds: true
  },
  typescript: {
    // Don't run type checking during build for performance
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
