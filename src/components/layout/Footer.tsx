// src/components/layout/Footer.tsx

import { ExternalLink, Database, Calendar, TrendingUp, Code, BarChart3, Settings } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tech Stack Section */}
        <div className="mb-12">
          <h2 className="text-white text-xl font-bold mb-6 text-center">Technologický stack projektu</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Frontend & Web */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                Frontend & Web
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><span className="text-blue-400">Next.js 14</span> - React framework</li>
                <li><span className="text-blue-400">TypeScript</span> - Type safety</li>
                <li><span className="text-blue-400">Tailwind CSS</span> - Styling</li>
                <li><span className="text-blue-400">Framer Motion</span> - Animations</li>
                <li><span className="text-blue-400">Recharts</span> - Data visualization</li>
                <li><span className="text-blue-400">Lucide React</span> - Icons</li>
                <li><span className="text-blue-400">shadcn/ui</span> - UI components</li>
              </ul>
            </div>

            {/* Data Analysis & Processing */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                Analýza dat
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><span className="text-green-400">Python 3.11+</span> - Data processing</li>
                <li><span className="text-green-400">Pandas</span> - Data manipulation</li>
                <li><span className="text-green-400">NumPy</span> - Numerical computing</li>
                <li><span className="text-green-400">Matplotlib</span> - Plotting library</li>
                <li><span className="text-green-400">Seaborn</span> - Statistical visualization</li>
                <li><span className="text-green-400">Jupyter</span> - Interactive analysis</li>
              </ul>
            </div>

            {/* Development & Tools */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-400" />
                Nástroje & infrastruktura
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><span className="text-purple-400">Git</span> - Version control</li>
                <li><span className="text-purple-400">ESLint & Prettier</span> - Code quality</li>
                <li><span className="text-purple-400">Node.js</span> - Runtime environment</li>
                <li><span className="text-purple-400">PostCSS</span> - CSS processing</li>
                <li><span className="text-purple-400">VS Code</span> - Development IDE</li>
                <li><span className="text-purple-400">Coolify</span> - Deployment platform</li>
              </ul>
            </div>
          </div>
        </div>

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
                  href="https://www.cnb.cz/cs/statistika/" 
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

          {/* Mezinárodní zdroje */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-orange-400" />
              Mezinárodní zdroje
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://www.ecb.europa.eu/stats/payments/html/index.en.html" 
                  className="hover:text-orange-400 transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ECB Payment Statistics
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.bundesbank.de/en/tasks/payment-systems/publications/statistics-on-payment-systems-626598" 
                  className="hover:text-orange-400 transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bundesbank Payment Stats
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.betaalvereniging.nl/en/latest-news/facts-figures/" 
                  className="hover:text-orange-400 transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dutch Payments Association
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.riksbank.se/en-gb/statistics/statistics-on-payments-banknotes-and-coins/statistics-on-payments/" 
                  className="hover:text-orange-400 transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Riksbank Payment Statistics
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Detailed Attribution */}
        <div className="border-t border-slate-700 pt-8">
          <div className="bg-slate-800 rounded-lg p-6">
            <h4 className="text-white font-semibold mb-3">Detailní atribuce zdrojů</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
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
                <h5 className="text-slate-300 font-medium mb-2">Mezinárodní zdroje:</h5>
                <ul className="space-y-1 text-slate-400">
                  <li>• ECB Payment Statistics - EU průměrné hodnoty adopce</li>
                  <li>• Bundesbank - německé statistiky instant payments (4%)</li>
                  <li>• Betaalvereniging - nizozemské údaje (88% dostupnost)</li>
                  <li>• Riksbank - švédské statistiky platebního styku</li>
                  <li>• Banque de France - francouzské údaje o růstu</li>
                </ul>
              </div>
              <div>
                <h5 className="text-slate-300 font-medium mb-2">Banky a limity:</h5>
                <ul className="space-y-1 text-slate-400">
                  <li>• <a href="https://www.cnb.cz/export/sites/cnb/cs/platebni-styk/.galleries/certis/download/seznam_okamzite_platby.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ČNB - Seznam účastníků</a></li>
                  <li>• <a href="https://www.penize.cz/osobni-ucty/451195-okamzite-platby-maji-sve-limity-prehled-stropu-podle-bank" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Peníze.cz - Limity bank</a></li>
                  <li>• <a href="https://www.top.cz/okamzite-platby-seznam-bank-ktere-je-nabizeji" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Top.cz - Seznam bank</a></li>
                  <li>• Oficiální stránky jednotlivých bank</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Development Process */}
        <div className="border-t border-slate-700 pt-8 mb-8">
          <div className="bg-slate-800 rounded-lg p-6">
            <h4 className="text-white font-semibold mb-4">Proces vývoje a analýzy</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h5 className="text-slate-300 font-medium mb-2">Data pipeline:</h5>
                <ul className="space-y-1 text-slate-400">
                  <li>1. Extrakce dat z ČNB API a webových zdrojů (Python)</li>
                  <li>2. Čištění a transformace dat (Pandas, NumPy)</li>
                  <li>3. Statistická analýza a validace (Jupyter)</li>
                  <li>4. Export do JSON formátu pro frontend</li>
                </ul>
              </div>
              <div>
                <h5 className="text-slate-300 font-medium mb-2">Vizualizace:</h5>
                <ul className="space-y-1 text-slate-400">
                  <li>• Interaktivní grafy vytvořené pomocí Recharts</li>
                  <li>• Responzivní design s Tailwind CSS</li>
                  <li>• Animace a přechody s Framer Motion</li>
                  <li>• TypeScript pro type safety a maintainability</li>
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
                Všechna data jsou zpracována transparentně pomocí moderních nástrojů pro analýzu dat a webový vývoj.
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