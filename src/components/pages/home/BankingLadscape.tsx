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
  okamzite_platby: boolean
  limit_platba_kc: number
  denni_limit_kc: string | number
  poplatky: string
  rok_zavedeni?: number
  market_position: 'major' | 'medium' | 'small'
  adoption_status: 'early' | 'follower' | 'late' | 'none'
}

interface ManualData {
  banky_okamzite_platby: Array<{
    nazev: string
    kod: string
    okamzite_platby: boolean
    limit_platba_kc: number
    denni_limit_kc: string | number
    poplatky: string
    rok_zavedeni?: number
  }>
  zdroje?: any
  poplatky_info?: any
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
  const banksData: BankData[] = data.banky_okamzite_platby.map(bank => ({
    ...bank,
    market_position: bank.nazev.includes('ČSOB') || bank.nazev.includes('Česká spořitelna') || bank.nazev.includes('Komerční') 
      ? 'major' as const
      : bank.nazev.includes('Air Bank') || bank.nazev.includes('mBank') || bank.nazev.includes('MONETA')
      ? 'medium' as const
      : 'small' as const,
    adoption_status: bank.rok_zavedeni === 2019 
      ? 'early' as const
      : bank.rok_zavedeni === 2020 
      ? 'follower' as const
      : bank.okamzite_platby ? 'late' as const : 'none' as const
  }))

  // Sort banks by limit (descending) and then by support status
  const sortedBanks = banksData.sort((a, b) => {
    if (a.okamzite_platby && !b.okamzite_platby) return -1
    if (!a.okamzite_platby && b.okamzite_platby) return 1
    return b.limit_platba_kc - a.limit_platba_kc
  })

  const supportingBanks = banksData.filter(b => b.okamzite_platby)
  const coveragePercent = Math.round((supportingBanks.length / banksData.length) * 100)
  
  const getLimitCategory = (limit: number) => {
    if (limit >= 2000000) return { label: 'Vysoký', color: 'text-white bg-blue-700 border-blue-800' }
    if (limit >= 400000) return { label: 'Standardní', color: 'text-blue-700 bg-blue-100 border-blue-300' }
    if (limit > 0) return { label: 'Nízký', color: 'text-blue-600 bg-blue-50 border-blue-200' }
    return { label: 'Nepodporuje', color: 'text-gray-600 bg-gray-100 border-gray-300' }
  }

  const formatDailyLimit = (limit: string | number) => {
    if (typeof limit === 'string') return limit
    if (limit >= 1000000) return `${(limit / 1000000).toFixed(1)}M Kč`
    return `${(limit / 1000).toLocaleString('cs-CZ')}K Kč`
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
            Dostupnost
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Které banky okamžité platby podporují?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
           • Banky mohou stanovit nižší odchozí limity
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    • Všechny banky musí přijmout platby do max. limitu
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
                  <th className="text-center py-2 md:py-3 px-1 md:px-4 font-semibold text-blue-900 text-xs md:text-sm">Podpora</th>
                  <th className="text-right py-2 md:py-3 px-1 md:px-4 font-semibold text-blue-900 text-xs md:text-sm">Limit/platba</th>
                  <th className="text-right py-2 md:py-3 px-1 md:px-4 font-semibold text-blue-900 text-xs md:text-sm">Denní limit</th>
                  <th className="text-center py-2 md:py-3 px-1 md:px-4 font-semibold text-blue-900 text-xs md:text-sm">Poplatky</th>
                </tr>
              </thead>
              <tbody>
                {sortedBanks.map((bank, index) => {
                  const category = getLimitCategory(bank.limit_platba_kc)
                  return (
                    <tr 
                      key={index} 
                      className="border-b border-blue-100 hover:bg-blue-50/50 transition-colors duration-200 group"
                    >
                      <td className="py-2 md:py-3 px-2 md:px-4">
                        <div className="font-medium text-gray-900 text-xs md:text-sm group-hover:text-blue-700 transition-colors">{bank.nazev}</div>
                        <div className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors">{bank.kod}</div>
                      </td>
                      <td className="py-2 md:py-3 px-1 md:px-4 text-center">
                        {bank.okamzite_platby ? (
                          <CheckCircle 
                            className="w-4 h-4 text-green-500 mx-auto group-hover:scale-110 transition-transform" 
                            title="Podporuje okamžité platby"
                          />
                        ) : (
                          <XCircle 
                            className="w-4 h-4 text-red-500 mx-auto group-hover:scale-110 transition-transform" 
                            title="Nepodporuje okamžité platby"
                          />
                        )}
                      </td>
                      <td className="py-2 md:py-3 px-1 md:px-4 text-right">
                        {bank.okamzite_platby ? (
                          <span className="font-semibold text-gray-900 text-xs">
                            {bank.limit_platba_kc >= 1000000 
                              ? `${(bank.limit_platba_kc / 1000000).toFixed(1)}M`
                              : `${(bank.limit_platba_kc / 1000).toLocaleString('cs-CZ')}K`
                            }
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="py-2 md:py-3 px-1 md:px-4 text-right">
                        {bank.okamzite_platby ? (
                          <span className="text-gray-900 text-xs">
                            {typeof bank.denni_limit_kc === 'number' 
                              ? formatDailyLimit(bank.denni_limit_kc)
                              : bank.denni_limit_kc
                            }
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="py-2 md:py-3 px-1 md:px-4 text-center">
                        <span className={`text-xs px-2 py-1 rounded ${
                          bank.poplatky === 'Zdarma' 
                            ? 'bg-green-100 text-green-700'
                            : bank.poplatky.includes('—')
                            ? 'bg-gray-100 text-gray-500'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {bank.poplatky}
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


    </div>
  )
}