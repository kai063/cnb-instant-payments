// src/components/layout/Footer.tsx

import { ExternalLink, Database, Calendar, TrendingUp } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Zdroje dat */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-400" />
              Zdroje dat
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://www.cnb.cz/cs/platebni-styk/" 
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ČNB CERTIS statistiky
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.cnb.cz/cs/statistiky/" 
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ČNB oficiální web statistiky
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.cnb.cz/cs/o_cnb/cnblog/" 
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ČNB sociální média
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>Manuální kompilace z veřejných bankovních informací</li>
            </ul>
          </div>

          {/* Datové soubory */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Použitá data
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-slate-400">2008-2025:</span> Měsíční časové řady plateb
              </li>
              <li>
                <span className="text-slate-400">2023-2024:</span> ČNB výroční statistické zprávy
              </li>
              <li>
                <span className="text-slate-400">2025:</span> Aktuální údaje o okamžitých platbách
              </li>
              <li>
                <span className="text-slate-400">EU data:</span> Mezinárodní srovnání adoptace
              </li>
            </ul>
          </div>

          {/* Metodika */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              Období analýzy
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-slate-400">Hlavní dataset:</span> 2018-2025
              </li>
              <li>
                <span className="text-slate-400">Historický kontext:</span> 2008-2018
              </li>
              <li>
                <span className="text-slate-400">Poslední aktualizace:</span> Červen 2025
              </li>
              <li>
                <span className="text-slate-400">Frekvence:</span> Měsíční data
              </li>
            </ul>
          </div>

          {/* Poznámky */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Poznámky k datům
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Data zpracována z oficiálních ČNB zdrojů</li>
              <li>Okamžité platby dostupné od listopadu 2018</li>
              <li>Mezinárodní srovnání na základě EU statistik</li>
              <li>Bankovní limity aktuální k červnu 2025</li>
            </ul>
          </div>
        </div>

        {/* Detailed Attribution */}
        <div className="border-t border-slate-700 pt-8">
          <div className="bg-slate-800 rounded-lg p-6">
            <h4 className="text-white font-semibold mb-3">Detailní atribuce zdrojů</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h5 className="text-slate-300 font-medium mb-2">Primární zdroje:</h5>
                <ul className="space-y-1 text-slate-400">
                  <li>• ČNB CERTIS - systémové statistiky platebního styku</li>
                  <li>• ČNB web (duben 2025) - aktuální údaje o adoptaci</li>
                  <li>• ČNB Instagram (červen 2025) - oznámení 40% podílu</li>
                  <li>• ČNB statistické údaje 2023-2024 - výroční zprávy</li>
                </ul>
              </div>
              <div>
                <h5 className="text-slate-300 font-medium mb-2">Doplňkové zdroje:</h5>
                <ul className="space-y-1 text-slate-400">
                  <li>• Manuální kompilace bankovních webů a podmínek</li>
                  <li>• Registr "Platby na kontakt" (366K uživatelů, červen 2025)</li>
                  <li>• EU statistiky pro mezinárodní kontext</li>
                  <li>• Veřejně dostupné informace o bankovních limitech</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400">
              <p>
                Analýza vytvořena na základě oficiálních dat České národní banky a veřejně dostupných informací.
              </p>
              <p className="mt-1">
                Všechna data jsou zpracována transparentně a odpovídají oficiálním zdrojům ČNB.
              </p>
            </div>
            <div className="text-sm text-slate-500">
              Poslední aktualizace: Červen 2025
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 pt-4 mt-6 text-center text-sm text-slate-500">
          <p>
            Data poskytnutá ČNB jsou využita v souladu s jejich licenčními podmínkami pro vzdělávací a analytické účely.
          </p>
        </div>
      </div>
    </footer>
  )
}