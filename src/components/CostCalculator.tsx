"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calculator, Building2, Users, Car, CreditCard, Banknote, Settings, Activity, Check, ChevronsUpDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CalculatorData {
  legalForm: string
  activityTypes: string[]
  operationsCount: number
  hasAdditionalActivity: boolean
  isVATpayer: boolean
  employeesCount: number
  cashRegisters: number
  posTerminals: number
  vehicles: number
  individualRentals: number
  credits: number
  leasing: number
  businessTrips: number
  bankAccounts: number
}

const legalForms = [
  { value: 'srl', label: 'SRL' },
  { value: 'ii', label: 'I.I.' },
  { value: 'ics', label: 'ICS' },
  { value: 'ao', label: 'AO' },
  { value: 'sa', label: 'SA' },
  { value: 'parc-it', label: 'Parc IT' },
  { value: 'apc', label: 'APC' }
]

const activityTypes = [
  { value: 'it', label: 'Companii IT' },
  { value: 'b2b', label: 'Servicii B2B' },
  { value: 'legal', label: 'Servicii juridice' },
  { value: 'pharma', label: 'Farmaceutică' },
  { value: 'logistics', label: 'Logistică' },
  { value: 'medicine', label: 'Medicină' },
  { value: 'import-export', label: 'Import/export' },
  { value: 'trade', label: 'Comerț' },
  { value: 'production', label: 'Producție' },
  { value: 'construction', label: 'Construcții' },
  { value: 'consulting', label: 'Consultanță' },
  { value: 'marketing', label: 'Marketing și publicitate' },
  { value: 'finance', label: 'Servicii financiare' },
  { value: 'education', label: 'Educație și formare' },
  { value: 'tourism', label: 'Turism și ospitalitate' },
  { value: 'transport', label: 'Transport și expediere' },
  { value: 'agriculture', label: 'Agricultură' },
  { value: 'real-estate', label: 'Imobiliare' },
  { value: 'energy', label: 'Energie și utilități' },
  { value: 'telecommunications', label: 'Telecomunicații' }
]

interface CostCalculatorProps {
  isModal?: boolean
}

export default function CostCalculator({ isModal = false }: CostCalculatorProps) {
  const [data, setData] = useState<CalculatorData>({
    legalForm: '',
    activityTypes: [],
    operationsCount: 10,
    hasAdditionalActivity: false,
    isVATpayer: false,
    employeesCount: 0,
    cashRegisters: 0,
    posTerminals: 0,
    vehicles: 0,
    individualRentals: 0,
    credits: 0,
    leasing: 0,
    businessTrips: 0,
    bankAccounts: 1
  })

  const [calculatedCost, setCalculatedCost] = useState<number>(0)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [activityComboboxOpen, setActivityComboboxOpen] = useState(false)

  // Funcția de calculare a costului
  const calculateCost = () => {
    let baseCost = 0
    
    // Costul de bază în funcție de forma juridică
    switch (data.legalForm) {
      case 'srl': baseCost = 2500; break
      case 'ii': baseCost = 1500; break
      case 'ics': baseCost = 2000; break
      case 'ao': baseCost = 1800; break
      case 'sa': baseCost = 3000; break
      case 'parc-it': baseCost = 2200; break
      case 'apc': baseCost = 1600; break
      default: baseCost = 2000
    }

    // Adăugăm costul pentru tipurile de activitate
    baseCost += data.activityTypes.length * 300
    
    // Costul în funcție de numărul de operații
    if (data.operationsCount > 50) baseCost += 500
    if (data.operationsCount > 100) baseCost += 800
    if (data.operationsCount > 200) baseCost += 1200

    // Servicii suplimentare
    if (data.hasAdditionalActivity) baseCost += 400
    if (data.isVATpayer) baseCost += 600
    if (data.employeesCount > 0) baseCost += data.employeesCount * 150
    if (data.cashRegisters > 0) baseCost += data.cashRegisters * 200
    if (data.posTerminals > 0) baseCost += data.posTerminals * 150
    if (data.vehicles > 0) baseCost += data.vehicles * 300
    if (data.individualRentals > 0) baseCost += data.individualRentals * 100
    if (data.credits > 0) baseCost += data.credits * 250
    if (data.leasing > 0) baseCost += data.leasing * 200
    if (data.businessTrips > 0) baseCost += data.businessTrips * 100
    if (data.bankAccounts > 1) baseCost += (data.bankAccounts - 1) * 100

    return baseCost
  }

  useEffect(() => {
    setCalculatedCost(calculateCost())
  }, [data])

  const handleActivityTypeChange = (activityValue: string) => {
    if (!data.activityTypes.includes(activityValue)) {
      setData(prev => ({
        ...prev,
        activityTypes: [...prev.activityTypes, activityValue]
      }))
    }
  }

  const removeActivityType = (activityValue: string) => {
    setData(prev => ({
      ...prev,
      activityTypes: prev.activityTypes.filter(type => type !== activityValue)
    }))
  }

  const getOperationRange = () => {
    if (data.operationsCount <= 10) return '1-10'
    if (data.operationsCount <= 20) return '11-20'
    if (data.operationsCount <= 30) return '21-30'
    if (data.operationsCount <= 40) return '31-40'
    if (data.operationsCount <= 50) return '41-50'
    if (data.operationsCount <= 60) return '51-60'
    if (data.operationsCount <= 70) return '61-70'
    if (data.operationsCount <= 80) return '71-80'
    if (data.operationsCount <= 90) return '81-90'
    if (data.operationsCount <= 100) return '91-100'
    return '100+'
  }

  const hasAdvancedFields = data.cashRegisters > 0 || data.posTerminals > 0 || 
    data.vehicles > 0 || data.individualRentals > 0 || data.credits > 0 || 
    data.leasing > 0 || data.businessTrips > 0 || data.bankAccounts > 1

  return (
    <section className={isModal ? "" : "py-12 bg-white dark:bg-black"}>
      <div className={isModal ? "" : "container mx-auto px-4"}>
        {!isModal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Calculator className="h-6 w-6 text-[#ffe502]" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Calculator de costuri
              </h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Calculul rapid al costului serviciilor contabile
            </p>
          </motion.div>
        )}

        <div className={isModal ? "" : "max-w-5xl mx-auto"}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Formă compactă de calculator */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="border-2 border-gray-200 dark:border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Building2 className="h-6 w-6 text-[#ffe502]" />
                    Parametrii afacerii
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="rounded-lg bg-white dark:bg-gray-900/50 p-1 grid w-full grid-cols-2 h-12 sm:h-14 mb-3 sm:mb-4">
                      <TabsTrigger value="basic" className="w-full h-full flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base font-medium px-3 sm:px-4 py-2 sm:py-3 rounded-md transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm">
                        <Building2 className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                        <span className="truncate">Principal</span>
                      </TabsTrigger>
                      <TabsTrigger value="advanced" className="w-full h-full flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base font-medium px-3 sm:px-4 py-2 sm:py-3 rounded-md transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm">
                        <Settings className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                        <span className="truncate">Suplimentar</span>
                        {hasAdvancedFields && (
                          <div className="ml-0.5 sm:ml-1 h-2 w-2 bg-blue-500 rounded-full shrink-0"></div>
                        )}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-8 mt-4">
                      {/* Forma juridică și Plătitor TVA */}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-center justify-between p-5 border rounded-lg">
                          <Label className="text-base font-medium">Forma juridică</Label>
                          <Select value={data.legalForm} onValueChange={(value) => setData(prev => ({ ...prev, legalForm: value }))}>
                            <SelectTrigger className="w-32 h-10 text-sm">
                              <SelectValue placeholder="Selectați" />
                            </SelectTrigger>
                            <SelectContent>
                              {legalForms.map((form) => (
                                <SelectItem key={form.value} value={form.value} className="text-sm">
                                  {form.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between p-5 border rounded-lg">
                          <Label htmlFor="vat-payer" className="text-base">
                            Plătitor TVA
                          </Label>
                          <Switch
                            id="vat-payer"
                            checked={data.isVATpayer}
                            onCheckedChange={(checked) => setData(prev => ({ ...prev, isVATpayer: checked }))}
                          />
                        </div>
                      </div>

                      {/* Tipuri de activitate - combobox modern */}
                      <div className="space-y-4">
                        <Label className="text-base font-medium">
                          Tipuri de activitate ({data.activityTypes.length} selectate)
                        </Label>
                        
                        {/* Tipuri de activitate selectate */}
                        {data.activityTypes.length > 0 && (
                          <div className="flex flex-wrap gap-3 mb-4">
                            {data.activityTypes.map((activityValue) => {
                              const activity = activityTypes.find(a => a.value === activityValue)
                              return activity ? (
                                <Badge key={activityValue} variant="secondary" className="text-sm py-2 px-4">
                                  {activity.label}
                                  <button
                                    onClick={() => removeActivityType(activityValue)}
                                    className="ml-2 hover:bg-gray-200 rounded-full p-1"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </Badge>
                              ) : null
                            })}
                          </div>
                        )}

                        {/* Combobox pentru adăugarea de noi tipuri de activitate */}
                        <Popover open={activityComboboxOpen} onOpenChange={setActivityComboboxOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={activityComboboxOpen}
                              className="w-full justify-between text-base h-14"
                            >
                              Adăugați tip de activitate
                              <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent 
                            className="w-[--radix-popover-trigger-width] p-0 max-h-[300px]"
                            onWheel={(e) => e.stopPropagation()}
                          >
                            <Command>
                              <CommandInput placeholder="Căutați tipuri de activitate..." className="h-12 text-base" />
                              <CommandList 
                                className="max-h-[240px] overflow-y-auto"
                                onWheel={(e) => {
                                  e.stopPropagation();
                                  // Проверяем, достигли ли мы границ скролла
                                  const target = e.currentTarget;
                                  const { scrollTop, scrollHeight, clientHeight } = target;
                                  
                                  // Если скролим вверх и уже в начале, или вниз и в конце - предотвращаем всплытие
                                  if ((e.deltaY < 0 && scrollTop === 0) || 
                                      (e.deltaY > 0 && scrollTop + clientHeight >= scrollHeight)) {
                                    e.preventDefault();
                                  }
                                }}
                              >
                                <CommandEmpty>Nu s-au găsit tipuri de activitate.</CommandEmpty>
                                <CommandGroup>
                                  {activityTypes
                                    .filter(activity => !data.activityTypes.includes(activity.value))
                                    .map((activity) => (
                                    <CommandItem
                                      key={activity.value}
                                      value={activity.label}
                                      onSelect={() => {
                                        handleActivityTypeChange(activity.value)
                                        setActivityComboboxOpen(false)
                                      }}
                                      className="text-base py-4"
                                    >
                                      {activity.label}
                                      <Check
                                        className={cn(
                                          "ml-auto h-5 w-5",
                                          data.activityTypes.includes(activity.value)
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Operații pe lună */}
                       <div className="space-y-4">
                         <div className="flex items-center justify-between">
                           <Label className="text-base font-medium">Operații pe lună</Label>
                           <Badge variant="outline" className="text-base py-2 px-4">{getOperationRange()}</Badge>
                         </div>
                         <Slider
                           value={[data.operationsCount]}
                           onValueChange={(value) => {
                             // Округляем до ближайшего кратного 10
                             const roundedValue = Math.ceil(value[0] / 10) * 10
                             setData(prev => ({ ...prev, operationsCount: roundedValue }))
                           }}
                           max={100}
                           min={10}
                           step={10}
                           className="w-full h-4"
                         />
                         <div className="flex justify-between text-sm text-gray-500">
                           <span>10</span>
                           <span className="font-medium text-base">{data.operationsCount}</span>
                           <span>100</span>
                         </div>
                       </div>

                      {/* Angajați */}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="text-base font-medium flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Angajați
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            value={data.employeesCount}
                            onChange={(e) => setData(prev => ({ ...prev, employeesCount: parseInt(e.target.value) || 0 }))}
                            className="h-12 text-base"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-base font-medium flex items-center gap-2">
                            <Banknote className="h-5 w-5" />
                            Conturi bancare
                          </Label>
                          <Input
                            type="number"
                            min="1"
                            value={data.bankAccounts}
                            onChange={(e) => setData(prev => ({ ...prev, bankAccounts: parseInt(e.target.value) || 1 }))}
                            className="h-12 text-base"
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="advanced" className="space-y-6 mt-4">
                      <div className="text-base text-gray-600 dark:text-gray-400 mb-6">
                        Parametri suplimentari pentru calculul exact
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="text-base">Case de marcat</Label>
                          <Input
                            type="number"
                            min="0"
                            value={data.cashRegisters}
                            onChange={(e) => setData(prev => ({ ...prev, cashRegisters: parseInt(e.target.value) || 0 }))}
                            className="h-12 text-base"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-base">Terminale POS</Label>
                          <Input
                            type="number"
                            min="0"
                            value={data.posTerminals}
                            onChange={(e) => setData(prev => ({ ...prev, posTerminals: parseInt(e.target.value) || 0 }))}
                            className="h-12 text-base"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-base flex items-center gap-2">
                            <Car className="h-4 w-4" />
                            Automobile
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            value={data.vehicles}
                            onChange={(e) => setData(prev => ({ ...prev, vehicles: parseInt(e.target.value) || 0 }))}
                            className="h-12 text-base"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-base">Închiriere de la pers. fizice</Label>
                          <Input
                            type="number"
                            min="0"
                            value={data.individualRentals}
                            onChange={(e) => setData(prev => ({ ...prev, individualRentals: parseInt(e.target.value) || 0 }))}
                            className="h-12 text-base"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-base flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Credite
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            value={data.credits}
                            onChange={(e) => setData(prev => ({ ...prev, credits: parseInt(e.target.value) || 0 }))}
                            className="h-12 text-base"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-base">Leasing</Label>
                          <Input
                            type="number"
                            min="0"
                            value={data.leasing}
                            onChange={(e) => setData(prev => ({ ...prev, leasing: parseInt(e.target.value) || 0 }))}
                            className="h-12 text-base"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-base">Delegații</Label>
                          <Input
                            type="number"
                            min="0"
                            value={data.businessTrips}
                            onChange={(e) => setData(prev => ({ ...prev, businessTrips: parseInt(e.target.value) || 0 }))}
                            className="h-12 text-base"
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>

            {/* Rezultat compact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <Card className="border-2 border-gray-200 dark:border-gray-800 sticky top-8">
                 <CardHeader className="pb-3">
                   <CardTitle className="text-center text-xl">
                     Cost
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="text-center space-y-4">
                   <div className="text-4xl font-bold text-black dark:text-white">
                     {calculatedCost.toLocaleString()} lei
                   </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    pe lună
                  </div>
                  
                  {data.legalForm && (
                    <div className="space-y-2 text-left">
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white">Inclus:</h4>
                      <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                        <li>✓ Ținerea evidenței</li>
                        <li>✓ Raportare</li>
                        <li>✓ Consultații</li>
                        {data.isVATpayer && <li>✓ Evidența TVA</li>}
                        {data.employeesCount > 0 && <li>✓ Resurse umane</li>}
                      </ul>
                    </div>
                  )}

                  <Button 
                    className="w-full bg-[#ffe502] hover:bg-yellow-500 text-black font-semibold h-12 text-base"
                  >
                    Consultație
                  </Button>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    * Costul final poate varia
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}