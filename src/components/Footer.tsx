import Link from 'next/link'
import SpotlightText from './SpotlightText'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link href="/contact" className={styles.wordmark} aria-label="Get in touch">
          <SpotlightText as="span" base="var(--color-ink)" spot="var(--color-accent)">
            djeel<span className={styles.dot}>.</span>
          </SpotlightText>
        </Link>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <span className={styles.sub}>Based in France · Available for work</span>
          </div>
          <div className={styles.right}>
            <Link href="mailto:djeel@gangui.eu" className={`${styles.email} link-underline`}>
              djeel@gangui.eu
            </Link>
            <div className={styles.links}>
              <Link href="https://github.com/djeel" target="_blank" rel="noopener" className="link-underline">GitHub</Link>
              <span className={styles.copy}>© 2026</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
