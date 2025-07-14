// src/app/page.tsx

import { Suspense } from 'react'
import Link from 'next/link'
import { HomeHero } from '@/components/pages/home/HomeHero'
import { KeyStats } from '@/components/pages/home/KeyStats'
import { GrowthChart } from '@/components/charts/GrowthChart'
import { TimelineSection } from '@/components/pages/home/TimelineSection'
import { BankingLandscape } from '@/components/pages/home/BankingLadscape'
import { InternationalComparison } from '@/components/pages/home/InternationalComparison'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Portfolio</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">České okamžité platby</span>
          </div>
        </div>
      </div>
      {/* Hero sekce */}
      <HomeHero />
      
      {/* Klíčové statistiky */}
      <Suspense fallback={<LoadingSpinner />}>
        <KeyStats />
      </Suspense>
      
      {/* Hlavní graf růstu */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fenomenální růst okamžitých plateb
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Od nuly k evropskému lídrovi za pouhých 6 let
            </p>
          </div>
          
          <Suspense fallback={<LoadingSpinner />}>
            <GrowthChart />
          </Suspense>
        </div>
      </section>
      
      {/* Časová osa milníků */}
      <section className="py-20 bg-slate-50">
        <TimelineSection />
      </section>
      
      {/* Banking landscape */}
      <section className="py-20 bg-white">
        <BankingLandscape />
      </section>
      
      {/* Mezinárodní srovnání */}
      <section className="py-20 bg-slate-50">
        <InternationalComparison />
      </section>
      
      {/* Footer se zdroji dat */}
      <Footer />
      
    </div>
  )
}