'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { faqCategories } from '@/data/faq-data';

export default function FAQContent() {
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
      <section className="pt-32 pb-16 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center"
        >
          <motion.div variants={itemVariants}>
            <Badge className="mb-4 bg-[#FFB343] text-black hover:bg-[#FFC56D]">
              Centru de ajutor
            </Badge>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            Întrebări frecvente
            <span className="text-[#FFB343] block">despre serviciile noastre</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Găsiți răspunsuri la cele mai comune întrebări despre contabilitate, fiscalitate și serviciile noastre.
          </motion.p>
        </motion.div>
      </section>

      {/* FAQ Categories */}
      <section className="pb-16 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-12"
        >
          {faqCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
              >
                <Card className="p-8 border-2 hover:border-[#FFB343]/50 transition-colors duration-300">
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#FFB343] rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-black" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {category.title}
                    </h2>
                  </div>

                  {/* Questions */}
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id} className="border-b border-border/50">
                        <AccordionTrigger className="text-left hover:no-underline hover:text-[#FFB343] transition-colors py-4">
                          <span className="text-base font-medium pr-4">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <Card className="p-12 bg-gradient-to-r from-[#FFB343] via-[#FFC56D] to-[#FFB343] text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Nu ați găsit răspunsul?
            </h2>
            <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">
              Echipa noastră este gata să vă ajute cu orice întrebare.
              Contactați-ne pentru o consultație gratuită.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-black/90"
                >
                  Contactați-ne
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="tel:+37361142323">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-black text-black hover:bg-black/10"
                >
                  Sună acum: +(373) 61 142 323
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
