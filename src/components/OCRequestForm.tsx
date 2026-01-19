"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { services } from "@/data/services";
import {
  User,
  Building2,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Send,
  ChevronDown,
  Check,
} from "lucide-react";

interface OCRequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  services: string[];
  message: string;
}

const initialFormData: FormData = {
  name: "",
  company: "",
  phone: "",
  email: "",
  services: [],
  message: "",
};

export default function OCRequestForm({ open, onOpenChange }: OCRequestFormProps) {
  const [isMobile, setIsMobile] = useState(true);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset form when closed
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setFormData(initialFormData);
        setIsSuccess(false);
        setError(null);
      }, 300);
    }
  }, [open]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (serviceTitle: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceTitle)
        ? prev.services.filter((s) => s !== serviceTitle)
        : [...prev.services, serviceTitle],
    }));
  };

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/submit-oc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          companyName: formData.company || undefined,
          services: formData.services,
          message: formData.message || undefined,
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Eroare la trimiterea cererii');
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Eroare la trimiterea cererii');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = formData.name.trim() && formData.phone.trim();

  const formContent = (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {/* Form Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center h-full py-8 text-center"
            >
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Cererea a fost trimisă!
              </h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Vă mulțumim pentru interes. Echipa noastră vă va contacta în cel mai scurt timp posibil.
              </p>
              <Button
                onClick={() => onOpenChange(false)}
                className="bg-[#FFB343] hover:bg-[#FFC56D] text-black"
              >
                Închide
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-[#FFB343]" />
                    Nume *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ion Popescu"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-[#FFB343]" />
                    Telefon *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+373 XX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-[#FFB343]" />
                    Companie
                  </Label>
                  <Input
                    id="company"
                    placeholder="Numele companiei"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-[#FFB343]" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplu.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>

              {/* Services Selection - Dropdown/Drawer */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-[#FFB343]" />
                  Servicii de interes
                </Label>

                {/* Mobile: Button that opens Drawer */}
                {isMobile ? (
                  <button
                    type="button"
                    onClick={() => setIsServicesOpen(true)}
                    className="w-full h-11 px-3 flex items-center justify-between rounded-md border border-input bg-background text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <span className={formData.services.length > 0 ? "text-foreground" : "text-muted-foreground"}>
                      {formData.services.length > 0
                        ? `${formData.services.length} servicii selectate`
                        : "Selectați serviciile"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                ) : (
                  /* Desktop: Popover */
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="w-full h-11 px-3 flex items-center justify-between rounded-md border border-input bg-background text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <span className={formData.services.length > 0 ? "text-foreground" : "text-muted-foreground"}>
                          {formData.services.length > 0
                            ? `${formData.services.length} servicii selectate`
                            : "Selectați serviciile"}
                        </span>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-2" align="start">
                      <div className="space-y-1">
                        {services.map((service) => {
                          const IconComponent = service.icon;
                          const isSelected = formData.services.includes(service.title);
                          return (
                            <div
                              key={service.title}
                              onClick={() => handleServiceToggle(service.title)}
                              className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                                isSelected
                                  ? "bg-[#FFB343]/10"
                                  : "hover:bg-accent"
                              }`}
                            >
                              <div
                                className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                                  isSelected
                                    ? "bg-[#FFB343] text-black"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                }`}
                              >
                                <IconComponent className="w-3.5 h-3.5" />
                              </div>
                              <span className="flex-1 text-sm text-foreground">
                                {service.title}
                              </span>
                              {isSelected && (
                                <Check className="w-4 h-4 text-[#FFB343]" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}

                {/* Selected services tags */}
                {formData.services.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {formData.services.map((serviceName) => (
                      <span
                        key={serviceName}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-md font-medium"
                      >
                        {serviceName.length > 25 ? serviceName.slice(0, 25) + "..." : serviceName}
                        <button
                          type="button"
                          onClick={() => handleServiceToggle(serviceName)}
                          className="hover:bg-white/20 dark:hover:bg-black/20 rounded-full p-0.5"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2 text-sm">
                  <MessageSquare className="w-4 h-4 text-[#FFB343]" />
                  Mesaj
                </Label>
                <Textarea
                  id="message"
                  placeholder="Descrieți pe scurt nevoile afacerii..."
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="min-h-[80px] resize-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer with submit button */}
      {!isSuccess && (
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex-shrink-0">
          {error && (
            <div className="mb-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className="w-full bg-[#FFB343] hover:bg-[#FFC56D] text-black disabled:opacity-50 h-12"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                Se trimite...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Trimite cererea
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            * Câmpuri obligatorii
          </p>
        </div>
      )}
    </div>
  );

  // Services selection drawer for mobile
  const servicesDrawer = (
    <Drawer open={isServicesOpen} onOpenChange={setIsServicesOpen}>
      <DrawerContent className="max-h-[70vh]">
        <DrawerHeader className="border-b border-gray-100 dark:border-gray-800">
          <DrawerTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FFB343]" />
            Selectați serviciile
          </DrawerTitle>
          <DrawerDescription>
            Alegeți serviciile care vă interesează
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-2 overflow-y-auto">
          {services.map((service) => {
            const IconComponent = service.icon;
            const isSelected = formData.services.includes(service.title);
            return (
              <div
                key={service.title}
                onClick={() => handleServiceToggle(service.title)}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 active:scale-[0.98] ${
                  isSelected
                    ? "border-[#FFB343] bg-[#FFB343]/10"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-[#FFB343] text-black"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="flex-1 font-medium text-foreground text-sm">
                  {service.title}
                </span>
                <Checkbox
                  checked={isSelected}
                  className="data-[state=checked]:bg-[#FFB343] data-[state=checked]:border-[#FFB343]"
                />
              </div>
            );
          })}
        </div>
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <Button
            onClick={() => setIsServicesOpen(false)}
            className="w-full bg-[#FFB343] hover:bg-[#FFC56D] text-black h-12"
          >
            <Check className="w-4 h-4 mr-2" />
            Gata ({formData.services.length} selectate)
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );

  if (isMobile) {
    return (
      <>
        <Drawer open={open} onOpenChange={onOpenChange}>
          <DrawerContent className="h-[85vh] max-h-[85vh] overflow-hidden">
            <DrawerHeader className="border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
              <DrawerTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FFB343]" />
                Contactează-ne
              </DrawerTitle>
              <DrawerDescription>
                Completează formularul și noi vom lua legătura cu tine în cel mai scurt timp
              </DrawerDescription>
            </DrawerHeader>
            {formContent}
          </DrawerContent>
        </Drawer>
        {servicesDrawer}
      </>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden max-h-[90vh]">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FFB343]" />
            Contactează-ne
          </DialogTitle>
          <DialogDescription>
            Completează formularul și noi vom lua legătura cu tine în cel mai scurt timp
          </DialogDescription>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}
