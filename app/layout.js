import './globals.css'
import { Inter } from 'next/font/google'
import { Navigation, Footer } from '@/components'
import GoogleAnalytics from '@/lib/analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://futurama-characters.netlify.app'),
  title: {
    default: 'Futurama Characters | Juan Diaz',
    template: '%s | Futurama Characters'
  },
  description: 'Explore the complete collection of Futurama characters. Interactive full-stack app showcasing detailed character profiles from the beloved animated series.',
  keywords: ['Futurama', 'characters', 'Bender', 'Fry', 'Leela', 'animated series', 'Matt Groening', 'comedy', 'sci-fi'],
  authors: [{ name: 'Juan Diaz' }],
  creator: 'Juan Diaz',
  publisher: 'Juan Diaz',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://futurama-characters.netlify.app',
    title: 'Futurama Characters | Complete Character Database',
    description: 'Explore the complete collection of Futurama characters. Interactive full-stack app showcasing detailed character profiles from the beloved animated series.',
    siteName: 'Futurama Characters',
    images: [
      {
        url: '/futurama.png',
        width: 1200,
        height: 630,
        alt: 'Futurama Characters Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Futurama Characters | Complete Character Database',
    description: 'Explore the complete collection of Futurama characters. Interactive full-stack app showcasing detailed character profiles.',
    creator: '@juandiaz',
    images: ['/futurama.png'],
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/icon.png'
  },
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

// Datos estructurados para SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Futurama Characters Database",
  "description": "Complete collection of Futurama characters with detailed profiles and information",
  "url": "https://futurama-characters.netlify.app",
  "author": {
    "@type": "Person",
    "name": "Juan Diaz"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://futurama-characters.netlify.app/characters/{search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "mainEntity": {
    "@type": "ItemList",
    "name": "Futurama Characters",
    "description": "List of all Futurama characters with detailed information"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
