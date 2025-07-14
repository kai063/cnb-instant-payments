// src/components/pages/home/BankingLandscape.tsx

'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  CheckCircle,
  XCircle
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
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
    {
      nazev: 'Trinity Bank',
      kod: '2070',
      limit_kc: 0,
      supports_instant: false,
      market_position: 'small' as const,
      adoption_status: 'none' as const
    }
  ]

  // Sort banks by limit (descending) and then by support status
  const sortedBanks = banksData.sort((a, b) => {
    if (a.supports_instant && !b.supports_instant) return -1
    if (!a.supports_instant && b.supports_instant) return 1
    return b.limit_kc - a.limit_kc
  })

  const supportingBanks = banksData.filter(b => b.supports_instant)
  const coveragePercent = Math.round((supportingBanks.length / banksData.length) * 100)
  
  const getLimitCategory = (limit: number) => {
    if (limit >= 2000000) return { label: 'Vysoký', color: 'text-white bg-blue-700 border-blue-800' }
    if (limit >= 400000) return { label: 'Standardní', color: 'text-blue-700 bg-blue-100 border-blue-300' }
    if (limit > 0) return { label: 'Nízký', color: 'text-blue-600 bg-blue-50 border-blue-200' }
    return { label: 'Nepodporuje', color: 'text-gray-600 bg-gray-100 border-gray-300' }
  }


  return (
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
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
            Podpora okamžitých plateb
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aktuální stav podpory okamžitých plateb v českém bankovním sektoru podle ČNB dat
          </p>
        </motion.div>
      </div>

      {/* Banks table */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <Card className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Přehled bank a jejich limitů
            </h3>
            <p className="text-sm text-gray-600">
              Kompletní seznam všech bank s podporou okamžitých plateb a jejich limity
            </p>
          </div>
          
          {/* Summary stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 md:p-4 text-center border border-blue-200">
              <div className="text-lg md:text-xl font-bold text-blue-700">{supportingBanks.length}</div>
              <div className="text-xs md:text-sm text-blue-600">Bank podporuje</div>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-3 md:p-4 text-center border border-blue-300">
              <div className="text-lg md:text-xl font-bold text-blue-800">{coveragePercent}%</div>
              <div className="text-xs md:text-sm text-blue-700">Pokrytí trhu</div>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-3 md:p-4 text-center border border-blue-800">
              <div className="text-lg md:text-xl font-bold text-white">2,5M</div>
              <div className="text-xs md:text-sm text-blue-100">Max. limit (Kč)</div>
            </div>
            <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-lg p-3 md:p-4 text-center border border-blue-900">
              <div className="text-lg md:text-xl font-bold text-white">2019</div>
              <div className="text-xs md:text-sm text-blue-100">První adopce</div>
            </div>
          </div>

          {/* Banks table */}
          <div className="overflow-x-auto -mx-2 md:mx-0">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
                  <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-blue-900 text-sm md:text-base">Banka</th>
                  <th className="text-center py-2 md:py-3 px-1 md:px-4 font-semibold text-blue-900 text-sm md:text-base">Podpora</th>
                  <th className="text-right py-2 md:py-3 px-2 md:px-4 font-semibold text-blue-900 text-sm md:text-base">Limit</th>
                  <th className="text-center py-2 md:py-3 px-1 md:px-4 font-semibold text-blue-900 text-sm md:text-base">Kategorie</th>
                  <th className="text-center py-2 md:py-3 px-1 md:px-4 font-semibold text-blue-900 text-sm md:text-base hidden sm:table-cell">Rok zavedení</th>
                </tr>
              </thead>
              <tbody>
                {sortedBanks.map((bank, index) => {
                  const category = getLimitCategory(bank.limit_kc)
                  return (
                    <tr key={index} className="border-b border-blue-100 hover:bg-blue-50/30">
                      <td className="py-2 md:py-3 px-2 md:px-4">
                        <div className="font-medium text-gray-900 text-sm md:text-base">{bank.nazev}</div>
                        <div className="text-xs md:text-sm text-gray-500">{bank.kod}</div>
                      </td>
                      <td className="py-2 md:py-3 px-1 md:px-4 text-center">
                        {bank.supports_instant ? (
                          <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="w-4 md:w-5 h-4 md:h-5 text-red-500 mx-auto" />
                        )}
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-right">
                        {bank.supports_instant ? (
                          <span className="font-semibold text-gray-900 text-xs md:text-sm">
                            {bank.limit_kc >= 1000000 
                              ? `${(bank.limit_kc / 1000000).toFixed(1)}M`
                              : `${(bank.limit_kc / 1000).toLocaleString('cs-CZ')}K`
                            }
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs md:text-sm">—</span>
                        )}
                      </td>
                      <td className="py-2 md:py-3 px-1 md:px-4 text-center">
                        <Badge className={`text-xs ${category.color} border px-1 md:px-2`}>
                          <span className="hidden md:inline">{category.label}</span>
                          <span className="md:hidden">
                            {category.label === 'Vysoký' ? 'V' : 
                             category.label === 'Standardní' ? 'S' : 
                             category.label === 'Nízký' ? 'N' : 'X'}
                          </span>
                        </Badge>
                      </td>
                      <td className="py-2 md:py-3 px-1 md:px-4 text-center hidden sm:table-cell">
                        <span className="text-xs md:text-sm text-blue-600">
                          {bank.rok_zavedeni || '—'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* Key insights */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <Card className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-800">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Klíčová pozorování
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-100 mb-3">Adopce a limity</h4>
              <ul className="text-blue-50 text-sm space-y-2">
                <li>• Maximální limit systému CERTIS: 2,5 mil Kč (ČNB)</li>
                <li>• Banky mohou stanovit nižší odchozí limity</li>
                <li>• Všechny banky musí přijmout platby do max. limitu</li>
                <li>• Okamžité zúčtování za sekundy, 24/7</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-100 mb-3">Stav trhu</h4>
              <ul className="text-blue-50 text-sm space-y-2">
                <li>• UniCredit Bank se připojila jako poslední velká banka</li>
                <li>• Trinity Bank zatím okamžité platby nepodporuje</li>
                <li>• Air Bank byla průkopníkem (2019)</li>
                <li>• {supportingBanks.length}/{banksData.length} bank podporuje okamžité platby</li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}