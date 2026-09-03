const backendApiUrl = (
  process.env.BACKEND_API_URL ||
  "https://doxez.in"
).replace(/\/+$/, "").replace(/\/api$/, "");

const nextConfig = {
  output: "standalone",

  reactStrictMode: true,

  images: {
    unoptimized: true,
  },

  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${backendApiUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;