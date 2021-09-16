import Prismic from '@prismicio/client'

export const getPrismicClient = (req?: unknown) => {
  const prismic = Prismic.client(process.env.PRISMIC_ENDPOINT || '', {
    req,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN
  })

  return prismic
}
