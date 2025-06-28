export default function robots() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://futurama-jd.vercel.app'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // No indexar las rutas de API
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
