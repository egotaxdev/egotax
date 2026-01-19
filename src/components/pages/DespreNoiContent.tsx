'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import PartnersSection from '@/components/PartnersSection';
import {
  Target,
  Heart,
  Shield,
  Users,
  Award,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Phone
} from 'lucide-react';
import OCRequestForm from '@/components/OCRequestForm';

export default function DespreNoiContent() {
  const [isMobile, setIsMobile] = useState(true);
  const [isOCFormOpen, setIsOCFormOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fadeInUp = {
    hidden: isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const values = [
    {
      icon: Shield,
      title: "Profesionalism",
      description: "Echipa noastră de contabili certificați și consultanți fiscali oferă servicii de cea mai înaltă calitate."
    },
    {
      icon: Heart,
      title: "Dedicare",
      description: "Fiecare client este important pentru noi. Abordăm fiecare caz cu atenție și responsabilitate."
    },
    {
      icon: Users,
      title: "Transparență",
      description: "Comunicăm deschis și clar cu clienții noștri, oferind rapoarte detaliate și consultări regulate."
    },
    {
      icon: Target,
      title: "Rezultate",
      description: "Ne concentrăm pe obiectivele dumneavoastră de afaceri și livrăm rezultate măsurabile."
    }
  ];

  const stats = [
    { number: "7+", label: "Ani de experiență" },
    { number: "500+", label: "Clienți activi" },
    { number: "98%", label: "Satisfacție clienți" },
    { number: "9+", label: "Domenii de activitate" }
  ];

  const whyChooseUs = [
    "Expertiză în legislația fiscală din Moldova",
    "Abordare personalizată pentru fiecare client",
    "Tehnologii moderne de contabilitate",
    "Consultanță fiscală permanentă",
    "Rapoarte detaliate și transparente"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-[#FFB343] text-black hover:bg-[#FFC56D]">
              Despre EgoTax
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Partenerul tău de încredere în{' '}
              <span className="text-[#FFB343]">contabilitate și fiscalitate</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              De peste 7 ani, ajutăm afacerile din Moldova să își gestioneze eficient
              obligațiile fiscale și contabile. Echipa noastră de profesioniști dedicați
              oferă soluții personalizate pentru fiecare client, indiferent de mărimea
              afacerii sau domeniul de activitate.
            </p>
            <Button size="lg" onClick={() => setIsOCFormOpen(true)} className="bg-[#FFB343] text-black hover:bg-[#FFC56D]">
              Contactează-ne
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/team.jpg"
                alt="Echipa EgoTax"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* Mission & Vision */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 h-full border-2 hover:border-[#FFB343] transition-colors duration-300">
              <div className="w-12 h-12 bg-[#FFB343] rounded-full flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Misiunea noastră</h2>
              <p className="text-muted-foreground leading-relaxed">
                Misiunea noastră constă în furnizarea serviciilor calitative de evidență contabilă, precum și alte soluții financiare complete și personalizate, în timp util și la momentul oportun, care vă vor ajuta să luați decizii financiare informate.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 h-full border-2 hover:border-[#FFB343] transition-colors duration-300">
              <div className="w-12 h-12 bg-[#FFB343] rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Viziunea noastră</h2>
              <p className="text-muted-foreground leading-relaxed">
                Viziunea noastră este de a fi partenerul de încredere în afaceri, astfel încât dvs. să vă atingeți obiectivele financiare cu încredere, fiind ghidați de expertiza noastră.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-[#FFB343] text-black hover:bg-[#FFC56D]">
            Valorile noastre
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Pe ce ne bazăm
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Valorile fundamentale care ghidează modul în care lucrăm și construim relații
            de lungă durată cu clienții noștri
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg hover:border-[#FFB343] transition-all duration-300 group">
                  <div className="w-12 h-12 bg-[#FFB343] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* Stats */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-[#FFB343] text-black hover:bg-[#FFC56D]">
            Realizări
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Rezultatele noastre în cifre
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 text-center hover:shadow-lg hover:border-[#FFB343] transition-all duration-300">
                <div className="text-5xl md:text-6xl font-bold text-[#FFB343] mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* Partners Section */}
      <PartnersSection />

      <Separator className="max-w-7xl mx-auto" />

      {/* Why Choose Us */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-[#FFB343] text-black hover:bg-[#FFC56D]">
              De ce EgoTax?
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              De ce să ne alegi pe noi
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Oferim parteneriat strategic și consultanță care vă ajută să luați decizii de afaceri informate.
            </p>
            <div className="space-y-4">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#FFB343] flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8 bg-gradient-to-br from-[#FFB343] to-[#FFC56D]">
              <div className="mb-6">
                <Award className="w-16 h-16 text-black" />
              </div>
              <h3 className="text-3xl font-bold text-black mb-4">
                Certificări și expertiză
              </h3>
              <p className="text-black/80 leading-relaxed mb-6">
                Toți membrii echipei noastre sunt certificați și au experiență vastă în
                domeniul contabilității și fiscalității. Ne perfecționăm continuu pentru
                a fi la curent cu toate modificările legislative.
              </p>
              <ul className="space-y-3 text-black">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Studii superioare complete în domeniul economic</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Participare regulată la traininguri specializate</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-12 bg-gradient-to-r from-[#FFB343] via-[#FFC56D] to-[#FFB343] text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Gata să începem colaborarea?
            </h2>
            <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">
              Contactați-ne astăzi pentru o consultanță gratuită și aflați cum vă putem
              ajuta să vă optimizați procesele financiare.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-black/90"
                onClick={() => setIsOCFormOpen(true)}
              >
                Solicită o consultație
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-black text-black hover:bg-black/10"
                asChild
              >
                <a href="tel:+37361142323">
                  <Phone className="w-5 h-5 mr-2" />
                  +(373) 61 142 323
                </a>
              </Button>
            </div>
          </Card>
        </motion.div>
      </section>

      <OCRequestForm open={isOCFormOpen} onOpenChange={setIsOCFormOpen} />
    </div>
  );
}
