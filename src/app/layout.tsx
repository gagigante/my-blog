import { Raleway as ralaway, JetBrains_Mono as jetbrains } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
// import { SpeedInsights } from '@vercel/speed-insights/next'

import { Header } from '@components/Header'

import '@styles/globals.scss'
import styles from './layout.module.scss'
import 'react-activity/dist/Dots.css'

export const metadata = {
  title: 'Blog | Gabriel Gigante'
  // TODO: description: ''
}

const primary = ralaway({
  weight: ['400', '600', '700'],
  subsets: ['latin']
})

const secondary = jetbrains({
  weight: ['400', '600', '700'],
  subsets: ['latin']
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${primary.className} ${secondary.className}`}>
      <body>
        <Header githubUrl={'githubUrl'} linkedInUrl={'linkedInUrl'} twitterUrl={'null'} />
        <div className={styles.content}>{children}</div>
      </body>
      <Analytics />
      {/* <SpeedInsights /> */}
    </html>
  )
}
