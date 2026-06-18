'use client'
import { useEffect, useRef, cloneElement, type ReactElement } from 'react'

interface MagneticProps {
  children: ReactElement<{ ref?: React.Ref<HTMLElement> }>
  /** Pull strength — higher = more movement */
  strength?: number
}

/**
 * Wraps a single interactive child and pulls it toward the cursor on hover.
 * Pointer-only (skipped on touch / reduced-motion).
 */
export default function Magnetic({ children, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let quickX: ((v: number) => void) | null = null
    let quickY: ((v: number) => void) | null = null
    let cancelled = false

    import('gsap').then(({ gsap }) => {
      if (cancelled) return
      quickX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
      quickY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
    })

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) * strength
      const y = (e.clientY - (r.top + r.height / 2)) * strength
      quickX?.(x)
      quickY?.(y)
    }
    const onLeave = () => {
      quickX?.(0)
      quickY?.(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelled = true
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [strength])

  return cloneElement(children, { ref })
}
