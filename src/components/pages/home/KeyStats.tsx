// src/components/pages/home/KeyStats.tsx

'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Users, 
  ArrowUpRight,
  Clock,
  Building2
} from 'lucide-react'

interface FinalReport {
  metadata: {
    created: string
    data_range: string
    total_months: number
    source: string
  }
  key_findings: {
    current_month: string
    instant_payments_daily: number
    regular_payments_daily: number
    instant_share_percent: number
    daily_turnover_billions: number
  }
  growth_summary: {
    prvni_mesic: string
    posledni_mesic: string
    pocet_mesicu: number
    okamzite_platby: {
      prvni: number
      posledni: number
      maximum: number
      prumer: number
    }
    podil_procenta: {
      prvni: number
      posledni: number
      maximum: number
      prumer: number
    }
    rust_nasobek: number
  }
}

export function KeyStats() {
  const [data, setData] = useState<FinalReport | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/final_report.json')
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

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!data) return null

  const stats = [
    {
      icon: TrendingUp,
      title: 'Okamžité platby denně',
      value: data.key_findings.instant_payments_daily.toLocaleString('cs-CZ'),
      change: '+15% vs. duben 2025',
      color: 'text-blue-700',
      bgColor: 'bg-blue-100'
    },
    {
      icon: DollarSign,
      title: 'Podíl ze všech plateb',
      value: `${Math.round(data.key_findings.instant_share_percent)}%`,
      change: 'Více než 2/5 všech plateb',
      color: 'text-blue-800',
      bgColor: 'bg-blue-200'
    },
    {
      icon: Building2,
      title: 'Běžné platby denně',
      value: data.key_findings.regular_payments_daily.toLocaleString('cs-CZ'),
      change: 'Pokles vůči okamžitým',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: DollarSign,
      title: 'Denní obrat',
      value: `${data.key_findings.daily_turnover_billions} mld Kč`,
      change: 'Celkový obrat systému',
      color: 'text-blue-900',
      bgColor: 'bg-blue-300'
    },

  ]

  return (
    <section className="py-12 md:py-20 bg-blue-50">
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
              Klíčové údaje • {data.key_findings.current_month}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Aktuální stav okamžitých plateb
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Data za {data.key_findings.current_month} ukazují pokračující exponenciální růst 
              a dominanci okamžitých plateb v českém platebním ekosystému
            </p>
          </motion.div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-3 md:p-4 lg:p-6 hover:shadow-lg transition-all duration-300 border-0 bg-white hover:scale-105">
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className={`p-2 md:p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-4 h-4 md:w-6 md:h-6 ${stat.color}`} />
                  </div>
                </div>
                
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-xs md:text-sm font-medium text-gray-600">
                    {stat.title}
                  </h3>
                  <div className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-500">
                    {stat.change}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional insights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="p-4 md:p-6 lg:p-8 bg-gradient-to-r from-blue-600 to-blue-700 border-blue-800">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">
              Pozice v Evropě
            </h3>
            <p className="text-blue-100 text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
              Česká republika patří mezi evropské lídry v oblasti okamžitých plateb
            </p>
            <div className="flex items-center justify-center gap-4 md:gap-8 mt-4 md:mt-6">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-white">40%</div>
                <div className="text-xs md:text-sm text-blue-100">Česká republika (ČNB 2025)</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-blue-200">15%</div>
                <div className="text-xs md:text-sm text-blue-100">EU průměr (ECB 2024)</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}