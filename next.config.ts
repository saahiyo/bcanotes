import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.226.1'],
  typescript: {
    ignoreBuildErrors: false,
  },
  output: 'standalone'
};

export default nextConfig;
