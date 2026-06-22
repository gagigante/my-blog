'use client'

import { useState } from 'react'
import Image from 'next/image'

import styles from './page.module.scss'

const experiences = [
  {
    id: 'isaac',
    company: 'isaac',
    logo: '/companies/isaac.jpeg',
    logoAlt: 'Logo da isaac',
    companyPeriod: 'Jul 2022 - Atual',
    roles: [
      {
        id: 'isaac-senior',
        title: 'Senior Software Engineer',
        period: 'jul de 2024 - atual',
        summary: [
          'Atuação em iniciativas estratégicas de alta complexidade, com liderança técnica em arquitetura, modernização de aplicações, evolução de design systems e melhorias na experiência de desenvolvimento.',
          'Liderei a evolução do design system da empresa por meio de uma estratégia de theming, permitindo um processo de rebranding gradual e mais simples de sustentar no longo prazo.',
          'Participei ainda do planejamento e implementação de um BFF para o principal portal da empresa, utilizando Node.js, Fastify, TypeScript e Swagger.'
        ]
      },
      {
        id: 'isaac-mid-level',
        title: 'Software Engineer',
        period: 'jul de 2022 - jul de 2024',
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
    logo: '/companies/magalubank.jpeg',
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
    logo: '/companies/accountfy.jpeg',
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
  },
  {
    id: 'treetech',
    company: 'Treetech Sistemas Digitais',
    logo: '/companies/treetech.jpeg',
    logoAlt: 'Logo da Treetech Sistemas Digitais',
    companyPeriod: 'Nov 2019 - Nov 2020',
    roles: [
      {
        id: 'treetech-software-engineering-intern',
        title: 'Software Engineering Intern',
        summary: [
          'Atuação em manutenção e evolução de sistemas voltados à gestão de ativos de subestações elétricas, com contato próximo com software legado e ferramentas internas.',
          'Participei da manutenção do sistema principal de diagnóstico e prognóstico, além de contribuir para o desenvolvimento de novas ferramentas internas com foco em apoiar operações e fluxos técnicos da empresa.'
        ]
      }
    ]
  }
] as const

const specialties = [
  {
    title: 'Frontend',
    keywords: 'JavaScript, TypeScript, React, Next.js'
  },
  {
    title: 'Backend',
    keywords: 'Node.js, Golang, PostgreSQL, Redis, Kafka'
  },
  {
    title: 'Misc',
    keywords: 'Vitest, Jest, Playwright, Storybook, Docker, Terraform'
  }
] as const

const education = [
  {
    id: 'ifsp',
    title: 'Tecnólogo em análise e desenvolvimento de sistemas',
    logo: '/education/ifsp.jpeg',
    logoAlt: 'Logo do IFSP',
    school: 'Instituto Federal de Educação, Ciência e Tecnologia de São Paulo - IFSP',
    period: '2019 - 2022'
  },
  {
    id: 'etec',
    title: 'Técnico em desenvolvimento de software',
    logo: '/education/etec.jpeg',
    logoAlt: 'Logo da Etec Prof. Carmine Biagio Tundisi',
    school: 'Etec Prof. Carmine Biagio Tundisi',
    period: '2016 - 2018'
  }
] as const

const quickFacts = [
  {
    label: 'Base',
    value: 'São Paulo, Brasil'
  },
  {
    label: 'Contato',
    value: 'gabrielgigante29@gmail.com'
  },
  {
    label: 'Atuação',
    value: 'Desenvolvedor Full Stack'
  }
] as const

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
      <div className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroMain}>
            <span className={styles.eyebrow}>Sobre mim</span>
            <h1>Gabriel Gigante</h1>
            <p className={styles.heroLead}>
              Senior Software Engineer construindo <span>plataformas escaláveis</span>, produtos orientados ao usuário e
              estruturas de engenharia que evoluem bem no longo prazo.
            </p>

            <div className={styles.bio}>
              <p>
                Sou engenheiro de software com mais de 5 anos de experiência na construção de aplicações escaláveis para
                setores como educação, varejo, finanças e SaaS. Atuo principalmente com{' '}
                <span>JavaScript, TypeScript, React, Next.js, Node.js e Golang</span>, desenvolvendo soluções full-stack
                com foco em arquitetura e evolução sustentável de produtos.
              </p>

              <p>
                Ao longo da minha trajetória, liderei iniciativas de alta complexidade envolvendo{' '}
                <span>design systems, BFFs, monorepos</span> e modernização de aplicações front-end. Também tenho forte
                interesse em experiência de desenvolvimento, acessibilidade, testes automatizados e governança técnica.
              </p>
            </div>
          </div>

          <aside className={styles.heroAside}>
            <div className={styles.avatarPanel}>
              <div className={styles.avatarFrame}>
                <Image
                  src="https://avatars.githubusercontent.com/u/48386738?v=4"
                  width={128}
                  height={128}
                  className={styles.avatar}
                  alt="Foto de Gabriel Gigante"
                />
              </div>

              <div className={styles.factList}>
                {quickFacts.map(fact => (
                  <div key={fact.label} className={styles.factItem}>
                    <span>{fact.label}</span>
                    <strong>{fact.value}</strong>
                  </div>
                ))}
              </div>

              <div className={styles.heroActions}>
                <a href="https://github.com/gagigante" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/gabriel-gigante/" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          </aside>
        </section>

        <div className={styles.globalDivider} />

        <section className={styles.contentGrid}>
          <div className={styles.mainColumn}>
            <header className={styles.sectionHeader}>
              <h2>Trajetória profissional</h2>
            </header>

            <div className={styles.professionalList}>
              {experiences.map(experience => (
                <article key={experience.id} className={styles.professionalItem}>
                  <div className={styles.companyTop}>
                    <div className={styles.companyLogo}>
                      <Image src={experience.logo} width={48} height={48} alt={experience.logoAlt} />
                    </div>

                    <div className={styles.companyHeader}>
                      <strong className={styles.companyName}>{experience.company}</strong>
                      <span className={styles.companyPeriod}>{experience.companyPeriod}</span>
                    </div>
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

            <section className={styles.secondarySection}>
              <header className={styles.sectionHeader}>
                <h2>Formação acadêmica</h2>
              </header>

              <div className={styles.educationCards}>
                {education.map(item => (
                  <article key={item.id} className={styles.educationCard}>
                    <div className={styles.educationTop}>
                      <div className={styles.educationLogo}>
                        <Image src={item.logo} width={48} height={48} alt={item.logoAlt} />
                      </div>

                      <div className={styles.educationHeader}>
                        <strong>{item.title}</strong>
                        <span>{item.period}</span>
                      </div>
                    </div>

                    <p>{item.school}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className={styles.sideColumn}>
            <section className={styles.panel}>
              <span className={styles.eyebrow}>Área de atuação</span>
              <h3>Tecnologias por área</h3>

              <div className={styles.specialtiesList}>
                {specialties.map(item => (
                  <div key={item.title} className={styles.specialtyItem}>
                    <strong>{item.title}</strong>
                    <p>{item.keywords}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  )
}
