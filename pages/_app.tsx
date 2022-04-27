import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps, router }: AppProps) {
  return <>
    <Head>
      <meta name="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
      <meta name="og:locale" content="ru_RU" />
    </Head>
    <Component {...pageProps} />
  </>
  
}

export default MyApp
