'use client'
import { useEffect, useRef, type ReactNode } from 'react'

interface AmbientGlowProps {
  children: ReactNode
  /** How strongly the glow drifts toward the pointer */
  strength?: number
  /** Max pixel offset from rest */
  max?: number
}

/**
 * Wraps ambient glow spans and nudges the whole layer slightly toward the
 * pointer — a gentle magnet. The inner spans keep their own idle drift.
 */
export default function AmbientGlow({ children, strength = 0.05, max = 55 }: AmbientGlowProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let cancelled = false
    let cleanup: (() => void) | null = null

    import('gsap').then(({ gsap }) => {
      if (cancelled) return
      const qx = gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' })
      const qy = gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' })
      const clamp = (v: number) => Math.max(-max, Math.min(max, v))

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        qx(clamp((e.clientX - (r.left + r.width / 2)) * strength))
        qy(clamp((e.clientY - (r.top + r.height / 2)) * strength))
      }
      window.addEventListener('pointermove', onMove, { passive: true })
      cleanup = () => window.removeEventListener('pointermove', onMove)
    })

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [strength, max])

  return (
    <div className="ambient" aria-hidden="true">
      {/* Inner layer moves; the clip box stays fixed so edges never get cut */}
      <div className="ambient-magnet" ref={ref}>
        {children}
      </div>
    </div>
  )
}
