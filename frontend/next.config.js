/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Suppress Node.js deprecation warnings
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Note: In production, API routes are handled by Next.js serverless functions
  // This rewrite is only used if NEXT_PUBLIC_API_URL is set (for external backend)
  async rewrites() {
    // Only rewrite if NEXT_PUBLIC_API_URL is explicitly set (for external backend)
    if (process.env.NEXT_PUBLIC_API_URL) {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
        },
      ];
    }
    // Otherwise, use local Next.js API routes (default behavior)
    return [];
  },
};

module.exports = nextConfig;
