'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, CheckCircle2, TrendingUp, PieChart, Activity, Target, ArrowRight, Phone, LineChart, DollarSign } from 'lucide-react';
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
import { Bar, BarChart, CartesianGrid, XAxis, Area, AreaChart, Pie, PieChart as RePieChart, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import OCRequestForm from '@/components/OCRequestForm';

export default function AnalizaFinanciaraContent() {
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
      icon: Activity,
      title: 'Analiză detaliată',
      description: 'Evaluare completă a performanței financiare și operaționale'
    },
    {
      icon: TrendingUp,
      title: 'Identificare tendințe',
      description: 'Detectăm tendințe și pattern-uri importante în date'
    },
    {
      icon: Target,
      title: 'Recomandări acționabile',
      description: 'Soluții concrete pentru îmbunătățirea rezultatelor'
    },
    {
      icon: DollarSign,
      title: 'Optimizare costuri',
      description: 'Identificăm oportunități de reducere a cheltuielilor'
    }
  ];

  const analysisAreas = [
    {
      title: 'Analiză financiară',
      items: [
        'Analiza bilanțului contabil',
        'Analiza contului de profit și pierderi',
        'Analiza fluxurilor de numerar',
        'Analiza structurii capitalului',
        'Indicatori de lichiditate',
        'Indicatori de rentabilitate'
      ]
    },
    {
      title: 'Analiză operațională',
      items: [
        'Analiza costurilor pe centre de cost',
        'Analiza productivității',
        'Analiza eficienței operaționale',
        'Benchmarking cu industria',
        'Analiza ciclului de conversie',
        'Optimizare procese'
      ]
    },
    {
      title: 'Analiză strategică',
      items: [
        'Analiza poziției pe piață',
        'Analiza avantajelor competitive',
        'Analiza SWOT financiară',
        'Scenarii și proiecții',
        'Analiza riscurilor',
        'Planificare strategică'
      ]
    }
  ];

  // Sample data for charts
  const revenueData = [
    { month: 'Ian', venituri: 45000, cheltuieli: 32000 },
    { month: 'Feb', venituri: 52000, cheltuieli: 35000 },
    { month: 'Mar', venituri: 48000, cheltuieli: 33000 },
    { month: 'Apr', venituri: 61000, cheltuieli: 38000 },
    { month: 'Mai', venituri: 55000, cheltuieli: 36000 },
    { month: 'Iun', venituri: 67000, cheltuieli: 40000 },
  ];

  const profitData = [
    { month: 'Ian', profit: 13000 },
    { month: 'Feb', profit: 17000 },
    { month: 'Mar', profit: 15000 },
    { month: 'Apr', profit: 23000 },
    { month: 'Mai', profit: 19000 },
    { month: 'Iun', profit: 27000 },
  ];

  const expenseDistribution = [
    { name: 'Salarii', value: 45, fill: '#FFB343' },
    { name: 'Chirii', value: 20, fill: '#FF9F2E' },
    { name: 'Utilități', value: 10, fill: '#FFC56D' },
    { name: 'Marketing', value: 15, fill: '#FFD699' },
    { name: 'Altele', value: 10, fill: '#FFE4B8' },
  ];

  const chartConfig = {
    venituri: {
      label: 'Venituri',
      color: '#22c55e',
    },
    cheltuieli: {
      label: 'Cheltuieli',
      color: '#ef4444',
    },
    profit: {
      label: 'Profit',
      color: '#FFB343',
    },
  } satisfies ChartConfig;

  const process = [
    {
      step: '01',
      title: 'Colectare date',
      description: 'Strângem și verificăm toate datele financiare necesare'
    },
    {
      step: '02',
      title: 'Procesare și analiză',
      description: 'Analizăm datele folosind metodologii avansate'
    },
    {
      step: '03',
      title: 'Raport detaliat',
      description: 'Pregătim raport cuprinzător cu vizualizări'
    },
    {
      step: '04',
      title: 'Prezentare și recomandări',
      description: 'Prezentăm rezultatele și recomandările acționabile'
    }
  ];

  const services = {
    basic: [
      'Analiză bilanț contabil',
      'Analiză profit și pierderi',
      'Calculul indicatorilor de bază',
      'Raport executiv (10-15 pagini)',
      'O ședință de prezentare',
      'Recomandări generale'
    ],
    advanced: [
      'Toate serviciile din pachetul de bază',
      'Analiză fluxuri de numerar detaliate',
      'Analiza trendurilor pe 3-5 ani',
      'Benchmarking cu industria',
      'Analiza scenariilor',
      'Raport complet (30-40 pagini)',
      'Două ședințe de prezentare',
      'Plan de acțiune detaliat',
      'Suport 30 zile post-analiză'
    ]
  };

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
              <BarChart3 className="w-4 h-4 mr-2" />
              Servicii analitice
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Analiză și diagnostic financiar
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Analizăm situația financiară și oferim recomandări pentru optimizare.
              Transformăm datele în insight-uri acționabile care vă ajută să luați
              decizii informate și să creșteți profitabilitatea afacerii.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => setIsOCFormOpen(true)} className="bg-[#FFB343] hover:bg-[#FF9F2E] text-black">
                <Phone className="w-5 h-5 mr-2" />
                Solicitați analiză
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
              Beneficiile analizei financiare
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Obțineți o imagine clară a sănătății financiare și direcții concrete de acțiune
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

      {/* Charts Demo Section */}
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
              Exemple de analize vizuale
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Rapoartele noastre includ grafice interactive și vizualizări clare
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Revenue vs Expenses Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#FFB343]" />
                    Venituri vs Cheltuieli
                  </CardTitle>
                  <CardDescription>
                    Comparație lunară a veniturilor și cheltuielilor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <BarChart accessibilityLayer data={revenueData}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="venituri" fill="var(--color-venituri)" radius={4} />
                      <Bar dataKey="cheltuieli" fill="var(--color-cheltuieli)" radius={4} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Profit Trend Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-[#FFB343]" />
                    Evoluția profitului
                  </CardTitle>
                  <CardDescription>
                    Tendința profitului net pe ultimele 6 luni
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <AreaChart accessibilityLayer data={profitData}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="profit"
                        fill="var(--color-profit)"
                        fillOpacity={0.4}
                        stroke="var(--color-profit)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Expense Distribution */}
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-[#FFB343]" />
                  Distribuția cheltuielilor
                </CardTitle>
                <CardDescription>
                  Structura cheltuielilor operaționale pe categorii
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={expenseDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {expenseDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Analysis Areas */}
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
              Domenii de analiză
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Acoperim toate aspectele importante ale performanței financiare
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {analysisAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {area.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#FFB343] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
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

      {/* Services Packages */}
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
              Pachete de analiză
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Alegeți nivelul de profunzime potrivit pentru nevoile dumneavoastră
            </p>
          </motion.div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="basic">Analiză de bază</TabsTrigger>
              <TabsTrigger value="advanced">Analiză avansată</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Pachet de bază</CardTitle>
                  <CardDescription>
                    Perfect pentru o imagine rapidă a situației financiare
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

            <TabsContent value="advanced">
              <Card>
                <CardHeader>
                  <CardTitle>Pachet avansat</CardTitle>
                  <CardDescription>
                    Analiză cuprinzătoare pentru decizii strategice importante
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {services.advanced.map((service, index) => (
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
              Procesul de analiză
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Metodologie structurată pentru rezultate de calitate
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
              <AccordionTrigger>Cât durează o analiză financiară?</AccordionTrigger>
              <AccordionContent>
                Analiza de bază se realizează în 5-7 zile lucrătoare, iar analiza avansată
                în 10-15 zile lucrătoare, în funcție de complexitatea afacerii și volumul
                de date. Vă vom oferi un termen exact după evaluarea inițială.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Ce documente sunt necesare?</AccordionTrigger>
              <AccordionContent>
                Situații financiare (bilanț, profit & pierderi, fluxuri de numerar),
                balanțe de verificare, extrase bancare, date despre clienți/furnizori,
                bugete și planuri, orice rapoarte interne existente.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Cât costă o analiză financiară?</AccordionTrigger>
              <AccordionContent>
                Pachetul de bază pornește de la 15000 MDL, iar pachetul avansat de la 30000 MDL.
                Prețul final depinde de dimensiunea companiei și complexitatea analizei.
                Oferim evaluare gratuită și ofertă personalizată.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Puteți face analize comparative cu concurența?</AccordionTrigger>
              <AccordionContent>
                Da, în pachetul avansat includem benchmarking cu industria. Comparăm indicatorii
                dumneavoastră cu media din industrie și cu cei mai performanți competitori,
                folosind date publice și baze de date specializate.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Cum sunt prezentate rezultatele?</AccordionTrigger>
              <AccordionContent>
                Rezultatele sunt prezentate într-un raport profesional cu grafice interactive,
                tabele comparative și interpretări clare. Organizăm ședințe de prezentare
                unde explicăm în detaliu concluziile și recomandările, răspundem la întrebări
                și discutăm pașii următori.
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
                  Doriți să înțelegeți mai bine afacerea dvs.?
                </h2>
                <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
                  Contactați-ne pentru o consultație gratuită și aflați cum o analiză
                  financiară profesională vă poate ajuta să luați decizii mai bune.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="bg-black text-white hover:bg-gray-800" asChild>
                    <a href="tel:+37361142323">
                      <Phone className="w-5 h-5 mr-2" />
                      +(373) 61 142 323
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="border-black text-black hover:bg-black/10" onClick={() => setIsOCFormOpen(true)}>
                    Solicitați ofertă
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
