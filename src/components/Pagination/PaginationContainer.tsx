import { ReactNode } from 'react'

import styles from './PaginationContainer.module.scss'

interface PaginationContainerProps {
  children: ReactNode
}

export const PaginationContainer = ({ children }: PaginationContainerProps) => {
  return (
    <nav className={styles.container} role="navigation" aria-label="pagination">
      <ul>{children}</ul>
    </nav>
  )
}
