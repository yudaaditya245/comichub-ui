/** @type {import('next').NextConfig} */
const nextConfig = {
  // output : "standalone",
  images: {
    remotePatterns: [
      { hostname: "**" }
    ]
  }
};

module.exports = nextConfig;
