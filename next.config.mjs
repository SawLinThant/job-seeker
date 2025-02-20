/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'dev-jncs.s3.ap-southeast-1.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 's3-alpha-sig.figma.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'api.jncs-mm.com',
      },
    ],
  },

  reactStrictMode: false,
};

export default nextConfig;
