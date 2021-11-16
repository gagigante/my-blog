import Link from 'next/link'
import { AiOutlineGithub, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai'

import styles from '@styles/components/Header.module.scss'

interface HeaderProps {
  githubUrl: string
  linkedInUrl: string
  twitterUrl: string
}

export const Header = ({ githubUrl, linkedInUrl, twitterUrl }: HeaderProps) => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.content}>
        <Link href="/">
          <a>gg.dev</a>
        </Link>

        <ul className={styles.links}>
          {githubUrl.length > 0 && (
            <li>
              <a href={githubUrl} aria-label="GitHub" target="_blank" rel="noreferrer">
                <AiOutlineGithub />
              </a>
            </li>
          )}

          {linkedInUrl.length > 0 && (
            <li>
              <a href={linkedInUrl} aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <AiFillLinkedin />
              </a>
            </li>
          )}

          {twitterUrl.length > 0 && (
            <li>
              <a href={twitterUrl} aria-label="Twitter" target="_blank" rel="noreferrer">
                <AiOutlineTwitter />
              </a>
            </li>
          )}
        </ul>
      </div>
    </header>
  )
}
