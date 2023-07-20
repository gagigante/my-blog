'use client'

import { usePathname } from 'next/navigation'
import { AiOutlineGithub, AiFillLinkedin, AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { BsFileText } from 'react-icons/bs'

import { LinkItem } from './components/LinkItem'

import styles from './styles.module.scss'
import { useEffect } from 'react'

type SideMenuProps = {
  githubUrl: string
  linkedInUrl: string
}

export const SideMenu = ({ githubUrl, linkedInUrl }: SideMenuProps) => {
  const pathname = usePathname()

  useEffect(() => {
    console.log({ pathname })
  }, [pathname])

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <strong>Gabriel Gigante</strong>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <LinkItem path="/" icon={<AiOutlineHome />} label="Home" active={pathname === '/'} />
          <LinkItem path="/articles" icon={<BsFileText />} label="Artigos" />
          <LinkItem
            path="/experience"
            icon={<AiOutlineUser />}
            label="Experiência"
            active={pathname === '/experience'}
          />
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>Me encontre</p>

          <LinkItem path={linkedInUrl} icon={<AiFillLinkedin />} label="LinkedIn" externalLink />
          <LinkItem path={githubUrl} icon={<AiOutlineGithub />} label="GitHub" externalLink />
        </div>
      </div>
    </div>
  )
}
