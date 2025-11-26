'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CostCalculator from '@/components/CostCalculator';
import { CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const benefits = [
  'Calcul instant și transparent',
  'Prețuri personalizate pentru afacerea ta',
  'Fără costuri ascunse',
  'Consultație gratuită inclusă',
];

export default function CalculatorPage() {
  const [isMobile, setIsMobile] = useState(true);

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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: isMobile ? {} : {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-28 lg:pt-32 pb-6 lg:pb-12 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center"
        >
          <motion.div variants={itemVariants}>
            <Badge className="mb-3 lg:mb-4 text-xs lg:text-sm bg-[#FFB343] text-black hover:bg-[#FFC56D]">
              Calculator online
            </Badge>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-3 lg:mb-6"
          >
            Calculați costul
            <span className="text-[#FFB343] block">serviciilor contabile</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-sm lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 lg:mb-8"
          >
            Aflați în câteva secunde cât costă serviciile de contabilitate
            pentru afacerea dumneavoastră. Calculul este orientativ și personalizat.
          </motion.p>

          {/* Benefits - horizontal scroll on mobile */}
          <motion.div
            variants={itemVariants}
            className="hidden sm:flex flex-wrap justify-center gap-4 mb-8"
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="w-4 h-4 text-[#FFB343] shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* Mobile: compact benefits */}
          <motion.div
            variants={itemVariants}
            className="sm:hidden -mx-4 px-4 mb-4"
          >
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1.5 whitespace-nowrap snap-start flex-shrink-0"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#FFB343] shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Calculator Section */}
      <section className="pb-8 lg:pb-16 px-4 max-w-7xl mx-auto">
        <CostCalculator />
      </section>

      {/* How it works */}
      <section className="py-8 lg:py-16 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-6 lg:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 lg:mb-4">
              Cum funcționează?
            </h2>
            <p className="text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto">
              Trei pași simpli pentru a afla costul serviciilor contabile
            </p>
          </motion.div>

          {/* Mobile: horizontal scroll */}
          <div className="lg:hidden -mx-4 px-4">
            <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {[
                {
                  step: '01',
                  title: 'Completați datele',
                  description: 'Introduceți informațiile despre afacerea dumneavoastră.'
                },
                {
                  step: '02',
                  title: 'Obțineți estimarea',
                  description: 'Calculatorul oferă o estimare instantă a costului lunar.'
                },
                {
                  step: '03',
                  title: 'Contactați-ne',
                  description: 'Pentru o ofertă personalizată și detaliată.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex-shrink-0 w-[260px] snap-start"
                >
                  <Card className="p-4 h-full border active:scale-[0.98] transition-transform">
                    <div className="text-3xl font-bold text-[#FFB343]/30 mb-2">
                      {item.step}
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden lg:grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Completați datele',
                description: 'Introduceți informațiile despre afacerea dumneavoastră: forma juridică, tipul de activitate, numărul de angajați și alte detalii relevante.'
              },
              {
                step: '02',
                title: 'Obțineți estimarea',
                description: 'Calculatorul nostru analizează datele și vă oferă o estimare instantă a costului lunar pentru serviciile contabile.'
              },
              {
                step: '03',
                title: 'Contactați-ne',
                description: 'Pentru o ofertă personalizată și detaliată, contactați-ne. Prima consultație este gratuită și fără obligații.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Card className="p-6 h-full border-2 hover:border-[#FFB343]/50 transition-colors duration-300">
                  <div className="text-5xl font-bold text-[#FFB343]/20 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ mini section */}
      <section className="py-8 lg:py-16 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-6 lg:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 lg:mb-4">
              Întrebări despre prețuri
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-6 max-w-4xl mx-auto">
            {[
              {
                question: 'Costul calculat este final?',
                answer: 'Costul din calculator este orientativ. Prețul final se stabilește după analiza detaliată a nevoilor dumneavoastră în cadrul consultației gratuite.'
              },
              {
                question: 'Ce este inclus în preț?',
                answer: 'Prețul include ținerea evidenței contabile, raportarea către autoritățile fiscale, consultații curente și suport permanent din partea contabilului dedicat.'
              },
              {
                question: 'Există costuri suplimentare?',
                answer: 'Toate costurile sunt transparente. Serviciile suplimentare (audit, restabilire evidență, etc.) sunt comunicate și agreate separat.'
              },
              {
                question: 'Cum se face plata?',
                answer: 'Acceptăm plata lunară prin transfer bancar sau card. Emitem factură fiscală pentru toate serviciile prestate.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Card className="p-4 lg:p-6 h-full">
                  <h3 className="text-sm lg:text-lg font-semibold text-foreground mb-1 lg:mb-2">
                    {item.question}
                  </h3>
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    {item.answer}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-8 lg:py-16 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <Card className="p-6 lg:p-12 bg-gradient-to-r from-[#FFB343] via-[#FFC56D] to-[#FFB343] text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2 lg:mb-4">
              Doriți o ofertă personalizată?
            </h2>
            <p className="text-black/80 text-sm lg:text-lg mb-4 lg:mb-8 max-w-2xl mx-auto">
              Contactați-ne pentru o consultație gratuită. Analizăm situația dumneavoastră
              și oferim cea mai bună soluție pentru afacerea dumneavoastră.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-black text-white hover:bg-black/90 h-11 lg:h-12 text-sm lg:text-base active:scale-[0.98]"
                >
                  <MessageCircle className="mr-2 w-4 h-4" />
                  Solicită ofertă
                </Button>
              </Link>
              <Link href="tel:+37361142323" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-black text-black hover:bg-black/10 h-11 lg:h-12 text-sm lg:text-base active:scale-[0.98]"
                >
                  <Phone className="mr-2 w-4 h-4" />
                  +(373) 61 142 323
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
