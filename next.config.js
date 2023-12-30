/** @type {import('next').NextConfig} */
const nextConfig = {
  // output : "standalone",
  images: {
    remotePatterns: [{ hostname: "**" }]
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/browse",
        permanent: false
      }
    ];
  },
  experimental: {
    serverComponentsExternalPackages: ["puppeteer-extra", "puppeteer-extra-plugin-stealth"]
  }
};

module.exports = nextConfig;
