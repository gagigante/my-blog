import { NextApiRequest, NextApiResponse } from 'next'
import { getScreenshot } from '../_lib/chromium'
import getThumbTemplate from '../_lib/thumbTemplate'

const isDev = !process.env.AWS_REGION

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const html = getThumbTemplate()
    const file = await getScreenshot(html, isDev)

    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-control', 'public, immutable, no-transform, s-maxage=1312345654, max-age=1312345654')

    return res.end(file)
  } catch {
    return res.status(500)
  }
}
