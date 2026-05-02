'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AiOutlineMail, AiOutlinePushpin } from 'react-icons/ai'

import styles from './page.module.scss'

const experiences = [
  {
    id: 'isaac',
    company: 'isaac',
    logo: '/companies/isaac.svg',
    logoAlt: 'Logo da isaac',
    companyPeriod: 'Jul 2022 - Atual',
    roles: [
      {
        id: 'isaac-senior',
        title: 'Senior Software Engineer',
        period: 'Período atual',
        summary: [
          'Atuação em iniciativas estratégicas de alta complexidade, com liderança técnica em arquitetura, modernização de aplicações, evolução de design systems e melhorias na experiência de desenvolvimento.',
          'Liderei a evolução do design system da empresa por meio de uma estratégia de theming, permitindo um processo de rebranding gradual e mais simples de sustentar no longo prazo.',
          'Participei ainda do planejamento e implementação de um BFF para o principal portal da empresa, utilizando Node.js, Fastify, TypeScript e Swagger.'
        ]
      },
      {
        id: 'isaac-pleno',
        title: 'Software Engineer (Pleno)',
        period: 'Cargo anterior',
        summary: [
          'Atuação no desenvolvimento e evolução de frentes importantes do portal de autoatendimento para escolas, com foco em escalabilidade e qualidade técnica.',
          'Conduzi a transformação do front-end do portal de autoatendimento das escolas de um monólito para um monólito modular com estratégia de monorepo, reduzindo a sobrecarga cognitiva e aumentando a flexibilidade dos times.'
        ]
      }
    ]
  },
  {
    id: 'magalubank',
    company: 'MagaluBank (Luizalabs)',
    logo: '/companies/magalubank.svg',
    logoAlt: 'Logo da MagaluBank',
    companyPeriod: 'Nov 2021 - Jul 2022',
    roles: [
      {
        id: 'magalubank-software-engineer',
        title: 'Software Engineer',
        summary: [
          'Desenvolvimento de soluções de software com foco em produtos financeiros, colaborando na construção e evolução de aplicações escaláveis.',
          'Fui responsável pela implementação do front-end da primeira versão do MagaluPay, carteira digital integrada ao Super App do Magalu e um dos produtos centrais da nova frente do grupo, a MagaluBank.'
        ]
      }
    ]
  },
  {
    id: 'accountfy',
    company: 'Accountfy',
    logo: '/companies/accountfy.svg',
    logoAlt: 'Logo da Accountfy',
    companyPeriod: 'Nov 2020 - Nov 2021',
    roles: [
      {
        id: 'accountfy-software-engineer',
        title: 'Software Engineer',
        summary: [
          'Participação no desenvolvimento de aplicações voltadas para SaaS, contribuindo para a evolução de produtos e para a entrega de soluções full-stack.',
          'Atuei no desenvolvimento do front-end da nova versão do módulo de dashboards da plataforma, usando Angular, RxJS, Sass e outras ferramentas do ecossistema.',
          'Também contribuí para definição e documentação da arquitetura do projeto, além de realizar code reviews, mentoria e compartilhamento de conhecimento com o time.'
        ]
      }
    ]
  }
] as const

// TODO: load infos from cms
export default function Page() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  const handleToggleExpanded = (itemId: string) => {
    setExpandedItems(oldState => ({
      ...oldState,
      [itemId]: !oldState[itemId]
    }))
  }

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Image
          src="https://avatars.githubusercontent.com/u/48386738?v=4"
          width={128}
          height={128}
          className={styles.avatar}
          alt="Picture of the author"
        />

        <h2>Gabriel Gigante</h2>

        <div className={styles.bio}>
          <p>
            Sou engenheiro de software com mais de 5 anos de experiência na construção de aplicações escaláveis para
            setores como educação, varejo, finanças e SaaS. Atuo principalmente com{' '}
            <span>JavaScript, TypeScript, React, Next.js, Node.js e Golang</span>, desenvolvendo soluções full-stack com
            foco em arquitetura e evolução sustentável de produtos.
          </p>

          <p>
            Ao longo da minha trajetória, liderei iniciativas de alta complexidade envolvendo{' '}
            <span>design systems, BFFs, monorepos</span> e modernização de aplicações front-end. Também tenho forte
            interesse em experiência de desenvolvimento, acessibilidade, testes automatizados e governança técnica.
          </p>
        </div>

        <div className={styles.contactInfo}>
          <p>
            <AiOutlinePushpin /> São Paulo, Brasil
          </p>
          <p>
            <AiOutlineMail /> gabrielgigante29@gmail.com
          </p>
        </div>

        <section className={styles.section}>
          <h3>Experiência profissional</h3>

          <div className={styles.professionalList}>
            {experiences.map(experience => (
              <article key={experience.id} className={styles.professionalItem}>
                <div className={styles.companyLogo}>
                  <Image src={experience.logo} width={48} height={48} alt={experience.logoAlt} />
                </div>

                <div className={styles.companyHeader}>
                  <strong className={styles.companyName}>{experience.company}</strong>
                  <span className={styles.companyPeriod}>{experience.companyPeriod}</span>
                </div>

                <div className={styles.rolesList}>
                  {experience.roles.map(role => (
                    <div key={role.id} className={styles.roleItem}>
                      <strong className={styles.roleTitle}>{role.title}</strong>
                      {role.period && <span className={styles.rolePeriod}>{role.period}</span>}

                      <div className={styles.description}>
                        <p>{role.summary[0]}</p>

                        {expandedItems[role.id] &&
                          role.summary.slice(1).map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                      </div>

                      {role.summary.length > 1 && (
                        <button
                          type="button"
                          className={styles.readMoreButton}
                          onClick={() => handleToggleExpanded(role.id)}
                        >
                          {expandedItems[role.id] ? 'Ler menos' : 'Ler mais'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3>Formação acadêmica</h3>

          <div className={styles.educationList}>
            <article className={styles.educationItem}>
              <strong>Tecnólogo em análises e desenvolvimento de sistemas</strong>
              <p>Instituto Federal de Educação, Ciência e Tecnologia de São Paulo - IFSP</p>
              <span>2019 - 2022</span>
            </article>

            <article className={styles.educationItem}>
              <strong>Técnico em desenvolvimento de software</strong>
              <p>Etec Prof. Carmine Biagio Tundisi</p>
              <span>2016 - 2018</span>
            </article>
          </div>
        </section>
      </div>
    </main>
  )
}
