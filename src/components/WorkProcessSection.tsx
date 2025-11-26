"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  FileText,
  Calculator,
  CheckCircle,
  Headphones
} from "lucide-react";
import OCRequestForm from "@/components/OCRequestForm";

const processSteps = [
  {
    step: "01",
    title: "Consultația inițială",
    description: "Discutăm despre afacerea dumneavoastră, analizăm nevoile specifice și stabilim strategia de colaborare optimă.",
    icon: MessageCircle,
    color: "bg-[#FFB343] text-black"
  },
  {
    step: "02", 
    title: "Colectarea documentelor",
    description: "Preluăm toate documentele necesare și organizăm sistemul de evidență contabilă conform cerințelor legale.",
    icon: FileText,
    color: "bg-[#FFB343] text-black"
  },
  {
    step: "03",
    title: "Procesarea și calculele",
    description: "Efectuăm toate calculele fiscale, întocmim rapoartele și ne asigurăm că totul este conform legislației în vigoare.",
    icon: Calculator,
    color: "bg-[#FFB343] text-black"
  },
  {
    step: "04",
    title: "Depunerea rapoartelor",
    description: "Depunem la timp toate rapoartele fiscale și documentele necesare la organele competente.",
    icon: CheckCircle,
    color: "bg-[#FFB343] text-black"
  },
  {
    step: "05",
    title: "Suport continuu",
    description: "Oferim consultanță permanentă și răspundem la toate întrebările dumneavoastră pe parcursul colaborării.",
    icon: Headphones,
    color: "bg-[#FFB343] text-black"
  }
];

export default function WorkProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [isMobile, setIsMobile] = useState(true);
  const [isOCFormOpen, setIsOCFormOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: isMobile ? { opacity: 1 } : { opacity: 0 },
    visible: {
      opacity: 1,
      transition: isMobile ? {} : {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: isMobile ? {} : {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut" as const,
        delay: 0.3
      }
    }
  };

  return (
    <section ref={ref} className="py-12 lg:py-20 px-4 bg-white dark:bg-[#1e1e1e]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-10 lg:mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4"
          >
            Procesul nostru de lucru
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Dacă sunteți o întreprindere mică sau mijlocie, în căutarea optimizării
            procesului de evidență contabilă și administrare fiscală, suntem aici să vă ghidăm la fiecare pas.
          </motion.p>
        </motion.div>

        {/* Mobile Layout - простой вертикальный список */}
        <div className="lg:hidden">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="space-y-4"
          >
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  variants={itemVariants}
                >
                  <Card className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              variant="outline"
                              className="text-xs font-bold px-2 py-0.5 bg-[#FFB343] text-black border-[#FFB343]"
                            >
                              {step.step}
                            </Badge>
                            <h3 className="text-base font-bold text-gray-900 dark:text-white">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Desktop Layout - Timeline */}
        <div className="relative hidden lg:block">
          {/* Timeline line */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={lineVariants}
            className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFB343] via-[#FFC56D] to-[#FFB343] origin-top"
            style={{ transformOrigin: "top" }}
          />

          {/* Process steps */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="space-y-12"
          >
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.step}
                  variants={itemVariants}
                  className={`relative flex items-center ${
                    isEven
                      ? 'flex-row text-left'
                      : 'flex-row-reverse text-right'
                  }`}
                >
                  {/* Content card */}
                  <div className={`w-5/12 ${isEven ? 'pr-12' : 'pl-12'}`}>
                    <Card className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <CardHeader className="pb-4">
                        <div className={`flex items-center gap-3 ${isEven ? 'justify-start' : 'justify-end'}`}>
                          <Badge
                            variant="outline"
                            className="text-lg font-bold px-3 py-1 bg-[#FFB343] text-black border-[#FFB343]"
                          >
                            {step.step}
                          </Badge>
                          <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                            {step.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                          {step.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline icon */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800`}
                    >
                      <Icon className="w-8 h-8" />
                    </motion.div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="w-5/12" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="text-center mt-10 lg:mt-16"
        >
          <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-4 lg:mb-6">
            Gata să începem colaborarea?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOCFormOpen(true)}
            className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-[#FFB343] via-[#FFC56D] to-[#FFB343] hover:from-[#FFC56D] hover:via-[#FFB343] hover:to-[#FFC56D] text-black font-bold px-6 lg:px-8 py-4 rounded-xl lg:rounded-2xl transition-all duration-500 ease-out uppercase text-sm shadow-lg hover:shadow-2xl hover:shadow-[#FFB343]/30 transform hover:-translate-y-1 active:scale-95 active:translate-y-0 border border-gray-200 hover:border-gray-300 backdrop-blur-sm cursor-pointer"
          >
            <span className="relative z-10">Contactează-ne acum</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          </motion.button>
        </motion.div>

        {/* OC Request Form */}
        <OCRequestForm open={isOCFormOpen} onOpenChange={setIsOCFormOpen} />
      </div>
    </section>
  );
}