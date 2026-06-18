import type { Metadata } from 'next'
import Link from 'next/link'
import { projects, getProject } from '@/lib/projects'
import Reveal from '@/components/Reveal'
import ParallaxImage from '@/components/ParallaxImage'
import styles from './work.module.css'

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  return { title: project ? `${project.title} — djeel` : 'Work — djeel', description: project?.tagline }
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return <div style={{ padding: '10rem 2rem' }}>Project not found.</div>

  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const next = projects[(currentIndex + 1) % projects.length]

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <Link href="/#work" className={`${styles.back} link-underline`}>← Work</Link>
        <Reveal as="div" className={styles.headerContent} start="top 95%">
          <h1 className={styles.title}>
            <span className="reveal-line"><span>{project.title}</span></span>
          </h1>
          <p className={`${styles.tagline} reveal-up`}>{project.tagline}</p>
          <div className={`${styles.meta} reveal-up`}>
            <div className={styles.metaItem}><span className="label">Year</span><span>{project.year}</span></div>
            <div className={styles.metaItem}><span className="label">Role</span><span>{project.role}</span></div>
            <div className={styles.metaItem}><span className="label">Category</span><span>{project.category}</span></div>
          </div>
        </Reveal>
      </header>

      {/* Cover image */}
      <ParallaxImage
        src={project.coverImage}
        alt={`${project.title} — screenshot`}
        width={2493}
        height={1259}
        className={styles.coverWrap}
      />

      <div className={styles.body}>
        <Section label="Context" content={project.context} />
        <Section label="Challenge" content={project.challenge} />

        {project.decisions && project.decisions.length > 0 && (
          <section className={styles.section}>
            <span className="label">Key Decisions</span>
            <div className={styles.decisions}>
              {project.decisions.map((d) => (
                <div key={d.title} className={styles.decision}>
                  <h3 className={styles.decisionTitle}>{d.title}</h3>
                  <p className={styles.decisionDetail}>{d.detail}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className={styles.section}>
          <span className="label">Stack</span>
          <div className={styles.stack}>
            {project.stack.map((s) => <span key={s} className={styles.tag}>{s}</span>)}
          </div>
        </section>

        <Section label="Results" content={project.results} />

        {project.learnings.length > 0 && (
          <section className={styles.section}>
            <span className="label">Learnings</span>
            <ol className={styles.learnings}>
              {project.learnings.map((l, i) => (
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
        <span className="label">Next Project</span>
        <Link href={`/work/${next.slug}`} className={styles.nextLink}>
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
