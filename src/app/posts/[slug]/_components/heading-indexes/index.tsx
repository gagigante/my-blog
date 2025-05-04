'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import styles from './styles.module.scss'

interface Heading {
  type: 'heading2' | 'heading3' | 'heading4'
  text: string
}

interface HeadingIndexesProps {
  headings: Heading[]
}

const HEADING_PADDING = {
  heading2: '0px',
  heading3: '16px',
  heading4: '32px'
}

export function HeadingIndexes({ headings }: HeadingIndexesProps) {
  const [activeSection, setActiveSection] = useState<string>()

  useEffect(() => {
    const sections = document.querySelectorAll('section')

    const observer = new IntersectionObserver(
      entries => {
        const intersectingSections = entries.filter(entry => entry.isIntersecting)

        if (intersectingSections.length > 0) {
          const closestSection = intersectingSections.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0]

          setActiveSection(closestSection.target.id)
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -80% 0px'
      }
    )

    sections.forEach(section => {
      observer.observe(section)
    })

    return () => {
      sections.forEach(section => observer.unobserve(section))
    }
  }, [])

  return (
    <div className={styles.container}>
      <strong className={styles.title}>Nesta página</strong>

      <ul className={styles.topics}>
        {headings.map(heading => (
          <li
            key={`${heading.type}-${heading.text}`}
            style={{
              paddingLeft: HEADING_PADDING[heading.type]
            }}
          >
            <Link className={activeSection === heading.text ? styles.active : ''} href={`#${heading.text}`}>
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
