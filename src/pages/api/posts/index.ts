import type { NextApiRequest, NextApiResponse } from 'next'
import Prismic from '@prismicio/client'
import * as PrismicHelpers from '@prismicio/helpers'
import { useReadingTime } from 'react-hook-reading-time'

import { getPrismicClient } from '@services/prismic'

import { Post } from '@models/Post'

import { parsePostTags } from '@utils/parsePostTags'

import { POST_PAGINATION_QUANTITY } from '@constants/POST_PAGINATION_QUANTITY'

interface ResponseData {
  posts: Post[]
  totalPostPages: number
}

export default async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  const { page, tags } = req.query

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method not allowed')
    return
  }

  const prismic = getPrismicClient(req)

  const { results, total_pages } = await prismic.query(getQueryPredicates(String(tags)), {
    fetchLinks: ['tag.tag_color', 'tag.tag_name'],
    orderings: '[document.first_publication_date desc]',
    pageSize: POST_PAGINATION_QUANTITY,
    page: page as string
  })

  const posts: Post[] = results.map(post => {
    return {
      slug: String(post.uid),
      title: String(PrismicHelpers.asText(post.data.title)),
      abstract: post.data.content.find((content: { type: string }) => content.type === 'paragraph')?.text ?? '',
      content: String(PrismicHelpers.asHTML(post.data.content)),
      tags: parsePostTags(post.data.tags),
      readingTime: useReadingTime(String(PrismicHelpers.asText(post.data.content))).minutes as number,
      date: new Date(String(post.first_publication_date)).toLocaleString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      })
    }
  })

  res.status(200).json({ posts, totalPostPages: total_pages })
}

const getQueryPredicates = (tags: string): string[] => {
  const tagsIds = tags.split(',')

  if (tagsIds[0] !== '' && tagsIds.length > 0) {
    return [
      Prismic.predicates.at('document.type', 'post'),
      ...tagsIds.map(tagId => {
        return Prismic.predicates.at('my.post.tags.tag', tagId)
      })
    ]
  }

  return [Prismic.predicates.at('document.type', 'post')]
}
