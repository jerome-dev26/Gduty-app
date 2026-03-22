/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // This allows the dev server to accept requests from 127.0.0.1
    allowedDevOrigins: ['127.0.0.1', 'localhost'],
  },
};

module.exports = nextConfig;