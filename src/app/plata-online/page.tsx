'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  CreditCard,
  Calculator,
  Users,
  GraduationCap,
  Check,
  Shield,
  Lock,
  ArrowRight
} from 'lucide-react';

type ServiceType = 'contabilitate' | 'consultanta' | 'instruire' | null;

const services = [
  {
    id: 'contabilitate' as const,
    title: 'Servicii contabilitate',
    description: 'Evidență contabilă, rapoarte financiare, declarații fiscale',
    icon: Calculator,
  },
  {
    id: 'consultanta' as const,
    title: 'Servicii consultanță',
    description: 'Consultanță fiscală, planificare financiară, optimizare',
    icon: Users,
  },
  {
    id: 'instruire' as const,
    title: 'Servicii instruire',
    description: 'Cursuri, seminare, training în domeniul contabilității',
    icon: GraduationCap,
  }
];

export default function PlataOnlinePage() {
  const [selectedService, setSelectedService] = useState<ServiceType>(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
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

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !amount) return;

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: selectedService,
          amount: parseFloat(amount),
          description: description || `Plată pentru ${services.find(s => s.id === selectedService)?.title}`,
          companyName: companyName || undefined,
          clientName: clientName || undefined,
          phone: phone || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Eroare la procesarea plății');
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Eroare la procesarea plății');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatAmount = (value: string) => {
    const cleaned = value.replace(/[^\d.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) return parts[0] + '.' + parts.slice(1).join('');
    if (parts[1] && parts[1].length > 2) return parts[0] + '.' + parts[1].slice(0, 2);
    return cleaned;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(formatAmount(e.target.value));
  };

  const selectedServiceData = services.find(s => s.id === selectedService);
  const isFormValid = selectedService && amount && parseFloat(amount) >= 1 && companyName.trim() && clientName.trim() && phone.trim();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-8 lg:pb-12 px-4 max-w-7xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-3 lg:mb-4 bg-[#FFB343] text-black hover:bg-[#FFC56D]">
            <Lock className="w-3 h-3 mr-1" />
            Plată securizată
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 lg:mb-6">
            Plată <span className="text-[#FFB343]">online</span>
          </h1>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Achită serviciile noastre rapid și sigur prin intermediul platformei de plăți maib.
          </p>
        </motion.div>
      </section>

      {/* Main Payment Section */}
      <section className="pb-16 lg:pb-24 px-4 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="overflow-hidden border-0 shadow-2xl">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-[#FFB343] to-[#FFC56D] p-6 lg:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-black">Formular de plată</h2>
                  <p className="text-black/70 text-sm mt-1">Completează datele pentru a efectua plata</p>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="bg-black/10 rounded-full p-2">
                    <Shield className="w-5 h-5 text-black" />
                  </div>
                  <div className="bg-black/10 rounded-full p-2">
                    <CreditCard className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handlePayment} className="p-6 lg:p-8 space-y-8">
              {/* Step 1: Service Selection */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-7 h-7 bg-[#FFB343] rounded-full flex items-center justify-center text-black font-bold text-xs">
                    1
                  </div>
                  <Label className="text-base font-semibold">Selectează serviciul</Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {services.map((service) => {
                    const IconComponent = service.icon;
                    const isSelected = selectedService === service.id;

                    return (
                      <motion.button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedService(service.id)}
                        className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          isSelected
                            ? 'border-[#FFB343] bg-[#FFB343]/5 shadow-lg shadow-[#FFB343]/20'
                            : 'border-border hover:border-[#FFB343]/50 hover:bg-muted/50'
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Checkmark */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-[#FFB343] rounded-full flex items-center justify-center shadow-lg"
                            >
                              <Check className="w-4 h-4 text-black" strokeWidth={3} />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#FFB343] text-black'
                              : 'bg-[#FFB343]/10 text-[#FFB343]'
                          }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <h3 className={`font-semibold text-sm leading-tight ${isSelected ? 'text-foreground' : 'text-foreground'}`}>
                              {service.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Amount Input */}
              <motion.div
                animate={{ opacity: selectedService ? 1 : 0.4 }}
                className={!selectedService ? 'pointer-events-none' : ''}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    selectedService ? 'bg-[#FFB343] text-black' : 'bg-muted text-muted-foreground'
                  }`}>
                    2
                  </div>
                  <Label className="text-base font-semibold">Detalii plată</Label>
                </div>

                {/* Amount Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-sm text-muted-foreground">
                      Suma de plată *
                    </Label>
                    <div className="relative">
                      <Input
                        id="amount"
                        type="text"
                        inputMode="decimal"
                        placeholder="0.00"
                        value={amount}
                        onChange={handleAmountChange}
                        required
                        disabled={!selectedService}
                        className="h-12 text-xl font-bold pl-4 pr-20 border-2 focus:border-[#FFB343] focus:ring-[#FFB343]/20"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-muted px-3 py-1.5 rounded-md">
                        <span className="text-sm font-semibold text-muted-foreground">MDL</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Suma minimă: 1 MDL</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm text-muted-foreground">
                      Descriere plată (opțional)
                    </Label>
                    <Input
                      id="description"
                      type="text"
                      placeholder="Ex: Servicii contabile ianuarie 2025"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={!selectedService}
                      className="h-12 border-2 focus:border-[#FFB343] focus:ring-[#FFB343]/20"
                    />
                  </div>
                </div>

                {/* Client Info Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-sm text-muted-foreground">
                      Numele companiei *
                    </Label>
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="S.R.L. Exemplu"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      disabled={!selectedService}
                      className="h-12 border-2 focus:border-[#FFB343] focus:ring-[#FFB343]/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientName" className="text-sm text-muted-foreground">
                      Numele dvs. *
                    </Label>
                    <Input
                      id="clientName"
                      type="text"
                      placeholder="Ion Popescu"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                      disabled={!selectedService}
                      className="h-12 border-2 focus:border-[#FFB343] focus:ring-[#FFB343]/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm text-muted-foreground">
                      Telefon *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+373 XXX XXX XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      disabled={!selectedService}
                      className="h-12 border-2 focus:border-[#FFB343] focus:ring-[#FFB343]/20"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Summary & Payment */}
              <motion.div
                animate={{ opacity: isFormValid ? 1 : 0.4 }}
                className={!isFormValid ? 'pointer-events-none' : ''}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    isFormValid ? 'bg-[#FFB343] text-black' : 'bg-muted text-muted-foreground'
                  }`}>
                    3
                  </div>
                  <Label className="text-base font-semibold">Confirmă și plătește</Label>
                </div>

                {isFormValid ? (
                  <div className="bg-gradient-to-br from-muted/50 to-muted rounded-xl p-5 lg:p-6 space-y-4">
                    {/* Summary */}
                    <div className="flex items-center justify-between pb-4 border-b border-border">
                      <div className="flex items-center gap-3">
                        {selectedServiceData && (
                          <div className="w-10 h-10 bg-[#FFB343]/10 rounded-lg flex items-center justify-center">
                            <selectedServiceData.icon className="w-5 h-5 text-[#FFB343]" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm">{selectedServiceData?.title}</p>
                          {description && (
                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">{description}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#FFB343]">{amount}</p>
                        <p className="text-xs text-muted-foreground">MDL</p>
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                      </div>
                    )}

                    {/* Payment Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 text-base font-semibold bg-[#FFB343] text-black hover:bg-[#FFC56D] shadow-lg shadow-[#FFB343]/30 hover:shadow-xl hover:shadow-[#FFB343]/40 transition-all"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                          Se procesează...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 w-5 h-5" />
                          Plătește {amount} MDL
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>

                    {/* Security Note */}
                    <div className="flex items-center justify-center gap-4 pt-2">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Lock className="w-3.5 h-3.5" />
                        <span>SSL Securizat</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Shield className="w-3.5 h-3.5" />
                        <span>maib e-commerce</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted/30 rounded-xl p-8 text-center">
                    <div className="w-14 h-14 mx-auto mb-3 bg-[#FFB343]/10 rounded-full flex items-center justify-center">
                      <CreditCard className="w-7 h-7 text-[#FFB343]/50" />
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Completează toate câmpurile pentru a continua
                    </p>
                  </div>
                )}
              </motion.div>
            </form>
          </Card>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-wrap justify-center gap-6 lg:gap-10"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-8 h-8 bg-[#FFB343]/10 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#FFB343]" />
            </div>
            <span>Tranzacții securizate</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-8 h-8 bg-[#FFB343]/10 rounded-full flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#FFB343]" />
            </div>
            <span>Criptare SSL 256-bit</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-8 h-8 bg-[#FFB343]/10 rounded-full flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-[#FFB343]" />
            </div>
            <span>Visa / Mastercard</span>
          </div>
        </motion.div>

        {/* Help Text */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          Ai întrebări? Contactează-ne la{' '}
          <a href="tel:+37361142323" className="text-[#FFB343] hover:underline font-medium">
            +(373) 61 142 323
          </a>
        </motion.p>
      </section>
    </div>
  );
}
