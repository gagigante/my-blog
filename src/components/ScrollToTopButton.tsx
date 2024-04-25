import { useEffect, useState } from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai'

import styles from '@styles/components/ScrollToTopButton.module.scss'

export const ScrollToTopButton = () => {
  const [isScrollToTopButtonVisible, setIsScrollToTopButtonVisible] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', toggleScrollToTopButtonVisibility)

    return () => {
      window.removeEventListener('scroll', toggleScrollToTopButtonVisibility)
    }
  }, [])

  function toggleScrollToTopButtonVisibility(): void {
    if (window.pageYOffset > 300) {
      setIsScrollToTopButtonVisible(true)
      return
    }

    setIsScrollToTopButtonVisible(false)
  }

  function handleScrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {isScrollToTopButtonVisible && (
        <button className={styles.wrapper} onClick={handleScrollToTop}>
          <AiOutlineArrowUp size={16} />
        </button>
      )}
    </>
  )
}
