import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  author: string
  keywords: string[]
  image: {
    url: string
    alt: string
    width: string
    height: string
  }
  pageType: 'website' | 'article'
  pageUrl: string
  shouldIndexPage?: boolean
}

export const SEO = ({
  title,
  description,
  image,
  author,
  keywords,
  pageType,
  pageUrl,
  shouldIndexPage = true
}: SEOProps) => {
  return (
    <Head>
      <title>{title}</title>

      <link rel="canonical" href={pageUrl} />

      {!shouldIndexPage && <meta name="robots" content="noindex,nofollow" />}

      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="image" content={image.url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Blog | Gabriel Gigante" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={pageUrl} />

      <meta property="og:image" content={image.url} />
      <meta property="og:image:alt" content={image.alt} />
      <meta property="og:image:width" content={image.width} />
      <meta property="og:image:height" content={image.height} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@calixtrao" />
      <meta name="twitter:creator" content="@calixtrao" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image.url} />
      <meta name="twitter:image:alt" content={image.alt} />
      <meta name="twitter:image:width" content={image.width} />
      <meta name="twitter:image:height" content={image.height} />
    </Head>
  )
}
