import Link from 'next/link'
import { RiArrowLeftLine } from 'react-icons/ri'

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="w-full max-w-[1366px] mx-auto px-4 sm:px-6 mt-32 lg:px-8">
      <Link
        href="/"
        className="flex gap-2 items-center mb-12 text-slate-50/75 hover:text-slate-50/50 font-thin font-mono text-sm uppercase transition-colors"
      >
        <RiArrowLeftLine /> Voltar para a listagem de posts
      </Link>

      <time dateTime="2024-04-04" className="text-slate-50/75 font-thin font-mono text-sm block uppercase">
        2020-04-01T23:46:37.984Z
      </time>

      <h1 className="font-sans font-bold text-[52px] text-slate-50 mb-8">Character Prefix Conditioning</h1>

      <p className="text-slate-50/75 text-base/8 mb-6">
        TL;DR: I chose to make using AI a manual action, because I felt the slow loss of competence over time when I
        relied on it, and I recommend everyone to be cautious with making AI a key part of their workflow.
      </p>

      <p className="text-slate-50/75 text-base/8 mb-6">
        In late 2022, I used AI tools for the first time, even before the first version of ChatGPT. In 2023, I started
        using AI-based tools in my development workflow. Initially, I was super impressed with the capabilities of these
        LLMs. The fact that I could just copy and paste obscure compiler errors along with the C++ source code, and be
        told where the error is caused felt like magic.
      </p>
    </div>
  )
}
