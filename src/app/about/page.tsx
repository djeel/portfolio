import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import styles from './about.module.css'

export const metadata: Metadata = {
  title: 'About — djeel',
  description: 'Self-taught developer in France, building at the intersection of frontend, UI/UX, and product.',
}

const stack = [
  { name: 'JavaScript / TypeScript', note: 'daily' },
  { name: 'HTML & CSS', note: 'foundation' },
  { name: 'Rust', note: 'systems, performance' },
  { name: 'Python', note: 'scripting, backends' },
  { name: 'SolidJS / React', note: 'frontend frameworks' },
  { name: 'Godot', note: 'interactive projects' },
]

export default function About() {
  return (
    <div className={styles.page}>
      <Reveal as="header" className={styles.header} start="top 95%">
        <span className="label reveal-up">About</span>
        <h1 className={styles.title}>
          <span className="reveal-line"><span>Building products</span></span>
          <span className="reveal-line"><span>that actually work.</span></span>
        </h1>
      </Reveal>
      <Reveal className={styles.content}>
        <div className={`${styles.bio} reveal-up`}>
          <p>Today I work in retail. But my real field of progress is digital.</p>
          <p>For several years I&apos;ve been learning by building: interfaces, tools, interactive experiences, and real products. Not as a hobby — as a practice.</p>
          <p>What I&apos;m looking for now is an environment where this energy can become a real career. I&apos;m interested in roles where product thinking meets good engineering: early-stage startups, ambitious products, and teams that care about quality.</p>
          <p>My main project is <Link href="/work/murmur" className={styles.link}>Murmur</Link> — a voice-first communication platform I designed, built, and deployed solo. It&apos;s the best summary of how I think and work.</p>
        </div>
        <div className={`${styles.stackSection} reveal-up`}>
          <h2 className={styles.stackTitle}>Tools</h2>
          <ul className={styles.stackList}>
            {stack.map((s) => (
              <li key={s.name} className={styles.stackItem}>
                <span className={styles.stackName}>{s.name}</span>
                <span className={styles.stackNote + ' label'}>{s.note}</span>
              </li>
            ))}
          </ul>
          <div className={styles.contact}>
            <p className="label" style={{ marginBottom: '0.75rem' }}>Currently</p>
            <p>Open to junior-ambitious roles, early-stage products, and focused freelance.</p>
            <Link href="/contact" className={`${styles.link} link-underline`}>Get in touch →</Link>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
