import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import styles from './contact.module.css'

export const metadata: Metadata = {
  title: 'Contact — djeel',
  description: "Let's work together.",
}

export default function Contact() {
  return (
    <div className={styles.page}>
      <Reveal className={styles.inner} start="top 95%">
        <span className="label reveal-up">Contact</span>
        <h1 className={styles.title}>
          <span className="reveal-line"><span>Let&apos;s work</span></span>
          <span className="reveal-line"><span>together.</span></span>
        </h1>
        <div className="reveal-up">
          <Link href="mailto:djeel@gangui.eu" className={styles.email}>
            djeel@gangui.eu
          </Link>
        </div>
        <div className={`${styles.note} reveal-up`}>
          <p>Open to ambitious junior roles, early-stage products,<br />and focused freelance collaborations.</p>
          <p>Response within 48h.</p>
        </div>
        <div className={`${styles.links} reveal-up`}>
          <Link href="https://github.com/djeel" target="_blank" rel="noopener" className={`${styles.extLink} link-underline`}>
            GitHub ↗
          </Link>
        </div>
      </Reveal>
    </div>
  )
}
