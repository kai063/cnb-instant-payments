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
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      status: 'completed'
    },
    {
      date: '2019-01',
      title: 'První banky vstupují na trh',
      description: 'Air Bank a Česká spořitelna jako průkopníci začínají nabízet okamžité platby svým klientům.',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      status: 'completed'
    },
    {
      date: '2020-2022',
      title: 'Postupné rozšiřování',
      description: 'Další významné banky (ČSOB, KB, mBank) postupně přidávají podporu okamžitých plateb.',
      icon: TrendingUp,
      color: 'text-blue-800',
      bgColor: 'bg-blue-200',
      status: 'completed'
    },
    {
      date: '2023-2024',
      title: 'Masová adopce',
      description: 'Prudký nárůst využívání, okamžité platby se stávají standardem pro běžné transakce.',
      icon: Zap,
      color: 'text-blue-900',
      bgColor: 'bg-blue-300',
      status: 'completed'
    },
    {
      date: '2025-06',
      title: 'Současný stav - 37% podíl',
      description: 'Okamžité platby dominují českému platebnímu ekosystému s více než 1.58M transakcemi denně.',
      icon: CheckCircle,
      color: 'text-white',
      bgColor: 'bg-blue-600',
      status: 'current'
    },
    {
      date: '2027-07',
      title: 'EUR okamžité platby',
      description: 'Povinné zavedení okamžitých plateb v eurech pro všechny tuzemské banky podle EU regulace.',
      icon: Globe,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
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
          <Badge className="mb-4 bg-blue-600 text-white border-blue-700">
            <Calendar className="w-4 h-4 mr-2" />
            Časová osa vývoje
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Od vize k realitě
          </h2>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            Klíčové milníky ve vývoji okamžitých plateb v České republice
          </p>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-700 rounded-full"></div>

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
                    ? 'bg-blue-600 animate-pulse ring-2 ring-blue-300' 
                    : event.status === 'future'
                    ? 'bg-blue-300'
                    : 'bg-blue-500'
                }`}>
                  <event.icon className={`w-4 h-4 ${
                    event.status === 'future' ? 'text-blue-600' : 'text-white'
                  }`} />
                </div>
              </div>

              {/* Content card */}
              <div className={`ml-16 md:ml-0 w-full md:w-5/12 ${
                index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
              }`}>
                <Card className={`p-6 border-2 shadow-lg ${
                  event.status === 'current' 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 border-blue-800 text-white' 
                    : event.status === 'future'
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-white border-blue-200'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${event.bgColor}`}>
                      <event.icon className={`w-6 h-6 ${event.color}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={`${
                          event.status === 'current'
                            ? 'bg-white/20 text-white border-white/30'
                            : event.status === 'future'
                            ? 'bg-blue-200 text-blue-800 border-blue-300'
                            : 'bg-blue-100 text-blue-800 border-blue-200'
                        }`}>
                          {event.date}
                        </Badge>
                        {event.status === 'current' && (
                          <Badge className="bg-white/20 text-white border-white/30">
                            Aktuální
                          </Badge>
                        )}
                        {event.status === 'future' && (
                          <Badge className="bg-blue-200 text-blue-700 border-blue-300">
                            Plánované
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className={`text-xl font-semibold mb-3 ${
                        event.status === 'current' ? 'text-white' : 'text-blue-900'
                      }`}>
                        {event.title}
                      </h3>
                      
                      <p className={`leading-relaxed ${
                        event.status === 'current' ? 'text-blue-100' : 'text-blue-700'
                      }`}>
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
    </div>
  )
}