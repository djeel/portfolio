'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

/**
 * Cover image with a gentle scroll-driven parallax on the inner picture.
 * Falls back to a static image under reduced motion.
 */
export default function ParallaxImage({ src, alt, width, height, className }: ParallaxImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return

    let ctx: { revert: () => void } | null = null
    let cancelled = false

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)
        ctx = gsap.context(() => {
          gsap.fromTo(
            img,
            { yPercent: -12 },
            {
              yPercent: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: wrap,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          )
        }, wrap)
      }
    )

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return (
    <div className={className} ref={wrapRef}>
      <div ref={imgRef} style={{ height: '124%', marginTop: '-12%' }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority
          quality={85}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}
