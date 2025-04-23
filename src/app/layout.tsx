import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import { Analytics } from '@vercel/analytics/react'

import { Header } from '@components/header'

import '@styles/globals.css'

// TODO: add metadata
export const metadata = {
  title: 'Blog | Gabriel Gigante',
  description: 'Apenas um desenvolvedor de software que gosta de compartilhar conhecimento.'
}

export const revalidate = 3600 // 1 hour

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${GeistSans.className} ${GeistMono.className}`}>
      <body className="min-h-screen bg-gray-950">
        <Header githubUrl="https://github.com/gagigante" linkedInUrl="https://www.linkedin.com/in/gabriel-gigante/" />
        {children}
      </body>
      <Analytics />
    </html>
  )
}
