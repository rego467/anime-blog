/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname:"cdn.myanimelist.net"
      },{
        protocol: 'https',
        hostname:"placehold.co"
      },{
        hostname:"lh3.googleusercontent.com"
      },{
        hostname:"https://www.youtube.com"
      }
    ]
  }
}

module.exports = nextConfig
