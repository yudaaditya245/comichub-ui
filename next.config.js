/** @type {import('next').NextConfig} */
const nextConfig = {
  // output : "standalone",
  images: {
    remotePatterns: [
      { hostname: "**.asuracomics.com" },
      { hostname: "**.anilist.co" },
      { hostname: "**.kitsu.io" },
      { hostname: "flamecomics.com" },
      { hostname: "rizzcomic.com" },
      { hostname: "drakescans.com" },
    ]
  }
};

module.exports = nextConfig;
