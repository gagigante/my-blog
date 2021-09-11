import Link from 'next/link'
import {
  AiOutlineGithub,
  AiFillLinkedin,
  AiOutlineTwitter
} from 'react-icons/ai'

import styles from '@styles/components/Header.module.scss'

export const Header = () => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.content}>
        <Link href="/">
          <a>gg.dev</a>
        </Link>

        <ul className={styles.links}>
          <li>
            <a
              href={process.env.NEXT_PUBLIC_GITHUB_LINK}
              target="_blank"
              rel="noreferrer"
            >
              <AiOutlineGithub />
            </a>
          </li>

          <li>
            <a
              href={process.env.NEXT_PUIBLIC_LINKEDIN_LINK}
              target="_blank"
              rel="noreferrer"
            >
              <AiFillLinkedin />
            </a>
          </li>

          <li>
            <a
              href={process.env.NEXT_PUBLIC_TWITTER_LINK}
              target="_blank"
              rel="noreferrer"
            >
              <AiOutlineTwitter />
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
