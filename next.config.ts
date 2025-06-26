import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   compiler: {
    styledComponents: true,
  },
  eslint:{
    ignoreDuringBuilds: true
  },
  images:{
   remotePatterns: [new URL('https://avatar.vercel.sh/*')]
  }
};

export default nextConfig;
