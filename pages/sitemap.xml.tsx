import type { GetServerSideProps } from 'next';
import { ALL_TOOLS } from '@/lib/tools';

const SITE = 'https://aama.io';

// Core marketing + legal pages.
const STATIC: { loc: string; priority: string }[] = [
  { loc: '/', priority: '1.0' },
  { loc: '/product', priority: '0.8' },
  { loc: '/solutions', priority: '0.8' },
  { loc: '/pricing', priority: '0.8' },
  { loc: '/about', priority: '0.7' },
  { loc: '/contact', priority: '0.7' },
  { loc: '/blog', priority: '0.7' },
  { loc: '/faq', priority: '0.6' },
  { loc: '/compliance', priority: '0.5' },
  { loc: '/privacy', priority: '0.4' },
  { loc: '/terms', priority: '0.4' },
];

const BLOG = [
  '/blog/american-vs-european-waterfall',
  '/blog/tvpi-dpi-rvpi-irr-explained',
  '/blog/transforming-fund-operations-of-private-equity',
  '/blog/simplify-operation-for-family-offices-in-singapore',
  '/blog/fund-management-vs-fund-administration',
  '/blog/ifrs-compliant-fund-management',
];

function tag(loc: string, priority: string, changefreq: string) {
  return `<url><loc>${SITE}${loc}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const urls = [
    ...STATIC.map((p) => tag(p.loc, p.priority, 'weekly')),
    tag('/tools', '0.9', 'weekly'),
    ...ALL_TOOLS.map((t) => tag(t.href, '0.8', 'monthly')),
    ...BLOG.map((b) => tag(b, '0.6', 'monthly')),
  ].join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
  res.write(xml);
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
