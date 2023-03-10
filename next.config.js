/* eslint-disable no-undef */
const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  concurrentFeatures: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: false,
    },
  },
  webpack(config) {
    config.module.rules[3].oneOf.forEach((one) => {
      if (!`${one.issuer?.and}`.includes('_app')) return
      one.issuer.and = [path.resolve(__dirname)]
    })
    return config
  },
}

module.exports = nextConfig
