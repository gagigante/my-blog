import { PropsWithChildren } from 'react'

import { SideMenu } from '@/components/SideMenu'

import styles from './styles.module.scss'

type AppLayoutProps = PropsWithChildren<{
  githubUrl: string
  linkedInUrl: string
}>

export const AppLayout = ({ githubUrl, linkedInUrl, children }: AppLayoutProps) => {
  return (
    <div className={styles.container}>
      <SideMenu githubUrl={githubUrl} linkedInUrl={linkedInUrl} />

      <main className={styles.content}>{children}</main>
    </div>
  )
}
