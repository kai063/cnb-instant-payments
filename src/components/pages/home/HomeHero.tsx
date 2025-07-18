// src/components/pages/home/HomeHero.tsx

'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Zap, Globe, Clock, DollarSign, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
      
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-sm px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Analýza dat ČNB • 2008-2025
            </Badge>
          </motion.div>
          
          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            České okamžité platby:
            <br />
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Od nuly k evropskému lídrovi
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 max-w-3xl mx-auto leading-relaxed"
          >
            Kompletní analýza růstu okamžitých plateb v České republice na základě 
            oficiálních dat České národní banky
          </motion.p>
          
          {/* Key benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <div className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <CheckCircle className="w-4 h-4 text-green-300 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium">Efektivnější</span>
            </div>
            <div className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Clock className="w-4 h-4 text-blue-300 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium">Rychlejší</span>
            </div>
            <div className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <DollarSign className="w-4 h-4 text-yellow-300 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium">Úspornější</span>
            </div>
          </motion.div>
          
          {/* Key numbers */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto"
          >
            <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-blue-200 group-hover:text-blue-100 transition-colors" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-blue-100 transition-colors">40%</div>
              <div className="text-blue-100 text-xs md:text-sm">podíl ze všech plateb (6/2025)</div>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-blue-200 group-hover:text-blue-100 transition-colors" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-blue-100 transition-colors">1.58M</div>
              <div className="text-blue-100 text-xs md:text-sm">okamžitých plateb denně (4/2025)</div>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-center mb-3">
                <Globe className="w-6 h-6 md:w-8 md:h-8 text-blue-200 group-hover:text-blue-100 transition-colors" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-blue-100 transition-colors">700M</div>
              <div className="text-blue-100 text-xs md:text-sm">plateb od startu (3/2024)</div>
            </div>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16"
          >
            <div className="flex flex-col items-center">
              <div className="text-slate-200 text-sm mb-2">Prozkoumej analýzu</div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-white/60 rounded-full mt-2"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}