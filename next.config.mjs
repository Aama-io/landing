import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Audience pages moved from /products/* to /solutions/* when Products was
// reframed as the platforms (LP Portal, Fund Administration, Fund Accounting)
// and Solutions as the audiences.
const MOVED_TO_SOLUTIONS = ['vc-pe-firms', 'spv-syndicates'];

// De-focused for now (only PE/VC, family offices and SPVs are featured). Their
// old /products URLs point to the Solutions overview until they return.
const RETIRED_PRODUCT_TYPES = ['mutual-fund-managers', 'reits', 'financial-institutions'];

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      // LP Portal merged into the Fund Administration product.
      { source: '/products/lp-portal', destination: '/products/fund-administration', permanent: true },
      ...MOVED_TO_SOLUTIONS.map((slug) => ({
        source: `/products/${slug}`,
        destination: `/solutions/${slug}`,
        permanent: true,
      })),
      ...RETIRED_PRODUCT_TYPES.map((slug) => ({
        source: `/products/${slug}`,
        destination: '/solutions',
        permanent: false,
      })),
    ];
  },
});
