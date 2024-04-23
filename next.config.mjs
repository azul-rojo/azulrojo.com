/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
      {
        source: '/',
        destination: '/home',
      }
    ]
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

export default nextConfig;
