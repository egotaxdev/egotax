'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, CheckCircle2, AlertTriangle, FileSearch, Clock, Shield, ArrowRight, Phone, History, Database, FileText } from 'lucide-react';
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

export default function RestabilireEvidentiPage() {
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
      icon: Shield,
      title: 'Eliminarea riscurilor',
      description: 'Corectăm erorile și eliminăm riscurile de sancțiuni din partea fiscului'
    },
    {
      icon: Clock,
      title: 'Recuperare rapidă',
      description: 'Restabilim evidența contabilă în termene optime'
    },
    {
      icon: FileSearch,
      title: 'Analiză completă',
      description: 'Efectuăm audit complet al documentelor și tranzacțiilor'
    },
    {
      icon: Database,
      title: 'Organizare optimă',
      description: 'Reorganizăm sistemul contabil pentru funcționare eficientă'
    }
  ];

  const situations = [
    {
      icon: AlertTriangle,
      title: 'Lipsă de evidență',
      description: 'Nu s-a ținut evidența contabilă deloc sau pentru anumite perioade',
      solutions: ['Recreare registre contabile', 'Reconstituire documente primare', 'Întocmire situații financiare']
    },
    {
      icon: FileText,
      title: 'Erori în evidență',
      description: 'Evidența a fost ținută, dar conține erori semnificative',
      solutions: ['Identificare și corectare erori', 'Reconciliere conturi', 'Ajustări retroactive']
    },
    {
      icon: History,
      title: 'Schimbare contabil',
      description: 'Preluare de la alt contabil sau perioadă de tranziție',
      solutions: ['Verificare evidență anterioară', 'Corecție perioade trecute', 'Sincronizare cu prezentul']
    },
    {
      icon: Database,
      title: 'Pierdere date',
      description: 'Date contabile pierdute sau compromise din cauze tehnice',
      solutions: ['Recuperare din arhive', 'Reconstituire din documente', 'Migrare sistem nou']
    }
  ];

  const services = {
    basic: [
      'Analiza situației curente',
      'Identificarea erorilor și lipsurilor',
      'Colectarea documentelor disponibile',
      'Restabilirea registrelor contabile',
      'Întocmirea situațiilor financiare',
      'Reconcilierea cu declarațiile fiscale',
      'Raport final cu recomandări'
    ],
    complex: [
      'Toate serviciile din pachetul de bază',
      'Audit complet al perioadelor anterioare',
      'Reconstituire documente lipsă',
      'Corecție declarații fiscale',
      'Reprezentare la organele fiscale',
      'Negociere penalități și amenzi',
      'Implementare sistem nou de evidență',
      'Training pentru personalul contabil'
    ]
  };

  const process = [
    {
      step: '01',
      title: 'Evaluare inițială',
      description: 'Analizăm situația și stabilim volumul lucrărilor necesare'
    },
    {
      step: '02',
      title: 'Colectare documente',
      description: 'Strângem toate documentele disponibile și identificăm lipsurile'
    },
    {
      step: '03',
      title: 'Restabilire',
      description: 'Corectăm erorile și reconstituim evidența contabilă'
    },
    {
      step: '04',
      title: 'Verificare și predare',
      description: 'Verificăm rezultatele și predăm evidența pusă la punct'
    }
  ];

  const commonProblems = [
    'Lipsă facturi sau documente justificative',
    'Erori în calculul TVA',
    'Diferențe între contabilitate și fiscalitate',
    'Lipsa reconcilierilor bancare',
    'Erori în calculul amortizării',
    'Probleme cu evidența stocurilor',
    'Diferențe neexplicate în conturi',
    'Lipsă documente de închidere a anului'
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
              <RefreshCw className="w-4 h-4 mr-2" />
              Servicii specializate
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Restabilirea evidenței contabile
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Restabilim evidența contabilă pentru perioade anterioare și corectăm erorile.
              Transformăm haosul contabil în ordine perfectă, eliminând riscurile și
              asigurând conformitatea cu legislația fiscală.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => setIsOCFormOpen(true)} className="bg-[#FFB343] hover:bg-[#FF9F2E] text-black">
                <Phone className="w-5 h-5 mr-2" />
                Evaluare gratuită
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
              De ce să alegeți serviciile noastre?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experiență vastă în restabilirea evidenței contabile pentru companii de toate dimensiunile
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

      {/* Situations Section */}
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
              Situații în care putem ajuta
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Indiferent de problemă, avem soluția potrivită
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {situations.map((situation, index) => {
              const IconComponent = situation.icon;
              return (
                <motion.div
                  key={situation.title}
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-xl">{situation.title}</CardTitle>
                      </div>
                      <CardDescription className="text-base mb-4">
                        {situation.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">Soluții:</h4>
                      <ul className="space-y-2">
                        {situation.solutions.map((solution, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#FFB343] flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{solution}</span>
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

      {/* Common Problems */}
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
              Probleme frecvente pe care le rezolvăm
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonProblems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{problem}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Included Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Pachete de servicii
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Alegeți pachetul potrivit complexității situației
            </p>
          </motion.div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="basic">Pachet de bază</TabsTrigger>
              <TabsTrigger value="complex">Pachet complex</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Restabilire de bază</CardTitle>
                  <CardDescription>
                    Pentru situații simple cu erori minore sau perioade scurte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {services.basic.map((service, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#FFB343] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{service}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="complex">
              <Card>
                <CardHeader>
                  <CardTitle>Restabilire complexă</CardTitle>
                  <CardDescription>
                    Pentru situații complexe cu multiple perioade sau probleme majore
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {services.complex.map((service, index) => (
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
              Procesul de restabilire
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Abordare sistematică în 4 etape
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
              <AccordionTrigger>Cât timp durează restabilirea evidenței?</AccordionTrigger>
              <AccordionContent>
                Durata depinde de complexitatea situației și perioada de restabilit.
                Pentru o lună de evidență cu probleme minore - 3-5 zile lucrătoare.
                Pentru perioade mai mari (6-12 luni) sau situații complexe - 2-4 săptămâni.
                După evaluarea inițială, vă vom oferi un termen exact.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Cât costă restabilirea evidenței contabile?</AccordionTrigger>
              <AccordionContent>
                Costul se calculează în funcție de volumul lucrărilor, perioada de restabilit
                și complexitatea problemelor. În medie, restabilirea unei luni costă de la 6000 MDL.
                Oferim evaluare gratuită și estimare exactă a costurilor după analiza inițială.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Ce documente sunt necesare?</AccordionTrigger>
              <AccordionContent>
                Toate documentele disponibile: facturi, contracte, extrase bancare,
                declarații fiscale, NIR-uri, bonuri fiscale, documente de plată salarii, etc.
                Chiar dacă documentația este incompletă, vom lucra cu ce aveți și vă vom
                ajuta să reconstituim lipsurile.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Puteți corecta și declarațiile fiscale?</AccordionTrigger>
              <AccordionContent>
                Da, după restabilirea evidenței, vom verifica și corecta declarațiile fiscale
                dacă este necesar. Vă vom asista în depunerea declarațiilor corective și,
                dacă este cazul, în negocierea cu organele fiscale pentru reducerea sau
                anularea penalităților.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Ce se întâmplă dacă documentele sunt pierdute?</AccordionTrigger>
              <AccordionContent>
                Vom încerca să recuperăm informațiile din alte surse: extrase bancare,
                corespondență email, arhive electronice, duplicate de la parteneri.
                Pentru documentele care nu pot fi recuperate, vom întocmi documente
                justificative conforme cu legislația și vă vom sfătui cum să procedați.
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
                  Aveți probleme cu evidența contabilă?
                </h2>
                <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
                  Contactați-ne pentru o evaluare gratuită. Vă vom ajuta să puneți
                  ordine în contabilitate și să evitați problemele cu fiscul.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="bg-black text-white hover:bg-gray-800" asChild>
                    <a href="tel:+37361142323">
                      <Phone className="w-5 h-5 mr-2" />
                      +(373) 61 142 323
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="border-black text-black hover:bg-black/10" onClick={() => setIsOCFormOpen(true)}>
                    Solicitați evaluare
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
