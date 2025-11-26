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
import { ArrowRight, HelpCircle, FileText, Calculator, Shield, Clock, Users } from 'lucide-react';
import Link from 'next/link';

const faqCategories = [
  {
    id: 'general',
    title: 'Întrebări generale',
    icon: HelpCircle,
    questions: [
      {
        id: 'general-1',
        question: 'Ce servicii oferă EgoTax?',
        answer: 'EgoTax oferă o gamă completă de servicii contabile și fiscale: evidență contabilă, consultanță fiscală, restabilirea evidenței contabile, analiză și diagnostic financiar, precum și suport în inițierea afacerii. Fiecare serviciu este personalizat în funcție de nevoile specifice ale clientului.'
      },
      {
        id: 'general-2',
        question: 'Cum pot deveni client EgoTax?',
        answer: 'Procesul este simplu: contactați-ne telefonic sau prin formularul de contact, programați o consultație gratuită în care analizăm nevoile dumneavoastră, primiti o ofertă personalizată, iar după acceptare începem colaborarea. Întregul proces poate fi finalizat în 1-2 zile lucrătoare.'
      },
      {
        id: 'general-3',
        question: 'Lucrați cu companii din toate domeniile?',
        answer: 'Da, avem experiență în diverse industrii: comerț, servicii, IT, construcții, producție, HoReCa, transport și multe altele. Cunoaștem specificul fiscal al fiecărui domeniu și oferim soluții adaptate.'
      },
    ]
  },
  {
    id: 'documente',
    title: 'Documente și declarații',
    icon: FileText,
    questions: [
      {
        id: 'doc-1',
        question: 'Ce documente sunt necesare pentru depunerea declarației fiscale?',
        answer: 'Pentru depunerea declarației sunt necesare: adeverința de venituri, documentele de cheltuieli (chitanțe, contracte), adeverințele de conturi bancare, documentele de proprietate imobiliară și alte bunuri. Lista completă depinde de situația dumneavoastră - vă ajutăm să determinăm documentele necesare individual.'
      },
      {
        id: 'doc-2',
        question: 'Până când trebuie depusă declarația?',
        answer: 'Declarația pentru anul 2025 trebuie depusă până la 31 martie 2026. Dacă ați obținut venituri de la care nu s-a reținut impozitul sau doriți să obțineți deduceri fiscale - nu întârziați cu depunerea. Vă ajutăm să pregătiți toate documentele la timp.'
      },
      {
        id: 'doc-3',
        question: 'Cum transmit documentele contabile?',
        answer: 'Puteți transmite documentele prin email, prin platforma noastră online sau le putem prelua personal. Acceptăm atât documente în format fizic, cât și digital. Pentru comoditate, recomandăm digitalizarea documentelor.'
      },
      {
        id: 'doc-4',
        question: 'Pot obține deduceri fiscale pentru anii trecuți?',
        answer: 'Da, puteți depune declarații și obține deduceri pentru ultimii 3 ani. De exemplu, în 2026 puteți obține deduceri pentru 2023, 2024 și 2025. Aceasta se referă la deducerile imobiliare, sociale și de investiții.'
      },
    ]
  },
  {
    id: 'costuri',
    title: 'Costuri și plăți',
    icon: Calculator,
    questions: [
      {
        id: 'cost-1',
        question: 'Cât costă serviciile de contabilitate?',
        answer: 'Costul depinde de complexitatea afacerii, volumul de tranzacții și serviciile necesare. Oferim pachete personalizate începând de la 3000 MDL/lună pentru afaceri mici. Contactați-ne pentru o ofertă personalizată.'
      },
      {
        id: 'cost-2',
        question: 'Consultația inițială este gratuită?',
        answer: 'Da, prima consultație este întotdeauna gratuită. În cadrul acesteia analizăm situația dumneavoastră, identificăm nevoile și propunem soluții optime. Nu există nicio obligație de a continua colaborarea.'
      },
      {
        id: 'cost-3',
        question: 'Ce metode de plată acceptați?',
        answer: 'Acceptăm plăți prin transfer bancar, card bancar și numerar. Emitem factură fiscală pentru toate serviciile prestate. Oferim și posibilitatea plății în rate pentru proiecte mai ample.'
      },
      {
        id: 'cost-4',
        question: 'Există costuri ascunse?',
        answer: 'Nu, toate costurile sunt transparente și comunicate din start. Oferta pe care o primiți include toate serviciile convenite. Orice serviciu suplimentar este discutat și agreat în prealabil.'
      },
    ]
  },
  {
    id: 'termene',
    title: 'Termene și sancțiuni',
    icon: Clock,
    questions: [
      {
        id: 'term-1',
        question: 'Ce se întâmplă dacă nu depun declarația la timp?',
        answer: 'Pentru depunerea întârziată a declarației este prevăzută o amendă de la 1000 lei. Dacă există impozit de plătit, se calculează în plus penalități pentru fiecare zi de întârziere. Mai bine să nu riscați - contactați-ne și vă ajutăm să aranjați totul corect și la timp.'
      },
      {
        id: 'term-2',
        question: 'Cât de repede pot obține deducerea fiscală?',
        answer: 'Procedura standard durează până la 4 luni: 3 luni pentru verificarea camerală și 1 lună pentru returnarea banilor. Vă ajutăm să pregătiți toate documentele corect din prima încercare, pentru a evita solicitări suplimentare și a accelera procesul.'
      },
      {
        id: 'term-3',
        question: 'Care sunt termenele pentru raportările lunare?',
        answer: 'Declarațiile TVA se depun până pe data de 25 a lunii următoare. Dările de seamă privind salariile - până pe data de 25. Rapoartele statistice au termene variabile. Monitorizăm toate termenele și vă notificăm din timp.'
      },
    ]
  },
  {
    id: 'controale',
    title: 'Controale fiscale',
    icon: Shield,
    questions: [
      {
        id: 'control-1',
        question: 'Ajutați la controalele fiscale?',
        answer: 'Da, oferim asistență completă în timpul controalelor fiscale: pregătirea documentelor, reprezentare în fața inspectorilor fiscali, contestarea eventualelor decizii nefavorabile și consultanță post-control pentru evitarea problemelor viitoare.'
      },
      {
        id: 'control-2',
        question: 'Cum mă pot pregăti pentru un control fiscal?',
        answer: 'Vă recomandăm să aveți toate documentele în ordine, să verificați concordanța între declarații și evidența contabilă, să pregătiți explicații pentru tranzacțiile atipice. Oferim servicii de audit preventiv care identifică și corectează problemele înainte de control.'
      },
      {
        id: 'control-3',
        question: 'Ce fac dacă am primit o amendă fiscală?',
        answer: 'Analizăm legalitatea amenzii și posibilitățile de contestare. Dacă amenda este justificată, vă ajutăm să o achitați corect și să evitați situații similare. Dacă există motive de contestare, pregătim documentația necesară.'
      },
    ]
  },
  {
    id: 'colaborare',
    title: 'Colaborare',
    icon: Users,
    questions: [
      {
        id: 'colab-1',
        question: 'Cum comunicăm pe parcursul colaborării?',
        answer: 'Comunicăm prin canalele preferate de dumneavoastră: telefon, email, WhatsApp, Viber sau Telegram. Aveți acces direct la contabilul responsabil de dosarul dumneavoastră. Organizăm întâlniri regulate pentru a discuta situația financiară.'
      },
      {
        id: 'colab-2',
        question: 'Pot schimba pachetul de servicii pe parcurs?',
        answer: 'Da, pachetele sunt flexibile și pot fi ajustate în funcție de evoluția afacerii dumneavoastră. Upgrade-ul sau downgrade-ul se face simplu, fără penalități sau formalități complicate.'
      },
      {
        id: 'colab-3',
        question: 'Ce garanții oferiți pentru calitatea serviciilor?',
        answer: 'Garantăm acuratețea calculelor și respectarea termenelor legale. În cazul unor erori din partea noastră, acoperim eventualele penalități. Avem asigurare de răspundere profesională pentru protecția suplimentară a clienților.'
      },
    ]
  },
];

export default function FAQPage() {
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
            Găsiți răspunsuri la cele mai comune întrebări despre contabilitate,
            fiscalitate și serviciile EgoTax
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
          {faqCategories.map((category, categoryIndex) => {
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
