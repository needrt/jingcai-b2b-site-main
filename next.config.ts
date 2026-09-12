import type { NextConfig } from 'next';

const isStaticExport = process.env.NEXT_OUTPUT === 'export';
const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: 'export' } : {}),
  trailingSlash: true,
  poweredByHeader: false,
  images: { unoptimized: isStaticExport },
  turbopack: { root: __dirname },
};
export default nextConfig;
