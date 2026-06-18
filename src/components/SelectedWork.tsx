'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/lib/projects'
import Reveal from './Reveal'
import styles from './SelectedWork.module.css'

export default function SelectedWork() {
  const [active, setActive] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const preview = previewRef.current
    const list = listRef.current
    const section = sectionRef.current
    if (!preview || !list || !section) return

    let cancelled = false
    let cleanup: (() => void) | null = null

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)

        const quickX = gsap.quickTo(preview, 'x', { duration: 0.7, ease: 'power3.out' })
        const quickY = gsap.quickTo(preview, 'y', { duration: 0.7, ease: 'power3.out' })
        const quickSX = gsap.quickTo(preview, 'scaleX', { duration: 0.5, ease: 'power3.out' })
        const quickSY = gsap.quickTo(preview, 'scaleY', { duration: 0.5, ease: 'power3.out' })
        gsap.set(preview, { scaleX: 0.85, scaleY: 0.85 })

        const onMove = (e: PointerEvent) => {
          quickX(e.clientX)
          quickY(e.clientY)
        }
        list.addEventListener('pointermove', onMove)

        // Preview grows the further down the section you scroll
        const st = ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const s = 0.85 + self.progress * 0.45
            quickSX(s)
            quickSY(s)
          },
        })

        cleanup = () => {
          list.removeEventListener('pointermove', onMove)
          st.kill()
        }
      }
    )

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  // "built" reconstructs itself from grain when the section scrolls into view
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const section = sectionRef.current
    const word = section?.querySelector<HTMLElement>('[data-build]')
    const disp = document.getElementById('buildDisp')
    if (!section || !word || !disp) return

    let cancelled = false
    let st: { kill: () => void } | null = null

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)
        word.style.filter = 'url(#buildFilter)'
        disp.setAttribute('scale', '130')
        gsap.set(word, { opacity: 0 })
        const o = { v: 130 }

        st = ScrollTrigger.create({
          trigger: section,
          start: 'top 78%',
          once: true,
          onEnter: () => {
            gsap.to(word, { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.2 })
            gsap.to(o, {
              v: 0,
              duration: 1.4,
              ease: 'power3.out',
              delay: 0.2,
              onUpdate: () => disp.setAttribute('scale', o.v.toFixed(1)),
              onComplete: () => {
                word.style.filter = '' // crisp once rebuilt
              },
            })
          },
        })
      }
    )

    return () => {
      cancelled = true
      st?.kill()
      if (word) word.style.filter = ''
    }
  }, [])

  return (
    <section className={styles.section} id="work" ref={sectionRef}>
      <Reveal className={styles.inner}>
        <div className={styles.header}>
          <span className={`${styles.sectionLabel} label reveal-up`}>
            Selected Work — {String(projects.length).padStart(2, '0')}
          </span>
          <h2 className={styles.title}>
            <span className="reveal-line">
              <span>
                Things I&apos;ve{' '}
                <span className={styles.build} data-build>built.</span>
              </span>
            </span>
          </h2>
        </div>

        <div
          className={styles.list}
          ref={listRef}
          onPointerEnter={() =>
            previewRef.current?.style.setProperty('--preview-vis', '1')
          }
          onPointerLeave={() => {
            setActive(null)
            previewRef.current?.style.setProperty('--preview-vis', '0')
          }}
        >
          {projects.map((p, i) => (
            <div className={`${styles.rowWrap} reveal-line`} key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className={styles.item}
                onPointerEnter={() => setActive(i)}
                data-dim={active !== null && active !== i ? 'true' : undefined}
              >
                <span className={styles.wash} aria-hidden="true" />
                <span className={styles.titleCell}>
                  <span className={styles.name}>{p.title}</span>
                  <span className={styles.tag}>{p.tagline}</span>
                </span>
                <span className={styles.cat}>{p.category}</span>
                <span className={styles.year}>{p.year}</span>
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </Link>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Cursor-following floating preview */}
      <div
        className={styles.preview}
        ref={previewRef}
        aria-hidden="true"
        style={{ '--preview-vis': '0' } as React.CSSProperties}
      >
        {projects.map((p, i) => (
          <div
            key={p.slug}
            className={styles.previewImg}
            style={{ opacity: active === i ? 1 : 0 }}
          >
            <Image src={p.coverImage} alt="" width={680} height={358} quality={75} />
          </div>
        ))}
      </div>

      {/* Grain reconstruction filter for the "built" word */}
      <svg className={styles.svgDefs} aria-hidden="true" focusable="false">
        <filter id="buildFilter" x="-60%" y="-60%" width="220%" height="220%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6 0.7"
            numOctaves={2}
            seed={4}
            stitchTiles="stitch"
            result="noise"
          />
          <feDisplacementMap
            id="buildDisp"
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
