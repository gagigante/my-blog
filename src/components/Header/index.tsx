'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineGithub, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai'

import styles from './styles.module.scss'

interface HeaderProps {
  githubUrl: string
  linkedInUrl: string
  twitterUrl: string
}

export const Header = ({ githubUrl, linkedInUrl, twitterUrl }: HeaderProps) => {
  const pathname = usePathname()

  const isPostsRoute = (path: string) => {
    if (!path) return false

    if (path === '/') return true

    if (path.split('/')[1] === 'posts') return true

    return false
  }

  return (
    <header className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.logo}>
          gg.dev
        </Link>

        <div className={styles.content}>
          <ul className={styles.nav}>
            <li>
              <Link href="/" className={isPostsRoute(pathname ?? '/') ? styles.active : ''}>
                Posts
              </Link>
            </li>
            <li>
              <Link href="/me" className={pathname === '/me' ? styles.active : ''}>
                Me
              </Link>
            </li>
          </ul>

          <ul className={styles.socialLinks}>
            {githubUrl !== 'null' && (
              <li>
                <a href={githubUrl} aria-label="GitHub" target="_blank" rel="noreferrer">
                  <AiOutlineGithub />
                </a>
              </li>
            )}

            {linkedInUrl !== 'null' && (
              <li>
                <a href={linkedInUrl} aria-label="LinkedIn" target="_blank" rel="noreferrer">
                  <AiFillLinkedin />
                </a>
              </li>
            )}

            {twitterUrl !== 'null' && (
              <li>
                <a href={twitterUrl} aria-label="Twitter" target="_blank" rel="noreferrer">
                  <AiOutlineTwitter />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}
