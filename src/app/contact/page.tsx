'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-react';
import { siViber, siTelegram } from 'simple-icons';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(true);

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

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      content: "+(373) 61 142 323",
      href: "tel:+37361142323"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@egotax.md",
      href: "mailto:info@egotax.md"
    },
    {
      icon: MapPin,
      title: "Adresă",
      content: "Chișinău, Moldova",
      href: "#"
    },
    {
      icon: Clock,
      title: "Program",
      content: "Luni - Vineri: 9:00 - 18:00",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      name: "Viber",
      icon: siViber,
      href: "#",
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50"
    },
    {
      name: "Telegram",
      icon: siTelegram,
      href: "#",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50"
    },
    {
      name: "Facebook",
      icon: null,
      IconComponent: Facebook,
      href: "#",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50"
    },
    {
      name: "Instagram",
      icon: null,
      IconComponent: Instagram,
      href: "#",
      color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-900/50"
    },
    {
      name: "LinkedIn",
      icon: null,
      IconComponent: Linkedin,
      href: "#",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone || undefined,
          email: formData.email,
          subject: formData.subject || undefined,
          message: formData.message,
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Eroare la trimiterea mesajului');
      }

      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Eroare la trimiterea mesajului');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-8 lg:pb-16 px-4 max-w-7xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-3 lg:mb-4 bg-[#FFB343] text-black hover:bg-[#FFC56D]">
            Contactează-ne
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 lg:mb-6">
            Suntem aici să te{' '}
            <span className="text-[#FFB343]">ajutăm</span>
          </h1>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ai întrebări despre serviciile noastre sau dorești o consultanță? Contactează-ne
            prin oricare dintre metodele de mai jos sau completează formularul de contact.
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-8 lg:pb-16 px-4 max-w-7xl mx-auto">
        {/* Mobile: 2x2 grid, compact */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <motion.a
                key={info.title}
                href={info.href}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Card className="p-4 h-full active:scale-[0.98] transition-transform">
                  <div className="w-10 h-10 bg-[#FFB343] rounded-full flex items-center justify-center mb-3">
                    <IconComponent className="w-5 h-5 text-black" />
                  </div>
                  <h3 className="text-xs font-medium text-muted-foreground mb-1">
                    {info.title}
                  </h3>
                  <p className="text-sm text-foreground font-semibold leading-tight">
                    {info.content}
                  </p>
                </Card>
              </motion.a>
            );
          })}
        </div>

        {/* Desktop: 4 columns */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <motion.a
                key={info.title}
                href={info.href}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg hover:border-[#FFB343] transition-all duration-300 group cursor-pointer">
                  <div className="w-12 h-12 bg-[#FFB343] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    {info.title}
                  </h3>
                  <p className="text-foreground font-semibold">
                    {info.content}
                  </p>
                </Card>
              </motion.a>
            );
          })}
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* Contact Form & Social Links */}
      <section className="py-8 lg:py-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-12">
          {/* Quick Contact - Mobile first (показываем сверху на мобильном) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="lg:hidden"
          >
            <Card className="p-5 bg-gradient-to-br from-[#FFB343] to-[#FFC56D]">
              <h3 className="text-xl font-bold text-black mb-2">
                Contact rapid
              </h3>
              <p className="text-black/80 text-sm mb-4">
                Sună-ne acum pentru o consultanță gratuită.
              </p>
              <Button
                asChild
                size="default"
                className="w-full bg-black text-white hover:bg-black/90"
              >
                <a href="tel:+37361142323">
                  <Phone className="mr-2 w-4 h-4" />
                  +(373) 61 142 323
                </a>
              </Button>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="p-5 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">Trimite-ne un mesaj</h2>
              <p className="text-sm lg:text-base text-muted-foreground mb-6 lg:mb-8">
                Completează formularul de mai jos și te vom contacta în cel mai scurt timp posibil.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 lg:py-12"
                >
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-7 h-7 lg:w-8 lg:h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-2 text-center">Mesaj trimis cu succes!</h3>
                  <p className="text-sm lg:text-base text-muted-foreground text-center">
                    Vă mulțumim pentru mesaj. Vă vom răspunde în cel mai scurt timp.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm">Nume complet *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Numele tău"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-11 lg:h-10 transition-all duration-300 focus:ring-2 focus:ring-[#FFB343]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm">Telefon *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+(373) XXX XXX XX"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="h-11 lg:h-10 transition-all duration-300 focus:ring-2 focus:ring-[#FFB343]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email@exemplu.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-11 lg:h-10 transition-all duration-300 focus:ring-2 focus:ring-[#FFB343]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm">Subiect *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Subiectul mesajului"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="h-11 lg:h-10 transition-all duration-300 focus:ring-2 focus:ring-[#FFB343]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm">Mesaj *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Descrie cererea ta aici..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="transition-all duration-300 focus:ring-2 focus:ring-[#FFB343]"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 bg-[#FFB343] text-black hover:bg-[#FFC56D]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                        Se trimite...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-4 h-4" />
                        Trimite mesajul
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>

          {/* Sidebar - Desktop only для Social и Working Hours, на мобильном внизу */}
          <div className="space-y-4 lg:space-y-8">
            {/* Social Links */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-5 lg:p-6">
                <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4">Social Media</h3>
                <p className="text-sm text-muted-foreground mb-4 lg:mb-6">
                  Urmărește-ne pe rețelele sociale pentru actualizări și noutăți
                </p>
                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`p-2.5 lg:p-3 rounded-full transition-colors duration-200 ${social.color}`}
                      aria-label={social.name}
                    >
                      {social.icon ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d={social.icon.path} />
                        </svg>
                      ) : social.IconComponent ? (
                        <social.IconComponent className="w-5 h-5" />
                      ) : null}
                    </a>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quick Contact - Desktop only */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:block"
            >
              <Card className="p-6 bg-gradient-to-br from-[#FFB343] to-[#FFC56D]">
                <h3 className="text-2xl font-bold text-black mb-4">
                  Contact rapid
                </h3>
                <p className="text-black/80 mb-6">
                  Preferi să vorbești direct? Sună-ne acum pentru o consultanță gratuită.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-black text-white hover:bg-black/90"
                >
                  <a href="tel:+37361142323">
                    <Phone className="mr-2 w-4 h-4" />
                    +(373) 61 142 323
                  </a>
                </Button>
              </Card>
            </motion.div>

            {/* Working Hours Details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-5 lg:p-6">
                <div className="flex items-center gap-3 mb-3 lg:mb-4">
                  <div className="w-9 h-9 lg:w-10 lg:h-10 bg-[#FFB343] rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-black" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold">Program de lucru</h3>
                </div>
                <div className="space-y-2 lg:space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Luni - Vineri</span>
                    <span className="font-semibold">9:00 - 18:00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sâmbătă</span>
                    <span className="font-semibold">Închis</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duminică</span>
                    <span className="font-semibold">Închis</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="pb-8 lg:pb-16 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 lg:p-8 text-center bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">
              Ai întrebări frecvente?
            </h2>
            <p className="text-sm lg:text-base text-muted-foreground mb-4 lg:mb-6 max-w-2xl mx-auto">
              Consultă secțiunea noastră FAQ pentru răspunsuri rapide la cele mai comune întrebări
              despre serviciile noastre de contabilitate și fiscalitate.
            </p>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#FFB343] text-black hover:bg-[#FFC56D]"
            >
              Vezi FAQ
            </Button>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
