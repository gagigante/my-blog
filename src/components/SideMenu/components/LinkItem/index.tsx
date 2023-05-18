import Link from 'next/link'
import { ReactElement } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'

import styles from './styles.module.scss'

type LinkItemProps = {
  active?: boolean
  path: string
  icon: ReactElement
  label: string
  externalLink?: boolean
}

export const LinkItem = ({ active = false, path, icon, label, externalLink = false }: LinkItemProps) => {
  return (
    <Link
      target={externalLink ? '_blank' : '_self'}
      href={path}
      className={`${styles.container} ${active && styles.active}`}
    >
      {icon}
      {label}
      {externalLink && <FiArrowUpRight className={styles.externalLinkIcon} />}
    </Link>
  )
}
