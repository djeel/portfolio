import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // ParallaxImage covers request quality 85; previews use 75.
    qualities: [75, 85],
  },
}

export default nextConfig
