// src/components/charts/GrowthChart.tsx

'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

// Dynamicky načítáme Plotly kvůli SSR
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

interface ParsedData {
  date: Date
  instant_payments: number
  regular_payments: number
  share_percent: number
  turnover: number
}

export function GrowthChart() {
  const [data, setData] = useState<ParsedData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/monthly_cleaned.csv')
      .then(res => res.text())
      .then(csvText => {
        // Parsujeme CSV
        const lines = csvText.split('\n')
        const headers = lines[0].split(',')
        const parsedData: ParsedData[] = []

        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim()) {
            const values = lines[i].split(',')
            
            try {
              const dateStr = values[headers.indexOf('datum')]?.replace(/"/g, '').trim()
              const instant = parseFloat(values[headers.indexOf('Průměrný denní počet - okamžité platby')]?.replace(/"/g, '')) || 0
              const regular = parseFloat(values[headers.indexOf('Průměrný denní počet - úhrady')]?.replace(/"/g, '')) || 0
              const share = parseFloat(values[headers.indexOf('podil_okamzitych_pct')]?.replace(/"/g, '')) || 0
              const turnover = parseFloat(values[headers.indexOf('Průměrné denní obraty - úhrady a inkasa [mld]')]?.replace(/"/g, '')) || 0
              
              if (dateStr && dateStr !== 'datum') {
                parsedData.push({
                  date: new Date(dateStr),
                  instant_payments: instant,
                  regular_payments: regular,
                  share_percent: share,
                  turnover: turnover
                })
              }
            } catch (e) {
              console.log('Skipping invalid row:', i)
            }
          }
        }

        // Filtrujeme data od 2018 pro lepší zobrazení a řadíme podle data
        const filteredData = parsedData
          .filter(d => d.date >= new Date('2018-01-01'))
          .sort((a, b) => a.date.getTime() - b.date.getTime())

        setData(filteredData)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading CSV:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <Card className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </Card>
    )
  }

  // Příprava dat pro grafy
  const dates = data.map(d => d.date.toISOString().split('T')[0])
  const instantPayments = data.map(d => d.instant_payments)
  const regularPayments = data.map(d => d.regular_payments)
  const sharePercent = data.map(d => d.share_percent)
  const turnover = data.map(d => d.turnover)

  // Graf 1: Absolutní počty
  const absoluteTrace1 = {
    x: dates,
    y: regularPayments,
    type: 'scatter' as const,
    mode: 'lines' as const,
    name: 'Běžné úhrady',
    line: { color: '#64748b', width: 2 },
    hovertemplate: '%{y:,.0f} běžných úhrad<br>%{x}<extra></extra>'
  }

  const absoluteTrace2 = {
    x: dates,
    y: instantPayments,
    type: 'scatter' as const,
    mode: 'lines' as const,
    name: 'Okamžité platby',
    line: { color: '#1d4ed8', width: 3 },
    hovertemplate: '%{y:,.0f} okamžitých plateb<br>%{x}<extra></extra>'
  }

  // Graf 2: Podíl v procentech
  const shareTrace = {
    x: dates,
    y: sharePercent,
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    name: 'Podíl okamžitých plateb',
    line: { color: '#2563eb', width: 3 },
    marker: { size: 4, color: '#2563eb' },
    hovertemplate: '%{y:.1f}% okamžitých plateb<br>%{x}<extra></extra>'
  }

  // Graf 3: Log škála
  const logTrace = {
    x: dates,
    y: instantPayments.map(y => y > 0 ? y : null),
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    name: 'Okamžité platby (log)',
    line: { color: '#1e40af', width: 3 },
    marker: { size: 3, color: '#1e40af' },
    hovertemplate: '%{y:,.0f} okamžitých plateb<br>%{x}<extra></extra>'
  }

  // Graf 4: Obrat
  const turnoverTrace = {
    x: dates,
    y: turnover,
    type: 'scatter' as const,
    mode: 'lines' as const,
    name: 'Denní obrat',
    line: { color: '#1e3a8a', width: 2 },
    hovertemplate: '%{y:.0f} mld Kč<br>%{x}<extra></extra>'
  }

  const commonLayout = {
    font: { family: 'Inter, sans-serif', size: window.innerWidth < 768 ? 10 : 12 },
    margin: { 
      l: window.innerWidth < 768 ? 40 : 60, 
      r: window.innerWidth < 768 ? 20 : 40, 
      t: window.innerWidth < 768 ? 20 : 40, 
      b: window.innerWidth < 768 ? 40 : 60 
    },
    height: window.innerWidth < 768 ? 300 : 400,
    showlegend: true,
    legend: { 
      orientation: 'h' as const, 
      y: -0.2,
      x: 0.5,
      xanchor: 'center',
      font: { size: window.innerWidth < 768 ? 10 : 12 }
    },
    hovermode: 'closest' as const,
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    xaxis: {
      gridcolor: '#f1f5f9',
      title: { 
        text: 'Rok',
        font: { size: window.innerWidth < 768 ? 10 : 12 }
      },
      tickangle: window.innerWidth < 768 ? -45 : 0,
      tickfont: { size: window.innerWidth < 768 ? 8 : 10 }
    },
    yaxis: {
      gridcolor: '#f1f5f9',
      title: {
        font: { size: window.innerWidth < 768 ? 10 : 12 }
      },
      tickfont: { size: window.innerWidth < 768 ? 8 : 10 }
    }
  }

  const config = {
    responsive: true,
    displayModeBar: window.innerWidth >= 768,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d', 'autoScale2d', 'resetScale2d'] as any,
    displaylogo: false,
    scrollZoom: false,
    doubleClick: 'reset'
  }

  return (
    <Card className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-3xl font-bold text-blue-900">
            Vývoj okamžitých plateb v čase
          </h3>
          <Badge className="bg-blue-600 text-white border-blue-700">2018-2025</Badge>
        </div>
        <p className="text-blue-700 text-lg">
          Interaktivní grafy zobrazující exponenciální růst okamžitých plateb v České republice
        </p>
      </div>

      <Tabs defaultValue="absolute" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-blue-200 h-auto">
          <TabsTrigger value="absolute" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs md:text-sm py-2 px-1">
            <span className="hidden sm:inline">Absolutní počty</span>
            <span className="sm:hidden">Počty</span>
          </TabsTrigger>
          <TabsTrigger value="share" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs md:text-sm py-2 px-1">
            <span className="hidden sm:inline">Podíl (%)</span>
            <span className="sm:hidden">Podíl</span>
          </TabsTrigger>
          <TabsTrigger value="log" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs md:text-sm py-2 px-1">
            <span className="hidden sm:inline">Log škála</span>
            <span className="sm:hidden">Log</span>
          </TabsTrigger>
          <TabsTrigger value="turnover" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs md:text-sm py-2 px-1">
            <span className="hidden sm:inline">Obrat</span>
            <span className="sm:hidden">Obrat</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="absolute" className="mt-4 md:mt-6">
          <div className="w-full overflow-x-auto">
            <Plot
              data={[absoluteTrace1, absoluteTrace2]}
              layout={{
                ...commonLayout,
                title: { 
                  text: window.innerWidth < 768 ? 'Denní počet plateb' : 'Průměrný denní počet plateb',
                  font: { size: window.innerWidth < 768 ? 14 : 16 }
                },
                yaxis: { 
                  ...commonLayout.yaxis, 
                  title: { 
                    text: window.innerWidth < 768 ? 'Počet' : 'Počet plateb',
                    font: { size: window.innerWidth < 768 ? 10 : 12 }
                  }
                }
              }}
              config={config}
              className="w-full min-w-[300px]"
              useResizeHandler={true}
            />
          </div>
        </TabsContent>

        <TabsContent value="share" className="mt-4 md:mt-6">
          <div className="w-full overflow-x-auto">
            <Plot
              data={[shareTrace]}
              layout={{
                ...commonLayout,
                title: { 
                  text: window.innerWidth < 768 ? 'Podíl okamžitých plateb' : 'Podíl okamžitých plateb ze všech plateb',
                  font: { size: window.innerWidth < 768 ? 14 : 16 }
                },
                yaxis: { 
                  ...commonLayout.yaxis, 
                  title: { 
                    text: 'Podíl (%)',
                    font: { size: window.innerWidth < 768 ? 10 : 12 }
                  }
                }
              }}
              config={config}
              className="w-full min-w-[300px]"
              useResizeHandler={true}
            />
          </div>
        </TabsContent>

        <TabsContent value="log" className="mt-4 md:mt-6">
          <div className="w-full overflow-x-auto">
            <Plot
              data={[logTrace]}
              layout={{
                ...commonLayout,
                title: { 
                  text: window.innerWidth < 768 ? 'Exponenciální růst' : 'Exponenciální růst okamžitých plateb',
                  font: { size: window.innerWidth < 768 ? 14 : 16 }
                },
                yaxis: { 
                  ...commonLayout.yaxis, 
                  title: { 
                    text: window.innerWidth < 768 ? 'Počet (log)' : 'Počet plateb (log škála)',
                    font: { size: window.innerWidth < 768 ? 10 : 12 }
                  },
                  type: 'log' as const
                }
              }}
              config={config}
              className="w-full min-w-[300px]"
              useResizeHandler={true}
            />
          </div>
        </TabsContent>

        <TabsContent value="turnover" className="mt-4 md:mt-6">
          <div className="w-full overflow-x-auto">
            <Plot
              data={[turnoverTrace]}
              layout={{
                ...commonLayout,
                title: { 
                  text: window.innerWidth < 768 ? 'Denní obrat systému' : 'Průměrný denní obrat platebního systému',
                  font: { size: window.innerWidth < 768 ? 14 : 16 }
                },
                yaxis: { 
                  ...commonLayout.yaxis, 
                  title: { 
                    text: 'Obrat (mld Kč)',
                    font: { size: window.innerWidth < 768 ? 10 : 12 }
                  }
                }
              }}
              config={config}
              className="w-full min-w-[300px]"
              useResizeHandler={true}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Insights */}
      <div className="mt-6 md:mt-8 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 md:p-5 rounded-xl border border-blue-300">
          <div className="text-blue-900 font-semibold mb-1 md:mb-2 text-sm md:text-base">Hlavní trend</div>
          <div className="text-blue-800 text-xs md:text-sm">
            Exponenciální růst od 2019 s accelerací v roce 2024-2025
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 md:p-5 rounded-xl border border-blue-800">
          <div className="text-white font-semibold mb-1 md:mb-2 text-sm md:text-base">Aktuální stav</div>
          <div className="text-blue-100 text-xs md:text-sm">
            Okamžité platby dosáhly 40% podílu v červnu 2025
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-200 to-blue-300 p-4 md:p-5 rounded-xl border border-blue-400">
          <div className="text-blue-900 font-semibold mb-1 md:mb-2 text-sm md:text-base">Pozice v EU</div>
          <div className="text-blue-800 text-xs md:text-sm">
            ČR patří mezi evropské lídry s nadprůměrnou adopcí
          </div>
        </div>
      </div>
    </Card>
  )
}