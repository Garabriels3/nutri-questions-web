/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true
    },
    basePath: '/site-nutricao',
    assetPrefix: '/site-nutricao/',
}

module.exports = nextConfig