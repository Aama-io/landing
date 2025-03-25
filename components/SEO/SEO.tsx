import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

export function SEO({
  title = 'AAMA - Fund management platform',
  description = 'AAMA is a cutting-edge fund management platform for mutual funds, hedge funds, and SIPs. The platform helps fund managers to create, manage, and track their funds with ease.',
  keywords = 'fund management, investment platform, mutual funds, hedge funds, SIP platform, automated trading',
  ogImage = '/product-investment-portal.png', // Using existing product image for OG
  ogUrl = 'https://aama.io', // Replace with your actual domain
}: SEOProps) {
  const fullTitle = `${title} | AAMA`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="UXQode Pte Ltd" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="AAMA" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@uxqode" />

      {/* Additional SEO Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={ogUrl} />
      <meta name="generator" content="UXQode Pte Ltd" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="alternate icon" href="/favicon.ico.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
} 