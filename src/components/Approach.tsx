'use client'
import Reveal from './Reveal'
import AmbientGlow from './AmbientGlow'
import { useI18n } from '@/i18n/I18nContext'
import styles from './Approach.module.css'

export default function Approach() {
  const { t } = useI18n()

  return (
    <section className={styles.section}>
      <AmbientGlow>
        <span className={styles.glow} />
      </AmbientGlow>
      <Reveal className={`${styles.inner} above`}>
        <div className={styles.header}>
          <span className={`${styles.sectionLabel} label reveal-up`}>{t.approach.label}</span>
          <h2 className={styles.title}>
            <span className="reveal-line"><span>{t.approach.titleLine1}</span></span>
            <span className="reveal-line"><span>{t.approach.titleLine2}</span></span>
          </h2>
          <p className={`${styles.lead} reveal-up`}>
            {t.approach.lead}
          </p>
        </div>
        <ol className={styles.list}>
          {t.approach.items.map((item: string, i: number) => (
            <li key={i} className={`${styles.item} reveal-line`}>
              <span>
                <span className={styles.marker} aria-hidden="true" />
                <span className={styles.text}>{item}</span>
              </span>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  )
}
