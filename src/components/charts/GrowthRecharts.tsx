'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area
} from 'recharts'

interface ParsedData {
  date: Date
  instant_payments: number
  regular_payments: number
  share_percent: number
  turnover: number
}

interface ChartDataPoint {
  date: string
  dateFormatted: string
  instant_payments: number
  regular_payments: number
  share_percent: number
  turnover: number
  instant_payments_log?: number
}

export function GrowthChartRecharts() {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/monthly_cleaned.csv')
      .then(res => res.text())
      .then(csvText => {
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

        const filteredData = parsedData
          .filter(d => d.date >= new Date('2018-01-01'))
          .sort((a, b) => a.date.getTime() - b.date.getTime())

        const formattedChartData: ChartDataPoint[] = filteredData.map(d => ({
          date: d.date.toISOString().split('T')[0],
          dateFormatted: d.date.toLocaleDateString('cs-CZ', { year: 'numeric', month: 'short' }),
          instant_payments: Math.round(d.instant_payments),
          regular_payments: Math.round(d.regular_payments),
          share_percent: Math.round(d.share_percent * 10) / 10,
          turnover: Math.round(d.turnover * 10) / 10,
          instant_payments_log: d.instant_payments > 0 ? d.instant_payments : undefined
        }))

        setChartData(formattedChartData)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading CSV:', err)
        setLoading(false)
      })
  }, [])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload
      if (!data) return null

      return (
        <div className="p-3 bg-white shadow-lg rounded-lg border text-sm">
          <p className="font-medium mb-2">{data.dateFormatted}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center gap-2 mb-1">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground min-w-0 flex-1">
                {entry.name}:
              </span>
              <span className="font-medium">
                {entry.name.includes('Podíl') 
                  ? `${entry.value}%`
                  : entry.name.includes('Obrat')
                  ? `${entry.value} mld Kč`
                  : `${entry.value?.toLocaleString('cs-CZ')}`
                }
              </span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  const LogTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload
      if (!data) return null

      return (
        <div className="p-3 bg-white shadow-lg rounded-lg border text-sm">
          <p className="font-medium mb-2">{data.dateFormatted}</p>
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: payload[0].color }}
            />
            <span className="text-muted-foreground">
              Okamžité platby:
            </span>
            <span className="font-medium">
              {payload[0].value?.toLocaleString('cs-CZ')}
            </span>
          </div>
        </div>
      )
    }
    return null
  }

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
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="dateFormatted"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.toLocaleString('cs-CZ')}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="regular_payments"
                  stroke="#64748b"
                  strokeWidth={2}
                  name="Běžné úhrady"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="instant_payments"
                  stroke="#1d4ed8"
                  strokeWidth={3}
                  name="Okamžité platby"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="share" className="mt-4 md:mt-6">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="dateFormatted"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 'dataMax + 5']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="share_percent"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.3}
                  strokeWidth={3}
                  name="Podíl okamžitých plateb"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="log" className="mt-4 md:mt-6">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="dateFormatted"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  scale="log"
                  domain={['dataMin', 'dataMax']}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.toLocaleString('cs-CZ')}
                />
                <Tooltip content={<LogTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="instant_payments_log"
                  stroke="#1e40af"
                  strokeWidth={3}
                  name="Okamžité platby (log škála)"
                  dot={{ r: 2 }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="turnover" className="mt-4 md:mt-6">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="dateFormatted"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value} mld`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="turnover"
                  stroke="#1e3a8a"
                  fill="#1e3a8a"
                  fillOpacity={0.2}
                  strokeWidth={2}
                  name="Denní obrat (mld Kč)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>

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