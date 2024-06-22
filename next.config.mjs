/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apktodo.io",
      },
      {
        protocol: "https",
        hostname: "warrieta-job-portal.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
