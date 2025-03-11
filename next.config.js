/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    // Consider removing this line to not ignore ESLint errors during builds
    // ignoreDuringBuilds: true,
  },

  images: { unoptimized: true },
};

module.exports = nextConfig;
