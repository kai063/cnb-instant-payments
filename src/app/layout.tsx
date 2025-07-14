// src/app/layout.tsx

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navigation } from '@/components/layout/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kryštof Hireš - Project Engineer & Economics Student',
  description: 'Portfolio Kryštofa Hireše - Project Engineer ve společnosti MEUI Creative a student ekonomie na UK IES. Specializace na webové technologie a datovou analýzu.',
  keywords: ['project engineer', 'economics student', 'UK IES', 'React', 'Next.js', 'Python', 'web development', 'portfolio'],
  authors: [{ name: 'Kryštof Hireš' }],
  openGraph: {
    title: 'Kryštof Hireš - Portfolio',
    description: 'Project Engineer & Economics Student - Portfolio spojující technologie s ekonomií',
    type: 'website',
    locale: 'cs_CZ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kryštof Hireš - Portfolio',
    description: 'Project Engineer & Economics Student - UK IES',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body className={`${inter.className} antialiased`}>
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}