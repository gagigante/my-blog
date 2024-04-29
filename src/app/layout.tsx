import { Raleway as ralaway, JetBrains_Mono as jetbrains } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
// import { SpeedInsights } from '@vercel/speed-insights/next'

import { Header } from '@components/Header'

import { getSocialLinks } from './utils'

import '@styles/globals.scss'
import styles from './layout.module.scss'
import 'react-activity/dist/Dots.css'

export const metadata = {
  title: 'Blog | Gabriel Gigante',
  description: 'Apenas um desenvolvedor de software que gosta de compartilhar conhecimento'
}

const primary = ralaway({
  weight: ['400', '600', '700'],
  subsets: ['latin']
})

const secondary = jetbrains({
  weight: ['400', '600', '700'],
  subsets: ['latin']
})

export const revalidate = 3600 // 1 hour

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { githubUrl, linkedInUrl, twitterUrl } = await getSocialLinks()
  return (
    <html lang="pt-BR" className={`${primary.className} ${secondary.className}`}>
      <body>
        <Header githubUrl={githubUrl} linkedInUrl={linkedInUrl} twitterUrl={twitterUrl} />
        <div className={styles.content}>{children}</div>
      </body>
      <Analytics />
      {/* TODO: <SpeedInsights /> */}
    </html>
  )
}
