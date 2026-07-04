'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<import('lenis').default | null>(null)
  const firstRender = useRef(true)
  const pathname = usePathname()

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let lenis: import('lenis').default | null = null
    let rafId = 0
    let cleanupGsap: (() => void) | null = null

    async function init() {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      gsap.registerPlugin(ScrollTrigger)

      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      lenisRef.current = lenis

      // Drive Lenis from GSAP's ticker for a single synced loop
      lenis.on('scroll', ScrollTrigger.update)
      const onTick = (time: number) => lenis!.raf(time * 1000)
      gsap.ticker.add(onTick)
      gsap.ticker.lagSmoothing(0)

      cleanupGsap = () => {
        gsap.ticker.remove(onTick)
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }

    init()

    return () => {
      cancelAnimationFrame(rafId)
      cleanupGsap?.()
      lenisRef.current = null
      lenis?.destroy()
    }
  }, [])

  // Reset scroll to the top on client navigation. Lenis owns the scroll
  // position, so Next's default scroll restoration doesn't take effect —
  // without this, following a link from the bottom leaves you at the bottom.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    } else {
      window.scrollTo(0, 0)
    }
    // New page content changes trigger positions — recompute them.
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => ScrollTrigger.refresh())
  }, [pathname])

  return <>{children}</>
}
