'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle2, Calculator, FileCheck, Award, Target, ArrowRight, Phone, Lightbulb, PieChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import OCRequestForm from '@/components/OCRequestForm';

export default function ConsultantaFiscalaContent() {
  const [isMobile, setIsMobile] = useState(true);
  const [isOCFormOpen, setIsOCFormOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const benefits = [
    {
      icon: Calculator,
      title: 'Optimizare fiscală',
      description: 'Identificăm oportunități de gestiune a obligațiilor fiscale.'
    },
    {
      icon: FileCheck,
      title: 'Conformitate deplină',
      description: 'Asigurăm respectarea obligațiilor fiscale în termenele și în condițiile stabilite de legislație.'
    },
    {
      icon: Award,
      title: 'Expertiză recunoscută',
      description: 'Consultanți cu certificări și experiență vastă în domeniu.'
    },
    {
      icon: Target,
      title: 'Soluții personalizate',
      description: 'Abordare bazată pe necesitățile și obiectivele clienților.'
    }
  ];

  const services = {
    ongoing: [
      'Consultanță fiscală curentă',
      'Optimizare regim de impozitare',
      'Consultanță privind TVA',
      'Asistență la controale fiscale',
      'Reprezentare la organele fiscale',
      'Actualizări legislative permanente'
    ],
    strategic: [
      'Toate serviciile de consultanță curentă',
      'Planificare fiscală pe termen mediu și lung',
      'Structurare optimă a tranzacțiilor',
      'Consultanță pentru fuziuni și achiziții',
      'Prețuri de transfer'
    ]
  };

  const consultationAreas = [
    {
      icon: PieChart,
      title: 'TVA, accize și taxe locale',
      topics: ['Regimurile TVA', 'Restituirea TVA', 'TVA la import/export', 'Taxe locale, accize, etc']
    },
    {
      icon: Calculator,
      title: 'Impozit pe profit',
      topics: ['Calcularea profitului fiscal', 'Deduceri fiscale', 'Pierderi fiscale', 'Amortizarea în scopuri fiscale']
    },
    {
      icon: Lightbulb,
      title: 'Contribuții sociale și alte impozite aferente plăților salariale',
      topics: ['Contribuțiile de asigurări sociale de stat obligatorii', 'Asigurarea medicală', 'Impozitul pe venit din salariu']
    },
    {
      icon: Target,
      title: 'Alte subiecte în domeniul fiscal',
      topics: ['Impozitarea la sursa de plată', 'Impozitarea întreprinderilor mici și mijlocii (IMM)', 'IT Park Moldova', 'Facilități fiscale']
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Analiza situației',
      description: 'Evaluăm situația fiscală actuală și identificăm riscurile'
    },
    {
      step: '02',
      title: 'Elaborarea strategiei',
      description: 'Dezvoltăm strategia fiscală optimă pentru afacerea dvs.'
    },
    {
      step: '03',
      title: 'Implementare',
      description: 'Asistăm în implementarea soluțiilor fiscale recomandate'
    },
    {
      step: '04',
      title: 'Monitorizare',
      description: 'Monitorizăm continuu și ajustăm strategia conform schimbărilor'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#1e1e1e]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFB343]/10 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              Servicii B2B
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Consultanță fiscală
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Oferim asistență în gestionarea obligațiilor fiscale, asigurăm conformitatea prin prezentarea declarațiilor fiscale corect și în termenele stabilite de lege; servicii de planificare fiscală, structurare și optimizare fiscală, de reprezentare în fața autorităților fiscale.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => setIsOCFormOpen(true)} className="bg-[#FFB343] hover:bg-[#FF9F2E] text-black">
                <Phone className="w-5 h-5 mr-2" />
                Solicitați consultație gratuită
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Avantajele consultanței fiscale
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Expertiza noastră vă ajută să luați decizii financiare informate și să optimizați obligațiile fiscale
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 bg-[#FFB343] rounded-lg flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-black" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {benefit.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultation Areas Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Domenii de consultanță
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Oferim servicii de consultanță în diverse aspecte fiscale.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {consultationAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <motion.div
                  key={area.title}
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-xl">{area.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {area.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#FFB343] flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Included Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Pachetele noastre de servicii
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Alegeți pachetul potrivit nevoilor dumneavoastră
            </p>
          </motion.div>

          <Tabs defaultValue="ongoing" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="ongoing">Consultanță curentă</TabsTrigger>
              <TabsTrigger value="strategic">Consultanță strategică</TabsTrigger>
            </TabsList>

            <TabsContent value="ongoing">
              <Card>
                <CardHeader>
                  <CardTitle>Consultanță fiscală curentă</CardTitle>
                  <CardDescription>
                    Suport continuu în vederea asigurării conformității cu legislația fiscală.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {services.ongoing.map((service, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#FFB343] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{service}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="strategic">
              <Card>
                <CardHeader>
                  <CardTitle>Consultanță strategică</CardTitle>
                  <CardDescription>
                    Soluții complexe pentru selectarea unei structuri fiscale optime și planificare pe termen lung.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {services.strategic.map((service, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#FFB343] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{service}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Procesul de consultanță
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Metodologie structurată în 4 etape
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FFB343] text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>

                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#FFB343] to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Întrebări frecvente
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Ce este optimizarea fiscală?</AccordionTrigger>
              <AccordionContent>
                Optimizarea fiscală constă în aplicarea corectă a prevederilor legislației fiscale pentru reducerea sarcinii fiscale. Acest lucru se realizează prin intermediul planificării financiare, utilizarea facilităților fiscale disponibile și gestionarea rațională a resurselor aflate la dispoziția entității.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Cât costă o consultație fiscală?</AccordionTrigger>
              <AccordionContent>
                Prima consultație este gratuită. Ulterior, costul serviciilor depinde de complexitatea problemei și de tipul de expertiză solicitat.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Oferiți suport în cadrul controalelor fiscale?</AccordionTrigger>
              <AccordionContent>
                Da, oferim asistență completă în timpul controalelor fiscale: pregătirea documentelor, reprezentare în fața inspectorilor fiscali, analiza rezultatelor controlului, formularea recomandărilor pe viitor.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Ce înseamnă regimul IT Park și cum pot beneficia?</AccordionTrigger>
              <AccordionContent>
                IT Park Moldova este un regim fiscal special pentru companiile IT cu facilități fiscale semnificative: impozit pe venit de 7% în loc de impozit pe profit 12%, scutire de contribuții sociale de la angajator, și alte beneficii pentru angajați. Vă asistăm în evaluarea eligibilității și înregistrarea în Moldova IT Park.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Cum țineți pasul cu modificările legislative?</AccordionTrigger>
              <AccordionContent>
                Echipa noastră monitorizează zilnic publicațiile oficiale, participă periodic la training-uri și seminare, organizate de instituțiile care activează în acest domeniu. Clienții noștri primesc notificări despre modificările legislative relevante pentru activitatea lor.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-[#FFB343] to-[#FF9F2E] border-0">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Aveți nevoie de consultanță fiscală?
                </h2>
                <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
                  Programați o consultație cu experții noștri pentru o îndrumare specializată în domeniul fiscalității.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="bg-black text-white hover:bg-gray-800" asChild>
                    <a href="tel:+37361142323">
                      <Phone className="w-5 h-5 mr-2" />
                      +(373) 61 142 323
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="border-black text-black hover:bg-black/10" onClick={() => setIsOCFormOpen(true)}>
                    Luați legătura cu noi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <OCRequestForm open={isOCFormOpen} onOpenChange={setIsOCFormOpen} />
    </div>
  );
}
