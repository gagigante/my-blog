import type { AppProps } from 'next/app'

import '@styles/globals.scss'
import 'react-activity/dist/Dots.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
