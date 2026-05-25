'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './Hero.module.css'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    let mounted = true
    let ctx: { revert: () => void } | null = null
    import('gsap').then(({ gsap }) => {
      if (!mounted) return
      ctx = gsap.context(() => {
        gsap.fromTo('[data-h]',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
        )
      }, ref)
    })
    return () => {
      mounted = false
      ctx?.revert()
    }
  }, [])

  return (
    <section className={styles.hero} ref={ref}>
      <div className={styles.inner}>
        <span className={`${styles.label} label`} data-h>Product-minded Creative Developer</span>
        <h1 className={styles.h1}>
          <span data-h>Building web</span>
          <span data-h>products that</span>
          <span data-h>matter.</span>
        </h1>
        <p className={styles.sub} data-h>
          Self-taught. Between frontend, UI/UX, and product thinking.<br />
          Based in France.
        </p>
        <div className={styles.ctas} data-h>
          <Link href="#work" className={styles.cta}>Selected work <span>↓</span></Link>
          <Link href="/contact" className={styles.secondary}>Let&apos;s talk →</Link>
        </div>
      </div>
    </section>
  )
}
