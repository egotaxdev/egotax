'use client';

import React, { useRef, useState } from 'react';
import { ThemeShimmerButton } from '@/components/ui/theme-shimmer-button';
import { ChartRadarGridCircleFill } from './ui/shadcn-io/radar-chart-09';
import { 
  ArrowUpRight, 
  FileText, 
  TrendingUp, 
  RefreshCw, 
  BarChart3, 
  Rocket,
  Calculator
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { SplittingText } from '@/components/ui/shadcn-io/splitting-text';
import { motion } from 'framer-motion';
import CostCalculatorDrawer from '@/components/CostCalculatorDrawer';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

const BentoGrid: React.FC = () => {
  const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: chartRef, inView: chartInView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);

  // Современные варианты анимации в стиле топовых сайтов 2025
  const blockVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <TooltipProvider>
      <section className="py-16 px-4 max-w-7xl mx-auto">
        {/* Заголовок секции */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white uppercase">
            <SplittingText 
              text="Servicii"
              type="chars"
              inView={true}
              motionVariants={{
                initial: { x: 150, opacity: 0 },
                animate: { x: 0, opacity: 1 },
                transition: { duration: 0.7, ease: "easeOut" },
                stagger: 0.05
              }}
              delay={300}
            />
          </h2>
        </div>
      
      <div ref={gridRef} className="grid grid-cols-7 grid-rows-10 gap-4 h-[800px]">
        <motion.div 
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          variants={{
            ...blockVariants,
            visible: {
              ...blockVariants.visible,
              transition: {
                ...blockVariants.visible.transition,
                delay: 0
              }
            }
          }}
          className="col-span-2 row-span-7 rounded-lg border border-gray-200 dark:border-gray-700 relative p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-1 group"
        >
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <FileText className="w-6 h-6" />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-[#FFE500] transition-colors duration-300">
              Servicii de evidență contabilă
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
              Scăpăm de observațiile Fiscului, de blocări și de debitări neclare, precum și de problemele cu fondurile.
            </p>
          </div>
          <div className="space-y-4">
            <ThemeShimmerButton className="flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
              <span>Pentru afaceri mici</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </ThemeShimmerButton>
            <ThemeShimmerButton className="flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
              <span>Pentru afaceri medii</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </ThemeShimmerButton>
          </div>
        </motion.div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div 
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              variants={{
                ...blockVariants,
                visible: {
                  ...blockVariants.visible,
                  transition: {
                    ...blockVariants.visible.transition,
                    delay: 0
                  }
                }
              }}
              className="col-span-3 row-span-6 col-start-3 rounded-lg border border-gray-200 dark:border-gray-700 relative bg-gradient-to-r from-[#ffe502] via-[#ffed33] to-[#ffe502] overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-400/30 hover:-translate-y-1 hover:from-[#ffed33] hover:via-[#ffe502] hover:to-[#ffed33]"
            >
              <div className="flex h-full">
                <div className="flex-1 flex flex-col justify-center pl-6 pr-3">
                  <div className="text-3xl font-bold text-black mb-2">Vă creștem profitul, în mod legal.</div>
                </div>
                <div className="flex-1 flex items-end justify-end">
                  <img 
                    src="/img.png" 
                    alt="Servicii contabile" 
                    className="w-full h-full object-cover object-bottom"
                  />
                </div>
              </div>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Servicii profesionale de contabilitate pentru creșterea profitabilității afacerii dumneavoastră</p>
          </TooltipContent>
        </Tooltip>
        
        <motion.div 
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          variants={{
            ...blockVariants,
            visible: {
              ...blockVariants.visible,
              transition: {
                ...blockVariants.visible.transition,
                delay: 0
              }
            }
          }}
          className="col-span-2 row-span-7 col-start-6 rounded-lg border border-gray-200 dark:border-gray-700 relative p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-1 group"
        >
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-[#FFE500] transition-colors duration-300">
              Consultanță fiscală
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
              Consultanță fiscală eficientă: vă ajutăm să respectați obligațiile legale, optimizăm taxele și vă oferim soluții personalizate pentru afacerea dumneavoastră.
            </p>
          </div>
          <div ref={chartRef} className="flex-1 min-h-0">
            <ChartRadarGridCircleFill isVisible={chartInView} />
          </div>
        </motion.div>
        
        <motion.button 
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          variants={{
            ...blockVariants,
            visible: {
              ...blockVariants.visible,
              transition: {
                ...blockVariants.visible.transition,
                delay: 0
              }
            }
          }}
          className="col-span-3 col-start-3 row-start-7 group relative overflow-hidden bg-gradient-to-r from-[#ffe502] via-[#ffed33] to-[#ffe502] hover:from-[#ffed33] hover:via-[#ffe502] hover:to-[#ffed33] text-black font-bold rounded-lg transition-all duration-500 ease-out uppercase text-sm shadow-lg hover:shadow-2xl hover:shadow-yellow-400/30 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10 flex items-center gap-2">
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            Obțineți un OC personalizat
          </span>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
        </motion.button>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div 
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              variants={{
                ...blockVariants,
                visible: {
                  ...blockVariants.visible,
                  transition: {
                    ...blockVariants.visible.transition,
                    delay: 0
                  }
                }
              }}
              className="col-span-2 row-span-2 row-start-8 rounded-lg border border-gray-200 dark:border-gray-700 relative p-6 cursor-pointer transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-1 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 group"
            >
              <div className="h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-[#FFE500] transition-colors duration-300">
                    Restabilirea evidenței contabile
                  </h3>
                </div>
              </div>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Restabilim evidența contabilă pentru perioade anterioare și corectăm erorile</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div 
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              variants={{
                ...blockVariants,
                visible: {
                  ...blockVariants.visible,
                  transition: {
                    ...blockVariants.visible.transition,
                    delay: 0
                  }
                }
              }}
              className="col-span-2 row-span-2 col-start-3 row-start-8 rounded-lg border border-gray-200 dark:border-gray-700 relative p-6 cursor-pointer transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-1 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 group"
            >
              <div className="h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-[#FFE500] transition-colors duration-300">
                    Analiză și diagnostic financiar
                  </h3>
                </div>
              </div>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Analizăm situația financiară și oferim recomandări pentru optimizare</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div 
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              variants={{
                ...blockVariants,
                visible: {
                  ...blockVariants.visible,
                  transition: {
                    ...blockVariants.visible.transition,
                    delay: 0
                  }
                }
              }}
              className="col-span-2 row-span-2 col-start-5 row-start-8 rounded-lg border border-gray-200 dark:border-gray-700 relative p-6 cursor-pointer transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-1 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 group"
            >
              <div className="h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-[#FFE500] transition-colors duration-300">
                    Suport în inițierea afacerii
                  </h3>
                </div>
              </div>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Vă ajutăm să porniți afacerea cu toate documentele și procedurile necesare</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div 
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              variants={{
                ...blockVariants,
                visible: {
                  ...blockVariants.visible,
                  transition: {
                    ...blockVariants.visible.transition,
                    delay: 0
                  }
                }
              }}
              className="col-span-1 row-span-2 col-start-7 row-start-8 rounded-lg border border-gray-200 dark:border-gray-700 relative p-4 cursor-pointer transition-all duration-300 hover:scale-[1.08] hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-2 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 group"
              onClick={() => setIsCalculatorModalOpen(true)}
            >
              <div className="h-full flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 bg-[#FFE500] text-black rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-yellow-400/30">
                  <Calculator className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center transition-all duration-300 group-hover:text-[#FFE500]">
                  Calculator preț
                </span>
              </div>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Calculați rapid prețul serviciilor noastre în funcție de nevoile dumneavoastră</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      {/* Calculator Modal */}
      <CostCalculatorDrawer 
        open={isCalculatorModalOpen} 
        onOpenChange={setIsCalculatorModalOpen} 
      />
    </section>
    </TooltipProvider>
  );
};

export default BentoGrid;