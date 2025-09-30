// next.config.ts
import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'
import path from 'path'

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

const nextConfig: NextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    // ✅ Allow all images under the /res directory, with or without query strings.
    localPatterns: [
      {
        pathname: '/res/*',
      },
    ],
  },

  compiler: { removeConsole: { exclude: ['error', 'warn'] } },

  experimental: { optimizePackageImports: ['lucide-react', 'framer-motion'] },

  async redirects() {
    return [
      { source: '/news/ai-monitoring-upgrade', destination: '/news/data-center', permanent: true },
      { source: '/news/datacenter', destination: '/news/data-center', permanent: true },
      // ... other redirects
    ]
  },

  async headers() {
    return [
      {
        source: '/res/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },


  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@public': path.join(__dirname, 'public'), 
    }
    return config
  },
}

export default withBundleAnalyzer(nextConfig)
