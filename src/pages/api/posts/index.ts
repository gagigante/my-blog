import type { NextApiRequest, NextApiResponse } from 'next'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import { useReadingTime } from 'react-hook-reading-time'

import { getPrismicClient } from '@services/prismic'

import { Post } from '@models/Post'

import { getPostTags } from '@utils/getPostTags'

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
    page
  })

  // TODO: Format date using pt-BR locale
  const posts: Post[] = results.map(post => {
    return {
      slug: String(post.uid),
      title: RichText.asText(post.data.title),
      abstract: post.data.content.find((content: { type: string }) => content.type === 'paragraph')?.text ?? '',
      content: RichText.asHtml(post.data.content),
      tags: getPostTags(post.data.tags),
      readingTime: useReadingTime(RichText.asText(post.data.content)).minutes as number,
      date: new Date(String(post.first_publication_date)).toLocaleString('en', {
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
