import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

export function SEO({
  title = 'Fund Administration Software Singapore',
  description = 'Fund administration and accounting software for mid-market fund managers and boutique fund administrators in Singapore and APAC — capital calls, NAV, IFRS 9 / SFRS(I) 9 accounting, an LP portal and SPV administration, without enterprise complexity.',
  keywords = 'fund administration software Singapore, fund accounting software, LP portal for fund managers, SPV administration software, VCC fund administration MAS, PE fund administration Singapore, VC fund accounting APAC, boutique fund admin software',
  ogImage = '/product-investment-portal.png', // Using existing product image for OG
  ogUrl = 'https://aama.io', // Replace with your actual domain
}: SEOProps) {
  // Append the brand only when the title doesn't already carry it — avoids
  // "… | aama.io | AAMA" double-branding on pages that include the brand themselves.
  const fullTitle = /aama/i.test(title) ? title : `${title} | aama.io`;

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