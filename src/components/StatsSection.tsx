"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Clock, 
  FileCheck, 
  Shield, 
  TrendingUp, 
  Award,
  CheckCircle,
  Zap
} from "lucide-react";
import CountUp from "./CountUp";

interface StatItem {
  number: number;
  label: string;
  description: string;
  icon: React.ReactNode;
  suffix?: string;
  progress?: number;
  badge?: string;
  color: string;
}

const stats: StatItem[] = [
  { 
    number: 500, 
    label: "Declarații procesate", 
    description: "în ultimul an fiscal",
    icon: <FileCheck className="w-8 h-8" />,
    suffix: "+",
    progress: 95,
    badge: "Anual",
    color: "text-[#FFE500]" // Желтый
  },
  { 
    number: 98, 
    label: "Rata de succes", 
    description: "la controalele fiscale",
    icon: <Shield className="w-8 h-8" />,
    suffix: "%",
    progress: 98,
    badge: "Garantat",
    color: "text-gray-900 dark:text-white" // Черный/белый
  },
  { 
    number: 150, 
    label: "Companii active", 
    description: "beneficiază de serviciile noastre",
    icon: <Users className="w-8 h-8" />,
    suffix: "+",
    progress: 85,
    badge: "Creștere",
    color: "text-[#FFE500]" // Желтый
  },
  { 
    number: 2, 
    label: "Ore răspuns", 
    description: "timp mediu de răspuns",
    icon: <Zap className="w-8 h-8" />,
    suffix: "h",
    progress: 90,
    badge: "24/7",
    color: "text-gray-900 dark:text-white" // Черный/белый
  },
  { 
    number: 15, 
    label: "Ani experiență", 
    description: "experiență cumulată a echipei",
    icon: <Award className="w-8 h-8" />,
    suffix: "+",
    progress: 100,
    badge: "Expert",
    color: "text-[#FFE500]" // Желтый
  },
  { 
    number: 100, 
    label: "Conformitate", 
    description: "cu legislația în vigoare",
    icon: <CheckCircle className="w-8 h-8" />,
    suffix: "%",
    progress: 100,
    badge: "Certificat",
    color: "text-gray-900 dark:text-white" // Черный/белый
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setStartAnimation(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section id="stats" className="py-24 bg-white dark:bg-black">
      <div className="w-full max-w-[1400px] mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4 text-sm font-medium">
            Rezultate măsurabile
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Cifre care vorbesc
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Performanțele noastre demonstrează angajamentul față de excelența în serviciile fiscale
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 bg-white dark:bg-gray-900/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  {/* Badge */}
                   <div className="flex items-center justify-between mb-6">
                     <Badge 
                       variant="secondary" 
                       className="text-xs font-semibold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                     >
                       {stat.badge}
                     </Badge>
                     <div className={`${stat.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>
                       {stat.icon}
                     </div>
                   </div>

                  {/* Main Number */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-5xl md:text-6xl font-bold ${stat.color} group-hover:scale-105 transition-transform duration-300 inline-block`}>
                        <CountUp
                          to={stat.number}
                          from={0}
                          duration={2.8}
                          delay={startAnimation ? index * 0.2 : 0}
                          startWhen={startAnimation}
                        />
                      </span>
                      {stat.suffix && (
                        <span className={`text-2xl font-semibold ${stat.color} opacity-80`}>
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Label and Description */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                      {stat.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  {stat.progress && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Performanță
                        </span>
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                          {stat.progress}%
                        </span>
                      </div>
                      <Progress 
                        value={startAnimation ? stat.progress : 0} 
                        className="h-2 bg-gray-200 dark:bg-gray-700"
                      />
                    </div>
                  )}

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/50 dark:to-gray-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"></div>
                  
                  {/* Top Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFE500] via-[#FFE500] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-lg"></div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Statistici actualizate în timp real • Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}