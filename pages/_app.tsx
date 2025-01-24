import '@mantine/core/styles.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { GlobalSettingsProvider } from '@/context/GlobalSettingsContext';
import { theme } from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalSettingsProvider>
      <MantineProvider theme={theme}>
        <Head>
          <title></title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>

        <Component {...pageProps} />
      </MantineProvider>
    </GlobalSettingsProvider>
  );
}
