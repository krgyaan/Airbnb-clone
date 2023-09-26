import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Holiday Homes and Apartments Rental',
  description: 'This prject is clone of Airbnb. For Holiday Homes and Apartments Rental in all over the world with affordable price. You can book your holiday home and apartment with us. We have a lot of options for you.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
