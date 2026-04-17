import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rxzxdbjcotfqxzbandfs.supabase.co",
      },
      {
        protocol: "https",
        hostname: "htjnxevlizypxpescfmh.supabase.co",
      },
    ],
  },

};

export default nextConfig;
