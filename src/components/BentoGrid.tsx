'use client';

import React from 'react';
import {
  FileText,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { SplittingText } from '@/components/ui/shadcn-io/splitting-text';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    href: '/servicii/servicii-contabile',
    icon: FileText,
    title: 'Evidență contabilă',
  },
  {
    href: '/servicii/consultanta-fiscala',
    icon: TrendingUp,
    title: 'Consultanță fiscală',
  },
  {
    href: '/servicii/analiza-financiara',
    icon: BarChart3,
    title: 'Analiză și diagnostic financiar',
  },
];

const BentoGrid: React.FC = () => {
  const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={gridRef} className="py-12 lg:py-16 px-4 max-w-7xl mx-auto">
      {/* Заголовок секции */}
      <div className="mb-8 lg:mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white uppercase">
          <SplittingText
            text="Servicii"
            type="chars"
            inView={gridInView}
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

      {/* Большое изображение офиса */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="mb-6 lg:mb-8"
      >
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
          <Image
            src="/services-image.jpg"
            alt="EgoTax Office"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Карточки услуг */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={service.href}
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={service.href}>
                <Card className="h-full border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-4 lg:p-6">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FFB343] group-hover:text-black">
                      <IconComponent className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <h3 className="text-sm lg:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-[#FFB343] transition-colors duration-300">
                      {service.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default BentoGrid;
