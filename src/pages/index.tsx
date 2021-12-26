import { useCallback, useState } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Prismic from '@prismicio/client'
import { RichText, Link } from 'prismic-dom'
import { useReadingTime } from 'react-hook-reading-time'
import { Dots } from 'react-activity'

import { getPrismicClient } from '@services/prismic'
import { api } from '@services/api'

import { Header } from '@components/Header'
import { PostItem } from '@components/PostItem'
import { ScrollToTopButton } from '@components/ScrollToTopButton'
import { TagsInput } from '@components/TagsInput'

import { Post } from '@models/Post'
import { Tag } from '@models/Tag'

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
  tags: Tag[]
}

const Home: NextPage<HomeProps> = ({ bio, githubUrl, linkedInUrl, twitterUrl, posts, totalPostPages, tags }) => {
  const [postList, setPostList] = useState(posts)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPaginationPages, setTotalPaginationPages] = useState(totalPostPages)
  const [tagsFilter, setTagsFilter] = useState<Tag[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const [isFetchingMorePosts, setIsFetchingMorePosts] = useState(false)

  async function handleFetchMorePosts(): Promise<void> {
    setIsFetchingMorePosts(true)

    const updatedCurrentPage = currentPage + 1
    const tagsParamValue = tagsFilter.map(tag => tag.id).join(',')

    const { data } = await api.get<{ posts: Post[] }>(`posts?page=${updatedCurrentPage}&tags=${tagsParamValue}`)

    setPostList(oldState => [...oldState, ...data.posts])
    setIsFetchingMorePosts(false)
    setCurrentPage(updatedCurrentPage)
  }

  const handleFilterPosts = useCallback(async (tags: Tag[]) => {
    setIsLoadingPosts(true)

    const tagsParamValue = tags.map(tag => tag.id).join(',')

    const { data } = await api.get<{ posts: Post[]; totalPostPages: number }>(`posts?tags=${tagsParamValue}`)

    setPostList([...data.posts])
    setTagsFilter(tags)
    setIsFetchingMorePosts(false)
    setCurrentPage(1)
    setTotalPaginationPages(data.totalPostPages)
    setIsLoadingPosts(false)
  }, [])

  return (
    <>
      {/* TODO: SEO improvements */}

      <Head>
        <title>Blog | Gabriel Gigante</title>
      </Head>

      <Header githubUrl={githubUrl} linkedInUrl={linkedInUrl} twitterUrl={twitterUrl} />

      <motion.main className={styles.wrapper} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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

        <div className={styles.searchContainer}>
          <TagsInput
            label="Pesquise por tópicos"
            placeholder="Digite para selecionar um tópico"
            suggestions={tags}
            onChange={handleFilterPosts}
          />
        </div>

        {isLoadingPosts && (
          <div className={styles.loadingContainer}>
            <Dots />
          </div>
        )}

        {!isLoadingPosts && postList.length === 0 && (
          <div className={styles.emptyContent}>
            <span>😴</span>
            <h2>Nenhum post encontrado...</h2>
          </div>
        )}

        {!isLoadingPosts && postList.length > 0 && (
          <section className={styles.posts}>
            {postList.map(post => (
              <PostItem key={post.slug} post={post} />
            ))}
          </section>
        )}

        {!isLoadingPosts && currentPage < totalPaginationPages && (
          <button className={styles.loadMorePosts} onClick={handleFetchMorePosts}>
            {!!isFetchingMorePosts ? <Dots /> : 'Carregar mais posts'}
          </button>
        )}
      </motion.main>

      <ScrollToTopButton />
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const prismic = getPrismicClient()

  const {
    results: [document]
  } = await prismic.query([Prismic.predicates.at('document.type', 'home')])

  const { results: postResults, total_pages: postTotalPages } = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetchLinks: ['tag.tag_color', 'tag.tag_name'],
      orderings: '[document.first_publication_date desc]',
      pageSize: POST_PAGINATION_QUANTITY
    }
  )

  const { results: tagResults } = await prismic.query([Prismic.predicates.at('document.type', 'tag')])

  // TODO: Format date using pt-BR locale
  const posts: Post[] = postResults.map(post => {
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

  const tags: Tag[] = tagResults.map(tag => {
    return {
      id: tag.id,
      name: tag.data.tag_name,
      color: tag.data.tag_color
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
      totalPostPages: postTotalPages,
      tags
    },
    revalidate: A_WEEK_IN_SECONDS
  }
}

export default Home
