import Reveal from './Reveal'
import AmbientGlow from './AmbientGlow'
import styles from './Approach.module.css'

const items = [
  'Understand before building',
  'Test early, iterate often',
  'Durable solutions over patches',
  'Onboarding, metrics, and scalability from day one',
  'Learn by building, not by watching',
]

export default function Approach() {
  return (
    <section className={styles.section}>
      <AmbientGlow>
        <span className={styles.glow} />
      </AmbientGlow>
      <Reveal className={`${styles.inner} above`}>
        <div className={styles.header}>
          <span className={`${styles.sectionLabel} label reveal-up`}>Approach</span>
          <h2 className={styles.title}>
            <span className="reveal-line"><span>How I</span></span>
            <span className="reveal-line"><span>work.</span></span>
          </h2>
          <p className={`${styles.lead} reveal-up`}>
            I don&apos;t start from a template.<br />I start from the problem.
          </p>
        </div>
        <ol className={styles.list}>
          {items.map((item, i) => (
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
