/** @type {import('next').NextConfig} */
const nextConfig = {
  // Move allowedDevOrigins out of "experimental"
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
};

module.exports = nextConfig;