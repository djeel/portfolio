'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/lib/projects'
import styles from './SelectedWork.module.css'

export default function SelectedWork() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className={styles.section} id="work">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={`${styles.sectionLabel} label`}>Selected Work</span>
        </div>
        <div className={styles.layout}>
          <div className={styles.list}>
            {projects.map((p, i) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className={styles.item}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <span className={styles.number}>{p.number}</span>
                <span className={styles.name}>{p.title}</span>
                <span className={styles.cat}>{p.category}</span>
                <span className={styles.year}>{p.year}</span>
              </Link>
            ))}
          </div>

          <div className={styles.preview}>
            {projects.map((p, i) => (
              <div
                key={p.slug}
                className={styles.card}
                style={{
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)',
                }}
              >
                <Image
                  src={p.coverImage}
                  alt={p.title}
                  width={800}
                  height={404}
                  className={styles.cardImg}
                  quality={75}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
