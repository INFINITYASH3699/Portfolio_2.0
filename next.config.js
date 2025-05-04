/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Ensure we can generate the routes manifest correctly
  generateBuildId: async () => {
    return 'portfolio-build'
  }
}

module.exports = nextConfig
