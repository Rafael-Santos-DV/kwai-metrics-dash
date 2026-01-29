import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  images: {
    remotePatterns: [
      new URL("http://aws-br-pic.kwai.net/**"),
      new URL("http://aws-static.kwai.net/**"),
    ],
  },
};

export default nextConfig;
