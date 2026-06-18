'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import styles from './Nav.module.css'

export default function Nav() {
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

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${hidden ? styles.hidden : ''}`}>
      <div className={styles.bar}>
        <Link href="/" className={styles.logo}>
          djeel<span className={styles.logoDot}>.</span>
        </Link>

        <span className={styles.status}>
          <i className={styles.pulse} aria-hidden="true" />
          Available for work
        </span>

        <div className={styles.right}>
          <ul className={styles.links}>
            <li><Link href="/#work" className="link-underline">Work</Link></li>
            <li><Link href="/about" className="link-underline">About</Link></li>
          </ul>
          <ThemeToggle />
          <Link href="/contact" className={styles.cta}>
            Let&apos;s talk <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
