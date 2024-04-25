import type { AppProps } from 'next/app'
import { Roboto as robotoFont } from 'next/font/google'

import '@styles/globals.scss'
import 'react-activity/dist/Dots.css'

const roboto = robotoFont({
  weight: ['400', '500', '700'],
  subsets: ['latin']
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${roboto.className} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
