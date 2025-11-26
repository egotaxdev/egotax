'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, CheckCircle2, FileText, Building, Users, Briefcase, ArrowRight, Phone, ClipboardCheck, BookOpen, Award, Sparkles } from 'lucide-react';
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

export default function SuportInitiereAfacerePage() {
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
      icon: ClipboardCheck,
      title: 'Asistență completă',
      description: 'Vă ghidăm pas cu pas prin tot procesul de înregistrare'
    },
    {
      icon: BookOpen,
      title: 'Expertiză locală',
      description: 'Cunoaștem perfect legislația și procedurile din Moldova'
    },
    {
      icon: Award,
      title: 'Economie de timp',
      description: 'Evitați birocrația și greșelile costisitoare'
    },
    {
      icon: Sparkles,
      title: 'Start rapid',
      description: 'Începeți activitatea în cel mai scurt timp posibil'
    }
  ];

  const businessTypes = [
    {
      title: 'Întreprinzător Individual (II)',
      description: 'Perfect pentru freelanceri și activități la scară mică',
      features: [
        'Procedură simplificată de înregistrare',
        'Regim fiscal avantajos',
        'Fără capital social necesar',
        'Contabilitate simplificată',
        'Responsabilitate nelimitată'
      ],
      bestFor: 'Freelanceri, consultanți, mici prestatori de servicii'
    },
    {
      title: 'Societate cu Răspundere Limitată (SRL)',
      description: 'Cea mai populară formă pentru afaceri mici și mijlocii',
      features: [
        'Responsabilitate limitată',
        'Capital social minim: 100 lei',
        'Poate avea mai mulți acționari',
        'Credibilitate mai mare',
        'Opțiuni de creștere flexibile'
      ],
      bestFor: 'Afaceri cu planuri de creștere, parteneriate, activități comerciale'
    },
    {
      title: 'Asociație Obștească (AO)',
      description: 'Pentru organizații non-profit și inițiative sociale',
      features: [
        'Scop non-profit',
        'Facilități fiscale',
        'Minim 3 fondatori',
        'Activități sociale/culturale',
        'Finanțare prin granturi'
      ],
      bestFor: 'ONG-uri, organizații caritabile, cluburi, asociații profesionale'
    }
  ];

  const registrationSteps = [
    {
      step: '01',
      title: 'Consultația inițială',
      description: 'Discutăm despre afacerea dvs. și alegem forma juridică optimă',
      duration: '1 zi'
    },
    {
      step: '02',
      title: 'Pregătirea documentelor',
      description: 'Întocmim toate actele necesare pentru înregistrare',
      duration: '1-2 zile'
    },
    {
      step: '03',
      title: 'Înregistrarea oficială',
      description: 'Depunem dosarul la ASP și obținem certificatul de înregistrare',
      duration: '3-5 zile'
    },
    {
      step: '04',
      title: 'Înregistrarea fiscală',
      description: 'Înregistrăm compania la Serviciul Fiscal de Stat',
      duration: '1-2 zile'
    },
    {
      step: '05',
      title: 'Setup complet',
      description: 'Deschidere cont bancar, comandă ștampilă, înregistrări suplimentare',
      duration: '3-5 zile'
    }
  ];

  const documents = {
    individual: [
      'Buletin de identitate (copie)',
      'Cerere de înregistrare',
      'Declarație privind activitatea',
      'Certificat de la Casa Socială (dacă e cazul)',
      'Taxa de stat - 240 lei'
    ],
    srl: [
      'Acte de identitate ale fondatorilor',
      'Statutul societății',
      'Contractul de constituire',
      'Decizia asociatului unic / HCA',
      'Dovada virării capitalului social',
      'Declarație privind activitatea',
      'Taxa de stat - 960 lei'
    ],
    ao: [
      'Acte de identitate ale fondatorilor (minim 3)',
      'Statutul asociației',
      'Procesul-verbal de constituire',
      'Declarație de interes public',
      'Lista fondatorilor',
      'Taxa de stat - 480 lei'
    ]
  };

  const services = {
    basic: [
      'Consultanță privind forma juridică',
      'Verificarea denumirii',
      'Întocmire documente de constituire',
      'Depunere dosare la ASP',
      'Înregistrare la SFS',
      'Obținere certificate',
      'Consultanță fiscală de bază'
    ],
    complete: [
      'Toate serviciile din pachetul de bază',
      'Asistență deschidere cont bancar',
      'Comandă ștampilă oficială',
      'Înregistrare la CNA (dacă e cazul)',
      'Înregistrare la BASS',
      'Obținere licențe/autorizații necesare',
      'Consultanță contabilă primele 3 luni',
      'Setup evidență contabilă',
      'Training pentru administrator',
      'Asistență juridică 30 zile'
    ]
  };

  const commonQuestions = [
    {
      category: 'Alegerea formei juridice',
      question: 'II sau SRL?',
      answer: 'Alegeți II pentru activitate simplă, fără angajați, venituri mici. Alegeți SRL pentru afacere cu creștere planificată, angajați, parteneriate B2B.'
    },
    {
      category: 'Procedura',
      question: 'Cât durează înregistrarea?',
      answer: 'II: 3-5 zile lucrătoare. SRL: 7-10 zile lucrătoare. AO: 10-15 zile lucrătoare.'
    },
    {
      category: 'Costuri',
      question: 'Ce taxe trebuie plătite?',
      answer: 'Taxe de stat pentru înregistrare + costurile serviciilor noastre. Vă oferim estimare completă după consultație.'
    },
    {
      category: 'Capital social',
      question: 'Cât capital trebuie?',
      answer: 'II: fără capital. SRL: minim 100 lei. Recomandăm capital real corespunzător activității planificate.'
    }
  ];

  const checklist = [
    {
      phase: 'Înainte de înregistrare',
      items: [
        'Alegeți forma juridică',
        'Verificați disponibilitatea denumirii',
        'Stabiliți activitățile (CAEM)',
        'Decideți regimul fiscal',
        'Pregătiți actele de identitate'
      ]
    },
    {
      phase: 'După înregistrare',
      items: [
        'Deschideți cont bancar',
        'Comandați ștampila',
        'Înregistrați-vă la BASS',
        'Obțineți autorizațiile necesare',
        'Configurați evidența contabilă',
        'Pregătiți contractele standard'
      ]
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
              <Rocket className="w-4 h-4 mr-2" />
              Start-up Services
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Suport în inițierea afacerii
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Vă ajutăm să porniți afacerea cu toate documentele și procedurile necesare.
              De la idee la prima factură - vă ghidăm la fiecare pas pentru un start de succes
              în lumea antreprenoriatului din Moldova.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => setIsOCFormOpen(true)} className="bg-[#FFB343] hover:bg-[#FF9F2E] text-black">
                <Phone className="w-5 h-5 mr-2" />
                Consultație gratuită
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
              Transformăm procesul complex de înregistrare într-o experiență simplă și rapidă
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

      {/* Business Types Section */}
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
              Forme juridice disponibile
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Alegeți forma potrivită pentru afacerea dumneavoastră
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businessTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Caracteristici:</h4>
                      <ul className="space-y-2">
                        {type.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#FFB343] flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        <strong>Ideal pentru:</strong> {type.bestFor}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Steps Timeline */}
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
              Pașii înregistrării
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Proces transparent de la început până la sfârșit
            </p>
          </motion.div>

          <div className="space-y-6">
            {registrationSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-[#FFB343] text-black rounded-full flex items-center justify-center text-xl font-bold">
                          {item.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </h3>
                          <Badge variant="secondary">{item.duration}</Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents */}
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
              Documente necesare
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Lista completă în funcție de forma juridică
            </p>
          </motion.div>

          <Tabs defaultValue="individual" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="individual">Întreprinzător Individual</TabsTrigger>
              <TabsTrigger value="srl">SRL</TabsTrigger>
              <TabsTrigger value="ao">Asociație</TabsTrigger>
            </TabsList>

            <TabsContent value="individual">
              <Card>
                <CardHeader>
                  <CardTitle>Documente pentru II</CardTitle>
                  <CardDescription>
                    Lista documentelor necesare pentru înregistrarea ca întreprinzător individual
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {documents.individual.map((doc, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-[#FFB343] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{doc}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="srl">
              <Card>
                <CardHeader>
                  <CardTitle>Documente pentru SRL</CardTitle>
                  <CardDescription>
                    Lista documentelor necesare pentru înregistrarea unei SRL
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {documents.srl.map((doc, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-[#FFB343] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{doc}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ao">
              <Card>
                <CardHeader>
                  <CardTitle>Documente pentru Asociație</CardTitle>
                  <CardDescription>
                    Lista documentelor necesare pentru înregistrarea unei asociații obștești
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {documents.ao.map((doc, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-[#FFB343] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{doc}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Services Packages */}
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
              Pachete de servicii
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Alegeți nivelul de asistență potrivit
            </p>
          </motion.div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="basic">Pachet de bază</TabsTrigger>
              <TabsTrigger value="complete">Pachet complet</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Înregistrare de bază</CardTitle>
                  <CardDescription>
                    Servicii esențiale pentru înregistrarea oficială a afacerii
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

            <TabsContent value="complete">
              <Card>
                <CardHeader>
                  <CardTitle>Start complet</CardTitle>
                  <CardDescription>
                    Toate serviciile pentru un start fără griji și suport extins
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {services.complete.map((service, index) => (
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

      {/* Checklist Section */}
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
              Checklist pentru antreprenori
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {checklist.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">{phase.phase}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {phase.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#FFB343] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

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
            {commonQuestions.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>
                  <div className="text-left">
                    <Badge variant="outline" className="mb-2">{item.category}</Badge>
                    <div>{item.question}</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
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
                  Gata să vă lansați afacerea?
                </h2>
                <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
                  Contactați-ne astăzi pentru o consultație gratuită și aflați cum vă putem
                  ajuta să transformați ideea în afacere de succes.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="bg-black text-white hover:bg-gray-800" asChild>
                    <a href="tel:+37361142323">
                      <Phone className="w-5 h-5 mr-2" />
                      +(373) 61 142 323
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="border-black text-black hover:bg-black/10" onClick={() => setIsOCFormOpen(true)}>
                    Începeți acum
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
