/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.themoviedb.org',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
      {
        protocol: 'https',
        hostname: 'search.pstatic.net',
      },
    ],
  },
  eslint: {
    // 빌드 중 ESLint 검사를 비활성화합니다.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript 오류를 무시하고 빌드합니다.
    ignoreBuildErrors: true,
  },
}

export default nextConfig
