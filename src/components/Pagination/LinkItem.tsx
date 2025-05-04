import { ReactNode } from 'react'
import Link from 'next/link'

import styles from './LinkItem.module.scss'

interface LinkItemProps {
  path: string
  label: ReactNode
  isActive?: boolean
}

export const LinkItem = ({ path, label, isActive = false }: LinkItemProps) => {
  return (
    <li className={styles.container}>
      <Link href={path} aria-disabled={isActive}>
        {label}
      </Link>
    </li>
  )
}
