import { cache } from 'react'
import Prismic from '@prismicio/client'
import * as PrismicHelpers from '@prismicio/helpers'

import { getPrismicClient } from '@services/prismic'

export const getSocialLinks = cache(async () => {
  const prismic = getPrismicClient()

  const {
    results: [document]
  } = await prismic.query([Prismic.predicates.at('document.type', 'home')])

  return {
    githubUrl: String(PrismicHelpers.asLink(document.data.github_url)),
    linkedInUrl: String(PrismicHelpers.asLink(document.data.linkedin_url)),
    twitterUrl: String(PrismicHelpers.asLink(document.data.twitter_url))
  }
})
