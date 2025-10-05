/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
    ],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  // swcMinify is now enabled by default and deprecated in config
  // optimizeFonts is now enabled by default and deprecated in config
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  basePath: '',
  // Production optimizations
  productionBrowserSourceMaps: false,
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  modularizeImports: {
    "lucide-react": {
      transform:
"lucide-react/dist/esm/icons/{{kebabCase member}}",
      preventFullImport: true,
    },
  },
  // Add this to resolve the workspace root warning
  outputFileTracingRoot: __dirname,
};

module.exports = nextConfig;