"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import CostCalculator from '@/components/CostCalculator'
import { Calculator } from 'lucide-react'

interface CostCalculatorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CostCalculatorModal({ open, onOpenChange }: CostCalculatorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <Calculator className="h-6 w-6 text-[#ffe502]" />
            Calculator de costuri
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6">
          <CostCalculator isModal={true} />
        </div>
      </DialogContent>
    </Dialog>
  )
}