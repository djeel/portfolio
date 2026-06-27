import Link from 'next/link'

export default function NotFound() {
  return (
    <section style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '2rem', padding: '0 var(--space-gutter)' }}>
      <span className="label">404</span>
      <h1 style={{ fontSize: 'var(--text-hero)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95 }}>
        Not found.
      </h1>
      <Link href="/" style={{ borderBottom: '1px solid var(--color-ink)', paddingBottom: '2px', fontSize: 'var(--text-small)', fontWeight: 600 }}>
        Back home →
      </Link>
    </section>
  )
}
