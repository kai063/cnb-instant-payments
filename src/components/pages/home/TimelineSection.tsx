// src/components/pages/home/TimelineSection.tsx

'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Rocket, 
  Building2, 
  TrendingUp, 
  Globe, 
  Calendar,
  Zap,
  CheckCircle
} from 'lucide-react'

interface TimelineEvent {
  date: string
  title: string
  description: string
  icon: React.ElementType
  color: string
  bgColor: string
  status: 'completed' | 'current' | 'future'
}

interface FinalReport {
  growth_summary: {
    pocet_mesicu: number
    rust_nasobek: number
  }
}

export function TimelineSection() {
  const [data, setData] = useState<FinalReport | null>(null)

  useEffect(() => {
    fetch('/data/final_report.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const timelineEvents: TimelineEvent[] = [
    {
      date: '2018-12',
      title: 'Spuštění okamžitých plateb',
      description: 'ČNB oficiálně spustila systém okamžitých plateb v rámci CERTIS. První technická implementace.',
      icon: Rocket,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      status: 'completed'
    },
    {
      date: '2019-01',
      title: 'První banky vstupují na trh',
      description: 'Air Bank a Česká spořitelna jako průkopníci začínají nabízet okamžité platby svým klientům.',
      icon: Building2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      status: 'completed'
    },
    {
      date: '2020-2022',
      title: 'Postupné rozšiřování',
      description: 'Další významné banky (ČSOB, KB, mBank) postupně přidávají podporu okamžitých plateb.',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      status: 'completed'
    },
    {
      date: '2023-2024',
      title: 'Masová adopce',
      description: 'Prudký nárůst využívání, okamžité platby se stávají standardem pro běžné transakce.',
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      status: 'completed'
    },
    {
      date: '2025-06',
      title: 'Současný stav - 64% podíl',
      description: 'Okamžité platby dominují českému platebnímu ekosystému s více než 1.6M transakcemi denně.',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      status: 'current'
    },
    {
      date: '2027-07',
      title: 'EUR okamžité platby',
      description: 'Povinné zavedení okamžitých plateb v eurech pro všechny tuzemské banky podle EU regulace.',
      icon: Globe,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      status: 'future'
    }
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
            <Calendar className="w-4 h-4 mr-2" />
            Časová osa vývoje
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Od vize k realitě
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Klíčové milníky ve vývoji okamžitých plateb v České republice
          </p>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-indigo-200 rounded-full"></div>

        {/* Events */}
        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-1/2">
                <div className={`w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center ${
                  event.status === 'current' 
                    ? 'bg-emerald-500 animate-pulse' 
                    : event.status === 'future'
                    ? 'bg-gray-300'
                    : 'bg-blue-500'
                }`}>
                  <event.icon className={`w-4 h-4 ${
                    event.status === 'future' ? 'text-gray-600' : 'text-white'
                  }`} />
                </div>
              </div>

              {/* Content card */}
              <div className={`ml-16 md:ml-0 w-full md:w-5/12 ${
                index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
              }`}>
                <Card className={`p-6 border-0 shadow-lg ${
                  event.status === 'current' 
                    ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200' 
                    : event.status === 'future'
                    ? 'bg-gray-50'
                    : 'bg-white'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${event.bgColor}`}>
                      <event.icon className={`w-6 h-6 ${event.color}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant={event.status === 'current' ? 'default' : 'outline'}>
                          {event.date}
                        </Badge>
                        {event.status === 'current' && (
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                            Aktuální
                          </Badge>
                        )}
                        {event.status === 'future' && (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                            Plánované
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary */}
      {data && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card className="p-8 bg-gradient-to-r from-blue-600 via-slate-700 to-slate-800 text-white border-0">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                Úspěšný příběh České republiky
              </h3>
              <p className="text-slate-100 text-lg leading-relaxed max-w-3xl mx-auto mb-6">
                Za pouhých {data.growth_summary.pocet_mesicu} měsíců se České republice podařilo 
                transformovat platební ekosystém a stát se evropským lídrem v oblasti okamžitých plateb.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div>
                  <div className="text-3xl font-bold text-yellow-300 mb-1">
                    {Math.round(data.growth_summary.rust_nasobek).toLocaleString('cs-CZ')}x
                  </div>
                  <div className="text-slate-100 text-sm">růst využití</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-300 mb-1">6</div>
                  <div className="text-slate-100 text-sm">let transformace</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-300 mb-1">#1</div>
                  <div className="text-slate-100 text-sm">pozice v Evropě</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}