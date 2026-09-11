const backendApiUrl = (
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://doxez.in")
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

  async redirects() {
    return [
      {
        source: "/hospital-partner",
        destination: "/partner-onboard",
        permanent: true,
      },
      {
        source: "/doctor-onboard",
        destination: "/partner-onboard",
        permanent: true,
      },
    ];
  },
};


export default nextConfig;