/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ENVIRONMENT: process.env.ENVIRONMENT,
    SSO_ENDPOINT: process.env.SSO_ENDPOINT
  }
}

module.exports = nextConfig
