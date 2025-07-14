// src/app/layout.tsx

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'České okamžité platby: Od nuly k evropskému lídrovi',
  description: 'Kompletní analýza růstu okamžitých plateb v České republice na základě oficiálních dat České národní banky. Interaktivní vizualizace ukazují cestu od spuštění v roce 2018 k 64% podílu v roce 2025.',
  keywords: ['okamžité platby', 'ČNB', 'CERTIS', 'platební systém', 'fintech', 'Česká republika'],
  authors: [{ name: 'Analýza ČNB dat' }],
  openGraph: {
    title: 'České okamžité platby: Analýza růstu 2018-2025',
    description: 'Interaktivní analýza ukazující fenomenální růst okamžitých plateb v ČR - od 0% na 64% za 6 let',
    type: 'website',
    locale: 'cs_CZ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'České okamžité platby: Evropský lídr',
    description: 'Analýza dat ČNB: 64% podíl okamžitých plateb, 1.6M transakcí denně, růst 85,551x za 6 let',
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
        {children}
      </body>
    </html>
  )
}