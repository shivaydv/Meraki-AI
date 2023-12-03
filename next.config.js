/** @type {import('next').NextConfig} */
const nextConfig = {
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
