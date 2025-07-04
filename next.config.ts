import type { NextConfig } from "next";

import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'car-nextjs-api.cheatdev.online',
        pathname: '/uploads/**',
      }
    ]
  }
};

export default withNextIntl(nextConfig);
