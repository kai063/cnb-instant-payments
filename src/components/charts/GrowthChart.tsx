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
    line: { color: '#dc2626', width: 3 },
    hovertemplate: '%{y:,.0f} okamžitých plateb<br>%{x}<extra></extra>'
  }

  // Graf 2: Podíl v procentech
  const shareTrace = {
    x: dates,
    y: sharePercent,
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    name: 'Podíl okamžitých plateb',
    line: { color: '#059669', width: 3 },
    marker: { size: 4, color: '#059669' },
    hovertemplate: '%{y:.1f}% okamžitých plateb<br>%{x}<extra></extra>'
  }

  // Graf 3: Log škála
  const logTrace = {
    x: dates,
    y: instantPayments.map(y => y > 0 ? y : null),
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    name: 'Okamžité platby (log)',
    line: { color: '#7c3aed', width: 3 },
    marker: { size: 3, color: '#7c3aed' },
    hovertemplate: '%{y:,.0f} okamžitých plateb<br>%{x}<extra></extra>'
  }

  // Graf 4: Obrat
  const turnoverTrace = {
    x: dates,
    y: turnover,
    type: 'scatter' as const,
    mode: 'lines' as const,
    name: 'Denní obrat',
    line: { color: '#ea580c', width: 2 },
    hovertemplate: '%{y:.0f} mld Kč<br>%{x}<extra></extra>'
  }

  const commonLayout = {
    font: { family: 'Inter, sans-serif', size: 12 },
    margin: { l: 60, r: 40, t: 40, b: 60 },
    height: 400,
    showlegend: true,
    legend: { orientation: 'h' as const, y: -0.2 },
    hovermode: 'x' as const,
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    xaxis: {
      gridcolor: '#f1f5f9',
      title: { text: 'Rok' }
    },
    yaxis: {
      gridcolor: '#f1f5f9'
    }
  }

  const config = {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'] as any,
    displaylogo: false
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-2xl font-bold text-gray-900">
            Vývoj okamžitých plateb v čase
          </h3>
          <Badge variant="outline">2018-2025</Badge>
        </div>
        <p className="text-gray-600">
          Interaktivní grafy zobrazující exponenciální růst okamžitých plateb v České republice
        </p>
      </div>

      <Tabs defaultValue="absolute" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="absolute">Absolutní počty</TabsTrigger>
          <TabsTrigger value="share">Podíl (%)</TabsTrigger>
          <TabsTrigger value="log">Log škála</TabsTrigger>
          <TabsTrigger value="turnover">Obrat</TabsTrigger>
        </TabsList>

        <TabsContent value="absolute" className="mt-6">
          <Plot
            data={[absoluteTrace1, absoluteTrace2]}
            layout={{
              ...commonLayout,
              title: { text: 'Průměrný denní počet plateb' },
              yaxis: { ...commonLayout.yaxis, title: { text: 'Počet plateb' } }
            }}
            config={config}
            className="w-full"
          />
        </TabsContent>

        <TabsContent value="share" className="mt-6">
          <Plot
            data={[shareTrace]}
            layout={{
              ...commonLayout,
              title: { text: 'Podíl okamžitých plateb ze všech plateb' },
              yaxis: { ...commonLayout.yaxis, title: { text: 'Podíl (%)' } }
            }}
            config={config}
            className="w-full"
          />
        </TabsContent>

        <TabsContent value="log" className="mt-6">
          <Plot
            data={[logTrace]}
            layout={{
              ...commonLayout,
              title: { text: 'Exponenciální růst okamžitých plateb' },
              yaxis: { 
                ...commonLayout.yaxis, 
                title: { text: 'Počet plateb (log škála)' },
                type: 'log' as const
              }
            }}
            config={config}
            className="w-full"
          />
        </TabsContent>

        <TabsContent value="turnover" className="mt-6">
          <Plot
            data={[turnoverTrace]}
            layout={{
              ...commonLayout,
              title: { text: 'Průměrný denní obrat platebního systému' },
              yaxis: { ...commonLayout.yaxis, title: { text: 'Obrat (mld Kč)' } }
            }}
            config={config}
            className="w-full"
          />
        </TabsContent>
      </Tabs>

      {/* Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-green-800 font-semibold mb-1">Hlavní trend</div>
          <div className="text-green-700 text-sm">
            Exponenciální růst od 2019 s accelerací v roce 2024-2025
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-blue-800 font-semibold mb-1">Bod zlomu</div>
          <div className="text-blue-700 text-sm">
            Okamžité platby převážily běžné úhrady v roce 2024
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-purple-800 font-semibold mb-1">Predikce</div>
          <div className="text-purple-700 text-sm">
            Pokračující růst směřuje k 70%+ podílu do konce 2025
          </div>
        </div>
      </div>
    </Card>
  )
}