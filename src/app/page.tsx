import Hero from '@/components/Hero'
import SelectedWork from '@/components/SelectedWork'
import Approach from '@/components/Approach'
import Reveal from '@/components/Reveal'
import Magnetic from '@/components/Magnetic'
import AmbientGlow from '@/components/AmbientGlow'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Approach />

      <section className={styles.cta}>
        <AmbientGlow>
          <span className={styles.blobA} />
          <span className={styles.blobB} />
        </AmbientGlow>
        <div className={`${styles.marquee} above`} aria-hidden="true">
          <div className={styles.track}>
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i}>
                Let&apos;s build something <span className={styles.star}>✱</span>{' '}
                Available for work <span className={styles.star}>✱</span>{' '}
              </span>
            ))}
          </div>
        </div>

        <Reveal className={`${styles.ctaInner} above`}>
          <span className={`${styles.ctaLabel} label reveal-up`}>Contact</span>
          <h2 className={styles.ctaTitle}>
            <span className="reveal-line"><span>Have a project</span></span>
            <span className="reveal-line"><span>in mind?</span></span>
          </h2>
          <div className="reveal-up">
            <Magnetic>
              <Link href="/contact" className={styles.ctaBtn}>
                Let&apos;s talk <span aria-hidden="true">→</span>
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </>
  )
}
