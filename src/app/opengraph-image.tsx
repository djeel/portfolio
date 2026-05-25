import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'djeel — Product-minded Creative Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          backgroundColor: '#F7F5F2',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Accent dot */}
        <div
          style={{
            position: 'absolute',
            top: 72,
            left: 80,
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#7C3AED',
          }}
        />

        {/* Label */}
        <div
          style={{
            display: 'flex',
            fontSize: 14,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#7A7585',
            marginBottom: 32,
          }}
        >
          Product-minded Creative Developer
        </div>

        {/* Name */}
        <div
          style={{
            display: 'flex',
            fontSize: 120,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            color: '#0C0B10',
          }}
        >
          djeel
          <span style={{ color: '#7C3AED' }}>.</span>
        </div>

        {/* URL */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 72,
            right: 80,
            fontSize: 14,
            letterSpacing: '0.08em',
            color: '#7A7585',
          }}
        >
          djeel.org
        </div>
      </div>
    ),
    { ...size }
  )
}
