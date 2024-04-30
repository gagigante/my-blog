import { Suspense } from 'react'
import Image from 'next/image'
import { Dots } from 'react-activity'

import { PostItem } from '@components/PostItem'
import { Pagination } from '@components/Pagination'
import { ScrollToTopButton } from '@components/ScrollToTopButton'
// import { TagsInput } from '@components/TagsInput'

import { getBio, getPostTags, getPosts } from './lib/data'

import styles from '@styles/pages/Home.module.scss'

interface PageProps {
  searchParams: {
    tags?: string
    page?: string
  }
}

export default async function Page({ searchParams: { page = '1', tags = '' } }: PageProps) {
  const tagsFilter = tags.split(',').filter(item => !!item)
  const currentPage = Number(page)

  // TODO: handle error
  const bio = await getBio()
  const postTags = await getPostTags()
  const { posts, total } = await getPosts(currentPage)

  // async function handleFetchMorePosts(): Promise<void> {
  //   setIsFetchingMorePosts(true)

  //   const updatedCurrentPage = currentPage + 1
  //   const tagsParamValue = tagsFilter.map(tag => tag.id).join(',')

  //   const { data } = await api.get<{ posts: Post[] }>(`posts?page=${updatedCurrentPage}&tags=${tagsParamValue}`)

  //   setPostList(oldState => [...oldState, ...data.posts])
  //   setIsFetchingMorePosts(false)
  //   setCurrentPage(updatedCurrentPage)
  // }

  // const handleFilterPosts = useCallback(async (tags: Tag[]) => {
  //   setIsLoadingPosts(true)

  //   const tagsParamValue = tags.map(tag => tag.id).join(',')

  //   const { data } = await api.get<{ posts: Post[]; totalPostPages: number }>(`posts?tags=${tagsParamValue}`)

  //   setPostList([...data.posts])
  //   setTagsFilter(tags)
  //   setIsFetchingMorePosts(false)
  //   setCurrentPage(1)
  //   setTotalPaginationPages(data.totalPostPages)
  //   setIsLoadingPosts(false)
  // }, [])

  return (
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

      {/* <div className={styles.searchContainer}>
        <TagsInput
          label="Pesquise por tópicos"
          placeholder="Digite para selecionar um tópico"
          suggestions={postTags}
          onChange={undefined as any}
        />
      </div> */}

      {/* 
        - REVIEW: KEY
      */}
      <Suspense
        key={currentPage}
        fallback={
          <div className={styles.loadingContainer}>
            <Dots />
          </div>
        }
      >
        {posts.length === 0 && (
          <div className={styles.emptyContent}>
            <span>😴</span>
            <h2>Nenhum post encontrado...</h2>
          </div>
        )}

        {posts.map(post => (
          <PostItem key={post.slug} post={post} />
        ))}
      </Suspense>

      <Pagination totalPosts={total} />

      <ScrollToTopButton />
    </main>
  )
}
