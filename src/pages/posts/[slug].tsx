import { useEffect } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import * as PrismicHelpers from '@prismicio/helpers'
import { motion } from 'framer-motion'
import Prismic from '@prismicio/client'
import Prism from 'prismjs'
import { useReadingTime } from 'react-hook-reading-time'

import { getPrismicClient } from '@services/prismic'

import { Header } from '@components/Header'
import { Tag } from '@components/Tag'
import { ScrollToTopButton } from '@components/ScrollToTopButton'
import { SEO } from '@components/SEO'

import { Post as PostDTO } from '@models/Post'

import { getPostTags } from '@utils/getPostTags'

import { POST_ISR_QUANTITY } from '@constants/POSTS_ISR_QUANTITY'

import styles from '@styles/pages/Post.module.scss'

interface PostProps {
  post: Omit<PostDTO, 'abstract'>
  githubUrl: string
  linkedInUrl: string
  twitterUrl: string
}

const Post: NextPage<PostProps> = ({ post, githubUrl, linkedInUrl, twitterUrl }) => {
  // TODO: Reading progress bar

  useEffect(() => {
    document.querySelectorAll('pre').forEach(element => {
      const code = element.innerText

      element.classList.add('language-js')
      element.textContent = ''

      const codeElement = document.createElement('code')
      codeElement.classList.add('language-js')
      codeElement.textContent = code

      element.appendChild(codeElement)
    })

    Prism.highlightAll()
  }, [])

  return (
    <>
      {/* TODO: SEO improvements */}

      <SEO
        title="Blog | Gabriel Gigante"
        description="loren"
        author="Gabriel Gigante"
        keywords={[
          'Blog',
          'Programação',
          'Desenvolvimento',
          'Software',
          'Web',
          'HTML',
          'CSS',
          'JavaScript',
          'TypeScript'
        ]}
        image={{
          url: 'https://gabrielgigante.dev/test.png',
          alt: 'Blog | Gabriel Gigante',
          width: '1120',
          height: '528'
        }}
        pageType="article"
        pageUrl={process.env.NEXT_PUBLIC_SITE_URL || ''}
      />

      <Header githubUrl={githubUrl} linkedInUrl={linkedInUrl} twitterUrl={twitterUrl} />

      <motion.main className={styles.wrapper} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <article className={styles.post}>
          <h1>{post.title}</h1>

          <span className={styles.metaData}>
            <time>{post.date}</time> | {post.readingTime} Min de leitura
          </span>

          <div className={styles.tags}>
            {post.tags.map(tag => (
              <Tag key={tag.id} id={tag.id} title={tag.name} color={tag.color} />
            ))}
          </div>
          <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </motion.main>

      <ScrollToTopButton />

      {/* TODO: Suggest content */}
      {/* TODO: Comment section */}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient()

  const { results } = await prismic.query([Prismic.predicates.at('document.type', 'post')], {
    orderings: '[document.first_publication_date desc]',
    pageSize: POST_ISR_QUANTITY
  })

  const paths = results.map(document => {
    return {
      params: { slug: document.uid }
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

// TODO: Redirects if post does not exists anymore
export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const { slug } = params as { slug: string }

  const prismic = getPrismicClient()

  const {
    results: [document]
  } = await prismic.query([Prismic.predicates.at('document.type', 'home')])

  const response = await prismic.getByUID('post', slug, {
    fetchLinks: ['tag.tag_color', 'tag.tag_name']
  })

  const post: Omit<PostDTO, 'abstract'> = {
    slug,
    title: String(PrismicHelpers.asText(response.data.title)),
    tags: getPostTags(response.data.tags),
    content: String(PrismicHelpers.asHTML(response.data.content)),
    // TODO: Create a function to calculate reading time
    // eslint-disable-next-line react-hooks/rules-of-hooks
    readingTime: useReadingTime(String(PrismicHelpers.asText(response.data.content))).minutes as number,
    date: new Date(String(response.first_publication_date)).toLocaleString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    })
  }

  const A_MINUTE_IN_SECONDS = 60

  return {
    props: {
      post,
      githubUrl: String(PrismicHelpers.asLink(document.data.github_url)),
      linkedInUrl: String(PrismicHelpers.asLink(document.data.linkedin_url)),
      twitterUrl: String(PrismicHelpers.asLink(document.data.twitter_url))
    },
    revalidate: A_MINUTE_IN_SECONDS
  }
}

export default Post
