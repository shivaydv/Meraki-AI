// import withPlaiceholder from '@plaiceholder/next'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint:{
    
    ignoreDuringBuilds: true,
    
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            pathname: '**',
          },
          {
            protocol: 'http',
            hostname: 'res.cloudinary.com',
            port:'',
            pathname: '/dvkau07l1/image/upload/**',
          },
        ],
      },
}

module.exports = nextConfig
