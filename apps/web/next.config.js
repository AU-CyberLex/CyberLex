/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@cyberlex/content", "@cyberlex/core", "@cyberlex/ui"],
};

module.exports = nextConfig;
