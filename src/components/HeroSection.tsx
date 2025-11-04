"use client";

import LightRays from "./LightRays";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BackgroundChart from "./BackgroundChart";
import { SplittingText } from "@/components/ui/shadcn-io/splitting-text";

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] h-[100vh] max-h-[900px] bg-white dark:bg-black flex items-center justify-center pt-24">
      {/* Background Chart */}
      <BackgroundChart />
      
      <div className="w-full max-w-[1280px] mx-auto px-4 h-full relative z-10">
        <div className="grid grid-cols-12 grid-rows-6 gap-4 w-full h-full">
          <div className="col-span-8 row-span-5 rounded-lg p-8 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-6 uppercase">
              <div className="flex flex-col">
                <SplittingText 
                  text="Externalizare"
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
                <SplittingText 
                  text="Contabilitate"
                  type="chars"
                  inView={true}
                  motionVariants={{
                    initial: { x: 150, opacity: 0 },
                    animate: { x: 0, opacity: 1 },
                    transition: { duration: 0.7, ease: "easeOut" },
                    stagger: 0.05
                  }}
                  delay={800}
                />
              </div>
            </h1>
            <p className="text-[18px] text-gray-600 dark:text-gray-300 mb-8 leading-relaxed w-3/5">
              Vă eliberăm de cerințele fiscului, blocarea conturilor și debiteri neclare, mergem cu voi la FISC.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="group relative overflow-hidden bg-gradient-to-r from-[#ffe502] via-[#ffed33] to-[#ffe502] hover:from-[#ffed33] hover:via-[#ffe502] hover:to-[#ffed33] text-black font-bold px-10 py-5 rounded-2xl transition-all duration-500 ease-out uppercase text-sm md:text-base shadow-lg hover:shadow-2xl hover:shadow-yellow-400/30 transform hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0 border border-gray-200 hover:border-gray-300 backdrop-blur-sm cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                      </svg>
                      Obțineți un OC personalizat
                    </span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Oferta Comerciala pentru sarcinile și afacerea dumneavoastră</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="col-start-9 col-span-4 row-span-5 rounded-lg overflow-hidden">
            <img 
              src="/bg.png" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Improved Service Cards Row */}
          <div className="col-span-8 row-start-6 flex items-center gap-4">
            {/* Servicii Complete Card */}
            <Card className="flex-1 group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-gray-200 hover:border-gray-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#FFE500] hover:bg-[#FFED33] dark:bg-[#FFE500] rounded-lg flex items-center justify-center group-hover:bg-[#FFED33] dark:group-hover:bg-[#FFED33] transition-colors">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.12 0 4.07.74 5.61 1.98" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Servicii complete</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Toate serviciile contabile</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </CardContent>
            </Card>

            {/* Support 24/7 Card */}
            <Card className="flex-1 group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-gray-200 hover:border-gray-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#FFE500] hover:bg-[#FFED33] dark:bg-[#FFE500] rounded-lg flex items-center justify-center group-hover:bg-[#FFED33] dark:group-hover:bg-[#FFED33] transition-colors">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Suport 24/7</h3>
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                        Online
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Asistență permanentă</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calculator Card */}
          <Card className="col-start-9 col-span-4 row-start-6 group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-gray-200 hover:border-gray-300">
            <CardContent className="p-4 h-full flex items-center justify-center">
              <div className="flex items-center gap-3 w-full">
                <div className="flex-shrink-0 w-10 h-10 bg-[#FFE500] hover:bg-[#FFED33] dark:bg-[#FFE500] rounded-lg flex items-center justify-center group-hover:bg-[#FFED33] dark:group-hover:bg-[#FFED33] transition-colors">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <rect x="4" y="3" width="16" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="7" x2="8" y2="7" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="11" x2="8" y2="11" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="15" x2="8" y2="15" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Calculator preț</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Calculează costurile</p>
                </div>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}