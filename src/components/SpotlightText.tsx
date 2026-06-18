'use client'
import { useRef, type ElementType, type ReactNode, type CSSProperties } from 'react'

interface SpotlightTextProps {
  as?: ElementType
  className?: string
  children: ReactNode
  /** Resting text color */
  base: string
  /** Color of the spotlight that tracks the cursor on hover */
  spot: string
}

/**
 * Text whose color reveals a cursor-tracking spotlight on hover.
 * Uses background-clip:text + a radial-gradient positioned from pointer coords.
 */
export default function SpotlightText({
  as: Tag = 'span',
  className,
  children,
  base,
  spot,
}: SpotlightTextProps) {
  const ref = useRef<HTMLElement>(null)

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  return (
    <Tag
      ref={ref}
      className={`spotlight-text ${className ?? ''}`}
      onPointerMove={onMove}
      style={{ '--base': base, '--spot': spot } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
