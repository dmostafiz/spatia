/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ENVIRONMENT: process.env.ENVIRONMENT,
    SERVER_ENDPOINT: process.env.SERVER_ENDPOINT,
    SSO_ENDPOINT: process.env.SSO_ENDPOINT
  }
}

module.exports = nextConfig
