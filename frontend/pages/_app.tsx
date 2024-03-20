import '@mantine/core/styles.css';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import Layout from '../layouts';

export default function App({ Component, pageProps }: any) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Tedcrypto - Node Monitor</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no' />
        <link rel='shortcut icon' href='/favicon.svg' />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}
