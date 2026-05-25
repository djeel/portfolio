import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './contact.module.css'

export const metadata: Metadata = {
  title: 'Contact — djeel',
  description: "Let's work together.",
}

export default function Contact() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <span className="label">Contact</span>
        <h1 className={styles.title}>Let&apos;s work<br />together.</h1>
        <Link href="mailto:djeel@gangui.eu" className={styles.email}>
          djeel@gangui.eu
        </Link>
        <div className={styles.note}>
          <p>Open to ambitious junior roles, early-stage products,<br />and focused freelance collaborations.</p>
          <p>Response within 48h.</p>
        </div>
        <div className={styles.links}>
          <Link href="https://github.com/djeel" target="_blank" rel="noopener" className={styles.extLink}>
            GitHub ↗
          </Link>
        </div>
      </div>
    </div>
  )
}
