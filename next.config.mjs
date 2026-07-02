/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js kadang perlu di-transpile agar tree-shaking & ESM aman di App Router
  transpilePackages: ["three"],
};

export default nextConfig;
