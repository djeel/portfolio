'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import styles from './Nav.module.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>djeel</Link>
        <div className={styles.right}>
          <ul className={styles.links}>
            <li><Link href="/#work">Work</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
