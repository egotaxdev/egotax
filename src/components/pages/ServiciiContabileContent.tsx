'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, Clock, Shield, TrendingUp, Users, ArrowRight, Phone } from 'lucide-react';
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

export default function ServiciiContabileContent() {
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
      title: 'Conformitate',
      description: 'Asigurăm respectarea cadrului legislativ în domeniul contabilității și fiscalității.'
    },
    {
      icon: Clock,
      title: 'Economie de timp',
      description: 'Externalizarea serviciilor contabile permite să te concentrezi pe dezvoltarea afacerii, minimizând astfel grijile administrative.'
    },
    {
      icon: TrendingUp,
      title: 'Optimizare fiscală',
      description: 'Identificăm oportunități pentru gestionarea eficientă a obligațiilor fiscale.'
    },
    {
      icon: Users,
      title: 'Experți dedicați',
      description: 'Echipă de contabili profesioniști cu experiență vastă'
    }
  ];

  const services = {
    small: [
      'Ținerea evidenței contabile curente',
      'Întocmirea și depunerea rapoartelor fiscale',
      'Gestionarea obligațiilor fiscale',
      'Consultanță fiscală permanentă',
      'Reprezentare în fața organelor fiscale și statistice',
      'Evidența și prelucrarea continuă a documentelor primare'
    ],
    medium: [
      'Toate serviciile incluse în Pachetul pentru afaceri mici',
      'Servicii resurse umane',
      'Analize financiare pentru susținerea deciziilor de management',
      'Optimizarea proceselor contabile și fiscale',
      'Suport și asistență în cadrul auditului',
      'Planificare și control financiar'
    ]
  };

  const process = [
    {
      step: '01',
      title: 'Consultația inițială',
      description: 'Analizăm specificul afacerii dvs. și determinăm necesitățile'
    },
    {
      step: '02',
      title: 'Colectarea documentelor',
      description: 'Primim și organizăm toate documentele financiare necesare'
    },
    {
      step: '03',
      title: 'Procesare și evidență',
      description: 'Efectuăm înregistrările contabile și procesăm documentele'
    },
    {
      step: '04',
      title: 'Raportare și consultanță',
      description: 'Furnizăm rapoarte detaliate și recomandări pentru optimizare'
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
            transition={isMobile ? {} : { duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <FileText className="w-4 h-4 mr-2" />
              Servicii profesionale
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Servicii de evidență contabilă
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Înregistrarea faptelor economice prin prelucrarea necontenită a documentelor primare, respectând principiile contabilității și raportării financiare; întocmirea și prezentarea declarațiilor fiscale în conformitate cu legislația în vigoare.
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
              De ce să alegeți serviciile noastre?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Oferim soluții complete de contabilitate, adaptate nevoilor specifice ale afacerii dumneavoastră
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
              Ce include serviciul?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Pachete personalizate în funcție de dimensiunea afacerii
            </p>
          </motion.div>

          <Tabs defaultValue="small" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="small">Pentru afaceri mici</TabsTrigger>
              <TabsTrigger value="medium">Pentru afaceri medii</TabsTrigger>
            </TabsList>

            <TabsContent value="small">
              <Card>
                <CardHeader>
                  <CardDescription className="text-base">
                    Ideal pentru întreprinderile micro și mici, care au un volum de tranzacții redus
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {services.small.map((service, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#FFB343] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{service}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medium">
              <Card>
                <CardHeader>
                  <CardDescription className="text-base">
                    Soluție completă pentru companii cu activitate complexă și un număr mai mare de angajați
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {services.medium.map((service, index) => (
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
              Cum funcționează?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Proces simplu și transparent în 4 pași
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
              <AccordionTrigger>Cât costă serviciile de contabilitate?</AccordionTrigger>
              <AccordionContent>
                Costul depinde de complexitatea afacerii, volumul de tranzacții și serviciile necesare. Oferim pachete personalizate începând de la 1500 MDL/lună pentru afaceri mici. Contactați-ne pentru a obține o ofertă personalizată.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Cum transmit documentele contabile?</AccordionTrigger>
              <AccordionContent>
                Puteți transmite documentele fizic sau online prin email/utilizând aplicațiile de mesagerie instantă (Telegram, Viber) sau le putem prelua personal.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Cât timp durează procesarea documentelor?</AccordionTrigger>
              <AccordionContent>
                De regulă, documentele sunt procesate în termen de 2-3 zile lucrătoare de la primire. Pentru situații urgente, oferim servicii expres.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Oferiți consultanță în domeniul fiscal?</AccordionTrigger>
              <AccordionContent>
                Da, consultanța este inclusă în toate pachetele noastre de servicii. Echipa noastră este disponibilă pentru a răspunde la întrebări și a oferi recomandări.
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
                  Ai decis să începem colaborarea?
                </h2>
                <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
                  Contactează-ne astăzi pentru o consultație gratuită.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="bg-black text-white hover:bg-gray-800" asChild>
                    <a href="tel:+37361142323">
                      <Phone className="w-5 h-5 mr-2" />
                      +(373) 61 142 323
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="border-black text-black hover:bg-black/10" onClick={() => setIsOCFormOpen(true)}>
                    Trimite mesaj
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
