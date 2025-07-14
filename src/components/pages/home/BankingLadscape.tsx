// src/components/pages/home/BankingLandscape.tsx

'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Building2, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  DollarSign
} from 'lucide-react'

interface BankData {
  nazev: string
  kod: string
  limit_kc: number
  rok_zavedeni?: number
  supports_instant: boolean
  market_position: 'major' | 'medium' | 'small'
  adoption_status: 'early' | 'follower' | 'late' | 'none'
}

interface ManualData {
  banky_okamzite_platby: Array<{
    nazev: string
    kod: string
    limit_kc: number
    rok_zavedeni?: number
  }>
}

export function BankingLandscape() {
  const [data, setData] = useState<ManualData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/manual_data.json')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading data:', err)
        setLoading(false)
      })
  }, [])

  if (loading || !data) {
    return (
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-8 w-1/3 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Enriched bank data
  const banksData: BankData[] = [
    ...data.banky_okamzite_platby.map(bank => ({
      ...bank,
      supports_instant: true,
      market_position: bank.nazev.includes('ČSOB') || bank.nazev.includes('Česká spořitelna') || bank.nazev.includes('Komerční') 
        ? 'major' as const
        : bank.nazev.includes('Air Bank') || bank.nazev.includes('mBank') || bank.nazev.includes('MONETA')
        ? 'medium' as const
        : 'small' as const,
      adoption_status: bank.rok_zavedeni === 2019 
        ? 'early' as const
        : bank.rok_zavedeni === 2020 
        ? 'follower' as const
        : 'late' as const
    })),
    // Banky bez podpory
    {
      nazev: 'Trinity Bank',
      kod: '2070',
      limit_kc: 0,
      supports_instant: false,
      market_position: 'small' as const,
      adoption_status: 'none' as const
    },
    {
      nazev: 'UniCredit Bank',
      kod: '2700',
      limit_kc: 0,
      supports_instant: false,
      market_position: 'medium' as const,
      adoption_status: 'none' as const
    }
  ]

  const supportingBanks = banksData.filter(b => b.supports_instant)
  const nonSupportingBanks = banksData.filter(b => !b.supports_instant)
  const coveragePercent = Math.round((supportingBanks.length / banksData.length) * 100)

  const limitRanges = [
    { label: '50K - 100K Kč', count: supportingBanks.filter(b => b.limit_kc <= 100000).length, color: 'bg-yellow-400' },
    { label: '400K Kč', count: supportingBanks.filter(b => b.limit_kc === 400000).length, color: 'bg-blue-400' },
    { label: '2.5M Kč', count: supportingBanks.filter(b => b.limit_kc === 2500000).length, color: 'bg-green-400' }
  ]

  return (
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-4">
            <Building2 className="w-4 h-4 mr-2" />
            Bankovní ekosystém
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Podporující banky a limity
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Přehled českých bank a jejich přístupu k okamžitým platbám
          </p>
        </motion.div>
      </div>

      {/* Overview stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
      >
        <Card className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {supportingBanks.length}
          </div>
          <div className="text-gray-600">bank podporuje</div>
        </Card>

        <Card className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {nonSupportingBanks.length}
          </div>
          <div className="text-gray-600">bank nepodporuje</div>
        </Card>

        <Card className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {coveragePercent}%
          </div>
          <div className="text-gray-600">pokrytí trhu</div>
        </Card>

        <Card className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            2.5M
          </div>
          <div className="text-gray-600">max limit Kč</div>
        </Card>
      </motion.div>

      {/* Banks grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div className="lg:col-span-3">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Banky podporující okamžité platby
          </h3>
        </div>

        {supportingBanks.map((bank, index) => (
          <motion.div
            key={bank.kod}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-green-500">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    {bank.nazev}
                  </h4>
                  <div className="text-sm text-gray-500">
                    Kód: {bank.kod}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  {bank.rok_zavedeni === 2019 && (
                    <Badge variant="outline" className="text-xs">
                      Průkopník
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Limit na platbu:</span>
                  <span className="font-semibold text-gray-900">
                    {bank.limit_kc.toLocaleString('cs-CZ')} Kč
                  </span>
                </div>

                {bank.rok_zavedeni && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Zavedeno:</span>
                    <span className="font-semibold text-gray-900">
                      {bank.rok_zavedeni}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pozice:</span>
                  <Badge variant={
                    bank.market_position === 'major' ? 'default' : 
                    bank.market_position === 'medium' ? 'secondary' : 'outline'
                  }>
                    {bank.market_position === 'major' ? 'Velká banka' : 
                     bank.market_position === 'medium' ? 'Střední banka' : 'Malá banka'}
                  </Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Limit analysis */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Card className="p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Analýza limitů okamžitých plateb
          </h3>
          
          <div className="space-y-6">
            {limitRanges.map((range, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-gray-700">
                  {range.label}
                </div>
                <div className="flex-1">
                  <Progress 
                    value={(range.count / supportingBanks.length) * 100} 
                    className="h-3"
                  />
                </div>
                <div className="w-20 text-sm text-gray-600">
                  {range.count} bank{range.count !== 1 ? '' : 'a'}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">
              Pozorování o limitech
            </h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Většina bank používá standardní limit 400,000 Kč</li>
              <li>• ČSOB nabízí nejvyšší limit 2,5 milionu Kč</li>
              <li>• Konzervativnější banky začínají s nižšími limity</li>
              <li>• Trend směřuje k postupnému zvyšování limitů</li>
            </ul>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}