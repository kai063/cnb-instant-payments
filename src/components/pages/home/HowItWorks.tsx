// src/components/pages/home/HowItWorks.tsx

import { Clock, Shield, Zap, CreditCard } from 'lucide-react'

export function HowItWorks() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-slate-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Co jsou okamžité platby?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Převody peněz mezi českými bankami během <strong>1 sekundy</strong>, dostupné 24/7 včetně víkendů a svátků
          </p>
        </div>

        {/* Klíčové vlastnosti */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">1 sekunda</h3>
            <p className="text-sm text-gray-600">Typická doba doručení platby</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">24/7/365</h3>
            <p className="text-sm text-gray-600">Funguje i o víkendech a svátcích</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Do 2,5 mil. Kč</h3>
            <p className="text-sm text-gray-600">Maximální limit na platbu</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">99,8% úspěšnost</h3>
            <p className="text-sm text-gray-600">Pouze 1-2 platby z 1000 selžou</p>
          </div>
        </div>

        {/* Co potřebujete vědět */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Nejdůležitější informace
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-blue-600">✓ Co funguje</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Převody mezi českými bankami v korunách</li>
                <li>• Dostupné z mobilu i internetového bankovnictví</li>
                <li>• Funguje i o víkendech a svátcích</li>
                <li>• Zpracováno přes systém CERTIS (ČNB)</li>
                 <li>• Czech Express Real Time Interbank Gross Settlement System</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-orange-600">⚠ Podmínky</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Obě banky musí službu podporovat</li>
                <li>• Jednotlivé banky mohou mít nižší limity</li>
                <li>• Poplatek stanovuje vaše banka</li>
                <li>• Platba musí být zpracována do 6 sekund</li>
                <li>• Při neúspěchu se peníze vrátí na účet</li>
              </ul>
            </div>
          </div>
        </div>

       
      </div>
    </section>
  )
}