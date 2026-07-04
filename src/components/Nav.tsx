'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { useI18n } from '@/i18n/I18nContext'
import styles from './Nav.module.css'

function TranslateIcon() {
  // Material-style "translate" glyph: CJK 文 + Latin A.
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export default function Nav() {
  const { locale, t, locales } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

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

  // Close the language menu on outside click or Escape.
  useEffect(() => {
    if (!langOpen) return
    const onPointer = (e: PointerEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLangOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [langOpen])

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

        <div className={styles.right}>
          <ul className={styles.links}>
            <li><Link href={`/${locale}/#work`} className="link-underline">{t.nav.work}</Link></li>
            <li><Link href={`/${locale}/about`} className="link-underline">{t.nav.about}</Link></li>
          </ul>

          <ThemeToggle />

          <div className={styles.lang} ref={langRef}>
            <button
              type="button"
              className={styles.langTrigger}
              onClick={() => setLangOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label={`Language: ${t.langSwitch[locale]}`}
            >
              <span className={styles.langGlobe}><TranslateIcon /></span>
              <span className={styles.langCurrent}>{t.langSwitch[locale]}</span>
              <span className={`${styles.langChevron} ${langOpen ? styles.langChevronOpen : ''}`}><ChevronIcon /></span>
            </button>

            {langOpen && (
              <ul className={styles.langMenu} role="listbox">
                {locales.map((l) => (
                  <li key={l} role="option" aria-selected={l === locale}>
                    <button
                      type="button"
                      className={`${styles.langOption} ${l === locale ? styles.langOptionActive : ''}`}
                      onClick={() => switchLocale(l)}
                    >
                      {t.langSwitch[l]}
                      {l === locale && <span className={styles.langCheck} aria-hidden="true">✓</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link href={`/${locale}/contact`} className={styles.cta}>
            {t.nav.letsTalk} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
