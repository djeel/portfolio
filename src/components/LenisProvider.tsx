'use client'
import { useEffect } from 'react'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
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
      lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
