// src/components/pages/home/CertisSavings.tsx

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  PiggyBank, 
  TrendingDown, 
  Calculator,
  CreditCard,
  Banknote,
  Globe,
  ArrowRight,
  CheckCircle,
  Building2,
  Users,
  Zap,
  ShieldCheck
} from 'lucide-react'

export function CertisSavings() {
  const [showComparison, setShowComparison] = useState(false)

  const advantages = [
    {
      icon: Banknote,
      title: 'Ušetříte na poplatcích',
      description: 'Jen 10 haléřů za převod místo několika korun u karet nebo desítek korun u PayPal',
      color: 'text-blue-700',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Zap,
      title: 'Převod za pár sekund',
      description: 'Peníze dojdou okamžitě, i o víkendu a svátcích. Žádné čekání do druhého dne',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: ShieldCheck,
      title: 'Bezpečné a spolehlivé',
      description: 'Provozuje Česká národní banka - nejvyšší možná úroveň bezpečnosti',
      color: 'text-blue-800',
      bgColor: 'bg-blue-200'
    },
    {
      icon: Building2,
      title: 'Dostupné ve většině bank',
      description: 'Podporuje 14 z největších českých bank, pravděpodobně i ta vaše',
      color: 'text-blue-900',
      bgColor: 'bg-blue-300'
    }
  ]

  const comparisonData = [
    {
      method: 'CERTIS',
      fee: '0,10 Kč',
      description: 'Pevný poplatek bez ohledu na částku',
      highlight: true
    },
    {
      method: 'Platební karty',
      fee: '~0,3% z částky',
      description: 'Interchange fee podle EU regulace'
    },
    {
      method: 'PayPal',
      fee: '3,4% + 10 Kč',
      description: 'Vysoké poplatky pro obchodníky'
    },
    {
      method: 'Okamžité platby od komerčních bank',
      fee: 'Většina zdarma',
      description: 'Většina bank nabízí bez poplatků'
    }
  ]

  const economicImpact = [
    {
      icon: TrendingDown,
      title: 'Úspory v milionech denně',
      description: 'Odhad úspor pro českou ekonomiku při využití CERTIS místo dražších alternativ'
    },
    {
      icon: Users,
      title: 'Podpora podnikání',
      description: 'Nižší náklady na platby umožňují firmám reinvestovat prostředky do rozvoje'
    },
    {
      icon: Globe,
      title: 'Konkurenceschopnost',
      description: 'Efektivní platební infrastruktura posiluje pozici České republiky'
    }
  ]

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto px-4">


        {/* Cost comparison section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="p-6 md:p-8">
            <div className="text-center mb-6">
              <Calculator className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Srovnání nákladů platebních metod
              </h3>
              <p className="text-gray-600 text-sm">
                CERTIS nabízí nejnižší poplatky ze všech dostupných platebních metod
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {comparisonData.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    item.highlight 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-800 text-white shadow-lg' 
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="text-center">
                    <h4 className={`font-medium text-xs md:text-sm mb-1 ${item.highlight ? 'text-white' : 'text-blue-800'}`}>{item.method}</h4>
                    <div className={`text-sm md:text-base font-bold mb-1 ${item.highlight ? 'text-white' : 'text-blue-700'}`}>
                      {item.fee}
                    </div>
                    <p className={`text-xs ${item.highlight ? 'text-blue-100' : 'text-blue-600'}`}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center p-3 bg-blue-50 rounded-lg mb-4">
              <p className="text-sm text-blue-800">
                <strong>Příklad:</strong> Při platbě 1000 Kč → CERTIS: 0,10 Kč • Banky: většina zdarma • Karta: ~3 Kč • PayPal: ~44 Kč
              </p>
            </div>

            {/* Fee explanation */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Kde se promítá cena za okamžité platby</h4>
              <p className="text-sm text-gray-800 leading-relaxed mb-3">
                Náklady 0,10 Kč, které ČNB účtuje bankám za každou okamžitou platbu, se nepromítají přímo do poplatků pro klienty. Banky tyto náklady absorbují do své celkové cenové politiky - kompenzují je prostřednictvím příjmů z jiných služeb (kreditní karty, půjčky, poplatky za vedení účtu), úspor na digitalizaci a dlouhodobé strategie udržení klientů. Okamžité platby zdarma jsou pro banky marketingovým nástrojem a investicí do konkurenceschopnosti, přičemž minimální náklady 0,10 Kč jsou zanedbatelné ve srovnání s miliardovými náklady na akceptaci platebních karet.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Advantages and savings section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 md:p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Výhody a úspory okamžitých plateb
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              Okamžité platby přinášejí úspory pro českou ekonomiku. 
              Odhady vycházejí z rozdílu nákladů CERTIS (0,10 Kč za platbu) oproti 
              poplatkům platebních kart a služeb podle dat ČNB a veřejných tarifů.
            </p>
            
    

            {/* CNB Quote */}
            <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-600">
              <blockquote className="text-blue-900 italic text-sm md:text-base leading-relaxed">
                "Platební karty stojí českou ekonomiku miliardy korun ročně"
              </blockquote>
              <div className="mt-3 text-xs text-blue-700">
                — <a 
                  href="https://www.cnb.cz/cs/verejnost/servis-pro-media/autorske-clanky-rozhovory-s-predstaviteli-cnb/Okamzite-platby-nevyuzita-sance/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  ČNB: Okamžité platby - nevyužitá šance
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {economicImpact.map((impact, index) => (
                <div key={index} className="bg-blue-100 rounded-lg p-4 border border-blue-200">
                  <impact.icon className="w-6 h-6 text-blue-700 mx-auto mb-3" />
                  <h4 className="font-semibold text-blue-900 mb-2">{impact.title}</h4>
                  <p className="text-blue-700 text-sm">{impact.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

      </div>
    </section>
  )
}