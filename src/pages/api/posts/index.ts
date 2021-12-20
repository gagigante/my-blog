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
}

export default async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  const { page } = req.query

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method not allowed')
    return
  }

  const prismic = getPrismicClient(req)

  const { results } = await prismic.query([Prismic.predicates.at('document.type', 'post')], {
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

  res.status(200).json({ posts })
}
