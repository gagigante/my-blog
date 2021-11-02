import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'

import '@styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} />
    </AnimatePresence>
  )
}

export default MyApp
