import Hero from '@/components/Hero'
import SelectedWork from '@/components/SelectedWork'
import Approach from '@/components/Approach'
import Reveal from '@/components/Reveal'
import Magnetic from '@/components/Magnetic'
import AmbientGlow from '@/components/AmbientGlow'
import Link from 'next/link'
import { getDictionary, isValidLocale } from '@/i18n'
import styles from './page.module.css'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getDictionary(isValidLocale(locale) ? locale : 'en')

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
                {t.cta.marquee}{' '}
              </span>
            ))}
          </div>
        </div>

        <Reveal className={`${styles.ctaInner} above`}>
          <span className={`${styles.ctaLabel} label reveal-up`}>{t.cta.label}</span>
          <h2 className={styles.ctaTitle}>
            <span className="reveal-line"><span>{t.cta.titleLine1}</span></span>
            <span className="reveal-line"><span>{t.cta.titleLine2}</span></span>
          </h2>
          <div className="reveal-up">
            <Magnetic>
              <Link href={`/${locale}/contact`} className={styles.ctaBtn}>
                {t.cta.letsTalk} <span aria-hidden="true">→</span>
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </>
  )
}
