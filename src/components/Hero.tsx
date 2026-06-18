'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Magnetic from './Magnetic'
import SpotlightText from './SpotlightText'
import InteractiveDots from './InteractiveDots'
import AmbientGlow from './AmbientGlow'
import styles from './Hero.module.css'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let ctx: { revert: () => void } | null = null
    let cancelled = false

    const failsafe = window.setTimeout(() => {
      ref.current
        ?.querySelectorAll<HTMLElement>('[data-hero-line] > span, [data-hero-fade], [data-hero-cue]')
        .forEach((n) => {
          n.style.transform = 'none'
          n.style.opacity = '1'
        })
    }, 1500)

    import('gsap').then(({ gsap }) => {
      if (cancelled) return
      window.clearTimeout(failsafe)
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
        tl.fromTo(
          '[data-hero-line] > span',
          { yPercent: 110, y: 0 },
          { yPercent: 0, duration: 1.15, stagger: 0.08, delay: 0.15 }
        )
          .fromTo(
            '[data-hero-fade]',
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out' },
            '-=0.7'
          )
      }, ref)
    })

    return () => {
      cancelled = true
      window.clearTimeout(failsafe)
      ctx?.revert()
    }
  }, [])

  // Scroll-driven shatter: headline dissolves into grain on the way down
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const section = ref.current
    const h1 = section?.querySelector<HTMLElement>('[data-hero-h1]')
    const disp = document.getElementById('heroDisp')
    if (!section || !h1 || !disp) return

    let cancelled = false
    let st: { kill: () => void } | null = null

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)
        h1.style.filter = 'url(#heroShatter)'
        h1.style.willChange = 'opacity'
        st = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress
            disp.setAttribute('scale', (p * 150).toFixed(1))
            h1.style.opacity = String(Math.max(0, 1 - p * 1.1))
          },
        })
      }
    )

    return () => {
      cancelled = true
      st?.kill()
      if (h1) h1.style.filter = ''
    }
  }, [])

  return (
    <section className={styles.hero} ref={ref}>
      <InteractiveDots className={styles.dots} />
      <AmbientGlow>
        <span className={styles.glow} />
      </AmbientGlow>
      <div className={`${styles.inner} above`}>
        <h1 className={styles.h1} data-hero-h1>
          <span className={styles.line} data-hero-line><span>Building web</span></span>
          <span className={styles.line} data-hero-line>
            <span>
              products that{' '}
              <SpotlightText
                as="em"
                className={styles.mark}
                base="var(--color-accent)"
                spot="var(--color-spot)"
              >
                matter
              </SpotlightText>
            </span>
          </span>
        </h1>

        <div className={styles.bottom}>
          <p className={styles.sub} data-hero-fade>
            Self-taught developer working between frontend, UI/UX, and product
            thinking — building things that are clear, useful, and ambitious.
          </p>
          <div className={styles.ctas} data-hero-fade>
            <Magnetic>
              <Link href="#work" className={styles.cta}>
                <span>Selected work</span>
                <span className={styles.ctaArrow} aria-hidden="true">↓</span>
              </Link>
            </Magnetic>
            <Link href="/contact" className={`${styles.secondary} link-underline`}>
              Let&apos;s talk →
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll-driven shatter filter for the headline */}
      <svg className={styles.svgDefs} aria-hidden="true" focusable="false">
        <filter id="heroShatter" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.016"
            numOctaves={2}
            seed={7}
            stitchTiles="stitch"
            result="noise"
          />
          <feDisplacementMap
            id="heroDisp"
            in="SourceGraphic"
            in2="noise"
            scale={0}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </section>
  )
}
