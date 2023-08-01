import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

const mainFont = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GSW Challenge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`w-screen min-h-screen antialiased ${mainFont.className}`}>{children}</body>
    </html>
  )
}
