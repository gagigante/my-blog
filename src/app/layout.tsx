import { Raleway as ralaway, JetBrains_Mono as jetbrains } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import { Header } from '@components/header'

import '@styles/globals.css'

const primary = ralaway({
  weight: ['400', '600', '700'],
  subsets: ['latin']
})

const secondary = jetbrains({
  weight: ['400', '600', '700'],
  subsets: ['latin']
})

// TODO: add metadata
export const metadata = {
  title: 'Blog | Gabriel Gigante',
  description: 'Apenas um desenvolvedor de software que gosta de compartilhar conhecimento.'
}

export const revalidate = 3600 // 1 hour

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${primary.className} ${secondary.className}`}>
      <body className="w-screen h-screen bg-gray-950">
        <Header githubUrl="https://github.com/gagigante" linkedInUrl="https://www.linkedin.com/in/gabriel-gigante/" />
        <div>{children}</div>
      </body>
      <Analytics />
    </html>
  )
}
