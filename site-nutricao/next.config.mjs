/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true
    },
    assetPrefix: '/site-nutricao/',
    basePath: '/site-nutricao',
  }

  module.exports = nextConfig
