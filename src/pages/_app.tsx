import Head from 'next/head'
import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'

import '@styles/globals.scss'
import 'react-activity/dist/Dots.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </>
  )
}

export default MyApp
