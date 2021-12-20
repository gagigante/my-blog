import Link from 'next/link'

import { Tag } from '@components/Tag'

import { Post } from '@models/Post'

import styles from '@styles/components/PostItem.module.scss'

interface PostItemProps {
  post: Post
}

export const PostItem = ({ post }: PostItemProps) => {
  return (
    <Link href={`/post/${post.slug}`}>
      <a className={styles.wrapper}>
        <span className={styles.metaData}>
          <time>{post.date}</time> | {post.readingTime} Min de leitura
        </span>

        <h2>{post.title}</h2>

        <div className={styles.tags}>
          {post.tags.map(tag => (
            <Tag key={tag.id} id={tag.id} title={tag.name} color={tag.color} />
          ))}
        </div>

        <p>{post.abstract}</p>
      </a>
    </Link>
  )
}
