import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { getDictionary, isValidLocale } from '@/i18n'
import styles from './contact.module.css'

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getDictionary(isValidLocale(locale) ? locale : 'en')

  return (
    <div className={styles.page}>
      <Reveal className={styles.inner} start="top 95%">
        <span className="label reveal-up">{t.contact.title}</span>
        <h1 className={styles.title}>
          <span className="reveal-line"><span>{t.contact.headlinePart1}</span></span>
          <span className="reveal-line"><span>{t.contact.headlinePart2}</span></span>
        </h1>
        <div className="reveal-up">
          <Link href="mailto:djeel@gangui.eu" className={styles.email}>
            djeel@gangui.eu
          </Link>
        </div>
        <div className={`${styles.note} reveal-up`}>
          <p>{t.contact.openTo}</p>
          <p>{t.contact.responseTime}</p>
        </div>
        <div className={`${styles.links} reveal-up`}>
          <Link href="https://github.com/djeel" target="_blank" rel="noopener" className={`${styles.extLink} link-underline`}>
            {t.contact.github}
          </Link>
        </div>
      </Reveal>
    </div>
  )
}
