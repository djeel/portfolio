import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { getDictionary, isValidLocale } from '@/i18n'
import styles from './about.module.css'

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getDictionary(isValidLocale(locale) ? locale : 'en')

  const stack = [
    { name: 'JavaScript / TypeScript', note: t.about.toolNotes.daily },
    { name: 'HTML & CSS', note: t.about.toolNotes.foundation },
    { name: 'Rust', note: t.about.toolNotes.systemsPerformance },
    { name: 'Python', note: t.about.toolNotes.scriptingBackends },
    { name: 'SolidJS / React', note: t.about.toolNotes.frontendFrameworks },
    { name: 'Godot', note: t.about.toolNotes.interactiveProjects },
  ]

  return (
    <div className={styles.page}>
      <Reveal as="header" className={styles.header} start="top 95%">
        <span className="label reveal-up">{t.about.title}</span>
        <h1 className={styles.title}>
          <span className="reveal-line"><span>{t.about.headlinePart1}</span></span>
          <span className="reveal-line"><span>{t.about.headlinePart2}</span></span>
        </h1>
      </Reveal>
      <Reveal className={styles.content}>
        <div className={`${styles.bio} reveal-up`}>
          <p>{t.about.bio1}</p>
          <p>{t.about.bio2}</p>
          <p>{t.about.bio3}</p>
          <p>{t.about.bio4.split('Murmur')[0]}<Link href={`/${locale}/work/murmur`} className={styles.link}>Murmur</Link>{t.about.bio4.split('Murmur')[1]}</p>
        </div>
        <div className={`${styles.stackSection} reveal-up`}>
          <h2 className={styles.stackTitle}>{t.about.tools}</h2>
          <ul className={styles.stackList}>
            {stack.map((s) => (
              <li key={s.name} className={styles.stackItem}>
                <span className={styles.stackName}>{s.name}</span>
                <span className={styles.stackNote + ' label'}>{s.note}</span>
              </li>
            ))}
          </ul>
          <div className={styles.contact}>
            <p className="label" style={{ marginBottom: '0.75rem' }}>{t.about.currently}</p>
            <p>{t.about.openTo}</p>
            <Link href={`/${locale}/contact`} className={`${styles.link} link-underline`}>{t.about.getInTouch}</Link>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
