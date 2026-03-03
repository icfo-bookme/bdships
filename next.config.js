/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.bookme.com.bd",
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
};

module.exports = nextConfig;