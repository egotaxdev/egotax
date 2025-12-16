'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Shield, CreditCard, Truck, RotateCcw, Lock, Phone } from 'lucide-react';
import Link from 'next/link';

const sections = [
  {
    id: 'general',
    title: '1. Dispoziții generale',
    icon: FileText,
    content: `Acest site aparține companiei EgoTax SRL. La utilizarea serviciilor noastre, Clientul acceptă Termenii și Condițiile de prestare a serviciilor, bazate pe legislația Republicii Moldova (denumite în continuare - Termeni și Condiții), prezentate mai jos.

Utilizarea site-ului www.egotax.md implică acceptarea Termenilor și Condițiilor propuse de EgoTax SRL, în conformitate cu Legea nr. 284/2004 privind comerțul electronic. Relațiile dintre client și prestator sunt stabilite în baza Legii nr. 105/2003 privind protecția drepturilor consumatorilor și a altor acte normative adoptate în conformitate cu aceasta.

Prestatorul își rezervă dreptul de a modifica prezenții Termeni și Condiții, iar Clientul este obligat să urmărească modificările.`
  },
  {
    id: 'personal-data',
    title: '2. Protecția datelor cu caracter personal',
    icon: Shield,
    content: `Utilizând site-ul www.egotax.md, sunteți de acord automat cu colectarea și prelucrarea datelor personale necesare pentru procesarea/confirmarea/executarea comenzilor și serviciilor.

Datele personale sunt prelucrate numai în scopuri legale, cum ar fi furnizarea serviciilor comandate, acțiuni promoționale, analize Google, cookie-uri și notificări/newsletter.

Toate informațiile care conțin date personale sunt stocate și utilizate doar pe perioada necesară atingerii scopurilor pentru care au fost colectate și în conformitate cu prevederile Legii nr. 133/2011 privind protecția datelor cu caracter personal.

Utilizăm măsuri de securitate comerciale pentru a preveni accesul neautorizat, pentru a menține acuratețea datelor și pentru a asigura utilizarea corectă a informațiilor de pe site.`
  },
  {
    id: 'payment',
    title: '3. Plasarea comenzii și plata',
    icon: CreditCard,
    content: `Plata serviciilor este posibilă cu cardul bancar - la finalizarea comenzii veți primi o chitanță fiscală care va confirma plata.

Plata online se efectuează în condiții de maximă securitate, folosind cardul de plată ca instrument de plată, ceea ce permite efectuarea tranzacțiilor online. După plată, veți primi confirmarea plății pe adresa dvs. de e-mail.

Procesatorul de plăți utilizează un sistem securizat bazat pe ultima versiune a standardului de securitate 3D-Secure, ceea ce înseamnă o nouă abordare globală a autentificării cumpărătorului în tranzacțiile online securizate. Această măsură de securitate include redirecționarea utilizatorului la efectuarea plății către o pagină securizată maib, unde autentificarea fiecărui titular de card se efectuează prin atribuirea unui cod unic pentru fiecare tranzacție online.

Rambursarea fondurilor se efectuează doar pe cardul de plată care a fost folosit pentru achiziție.

Pentru plată vi se va cere să introduceți datele cardului dvs. bancar:
• Numărul cardului (16 cifre)
• Data expirării (luna și anul)
• Codul CVC sau CVV (3 cifre)
• Numele și prenumele de pe cardul de plată

Toate plățile sunt procesate în moneda națională - MDL (lei moldovenești). În cazul în care valuta operațiunii diferă de valuta plății, conversia sumei operațiunii se efectuează la cursul operațiunilor cu carduri din ziua decontărilor băncii emitente.`
  },
  {
    id: 'delivery',
    title: '4. Livrarea serviciilor',
    icon: Truck,
    content: `După plasarea comenzii, clientului i se furnizează informații despre data estimată de prestare a serviciilor.

Serviciile de consultanță online sunt disponibile în ziua lucrătoare următoare confirmării comenzii de către operatorii noștri.

Serviciile de contabilitate și fiscalitate sunt prestate conform calendarului convenit individual cu fiecare client.

În zilele de duminică și sărbătorile naționale serviciile nu sunt prestate.

Termenul de prestare poate fi prelungit în cazuri speciale (de exemplu, condiții meteorologice nefavorabile, perioada sărbătorilor de stat, defecțiuni tehnice neprevăzute etc.). Vă vom informa dacă ne vom confrunta cu una dintre situațiile menționate anterior.`
  },
  {
    id: 'refund',
    title: '5. Dreptul la retur',
    icon: RotateCcw,
    content: `Conform Legii nr. 105-XV din 13.03.2003 privind protecția drepturilor consumatorilor, Clientul are dreptul de a returna serviciul achiziționat din anumite motive, în termen de 14 zile de la data plății. Fondurile sunt returnate pe cardul de pe care a fost efectuată achiziția.

Serviciile deja prestate nu fac obiectul returnării, în conformitate cu Anexa nr. 2 la Hotărârea Guvernului nr. 1465 din 08.12.2003.

Contacte în caz de retur: +373 61 142 323
Termen de procesare a cererii de retur: 14 zile
Condiții de retur: Serviciul nu a fost prestat integral`
  },
  {
    id: 'privacy',
    title: '6. Politica de confidențialitate',
    icon: Lock,
    content: `În conformitate cu prevederile Legii nr. 133/2011 privind protecția datelor cu caracter personal, prestatorul de servicii prelucrează datele personale. Datele personale sunt prelucrate cu bună-credință, în baza și în conformitate cu normele legale.

Prestatorul colectează și prelucrează doar datele personale furnizate de consumatori la plasarea comenzii: numele, prenumele, numărul de telefon, adresa, adresa de e-mail.

Datele personale sunt utilizate exclusiv în scopul administrării site-ului, pentru a oferi acces la informații, în special pentru livrarea comenzilor sau pentru a contacta consumatorul în scopul executării livrării.

Prestatorul nu va divulga terților nicio dată disponibilă fără consimțământul subiecților datelor și nu va comercializa, schimba sau divulga aceste date altor persoane, cu excepțiile prevăzute de legislația în vigoare.

Datele personale pot fi prelucrate și utilizate de Prestator în scopuri statistice și de promovare ulterioară.

Prestatorul respectă cerințele de securitate a datelor personale și asigură protecția datelor consumatorilor.`
  },
  {
    id: 'contact',
    title: '7. Informații de contact',
    icon: Phone,
    content: null,
    contactData: {
      address: 'str. Alexandru cel Bun, 91, et. 2, mun. Chișinău, Republica Moldova',
      iban: 'MD90AG000000022514080754',
      bic: 'AGRNMD2X',
      bank: 'BC MOLDOVA-AGROINDBANK S.A.',
      phone: '+(373) 61 142 323',
      email: 'egotaxcont@gmail.com',
      admin: 'Gumenco Eugenia'
    }
  }
];

export default function TermsPage() {
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
              Document legal
            </Badge>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            Termeni și Condiții
            <span className="text-[#FFB343] block">de utilizare</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Vă rugăm să citiți cu atenție acești termeni și condiții înainte de a utiliza serviciile noastre.
            Ne rezervăm dreptul de a modifica aceste prevederi fără notificare prealabilă.
          </motion.p>
        </motion.div>
      </section>

      {/* Terms Sections */}
      <section className="pb-16 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-8"
        >
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={section.id}
                variants={itemVariants}
              >
                <Card className="p-8 border-2 hover:border-[#FFB343]/50 transition-colors duration-300">
                  {/* Section Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#FFB343] rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-black" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {section.title}
                    </h2>
                  </div>

                  {/* Section Content */}
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {section.content ? (
                      section.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))
                    ) : section.contactData ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-1">Adresa juridică</h4>
                            <p className="text-muted-foreground">{section.contactData.address}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-1">Administrator</h4>
                            <p className="text-muted-foreground">{section.contactData.admin}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-1">Date bancare</h4>
                            <p className="text-muted-foreground">
                              IBAN: {section.contactData.iban}<br />
                              BIC: {section.contactData.bic}<br />
                              Banca: {section.contactData.bank}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-1">Contact</h4>
                            <p className="text-muted-foreground">
                              Telefon: <a href={`tel:${section.contactData.phone.replace(/\s/g, '')}`} className="text-[#FFB343] hover:underline">{section.contactData.phone}</a><br />
                              Email: <a href={`mailto:${section.contactData.email}`} className="text-[#FFB343] hover:underline">{section.contactData.email}</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Last Updated */}
      <section className="pb-8 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="text-center text-muted-foreground"
        >
          <p>Ultima actualizare: Decembrie 2025</p>
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
              Aveți întrebări?
            </h2>
            <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">
              Echipa noastră este gata să vă ajute cu orice întrebare referitoare la
              termenii și condițiile noastre.
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
