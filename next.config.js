/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    optimizeCss: true,
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
    ignoreBuildErrors: true, // Игнорировать ошибки при сборке
  },
  eslint: {
    ignoreDuringBuilds: true, // Игнорировать ESLint (если используется)
  },
  swcMinify: true,
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
      preventFullImport: true,
    },
  },
};

module.exports = nextConfig;
