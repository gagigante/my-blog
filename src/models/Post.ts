import { Tag } from '@models/Tag'

export interface Post {
  slug: string
  title: string
  abstract: string
  content: string
  tags: Tag[]
  readingTime: number
  date: string
}
