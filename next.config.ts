import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Match the original WordPress URLs (e.g. /back-pain/) so existing links and SEO keep working.
  trailingSlash: true,
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
