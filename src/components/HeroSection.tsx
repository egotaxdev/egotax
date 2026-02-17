"use client";

import LightRays from "./LightRays";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SplittingText } from "@/components/ui/shadcn-io/splitting-text";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import CostCalculatorDrawer from "@/components/CostCalculatorDrawer";
import OCRequestForm from "@/components/OCRequestForm";
import { Calculator } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isOCFormOpen, setIsOCFormOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <section className="relative min-h-screen lg:min-h-[600px] lg:h-[100vh] lg:max-h-[900px] bg-white dark:bg-[#1e1e1e] flex items-center justify-center pt-28 lg:pt-24 pb-8 lg:pb-0">
      <div className="w-full max-w-[1280px] mx-auto px-4 h-full relative z-10">
        {/* Mobile Layout */}
        <div className="flex flex-col gap-6 lg:hidden">
          {/* Hero Image - Mobile (показываем сверху) */}
          <div className="relative w-screen h-[280px] sm:h-[350px] -mx-4 overflow-hidden">
            <Image
              src="/hero-image.jpg"
              alt="Egotax Office"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Text Content - Mobile */}
          <div className="flex flex-col">
            <h1 className="text-[3.25rem] sm:text-[4rem] font-bold text-gray-900 dark:text-white mb-1 uppercase leading-[1.1]">
              EGO TAX CONSULTING
            </h1>
            <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-[0.15em]">
              Servicii de evidență contabilă
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              La EGO TAX suntem mai mult decât devoratori de numere. Noi suntem partenerii dvs de încredere în domeniul financiar-contabil.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setIsOCFormOpen(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-[#FFB343] via-[#FFC56D] to-[#FFB343] hover:from-[#FFC56D] hover:via-[#FFB343] hover:to-[#FFC56D] text-black font-bold px-6 py-4 rounded-xl transition-all duration-500 ease-out uppercase text-sm shadow-lg active:scale-95 border border-gray-200 cursor-pointer w-full">
                <span className="relative z-10 flex items-center justify-center">
                  Contactează-ne
                </span>
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Echipa noastră va lua legătura cu dvs în cel mai scurt timp
              </p>
            </div>
          </div>

          {/* Service Cards - Mobile (вертикальный список) */}
          <div className="flex flex-col gap-3 mt-2">
            <a href="/servicii/servicii-contabile">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 active:scale-[0.98]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#FFB343] rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Servicii evidență contabilă</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Gestionare completă</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </a>

            <a href="/servicii/consultanta-fiscala">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 active:scale-[0.98]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#FFB343] rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Consultanță fiscală</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Expertiză profesională</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </a>

            <a href="/servicii/suport-initiere-afacere">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 active:scale-[0.98]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#FFB343] rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Servicii conexe</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Suport adițional</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-12 grid-rows-6 gap-4 w-full h-full">
          <div className="col-span-7 row-span-5 rounded-lg p-8 flex flex-col justify-center">
            <h1 className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[105px] font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-tight leading-[1.05]">
              <span className="inline-block whitespace-nowrap">
                <SplittingText
                  text="EGO TAX"
                  type="words"
                  inView={true}
                  motionVariants={{
                    initial: { x: 150, opacity: 0 },
                    animate: { x: 0, opacity: 1 },
                    transition: { duration: 0.7, ease: "easeOut" },
                    stagger: 0.1
                  }}
                  delay={300}
                />
              </span>
              {" "}
              <span className="inline-block">
                <SplittingText
                  text="CONSULTING"
                  type="words"
                  inView={true}
                  motionVariants={{
                    initial: { x: 150, opacity: 0 },
                    animate: { x: 0, opacity: 1 },
                    transition: { duration: 0.7, ease: "easeOut" },
                    stagger: 0.1
                  }}
                  delay={300}
                />
              </span>
            </h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
              className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-[0.2em] whitespace-nowrap"
            >
              Servicii de evidență contabilă
            </motion.p>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
              className="text-[18px] text-gray-600 dark:text-gray-300 mb-8 leading-relaxed w-full max-w-[600px]"
            >
              La EGO TAX suntem mai mult decât devoratori de numere. Noi suntem partenerii dvs de încredere în domeniul financiar-contabil.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setIsOCFormOpen(true)}
                    className="group relative overflow-hidden bg-gradient-to-r from-[#FFB343] via-[#FFC56D] to-[#FFB343] hover:from-[#FFC56D] hover:via-[#FFB343] hover:to-[#FFC56D] text-black font-bold px-10 py-5 rounded-2xl transition-all duration-500 ease-out uppercase text-sm md:text-base shadow-lg hover:shadow-2xl hover:shadow-[#FFB343]/30 transform hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0 border border-gray-200 hover:border-gray-300 backdrop-blur-sm cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFB343]/0 via-[#FFB343]/10 to-[#FFB343]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center">
                      Contactează-ne
                    </span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FFB343]/20 to-[#FF9F2E]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Echipa noastră va lua legătura cu dvs în cel mai scurt timp</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          </div>

          {/* Hero Image - Right Side */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="col-start-9 col-span-4 row-span-5 flex items-center justify-center -ml-20"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/hero-image.jpg"
                alt="Egotax Office"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Improved Service Cards Row */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
            className="col-span-12 row-start-6 flex items-center gap-4"
          >
            {/* Servicii Evidenta Contabilă Card */}
            <a href="/servicii/servicii-contabile" className="flex-1">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-gray-200 hover:border-gray-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#FFB343] hover:bg-[#FFC56D] dark:bg-[#FFB343] rounded-lg flex items-center justify-center group-hover:bg-[#FFC56D] dark:group-hover:bg-[#FFC56D] transition-colors">
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Servicii evidență contabilă</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Gestionare completă</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </a>

            {/* Consultanță Fiscală Card */}
            <a href="/servicii/consultanta-fiscala" className="flex-1">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-gray-200 hover:border-gray-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#FFB343] hover:bg-[#FFC56D] dark:bg-[#FFB343] rounded-lg flex items-center justify-center group-hover:bg-[#FFC56D] dark:group-hover:bg-[#FFC56D] transition-colors">
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Consultanță fiscală</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Expertiză profesională</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </a>

            {/* Servicii Conexe Card */}
            <a href="/servicii/suport-initiere-afacere" className="flex-1">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-gray-200 hover:border-gray-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#FFB343] hover:bg-[#FFC56D] dark:bg-[#FFB343] rounded-lg flex items-center justify-center group-hover:bg-[#FFC56D] dark:group-hover:bg-[#FFC56D] transition-colors">
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Servicii conexe</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Suport adițional</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </a>
          </motion.div>
        </div>

        {/* Drawer instance for calculator */}
        <CostCalculatorDrawer open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen} />

        {/* OC Request Form */}
        <OCRequestForm open={isOCFormOpen} onOpenChange={setIsOCFormOpen} />
      </div>
    </section>
  );
}