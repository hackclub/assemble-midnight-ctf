/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: [
    {
      source: "/auth/start",
      destination: "/",
      permanent: false,
    },
  ],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
};

module.exports = nextConfig;
