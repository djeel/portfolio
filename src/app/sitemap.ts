import type { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'
import { locales } from '@/i18n'

const BASE = 'https://djeel.org'

type RouteDef = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const routes: RouteDef[] = [
    { path: '', changeFrequency: 'monthly', priority: 1 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
    ...projects.map((p) => ({
      path: `/work/${p.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  // One entry per locale, each linking the alternate languages via hreflang.
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${BASE}/${locale}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE}/${l}${route.path}`])
        ),
      },
    }))
  )
}
