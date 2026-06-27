import Link from 'next/link'
import { projects, getProject } from '@/lib/projects'
import Reveal from '@/components/Reveal'
import ParallaxImage from '@/components/ParallaxImage'
import { getDictionary, isValidLocale } from '@/i18n'
import styles from './work.module.css'

const decisionKeys: Record<string, string[]> = {
  murmur: ['rust', 'solidjs', 'postgresRedis', 'webrtc', 'e2ee'],
  undercover: ['fastapi', 'react'],
  gangui: ['vanilla', 'community'],
  kime: ['stack', 'progression', 'design'],
}

export async function generateStaticParams() {
  return projects.flatMap((p) => [
    { locale: 'en', slug: p.slug },
    { locale: 'fr', slug: p.slug },
  ])
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const t = getDictionary(isValidLocale(locale) ? locale : 'en')
  const project = getProject(slug)
  if (!project) return <div style={{ padding: '10rem 2rem' }}>{t.work.projectNotFound}</div>

  const projectT = t.projects[project.slug as keyof typeof t.projects]
  const decisions = project.decisions || []
  const dKeys = decisionKeys[project.slug] || []
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const next = projects[(currentIndex + 1) % projects.length]

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <Link href={`/${locale}/#work`} className={`${styles.back} link-underline`}>{t.work.back}</Link>
        <Reveal as="div" className={styles.headerContent} start="top 95%">
          <h1 className={styles.title}>
            <span className="reveal-line"><span>{project.title}</span></span>
          </h1>
          <p className={`${styles.tagline} reveal-up`}>{projectT.tagline}</p>
          <div className={`${styles.meta} reveal-up`}>
            <div className={styles.metaItem}><span className="label">{t.work.year}</span><span>{project.year}</span></div>
            <div className={styles.metaItem}><span className="label">{t.work.role}</span><span>{projectT.role}</span></div>
            <div className={styles.metaItem}><span className="label">{t.work.category}</span><span>{projectT.category}</span></div>
          </div>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className={`${styles.liveLink} reveal-up`}>
              {t.work.liveSite} <span aria-hidden="true">→</span>
            </a>
          )}
        </Reveal>
      </header>

      {project.coverImage ? (
        <ParallaxImage
          src={project.coverImage}
          alt={`${project.title} — screenshot`}
          width={2493}
          height={1259}
          className={styles.coverWrap}
        />
      ) : (
        <div
          className={`${styles.coverWrap} ${styles.coverPlaceholder}`}
          style={{ background: project.color, color: project.textColor }}
          aria-hidden="true"
        >
          <span>{project.title}</span>
        </div>
      )}

      <div className={styles.body}>
        <Section label={t.work.context} content={projectT.context} />
        <Section label={t.work.challenge} content={projectT.challenge} />

        {decisions.length > 0 && (
          <section className={styles.section}>
            <span className="label">{t.work.keyDecisions}</span>
            <div className={styles.decisions}>
              {decisions.map((d, i) => {
                const dKey = dKeys[i]
                const dT = projectT.decisions as unknown as Record<string, string>
                return (
                  <div key={d.title} className={styles.decision}>
                    <h3 className={styles.decisionTitle}>{dT[dKey]}</h3>
                    <p className={styles.decisionDetail}>{dT[`${dKey}Detail`]}</p>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        <section className={styles.section}>
          <span className="label">{t.work.stack}</span>
          <div className={styles.stack}>
            {project.stack.map((s) => <span key={s} className={styles.tag}>{s}</span>)}
          </div>
        </section>

        <Section label={t.work.results} content={projectT.results} />

        {project.learnings.length > 0 && (
          <section className={styles.section}>
            <span className="label">{t.work.learnings}</span>
            <ol className={styles.learnings}>
              {projectT.learnings.map((l: string, i: number) => (
                <li key={i} className={styles.learning}>
                  <span className={styles.learnMarker} aria-hidden="true" />
                  <span>{l}</span>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>

      <div className={styles.nextProject}>
        <span className="label">{t.work.nextProject}</span>
        <Link href={`/${locale}/work/${next.slug}`} className={styles.nextLink}>
          <span className={styles.nextTitle}>{next.title} →</span>
        </Link>
      </div>
    </article>
  )
}

function Section({ label, content }: { label: string; content: string }) {
  return (
    <section className={styles.section}>
      <span className="label">{label}</span>
      <p className={styles.prose}>{content}</p>
    </section>
  )
}
