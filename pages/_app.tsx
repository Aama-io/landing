import '@mantine/core/styles.css';
import '../styles/global.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MantineProvider, mergeThemeOverrides } from '@mantine/core';
import { MotionConfig } from 'framer-motion';
import { GoogleAnalytics, pageview } from '../components/Analytics';
import { theme } from '../theme';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
});

const fontStack = `${inter.style.fontFamily}, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

// Feed the resolved next/font family straight into the theme so Mantine sets
// it on :root/body. (A CSS-var indirection only works if the var is defined at
// the root, which a wrapper element can't guarantee.)
const appTheme = mergeThemeOverrides(theme, {
  fontFamily: fontStack,
  headings: { fontFamily: fontStack },
});

// Site-wide Organization + WebSite structured data — emitted once here rather
// than per-page, since it describes the brand/site itself, not a given page.
// `sameAs` intentionally omits any social profile we haven't confirmed is real;
// add verified links (LinkedIn company page etc.) here when available.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AAMA',
  url: 'https://aama.io',
  logo: 'https://aama.io/aama-logo.svg',
  description:
    'Fund administration and accounting software for mid-market PE, VC, private credit, family office and SPV/syndicate managers in Singapore and APAC.',
  sameAs: ['https://twitter.com/uxqode'],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'aama.io',
  url: 'https://aama.io',
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    // Track page views on route change
    const handleRouteChange = (url: string) => {
      if (measurementId) {
        pageview(url, measurementId);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, measurementId]);

  return (
    <MantineProvider theme={appTheme} forceColorScheme="light">
      <div className={inter.variable}>
        {measurementId && <GoogleAnalytics measurementId={measurementId} />}
        <Head>
          <title>aama.io — Fund Management, Administration and Accounting Software</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <link rel="shortcut icon" href="/favicon.svg" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
        </Head>
        <MotionConfig reducedMotion="user" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}>
          <Component {...pageProps} />
        </MotionConfig>
      </div>
    </MantineProvider>
  );
}
