// src/components/layout/Navigation.tsx

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function Navigation() {
  const pathname = usePathname()
  const isCnbProject = pathname.startsWith('/cnb-okamzite-platby')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl text-gray-900">
            Kryštof Hireš
          </Link>
          
          <div className="flex items-center gap-4">
            {isCnbProject ? (
              <Link href="/">
                <Button variant="outline">
                  ← Zpět na portfolio
                </Button>
              </Link>
            ) : (
              <Link href="/cnb-okamzite-platby">
                <Button variant="outline">
                  ČNB Projekt
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}