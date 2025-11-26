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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Building2,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  Calculator,
  Send,
  Users,
  FileText,
} from "lucide-react";

interface CalculatorData {
  legalForm: string;
  legalFormLabel: string;
  activityTypes: string[];
  operationsCount: number;
  hasAdditionalActivity: boolean;
  isVATpayer: boolean;
  employeesCount: number;
  cashRegisters: number;
  posTerminals: number;
  vehicles: number;
  individualRentals: number;
  credits: number;
  leasing: number;
  businessTrips: number;
  bankAccounts: number;
  estimatedCost: number;
}

interface CalculatorRequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  calculatorData: CalculatorData;
}

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  company: "",
  phone: "",
  email: "",
  message: "",
};

export default function CalculatorRequestForm({
  open,
  onOpenChange,
  calculatorData,
}: CalculatorRequestFormProps) {
  const [isMobile, setIsMobile] = useState(true);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    // Build additional services list
    const additionalServices: string[] = [];
    if (calculatorData.cashRegisters > 0) additionalServices.push(`Case de marcat: ${calculatorData.cashRegisters}`);
    if (calculatorData.posTerminals > 0) additionalServices.push(`Terminale POS: ${calculatorData.posTerminals}`);
    if (calculatorData.vehicles > 0) additionalServices.push(`Automobile: ${calculatorData.vehicles}`);
    if (calculatorData.individualRentals > 0) additionalServices.push(`Închiriere pers. fizice: ${calculatorData.individualRentals}`);
    if (calculatorData.credits > 0) additionalServices.push(`Credite: ${calculatorData.credits}`);
    if (calculatorData.leasing > 0) additionalServices.push(`Leasing: ${calculatorData.leasing}`);
    if (calculatorData.businessTrips > 0) additionalServices.push(`Delegații: ${calculatorData.businessTrips}`);
    if (calculatorData.bankAccounts > 1) additionalServices.push(`Conturi bancare: ${calculatorData.bankAccounts}`);
    if (calculatorData.activityTypes.length > 0) {
      additionalServices.push(`Activități: ${calculatorData.activityTypes.join(', ')}`);
    }

    try {
      const response = await fetch('/api/submit-calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          companyName: formData.company || undefined,
          legalForm: calculatorData.legalForm,
          legalFormLabel: calculatorData.legalFormLabel,
          employeeCount: calculatorData.employeesCount,
          monthlyOperations: calculatorData.operationsCount,
          hasVat: calculatorData.isVATpayer,
          hasForeignOperations: calculatorData.hasAdditionalActivity,
          additionalServices,
          estimatedPrice: calculatorData.estimatedCost,
          message: formData.message || undefined,
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
                Vă mulțumim pentru interes. Echipa noastră vă va contacta în cel mai scurt timp posibil cu o ofertă personalizată.
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
              {/* Calculator Summary */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cost estimat</span>
                  <span className="text-xl font-bold text-foreground">
                    {calculatorData.estimatedCost.toLocaleString()} lei/lună
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {calculatorData.legalFormLabel && calculatorData.legalFormLabel !== 'Selectați' && (
                    <Badge variant="secondary" className="text-xs">
                      {calculatorData.legalFormLabel}
                    </Badge>
                  )}
                  {calculatorData.isVATpayer && (
                    <Badge variant="secondary" className="text-xs">
                      Plătitor TVA
                    </Badge>
                  )}
                  {calculatorData.employeesCount > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {calculatorData.employeesCount} angajați
                    </Badge>
                  )}
                  <Badge variant="secondary" className="text-xs">
                    {calculatorData.operationsCount} operații/lună
                  </Badge>
                  {calculatorData.bankAccounts > 1 && (
                    <Badge variant="secondary" className="text-xs">
                      {calculatorData.bankAccounts} conturi bancare
                    </Badge>
                  )}
                  {calculatorData.cashRegisters > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {calculatorData.cashRegisters} case de marcat
                    </Badge>
                  )}
                  {calculatorData.posTerminals > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {calculatorData.posTerminals} terminale POS
                    </Badge>
                  )}
                  {calculatorData.vehicles > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {calculatorData.vehicles} automobile
                    </Badge>
                  )}
                  {calculatorData.credits > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {calculatorData.credits} credite
                    </Badge>
                  )}
                  {calculatorData.leasing > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {calculatorData.leasing} leasing
                    </Badge>
                  )}
                  {calculatorData.individualRentals > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {calculatorData.individualRentals} închirieri
                    </Badge>
                  )}
                  {calculatorData.businessTrips > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {calculatorData.businessTrips} delegații
                    </Badge>
                  )}
                </div>
                {/* Activity types */}
                {calculatorData.activityTypes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-muted-foreground mr-1">Activități:</span>
                    {calculatorData.activityTypes.map((activity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calc-name" className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-[#FFB343]" />
                    Nume *
                  </Label>
                  <Input
                    id="calc-name"
                    placeholder="Ion Popescu"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calc-phone" className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-[#FFB343]" />
                    Telefon *
                  </Label>
                  <Input
                    id="calc-phone"
                    type="tel"
                    placeholder="+373 XX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calc-company" className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-[#FFB343]" />
                    Companie
                  </Label>
                  <Input
                    id="calc-company"
                    placeholder="Numele companiei"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calc-email" className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-[#FFB343]" />
                    Email
                  </Label>
                  <Input
                    id="calc-email"
                    type="email"
                    placeholder="email@exemplu.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="calc-message" className="flex items-center gap-2 text-sm">
                  <MessageSquare className="w-4 h-4 text-[#FFB343]" />
                  Mesaj (opțional)
                </Label>
                <Textarea
                  id="calc-message"
                  placeholder="Informații suplimentare despre afacerea dvs..."
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
                Solicită ofertă personalizată
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

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[85vh] max-h-[85vh] overflow-hidden">
          <DrawerHeader className="border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
            <DrawerTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#FFB343]" />
              Solicitați consultație
            </DrawerTitle>
            <DrawerDescription>
              Completați datele pentru a primi o ofertă personalizată
            </DrawerDescription>
          </DrawerHeader>
          {formContent}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden max-h-[90vh]">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#FFB343]" />
            Solicitați consultație
          </DialogTitle>
          <DialogDescription>
            Completați datele pentru a primi o ofertă personalizată
          </DialogDescription>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}
