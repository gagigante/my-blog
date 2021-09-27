import { useEffect, useState } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Prismic from '@prismicio/client'
import { RichText, Link } from 'prismic-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useReadingTime } from 'react-hook-reading-time'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { Dots } from 'react-activity'
import 'react-activity/dist/Dots.css'

import { getPrismicClient } from '@services/prismic'
import { api } from '@services/api'

import { Header } from '@components/Header'
import { PostItem } from '@components/PostItem'

import { Post } from '@models/Post'

import { getPostTags } from '@utils/getPostTags'

import { POST_PAGINATION_QUANTITY } from '@constants/POST_PAGINATION_QUANTITY'

import styles from '@styles/pages/Home.module.scss'

interface HomeProps {
  bio: string
  githubUrl: string
  linkedInUrl: string
  twitterUrl: string
  posts: Post[]
  totalPostPages: number
}

const Home: NextPage<HomeProps> = ({ bio, githubUrl, linkedInUrl, twitterUrl, posts, totalPostPages }) => {
  const [postList, setPostList] = useState(posts)
  const [currentPage, setCurrentPage] = useState(1)
  const [isFetchingMorePosts, setIsFetchingMorePosts] = useState(false)
  const [isScrollToTopButtonVisible, setIsScrollToTopButtonVisible] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', toggleScrollToTopButtonVisibility)
  }, [])

  function toggleScrollToTopButtonVisibility() {
    if (window.pageYOffset > 300) {
      setIsScrollToTopButtonVisible(true)
      return
    }

    setIsScrollToTopButtonVisible(false)
  }

  function handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleFetchMorePosts() {
    setIsFetchingMorePosts(true)

    const updatedCurrentPage = currentPage + 1

    const { data } = await api.get(`fetch-posts?page=${updatedCurrentPage}`)

    setPostList(oldState => [...oldState, ...data.posts])
    setIsFetchingMorePosts(false)
    setCurrentPage(updatedCurrentPage)
  }

  return (
    <>
      {/* TODO: SEO improvements */}

      <Head>
        <title>Blog | Gabriel Gigante</title>
      </Head>

      <Header githubUrl={githubUrl} linkedInUrl={linkedInUrl} twitterUrl={twitterUrl} />

      <main className={styles.wrapper}>
        <section className={styles.hero}>
          <div className={styles.avatar}>
            <Image
              src="https://avatars.githubusercontent.com/u/48386738?v=4"
              width={96}
              height={96}
              layout="responsive"
              alt="Gabriel Gigante"
            />
          </div>

          <p>{bio}</p>
        </section>

        {/* TODO: Search engine */}

        <section className={styles.posts}>
          {postList.map(post => (
            <PostItem
              slug={post.slug}
              path={`/post/${post.slug}`}
              title={post.title}
              abstract={post.abstract}
              readingTime={post.readingTime}
              tags={post.tags}
              date={post.date}
              key={post.slug}
            />
          ))}
        </section>

        {currentPage < totalPostPages && (
          <button className={styles.loadMorePosts} onClick={handleFetchMorePosts}>
            {!!isFetchingMorePosts ? <Dots /> : 'Carregar mais posts'}
          </button>
        )}
      </main>

      <AnimatePresence>
        {isScrollToTopButtonVisible && (
          <motion.button
            className={styles.scrollToTop}
            key="scrollToTopButton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleScrollToTop}
          >
            <AiOutlineArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const prismic = getPrismicClient()

  const {
    results: [document]
  } = await prismic.query([Prismic.predicates.at('document.type', 'home')])

  const { results, total_pages } = await prismic.query([Prismic.predicates.at('document.type', 'post')], {
    fetchLinks: ['tag.tag_color', 'tag.tag_name'],
    orderings: '[document.first_publication_date desc]',
    pageSize: POST_PAGINATION_QUANTITY
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

  const A_WEEK_IN_SECONDS = 60 * 60 * 24 * 7

  return {
    props: {
      bio: RichText.asText(document.data.bio),
      githubUrl: Link.url(document.data.github_url),
      linkedInUrl: Link.url(document.data.linkedin_url),
      twitterUrl: Link.url(document.data.twitter_url),
      posts,
      totalPostPages: total_pages
    },
    revalidate: A_WEEK_IN_SECONDS
  }
}

export default Home
