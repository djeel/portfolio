'use client'
import Link from 'next/link'
import SpotlightText from './SpotlightText'
import { useI18n } from '@/i18n/I18nContext'
import styles from './Footer.module.css'

export default function Footer() {
  const { locale, t } = useI18n()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link href={`/${locale}/contact`} className={styles.wordmark} aria-label={t.footer.getInTouch}>
          <SpotlightText as="span" base="var(--color-ink)" spot="var(--color-accent)">
            djeel<span className={styles.dot}>.</span>
          </SpotlightText>
        </Link>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <span className={styles.sub}>{t.footer.basedInFrance}</span>
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
