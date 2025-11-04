"use client"

import React, { useEffect } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import CostCalculator from '@/components/CostCalculator'
import { Calculator } from 'lucide-react'

interface CostCalculatorDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CostCalculatorDrawer({ open, onOpenChange }: CostCalculatorDrawerProps) {
  // Блокируем скролл основной страницы когда drawer открыт
  useEffect(() => {
    if (open) {
      // Блокируем скролл body
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px' // Предотвращаем сдвиг контента
    } else {
      // Восстанавливаем скролл body
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }

    // Cleanup при размонтировании компонента
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [open])

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[100vh] max-h-[100vh] flex flex-col">
        <DrawerHeader className="flex-shrink-0 w-full max-w-7xl mx-auto px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <DrawerTitle className="flex items-center gap-2 text-xl font-semibold">
            <Calculator className="h-6 w-6 text-[#ffe502]" />
            Calculator de costuri
          </DrawerTitle>
        </DrawerHeader>
        <div
          className="flex-1 overflow-y-auto overscroll-contain min-h-0"
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="w-full max-w-7xl mx-auto px-6 py-6">
            <CostCalculator isModal={true} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}