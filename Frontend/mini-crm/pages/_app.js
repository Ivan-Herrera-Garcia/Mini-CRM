import Head from 'next/head';
import '../styles/globals.css'
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [title, setTitle] = useState("Mini CRM");
  useEffect(() => {
    const url = window.location.href.split("/");
    const page = url[3];
    if (page === "Inmuebles") {
      setTitle("Inmuebles");
    } else if (page === "Seguimientos") {
      setTitle("Seguimientos");
    } else if (page === "Configuracion") {
      setTitle("Configuración");
    } else if (page === "Asesores") {
      setTitle("Asesores");
    } else {
      setTitle("Mini CRM");
    }
  }, []);


  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;