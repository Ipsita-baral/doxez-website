/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    const target = process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || 'http://doxez-frontend-alb-1475539815.ap-south-1.elb.amazonaws.com';
    return [
      {
        source: '/api/:path*',
        destination: `${target}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
const target = process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || 'http://doxez-frontend-alb-1475539815.ap-south-1.elb.amazonaws.com';