import Head from 'next/head';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;