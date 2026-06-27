import type { Metadata } from 'next'
import LenisProvider from '@/components/LenisProvider'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { I18nProvider } from '@/i18n/I18nContext'
import { getDictionary, isValidLocale, type Locale } from '@/i18n'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const validLocale = isValidLocale(locale) ? locale : 'en'
  const t = getDictionary(validLocale)
  return {
    title: t.metadata.title,
    description: t.metadata.description,
    metadataBase: new URL('https://djeel.org'),
    alternates: {
      canonical: `/${validLocale}`,
      languages: {
        en: '/en',
        fr: '/fr',
      },
    },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon.png', type: 'image/png', sizes: '1000x1000' },
      ],
      shortcut: '/favicon.png',
      apple: '/favicon.png',
    },
    openGraph: {
      title: t.metadata.title,
      description: t.metadata.description,
      url: `/${validLocale}`,
      siteName: 'djeel',
      locale: validLocale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.metadata.title,
      description: t.metadata.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : 'en'
  const dict = getDictionary(validLocale)

  return (
    <I18nProvider locale={validLocale} dict={dict}>
      <LenisProvider>
        <Nav />
        <main>{children}</main>
        <Footer />
      </LenisProvider>
    </I18nProvider>
  )
}
