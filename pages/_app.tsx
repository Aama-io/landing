import '@mantine/core/styles.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import { GoogleAnalytics, pageview } from '../components/Analytics';
import { theme } from '../theme';

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
    <MantineProvider theme={theme}>
      {measurementId && <GoogleAnalytics measurementId={measurementId} />}
      <Head>
        <title>AAMA.io - All-in-one Fund Management Platform</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
