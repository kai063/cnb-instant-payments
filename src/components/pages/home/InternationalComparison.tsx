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
  Zap,
  ExternalLink
} from 'lucide-react'

interface CountryData {
  country: string
  flag: string
  adoption_rate: number
  population: string
  launch_year: number
  notes: string
  position: number
  source: string
  source_url?: string
}

export function InternationalComparison() {
  const countriesData: CountryData[] = [
    {
      country: 'Nizozemsko',
      flag: '🇳🇱',
      adoption_rate: 88,
      population: '17.4M',
      launch_year: 2017,
      notes: 'Nejvyšší dostupnost v EU',
      position: 1,
      source: 'ECB SPACE Survey 2024',
      source_url: 'https://www.ecb.europa.eu/stats/ecb_surveys/space/html/ecb.space2024~19d46f0f17.en.html'
    },
    {
      country: 'Švédsko',
      flag: '🇸🇪',
      adoption_rate: 80,
      population: '10.4M',
      launch_year: 2012,
      notes: 'Swish, 8.9M uživatelů',
      position: 2,
      source: 'Riksbank Data 2024 (odhad)',
      source_url: ''
    },
    {
      country: 'Polsko',
      flag: '🇵🇱',
      adoption_rate: 65,
      population: '37.9M',
      launch_year: 2012,
      notes: 'Populární systém BLIK',
      position: 3,
      source: 'NBP Report 2023 (odhad)',
      source_url: ''
    },
    {
      country: 'Česká republika',
      flag: '🇨🇿',
      adoption_rate: 37,
      population: '10.5M',
      launch_year: 2018,
      notes: '37% všech plateb (4/2025)',
      position: 4,
      source: 'ČNB CERTIS Statistiky',
      source_url: 'https://www.cnb.cz/cs/platebni-styk/certis/statisticke-udaje/'
    },
    {
      country: 'Francie',
      flag: '🇫🇷',
      adoption_rate: 20,
      population: '67.8M',
      launch_year: 2018,
      notes: 'Postupná adopce (odhad)',
      position: 5,
      source: 'Banque de France 2024',
      source_url: 'https://www.banque-france.fr/en/press-release/payments-statistics-first-half-2024'
    },
    {
      country: 'EU průměr',
      flag: '🇪🇺',
      adoption_rate: 15,
      population: '447M',
      launch_year: 2017,
      notes: '15% z převodů (H1 2024)',
      position: 6,
      source: 'ECB Payment Statistics 2024',
      source_url: 'https://www.ecb.europa.eu/press/stats/paysec/html/ecb.pis2024h1~5263055ced.en.html'
    },
    {
      country: 'Rakousko',
      flag: '🇦🇹',
      adoption_rate: 15,
      population: '9.0M',
      launch_year: 2017,
      notes: 'Vysoká implementace bank (98%)',
      position: 7,
      source: 'ECB Data 2024 (odhad)',
      source_url: ''
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
      event: 'ČR dosahuje 40% adopce',
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
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Evropské žebříček adopce okamžitých plateb
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Podíl okamžitých plateb z celkového počtu plateb podle oficiálních zdrojů
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {countriesData.map((country, index) => (
              <motion.div
                key={country.country}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md ${
                  country.country === 'Česká republika'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-800 text-white shadow-lg ring-2 ring-blue-500 ring-opacity-50'
                    : country.position === 1 
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300' 
                    : 'bg-white border-gray-200'
                }`}
              >
                {/* Position */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  country.country === 'Česká republika'
                    ? 'bg-white text-blue-700 shadow-md'
                    : country.position === 1 
                    ? 'bg-blue-500 text-white' 
                    : country.position <= 3
                    ? 'bg-blue-200 text-blue-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {country.position === 1 && <Crown className="w-6 h-6" />}
                  {country.position !== 1 && country.position}
                </div>

                {/* Flag & Country */}
                <div className="flex items-center gap-3 min-w-0 sm:min-w-[200px] flex-1 sm:flex-none">
                  <span className="text-2xl">{country.flag}</span>
                  <div>
                    <div className={`font-semibold ${
                      country.country === 'Česká republika' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {country.country}
                    </div>
                    <div className={`text-sm ${
                      country.country === 'Česká republika' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {country.population} • {country.launch_year}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="flex-1 mx-0 sm:mx-6 w-full sm:w-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${
                      country.country === 'Česká republika' ? 'text-blue-100' : 'text-gray-600'
                    }`}>Adopce</span>
                    <span className={`font-semibold ${
                      country.country === 'Česká republika' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {country.adoption_rate}%
                    </span>
                  </div>
                  <Progress 
                    value={country.adoption_rate} 
                    className={`h-3 ${
                      country.country === 'Česká republika'
                        ? '[&>div]:bg-white [&>div]:shadow-sm'
                        : ''
                    }`}
                  />
                </div>

                {/* Notes & Source */}
                <div className="min-w-0 sm:min-w-[200px] text-left sm:text-right w-full sm:w-auto">
                  <Badge 
                    variant={country.country === 'Česká republika' ? 'secondary' : country.position === 1 ? 'default' : 'outline'} 
                    className={`mb-2 ${
                      country.country === 'Česká republika' 
                        ? 'bg-white/20 text-white border-white/30 hover:bg-white/30' 
                        : ''
                    }`}
                  >
                    {country.notes}
                  </Badge>
                  <div className={`text-xs flex items-center justify-end gap-1 ${
                    country.country === 'Česká republika' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {country.source_url ? (
                      <a 
                        href={country.source_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1 ${
                          country.country === 'Česká republika' 
                            ? 'hover:text-white' 
                            : 'hover:text-blue-600'
                        }`}
                      >
                        {country.source}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span>{country.source}</span>
                    )}
                  </div>
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
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-6">
            Faktory úspěchu ČR
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <div className="font-semibold text-blue-900">Technická infrastruktura</div>
                <div className="text-blue-700 text-sm">Kvalitní CERTIS systém a rychlá implementace</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <div className="font-semibold text-blue-900">Bankovní spolupráce</div>
                <div className="text-blue-700 text-sm">Rychlá adopce hlavními hráči na trhu</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <div className="font-semibold text-blue-900">Uživatelská zkušenost</div>
                <div className="text-blue-700 text-sm">Jednoduché rozhraní a bezproblémové využití</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <div className="font-semibold text-blue-900">Digitální připravenost</div>
                <div className="text-blue-700 text-sm">Vysoká penetrace smartphonů a internetového bankovnictví</div>
              </div>
            </li>
          </ul>
        </Card>

        <Card className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-6">
            Globální timeline
          </h3>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  milestone.event.includes('ČR') ? 'bg-blue-600' : 'bg-blue-100'
                }`}>
                  <milestone.icon className={`w-5 h-5 ${
                    milestone.event.includes('ČR') ? 'text-white' : milestone.color
                  }`} />
                </div>
                <div>
                  <div className={`font-semibold ${
                    milestone.event.includes('ČR') ? 'text-blue-900' : 'text-gray-900'
                  }`}>{milestone.year}</div>
                  <div className={`text-sm ${
                    milestone.event.includes('ČR') ? 'text-blue-700' : 'text-gray-600'
                  }`}>{milestone.event}</div>
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
        <Card className="p-6 md:p-8 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Budoucnost okamžitých plateb
            </h3>
            <p className="text-slate-100 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
              Česká republika si díky svému úspěchu v okamžitých platbách buduje pozici 
              technologického lídra v evropském fintech ekosystému.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <Target className="w-6 h-6 md:w-8 md:h-8 text-blue-200 mx-auto mb-3" />
                <div className="text-lg md:text-xl font-bold mb-2">50%+</div>
                <div className="text-blue-100 text-xs md:text-sm">cílová adopce do 2026</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <Globe className="w-6 h-6 md:w-8 md:h-8 text-blue-200 mx-auto mb-3" />
                <div className="text-lg md:text-xl font-bold mb-2">EUR</div>
                <div className="text-blue-100 text-xs md:text-sm">okamžité platby od 2027</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <Crown className="w-6 h-6 md:w-8 md:h-8 text-blue-200 mx-auto mb-3" />
                <div className="text-lg md:text-xl font-bold mb-2">#4</div>
                <div className="text-blue-100 text-xs md:text-sm">současná pozice v EU</div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}