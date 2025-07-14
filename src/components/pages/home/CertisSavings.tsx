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
      method: 'Bankovní převody',
      fee: '5-50 Kč',
      description: 'Podle tarifu banky, často pomalé'
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
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4">
              <PiggyBank className="w-4 h-4 mr-2" />
              Praktické výhody
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proč jsou okamžité platby lepší volbou?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Okamžité platby vám ušetří peníze, čas i starosti. Převedete peníze za sekundy, 
              bez výrazných poplatků a kdykoliv potřebujete.
            </p>
          </motion.div>
        </div>

        {/* Main advantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-4 md:p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className={`p-2 md:p-3 rounded-lg ${advantage.bgColor} flex-shrink-0`}>
                    <advantage.icon className={`w-5 h-5 md:w-6 md:h-6 ${advantage.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

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
            
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Příklad:</strong> Při platbě 1000 Kč → CERTIS: 0,10 Kč • Karta: ~3 Kč • PayPal: ~44 Kč
              </p>
            </div>
          </Card>
        </motion.div>


        {/* Future outlook and economic impact */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 md:p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Budoucnost okamžitých plateb v Česku
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              S rostoucím objemem plateb a rozšiřováním používání systému CERTIS lze očekávat, 
              že úspory pro českou ekonomiku budou nadále růst. Při denním objemu 1,58 mil. 
              okamžitých plateb se úspory pohybují v milionech korun denně.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 md:p-4 border border-blue-200">
                <div className="text-lg md:text-xl font-bold text-blue-700 mb-1">50%+</div>
                <div className="text-blue-600 text-xs md:text-sm">Cílová adopce do 2026</div>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-3 md:p-4 border border-blue-300">
                <div className="text-lg md:text-xl font-bold text-blue-800 mb-1">14</div>
                <div className="text-blue-700 text-xs md:text-sm">Bank podporuje okamžité platby</div>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-3 md:p-4 border border-blue-800">
                <div className="text-lg md:text-xl font-bold text-white mb-1">700M</div>
                <div className="text-blue-100 text-xs md:text-sm">Plateb od startu systému</div>
              </div>
              <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl p-3 md:p-4 border border-blue-900">
                <div className="text-lg md:text-xl font-bold text-white mb-1">Miliony</div>
                <div className="text-blue-100 text-xs md:text-sm">Korun úspor denně</div>
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