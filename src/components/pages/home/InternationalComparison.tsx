// src/components/pages/home/InternationalComparison.tsx

'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Globe, 
  Trophy, 
  Target,
  Flag,
  Crown,
  Zap
} from 'lucide-react'

interface CountryData {
  country: string
  flag: string
  adoption_rate: number
  population: string
  launch_year: number
  notes: string
  position: number
}

export function InternationalComparison() {
  const countriesData: CountryData[] = [
    {
      country: 'Česká republika',
      flag: '🇨🇿',
      adoption_rate: 64,
      population: '10.5M',
      launch_year: 2018,
      notes: 'Nejrychlejší růst v EU',
      position: 1
    },
    {
      country: 'Nizozemsko',
      flag: '🇳🇱',
      adoption_rate: 45,
      population: '17.4M',
      launch_year: 2017,
      notes: 'Silná digitální kultura',
      position: 2
    },
    {
      country: 'Švédsko',
      flag: '🇸🇪',
      adoption_rate: 38,
      population: '10.4M',
      launch_year: 2012,
      notes: 'Průkopník cashless společnosti',
      position: 3
    },
    {
      country: 'Německo',
      flag: '🇩🇪',
      adoption_rate: 25,
      population: '83.2M',
      launch_year: 2017,
      notes: 'Konzervativní přístup',
      position: 4
    },
    {
      country: 'Francie',
      flag: '🇫🇷',
      adoption_rate: 22,
      population: '67.8M',
      launch_year: 2018,
      notes: 'Postupná adopce',
      position: 5
    },
    {
      country: 'EU průměr',
      flag: '🇪🇺',
      adoption_rate: 20,
      population: '447M',
      launch_year: 2017,
      notes: 'Průměr všech zemí EU',
      position: 6
    }
  ]

  const milestones = [
    {
      year: 2008,
      event: 'První okamžité platby na světě (UK)',
      icon: Zap,
      color: 'text-gray-600'
    },
    {
      year: 2017,
      event: 'EU regulace PSD2 vstupuje v platnost',
      icon: Globe,
      color: 'text-blue-600'
    },
    {
      year: 2018,
      event: 'ČR spouští okamžité platby',
      icon: Flag,
      color: 'text-red-600'
    },
    {
      year: 2025,
      event: 'ČR dosahuje 64% adopce',
      icon: Crown,
      color: 'text-yellow-600'
    },
    {
      year: 2027,
      event: 'Povinné EUR okamžité platby',
      icon: Target,
      color: 'text-green-600'
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
            <Globe className="w-4 h-4 mr-2" />
            Globální kontext
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Česko v mezinárodním srovnání
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pozice České republiky ve světě okamžitých plateb
          </p>
        </motion.div>
      </div>

      {/* Ranking */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h3 className="text-2xl font-bold text-gray-900">
              Evropské žebříček adopce okamžitých plateb
            </h3>
          </div>

          <div className="space-y-4">
            {countriesData.map((country, index) => (
              <motion.div
                key={country.country}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center gap-4 p-4 rounded-lg border-2 ${
                  country.position === 1 
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300' 
                    : 'bg-white border-gray-200'
                }`}
              >
                {/* Position */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  country.position === 1 
                    ? 'bg-yellow-500 text-white' 
                    : country.position <= 3
                    ? 'bg-gray-200 text-gray-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {country.position === 1 && <Crown className="w-6 h-6" />}
                  {country.position !== 1 && country.position}
                </div>

                {/* Flag & Country */}
                <div className="flex items-center gap-3 min-w-[200px]">
                  <span className="text-2xl">{country.flag}</span>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {country.country}
                    </div>
                    <div className="text-sm text-gray-500">
                      {country.population} • {country.launch_year}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="flex-1 mx-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Adopce</span>
                    <span className="font-semibold text-gray-900">
                      {country.adoption_rate}%
                    </span>
                  </div>
                  <Progress 
                    value={country.adoption_rate} 
                    className="h-3"
                  />
                </div>

                {/* Notes */}
                <div className="min-w-[150px] text-right">
                  <Badge variant={country.position === 1 ? 'default' : 'outline'}>
                    {country.notes}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Success factors */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
      >
        <Card className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Faktory úspěchu ČR
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <div className="font-semibold text-gray-900">Technická infrastruktura</div>
                <div className="text-gray-600 text-sm">Kvalitní CERTIS systém a rychlá implementace</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <div className="font-semibold text-gray-900">Bankovní spolupráce</div>
                <div className="text-gray-600 text-sm">Rychlá adopce hlavními hráči na trhu</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <div className="font-semibold text-gray-900">Uživatelská zkušenost</div>
                <div className="text-gray-600 text-sm">Jednoduché rozhraní a bezproblémové využití</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <div className="font-semibold text-gray-900">Digitální připravenost</div>
                <div className="text-gray-600 text-sm">Vysoká penetrace smartphonů a internetového bankovnictví</div>
              </div>
            </li>
          </ul>
        </Card>

        <Card className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Globální timeline
          </h3>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <milestone.icon className={`w-5 h-5 ${milestone.color}`} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{milestone.year}</div>
                  <div className="text-gray-600 text-sm">{milestone.event}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Future outlook */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <Card className="p-8 bg-gradient-to-r from-blue-600 via-slate-700 to-slate-800 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Budoucnost okamžitých plateb
            </h3>
            <p className="text-slate-100 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
              Česká republika si díky svému úspěchu v okamžitých platbách buduje pozici 
              technologického lídra v evropském fintech ekosystému.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Target className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
                <div className="text-xl font-bold mb-2">70%+</div>
                <div className="text-slate-100 text-sm">cílová adopce do 2026</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Globe className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
                <div className="text-xl font-bold mb-2">EUR</div>
                <div className="text-slate-100 text-sm">okamžité platby od 2027</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Crown className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
                <div className="text-xl font-bold mb-2">#1</div>
                <div className="text-slate-100 text-sm">udržení pozice lídra</div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}