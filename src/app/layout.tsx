import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from '@next/font/google'
import Prismic from '@prismicio/client'
import * as PrismicHelpers from '@prismicio/helpers'

import { AppLayout } from '@/layouts/AppLayout'

import { getPrismicClient } from '@/services/prismic'

import '@styles/globals.scss'

async function getLinks() {
  const prismic = getPrismicClient()

  const {
    results: [document]
  } = await prismic.query([Prismic.predicates.at('document.type', 'home')])

  return {
    githubUrl: String(PrismicHelpers.asLink(document.data.github_url)),
    linkedInUrl: String(PrismicHelpers.asLink(document.data.linkedin_url))
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { linkedInUrl, githubUrl } = await getLinks()
  return (
    <html lang="pt-br">
      <body>
        <AppLayout githubUrl={githubUrl} linkedInUrl={linkedInUrl}>
          {children}
        </AppLayout>
      </body>
    </html>
  )
}
