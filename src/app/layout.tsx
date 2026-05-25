import type { Metadata } from 'next'
import { Syne, JetBrains_Mono } from 'next/font/google'
import LenisProvider from '@/components/LenisProvider'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const display = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'djeel — Product-minded Creative Developer',
  description:
    'Building clear, useful, and ambitious web products. Between frontend, UI/UX, and product thinking.',
  metadataBase: new URL('https://djeel.org'),
  openGraph: {
    title: 'djeel — Product-minded Creative Developer',
    description: 'Building clear, useful, and ambitious web products. Between frontend, UI/UX, and product thinking.',
    url: 'https://djeel.org',
    siteName: 'djeel',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'djeel — Product-minded Creative Developer',
    description: 'Building clear, useful, and ambitious web products. Between frontend, UI/UX, and product thinking.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=t||(p?'dark':'light');}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <LenisProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
