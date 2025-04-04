import Link from 'next/link'
import { RiGithubFill, RiLinkedinFill } from 'react-icons/ri'

interface HeaderProps {
  githubUrl: string | null
  linkedInUrl: string | null
}

export const Header = ({ githubUrl, linkedInUrl }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-gray-950/30 backdrop-blur-sm border-b border-white/10">
      <div className="flex items-center justify-between max-w-[1336px] mx-auto px-5 py-3">
        <Link
          href="/"
          className="font-primary font-semibold text-white text-2xl italic hover:text-white/80 transition-colors"
        >
          gg.dev
        </Link>

        <ul className="flex space-x-4">
          {githubUrl !== null && (
            <li>
              <a href={githubUrl} aria-label="GitHub" target="_blank" rel="noreferrer">
                <RiGithubFill />
              </a>
            </li>
          )}

          {linkedInUrl !== null && (
            <li>
              <a href={linkedInUrl} aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <RiLinkedinFill />
              </a>
            </li>
          )}
        </ul>
      </div>
    </header>
  )
}
