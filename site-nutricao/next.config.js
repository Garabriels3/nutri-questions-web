/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      unoptimized: true
    },
    webpack: (config) => {
      config.resolve.fallback = { fs: false, net: false, tls: false };
      return config;
    },
    reactStrictMode: true,
}

module.exports = nextConfig