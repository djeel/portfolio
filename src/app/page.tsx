import Hero from '@/components/Hero'
import SelectedWork from '@/components/SelectedWork'
import Approach from '@/components/Approach'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Approach />
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <p className={styles.ctaLabel + ' label'}>Contact</p>
          <h2 className={styles.ctaTitle}>Have a project in mind?</h2>
          <Link href="/contact" className={styles.ctaBtn}>Let&apos;s talk →</Link>
        </div>
      </section>
    </>
  )
}
