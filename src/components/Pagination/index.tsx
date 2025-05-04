'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

import { LinkItem } from './LinkItem'
import { PaginationContainer } from './PaginationContainer'

import { POST_PAGINATION_QUANTITY } from '@constants/POST_PAGINATION_QUANTITY'

type PaginationProps = {
  totalPosts: number
}

export const Pagination = ({ totalPosts }: PaginationProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageQueryParam = searchParams?.get('page') ?? null
  const currentPage = Number(pageQueryParam) || 1

  const pages = Math.floor(totalPosts / POST_PAGINATION_QUANTITY)

  const createPageURL = (pageNumber: number | string) => {
    if (!searchParams) return

    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())

    return `${pathname}?${params.toString()}`
  }

  const items = (() => {
    if (currentPage === 1) {
      return Array.from({ length: pages }, (_, i) => i + 1).slice(0, 3)
    }

    if (currentPage === pages) {
      return [currentPage - 2, currentPage - 1, currentPage].filter(item => item > 0)
    }

    return [currentPage - 1, currentPage, currentPage + 1].filter(item => item > 0 && item <= pages)
  })()

  const displayLastPageLink = (() => {
    if (items.includes(pages)) {
      return false
    }

    return true
  })()

  return (
    <PaginationContainer>
      <LinkItem path={createPageURL(currentPage - 1) ?? ''} label={<RiArrowLeftSLine />} isActive={currentPage === 1} />

      {items.map(item => (
        <LinkItem key={item} path={createPageURL(item) ?? ''} label={item} isActive={currentPage === item} />
      ))}
      {displayLastPageLink && <LinkItem path={createPageURL(pages) ?? ''} label={pages} />}

      <LinkItem
        path={createPageURL(currentPage + 1) ?? ''}
        label={<RiArrowRightSLine />}
        isActive={currentPage === pages}
      />
    </PaginationContainer>
  )
}
