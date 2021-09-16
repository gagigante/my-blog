import Link from 'next/link'

import { Tag } from '@components/Tag'

import styles from '@styles/components/PostItem.module.scss'

interface PostItemProps {
  slug: string
  path: string
  title: string
  abstract: string
  readingTime: number
  tags: Array<{ id: number; name: string; color: string }>
  date: string
}

export const PostItem = ({ slug, path, title, abstract, readingTime, tags, date }: PostItemProps) => {
  return (
    <Link href={path} key={slug}>
      <a className={styles.wrapper}>
        <span className={styles.metaData}>
          <time>{date}</time> | {readingTime} Min de leitura
        </span>

        <h2>{title}</h2>

        <div className={styles.tags}>
          {tags.map(tag => (
            <Tag title={tag.name} color={tag.color} key={tag.id} />
          ))}
        </div>

        <p>{abstract}</p>
      </a>
    </Link>
  )
}
