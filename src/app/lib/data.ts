import { cache } from 'react'
import Prismic from '@prismicio/client'
import * as PrismicHelpers from '@prismicio/helpers'
import { useReadingTime } from 'react-hook-reading-time' // FIXME

import { getPrismicClient } from '@services/prismic'

import { parsePostTags } from '@utils/parsePostTags'

import { Post } from '@models/Post'
import { Tag } from '@models/Tag'

import { POST_PAGINATION_QUANTITY } from '@constants/POST_PAGINATION_QUANTITY'

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

export const getBio = cache(async () => {
  const prismic = getPrismicClient()

  const {
    results: [document]
  } = await prismic.query([Prismic.predicates.at('document.type', 'home')])

  return String(PrismicHelpers.asText(document.data.bio))
})

export const getPostTags = cache(async () => {
  const prismic = getPrismicClient()

  const { results: tagResults } = await prismic.query([Prismic.predicates.at('document.type', 'tag')])

  const tags: Tag[] = tagResults.map(tag => {
    return {
      id: tag.id,
      name: tag.data.tag_name,
      color: tag.data.tag_color
    }
  })

  return tags
})

export const getPosts = cache(async (page = 1) => {
  const prismic = getPrismicClient()

  const { results: postResults, total_pages: postTotalPages } = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetchLinks: ['tag.tag_color', 'tag.tag_name'],
      orderings: '[document.first_publication_date desc]',
      pageSize: POST_PAGINATION_QUANTITY,
      page
    }
  )

  const posts: Post[] = postResults.map(post => {
    return {
      slug: String(post.uid),
      title: String(PrismicHelpers.asText(post.data.title)),
      abstract: post.data.content.find((content: { type: string }) => content.type === 'paragraph')?.text ?? '',
      content: String(PrismicHelpers.asHTML(post.data.content)),
      tags: parsePostTags(post.data.tags),
      readingTime: useReadingTime(String(PrismicHelpers.asText(post.data.content))).minutes as number, // FIXME
      date: new Date(String(post.first_publication_date)).toLocaleString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      })
    }
  })

  return { posts, total: postTotalPages }
})
