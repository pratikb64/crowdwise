/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_API_URL: process.env.BACKEND_API_URL,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
