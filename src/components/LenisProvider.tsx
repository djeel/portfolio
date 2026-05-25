'use client'
import { useEffect } from 'react'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: import('lenis').default | null = null

    async function init() {
      const { default: Lenis } = await import('lenis')
      lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })

      function raf(time: number) {
        lenis!.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }

    init()
    return () => { lenis?.destroy() }
  }, [])

  return <>{children}</>
}
