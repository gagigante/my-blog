import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Prismic from '@prismicio/client'
import { RichText, Link } from 'prismic-dom'

import { getPrismicClient } from '@services/prismic'

import { Header } from '@components/Header'
import { PostItem } from '@components/PostItem'

import styles from '@styles/pages/Home.module.scss'

const DATA = [
  {
    slug: '0',
    date: new Date('06/06/2021').toLocaleDateString('pt-BR', {
      dateStyle: 'long'
    }),
    title: `Next.JS - Novidades na versão 10 e atualização do blog para
    melhorar a performance`,
    abstract: `Se você nos acompanhou nos últimos posts, já viu que criamos um
    blog com um contador de visitas usando o MongoDB e Next.js,
    depois adicionamos a funcionalidade de dark mode.`,
    views: 10,
    readingTime: 10,
    tags: [
      {
        id: 0,
        name: 'JavaScript',
        color: '#fff000'
      }
    ]
  },
  {
    slug: '1',
    date: new Date('06/06/2021').toLocaleDateString('pt-BR', {
      dateStyle: 'long'
    }),
    title: `Como renomear vários arquivos de uma vez usando o terminal`,
    abstract: `Suponha que seu projeto tenha uma base de código com 150
    arquivos JavaScript e você precisar migrar para TypeScript
    alterando as extensões dos arquivos. 🤔`,
    views: 10,
    readingTime: 10,
    tags: [
      {
        id: 0,
        name: 'JavaScript',
        color: '#fff000'
      },
      {
        id: 1,
        name: 'TypeScript',
        color: '#3178c6'
      }
    ]
  },
  {
    slug: '2',
    date: new Date('06/06/2021').toLocaleDateString('pt-BR', {
      dateStyle: 'long'
    }),
    title: `Obtendo o status de progresso do envio de dados com Axios`,
    abstract: `Vamos mostrar na prática como obter o progresso de cada
    requisição HTTP sendo feita através do método POST, do front end
    para o back end utilizando o Axios.`,
    views: 10,
    readingTime: 10,
    tags: [
      {
        id: 0,
        name: 'JavaScript',
        color: '#fff000'
      },
      {
        id: 1,
        name: 'TypeScript',
        color: '#3178c6'
      },
      {
        id: 2,
        name: 'React',
        color: '#61dbfb'
      }
    ]
  },
  {
    slug: '3',
    date: new Date('06/06/2021').toLocaleDateString('pt-BR', {
      dateStyle: 'long'
    }),
    title: `Dark Mode com CSS — mudando a aparência do Blog de maneira
    simples e rápida`,
    abstract: `Umas das funcionalidades que está na moda em Blogs e Sites é o
    Dark Mode. Devs, em sua maioria, curtem bastante utilizar temas
    escuros, tanto na IDE quanto em outros apps.`,
    views: 10,
    readingTime: 10,
    tags: [
      {
        id: 0,
        name: 'JavaScript',
        color: '#fff000'
      },
      {
        id: 1,
        name: 'TypeScript',
        color: '#3178c6'
      },
      {
        id: 2,
        name: 'React',
        color: '#61dbfb'
      }
    ]
  }
]

interface HomeProps {
  bio: string
  githubUrl: string
  linkedInUrl: string
  twitterUrl: string
}

const Home: NextPage<HomeProps> = ({ bio, githubUrl, linkedInUrl, twitterUrl }) => {
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
            />
          </div>

          <p>{bio}</p>
        </section>

        {/* TODO: Search engine */}

        <section className={styles.posts}>
          {DATA.map(post => (
            <PostItem
              slug={post.slug}
              path={`/post/${post.slug}`}
              title={post.title}
              abstract={post.abstract}
              views={post.views}
              readingTime={post.readingTime}
              tags={post.tags}
              date={post.date}
              key={post.slug}
            />
          ))}
        </section>

        {/* TODO: Add pagination */}
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const A_WEEK_IN_SECONDS = 60 * 60 * 24 * 7

  const prismic = getPrismicClient()

  const {
    results: [document]
  } = await prismic.query([Prismic.predicates.at('document.type', 'home')])

  return {
    props: {
      bio: RichText.asText(document.data.bio),
      githubUrl: Link.url(document.data.github_url),
      linkedInUrl: Link.url(document.data.linkedin_url),
      twitterUrl: Link.url(document.data.twitter_url)
    },
    revalidate: A_WEEK_IN_SECONDS
  }
}

export default Home
