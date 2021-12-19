import { rgba } from 'polished'
import { AiOutlineClose } from 'react-icons/ai'

import styles from '@styles/components/Tag.module.scss'

interface TagProps {
  id: string
  title: string
  color: string
  closeButtonFunction?: (tagId: string) => void
}

export const Tag = ({ id, title, color, closeButtonFunction }: TagProps) => {
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

      {!!closeButtonFunction && (
        <button className={styles.closeButton} onClick={() => closeButtonFunction(id)}>
          <AiOutlineClose color={rgba(color, 0.8)} />
        </button>
      )}
    </span>
  )
}
