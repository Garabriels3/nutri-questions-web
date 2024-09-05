/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true
    },
    basePath: '/site-nutricao',
    assetPrefix: '/site-nutricao/',
    trailingSlash: true,
    webpack: (config) => {
      config.resolve.fallback = { fs: false, net: false, tls: false };
      return config;
    },
    reactStrictMode: true,
}

module.exports = nextConfig