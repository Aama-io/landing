import type { GetServerSideProps } from 'next';
import { ALL_TOOLS, PERSONAS } from '@/lib/tools';
import { PLATFORMS } from '@/lib/platforms';
import { SOLUTIONS } from '@/lib/solutions';
import { blogPosts } from '@/lib/blogPosts';

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

function tag(loc: string, priority: string, changefreq: string, lastmod?: string) {
  const last = lastmod ? `<lastmod>${lastmod}</lastmod>` : '';
  return `<url><loc>${SITE}${loc}</loc>${last}<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const today = new Date().toISOString().split('T')[0];
  const urls = [
    ...STATIC.map((p) => tag(p.loc, p.priority, 'weekly', today)),
    ...PLATFORMS.map((p) => tag(`/products/${p.slug}`, '0.85', 'weekly', today)),
    ...SOLUTIONS.map((sol) => tag(sol.href, '0.8', 'weekly', today)),
    tag('/tools', '0.9', 'weekly', today),
    ...PERSONAS.map((p) => tag(p.href, '0.85', 'weekly', today)),
    ...ALL_TOOLS.map((t) => tag(t.href, '0.8', 'monthly', today)),
    ...blogPosts.map((post) => tag(`/blog/${post.slug}`, '0.6', 'monthly', post.publishedDate)),
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
