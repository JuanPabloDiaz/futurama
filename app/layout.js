import './globals.css'
import { Inter } from 'next/font/google'
import { Navigation } from '@/components'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Futurama | Juan Diaz',
  description: 'Full stack app to display characters from Futurama',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
