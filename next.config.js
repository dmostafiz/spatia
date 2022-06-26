/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 240,
  experimental: {
    esmExternals: false,
  },
}

module.exports = nextConfig
