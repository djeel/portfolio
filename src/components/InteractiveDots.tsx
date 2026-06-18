'use client'
import { useEffect, useRef } from 'react'

/**
 * A grid of dots that light up and grow toward the cursor — a soft,
 * performant signature background. Static (no interaction) under
 * reduced-motion. Reads palette from CSS vars and follows theme changes.
 */
export default function InteractiveDots({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const GAP = 40
    const RADIUS = 190
    // The "blob": a smoothed center that idly drifts and follows the cursor
    const target = { x: 0, y: 0, active: false }
    let cx = 0
    let cy = 0
    let inited = false
    // Click shockwave
    let ripple: { x: number; y: number; t0: number } | null = null
    let w = 0
    let h = 0
    let raf = 0
    let running = false

    const hexToRgb = (hex: string): [number, number, number] => {
      const m = hex.replace('#', '').trim()
      const full = m.length === 3 ? m.split('').map((c) => c + c).join('') : m
      const n = parseInt(full.slice(0, 6), 16)
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
    }

    let accent: [number, number, number] = [43, 39, 255]
    let base: [number, number, number] = [150, 150, 150]
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      const a = cs.getPropertyValue('--color-accent').trim()
      const b = cs.getPropertyValue('--color-muted').trim()
      if (a.startsWith('#')) accent = hexToRgb(a)
      if (b.startsWith('#')) base = hexToRgb(b)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now = 0) => {
      const t = now * 0.001
      // Idle drift when the cursor isn't on the hero; ease toward the target
      const tx = target.active ? target.x : w * 0.5 + Math.cos(t * 0.42) * w * 0.24
      const ty = target.active ? target.y : h * 0.52 + Math.sin(t * 0.55) * h * 0.24
      if (!inited) { cx = tx; cy = ty; inited = true }
      cx += (tx - cx) * 0.07
      cy += (ty - cy) * 0.07

      // Shockwave state for this frame
      let rAge = -1
      let rRing = 0
      if (ripple) {
        rAge = (now - ripple.t0) / 1000
        if (rAge > 1.2) ripple = null
        else rRing = rAge * 720
      }

      ctx.clearRect(0, 0, w, h)
      for (let x = GAP; x < w; x += GAP) {
        for (let y = GAP; y < h; y += GAP) {
          const dx = x - cx
          const dy = y - cy
          const dist = Math.hypot(dx, dy)
          // Organic, wobbling influence radius (a living blob, not a circle)
          const ang = Math.atan2(dy, dx)
          const wob = 1 + 0.34 * Math.sin(ang * 3 + t * 1.6) + 0.2 * Math.sin(ang * 5 - t * 1.1 + 1.7)
          const R = RADIUS * Math.max(0.45, wob)
          const tt = Math.max(0, 1 - dist / R)
          let e = tt * tt * (3 - 2 * tt) // smoothstep
          // Expanding ring from a click
          if (ripple) {
            const rd = Math.abs(Math.hypot(x - ripple.x, y - ripple.y) - rRing)
            const boost = Math.max(0, 1 - rd / 70) * Math.max(0, 1 - rAge / 1.2)
            e = Math.min(1, e + boost)
          }
          const r = 1 + e * 2.6
          const cr = Math.round(base[0] + (accent[0] - base[0]) * e)
          const cg = Math.round(base[1] + (accent[1] - base[1]) * e)
          const cb = Math.round(base[2] + (accent[2] - base[2]) * e)
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${0.16 + e * 0.82})`
          ctx.fill()
        }
      }
      if (!reduced && running) raf = requestAnimationFrame(draw)
    }
    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(draw)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      target.x = mx
      target.y = my
      // Only chase the cursor while it's actually over the hero
      target.active = mx >= 0 && my >= 0 && mx <= w && my <= h
    }
    const onLeave = () => {
      target.active = false
    }
    const onDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      if (mx >= 0 && my >= 0 && mx <= w && my <= h) {
        ripple = { x: mx, y: my, t0: performance.now() }
        if (!running) start()
      }
    }

    readColors()
    resize()

    const mo = new MutationObserver(readColors)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    window.addEventListener('resize', resize, { passive: true })

    if (reduced) {
      draw() // single static paint
    } else {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerleave', onLeave)
      window.addEventListener('pointerdown', onDown, { passive: true })
      // Only animate while the canvas is on screen
      const io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { threshold: 0 }
      )
      io.observe(canvas)
      return () => {
        stop()
        io.disconnect()
        mo.disconnect()
        window.removeEventListener('resize', resize)
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerleave', onLeave)
        window.removeEventListener('pointerdown', onDown)
      }
    }

    return () => {
      stop()
      mo.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
