'use client'
import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

interface RevealProps {
  as?: ElementType
  className?: string
  children: ReactNode
  /** Delay before the stagger sequence starts, in seconds */
  delay?: number
  /** Stagger between elements, in seconds */
  stagger?: number
  /** ScrollTrigger start position */
  start?: string
}

/**
 * Animates descendant `.reveal-line > *` (clip-mask slide-up) and
 * `.reveal-up` (fade + translate) elements when scrolled into view.
 * Selectors are scoped to this container via gsap.context.
 */
export default function Reveal({
  as: Tag = 'div',
  className,
  children,
  delay = 0,
  stagger = 0.09,
  start = 'top 82%',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return

    let ctx: { revert: () => void } | null = null
    let cancelled = false

    // Failsafe: if GSAP hasn't taken over shortly, reveal everything anyway
    const failsafe = window.setTimeout(() => {
      el.querySelectorAll<HTMLElement>('.reveal-line > *, .reveal-up').forEach((n) => {
        n.style.transform = 'none'
        n.style.opacity = '1'
      })
    }, 1500)

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        window.clearTimeout(failsafe)
        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(() => {
          const lines = gsap.utils.toArray<HTMLElement>('.reveal-line > *')
          const ups = gsap.utils.toArray<HTMLElement>('.reveal-up')
          const trigger = { trigger: el, start, once: true }

          if (lines.length) {
            gsap.fromTo(
              lines,
              { yPercent: 110, y: 0 },
              {
                yPercent: 0,
                duration: 1.1,
                ease: 'power4.out',
                delay,
                stagger,
                scrollTrigger: trigger,
              }
            )
          }
          if (ups.length) {
            gsap.fromTo(
              ups,
              { y: 28, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                delay,
                stagger,
                scrollTrigger: trigger,
              }
            )
          }
        }, el)
      }
    ).catch(() => {/* failsafe timeout handles reveal */})

    return () => {
      cancelled = true
      window.clearTimeout(failsafe)
      ctx?.revert()
    }
  }, [delay, stagger, start])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
