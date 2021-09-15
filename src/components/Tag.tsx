import { rgba } from 'polished'

import styles from '@styles/components/Tag.module.scss'

interface TagProps {
  title: string
  color: string
}

export const Tag = ({ title, color }: TagProps) => {
  return (
    <span
      className={styles.wrapper}
      style={{
        color: rgba(color, 0.8),
        backgroundColor: rgba(color, 0.1),
        borderColor: rgba(color, 0.6),
        borderStyle: 'solid',
        borderWidth: 1
      }}
    >
      {title}
    </span>
  )
}
