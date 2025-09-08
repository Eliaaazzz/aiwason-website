import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    removeConsole: { exclude: ['error', 'warn'] },
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async redirects() {
    return [
      // Data center
      { source: '/news/ai-monitoring-upgrade', destination: '/news/data-center', permanent: true },
      { source: '/news/datacenter', destination: '/news/data-center', permanent: true },
      { source: '/news/data-centers', destination: '/news/data-center', permanent: true },
      { source: '/news/data-center-solutions', destination: '/news/data-center', permanent: true },
      { source: '/news/dc', destination: '/news/data-center', permanent: true },
      // Events / conference
      { source: '/events/data-center-summit', destination: '/events/datacenter-summit', permanent: true },
      { source: '/events/summit', destination: '/events/datacenter-summit', permanent: true },
      { source: '/events/conference', destination: '/events/datacenter-summit', permanent: true },
      { source: '/news/summit', destination: '/events/datacenter-summit', permanent: true },
      { source: '/news/conference', destination: '/events/datacenter-summit', permanent: true },
      // Commercial towers
      { source: '/news/smart-towers', destination: '/news/smart-tower', permanent: true },
      { source: '/news/commercial-tower', destination: '/news/smart-tower', permanent: true },
      { source: '/news/commercial-towers', destination: '/news/smart-tower', permanent: true },
      // Hotels
      { source: '/news/hotel', destination: '/news/hotel-deployment', permanent: true },
      { source: '/news/hotels', destination: '/news/hotel-deployment', permanent: true },
      { source: '/news/luxury-hotel-deployment', destination: '/news/hotel-deployment', permanent: true },
      // Airports
      { source: '/news/airport', destination: '/news/airport-upgrade', permanent: true },
      { source: '/news/airports', destination: '/news/airport-upgrade', permanent: true },
      { source: '/news/airport-energy-upgrade', destination: '/news/airport-upgrade', permanent: true },
      // Rail
      { source: '/news/rail', destination: '/news/rail-transit-power', permanent: true },
      { source: '/news/rail-transit', destination: '/news/rail-transit-power', permanent: true },
      { source: '/news/high-speed-rail', destination: '/news/rail-transit-power', permanent: true },
      // Libraries
      { source: '/news/library', destination: '/news/library-showcase', permanent: true },
      { source: '/news/libraries', destination: '/news/library-showcase', permanent: true },
      { source: '/news/university-library', destination: '/news/library-showcase', permanent: true },
      // Legacy slugs from data/news.ts (if ever linked)
      { source: '/news/datacenter-ai-busbar', destination: '/news/data-center', permanent: true },
      { source: '/news/intl-conf-center', destination: '/events/datacenter-summit', permanent: true },
      { source: '/news/commercial-coop', destination: '/news/smart-tower', permanent: true },
      { source: '/news/residential-retrofit', destination: '/products', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        // Cache static images in public/res aggressively
        source: '/res/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default withAnalyzer(nextConfig)
