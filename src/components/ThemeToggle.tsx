'use client'
import { useEffect, useState } from 'react'
import { useI18n } from '@/i18n/I18nContext'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const { t } = useI18n()
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const current = document.documentElement.dataset.theme
    setDark(current === 'dark')
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button onClick={toggle} className={styles.btn} aria-label="Toggle theme">
      <span className={styles.icon}>{dark ? '○' : '●'}</span>
      <span className={styles.label}>{dark ? t.theme.light : t.theme.dark}</span>
    </button>
  )
}
