import { PrismicRichText } from '@prismicio/react'
import type { RichTextField } from '@prismicio/client'

import styles from './styles.module.scss'

interface CustomRichTextProps {
  content: RichTextField | null | undefined
}

export function CustomRichText({ content }: CustomRichTextProps) {
  return (
    <PrismicRichText
      field={content}
      components={{
        heading2: ({ node }) => (
          <>
            <section id={node.text}></section>
            <h2 className={styles.heading2}>{node.text}</h2>
          </>
        ),
        heading3: ({ node }) => (
          <>
            <section id={node.text}></section>
            <h3 className={styles.heading3}>{node.text}</h3>
          </>
        ),
        heading4: ({ node }) => (
          <>
            <section id={node.text}></section>
            <h4 className={styles.heading4}>{node.text}</h4>
          </>
        ),
        paragraph: ({ node }) => <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: node.text }} />,
        preformatted: ({ node }) => <code>{node.text}</code>
      }}
    />
  )
}
