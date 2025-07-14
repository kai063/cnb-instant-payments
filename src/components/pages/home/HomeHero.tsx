// src/components/pages/home/HomeHero.tsx

'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Zap, Globe } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-slate-700 to-slate-800 text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-800/50 to-transparent" />
      
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
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Od nuly k evropskému lídrovi
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-100 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Kompletní analýza růstu okamžitých plateb v České republice na základě 
            oficiálních dat České národní banky
          </motion.p>
          
          {/* Key numbers */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-yellow-300" />
              </div>
              <div className="text-3xl font-bold mb-2">64%</div>
              <div className="text-slate-100 text-sm">podíl ze všech plateb</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <Zap className="w-8 h-8 text-yellow-300" />
              </div>
              <div className="text-3xl font-bold mb-2">1.6M</div>
              <div className="text-slate-100 text-sm">okamžitých plateb denně</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <Globe className="w-8 h-8 text-yellow-300" />
              </div>
              <div className="text-3xl font-bold mb-2">85,551x</div>
              <div className="text-slate-100 text-sm">růst za 6 let</div>
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