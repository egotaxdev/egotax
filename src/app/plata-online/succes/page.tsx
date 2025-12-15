'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  CheckCircle2,
  Home,
  FileText,
  Phone
} from 'lucide-react';
import Link from 'next/link';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const payId = searchParams.get('payId');
  const orderId = searchParams.get('orderId');
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <Card className="p-8 lg:p-12 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 lg:w-12 lg:h-12 text-green-600 dark:text-green-400" />
            </div>
          </motion.div>

          {/* Badge */}
          <Badge className="mb-4 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200">
            Plată reușită
          </Badge>

          {/* Title */}
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Mulțumim pentru plată!
          </h1>

          {/* Description */}
          <p className="text-muted-foreground mb-6">
            Plata dumneavoastră a fost procesată cu succes. Veți primi o confirmare pe email în curând.
          </p>

          {/* Order Details */}
          {(payId || orderId) && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6 text-sm">
              {orderId && (
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Nr. comandă:</span>
                  <span className="font-mono font-medium">{orderId}</span>
                </div>
              )}
              {payId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID tranzacție:</span>
                  <span className="font-mono font-medium text-xs">{payId.substring(0, 18)}...</span>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Button
              asChild
              size="lg"
              className="w-full bg-[#FFB343] text-black hover:bg-[#FFC56D]"
            >
              <Link href="/">
                <Home className="mr-2 w-4 h-4" />
                Înapoi la pagina principală
              </Link>
            </Button>

            <div className="flex gap-3">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <Link href="/servicii/servicii-contabile">
                  <FileText className="mr-2 w-4 h-4" />
                  Servicii
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <Link href="/contact">
                  <Phone className="mr-2 w-4 h-4" />
                  Contact
                </Link>
              </Button>
            </div>
          </div>

          {/* Support Info */}
          <p className="text-xs text-muted-foreground mt-6">
            Pentru întrebări, contactați-ne la{' '}
            <a href="tel:+37361142323" className="text-[#FFB343] hover:underline">
              +(373) 61 142 323
            </a>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FFB343] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
