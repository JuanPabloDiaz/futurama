import './globals.css'
import { Inter } from 'next/font/google'
import { Navigation, Footer } from '@/components'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Futurama | Juan Diaz',
  description: 'Full stack app to display characters from Futurama',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
    shortcut: '/icon.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
