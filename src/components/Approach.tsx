import styles from './Approach.module.css'

const items = [
  'Understand before building',
  'Test early, iterate often',
  'Durable solutions over patches',
  'Think onboarding, metrics, and scalability from day one',
  'Learn by building, not by watching',
]

export default function Approach() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={`${styles.sectionLabel} label`}>Approach</span>
          <h2 className={styles.title}>How I work.</h2>
          <p className={styles.lead}>I don&apos;t start from a template.<br />I start from the problem.</p>
        </div>
        <ol className={styles.list}>
          {items.map((item, i) => (
            <li key={i} className={styles.item}>
              <span className={styles.num}>0{i + 1}</span>
              <span className={styles.text}>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
