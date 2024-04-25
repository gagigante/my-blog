import type { AppProps } from 'next/app'
import { Raleway as ralaway, JetBrains_Mono as jetbrains } from 'next/font/google'

import '@styles/globals.scss'
import 'react-activity/dist/Dots.css'

const primary = ralaway({
  weight: ['400', '600', '700'],
  subsets: ['latin']
})

const secondary = jetbrains({
  weight: ['400', '700'],
  subsets: ['latin']
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${primary.className} ${secondary.className} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
