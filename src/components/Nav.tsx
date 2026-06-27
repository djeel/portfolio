'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { useI18n } from '@/i18n/I18nContext'
import styles from './Nav.module.css'

export default function Nav() {
  const { locale, t, locales } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 30)
      setHidden(y > last && y > 260)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function switchLocale(newLocale: string) {
    const segments = window.location.pathname.split('/')
    segments[1] = newLocale
    window.location.pathname = segments.join('/')
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${hidden ? styles.hidden : ''}`}>
      <div className={styles.bar}>
        <Link href={`/${locale}`} className={styles.logo}>
          djeel<span className={styles.logoDot}>.</span>
        </Link>

        <span className={styles.status}>
          <i className={styles.pulse} aria-hidden="true" />
          {t.nav.available}
        </span>

        <div className={styles.right}>
          <ul className={styles.links}>
            <li><Link href={`/${locale}/#work`} className="link-underline">{t.nav.work}</Link></li>
            <li><Link href={`/${locale}/about`} className="link-underline">{t.nav.about}</Link></li>
          </ul>
          <ThemeToggle />
          <div className={styles.langSwitch}>
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`${styles.langBtn} ${l === locale ? styles.langActive : ''}`}
                aria-label={`Switch to ${l.toUpperCase()}`}
              >
                {t.langSwitch[l]}
              </button>
            ))}
          </div>
          <Link href={`/${locale}/contact`} className={styles.cta}>
            {t.nav.letsTalk} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
