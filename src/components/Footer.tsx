import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.name}>djeel</span>
          <span className={styles.sub}>Based in France · Available for work.</span>
        </div>
        <div className={styles.right}>
          <Link href="mailto:djeel@gangui.eu" className={styles.email}>
            djeel@gangui.eu
          </Link>
          <div className={styles.links}>
            <Link href="https://github.com/djeel" target="_blank" rel="noopener">GitHub</Link>
            <span className={styles.copy}>© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
