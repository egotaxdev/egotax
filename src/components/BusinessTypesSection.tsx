"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Briefcase, Scale, Pill, Truck, Stethoscope, Package, ShoppingCart, Factory, HardHat, Info, Users, TrendingUp, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import OCRequestForm from "@/components/OCRequestForm";

const businessTypes = [
  {
    title: "Comerț cu amănuntul",
    description: "Servicii contabile pentru magazine, supermarketuri și centre comerciale",
    icon: ShoppingCart,
    color: "bg-[#FFB343] text-gray-800",
    clients: 45,
    experience: 95,
    details: "Oferim servicii complete de contabilitate pentru afacerile din comerțul cu amănuntul, inclusiv gestionarea inventarului, calculul TVA, raportarea fiscală și optimizarea costurilor operaționale.",
    taxInfo: {
      vat: "TVA standard 20% pentru majoritatea produselor, cu excepții pentru produse alimentare de bază (8%)",
      income: "Impozit pe profit 12% pentru întreprinderi, cu posibilitatea aplicării regimului simplificat",
      benefits: "Scutiri de TVA pentru anumite produse alimentare și medicale, facilități pentru întreprinderile mici",
      special: "Regimul fiscal simplificat pentru întreprinderi cu venituri sub 9 milioane lei"
    }
  },
  {
    title: "Servicii IT",
    description: "Contabilitate specializată pentru companii de dezvoltare software și servicii digitale",
    icon: Building2,
    color: "bg-[#FFB343] text-gray-800",
    clients: 32,
    experience: 88,
    details: "Servicii contabile adaptate specificului IT: gestionarea contractelor cu clienții străini, calculul TVA pentru servicii digitale, optimizarea fiscală pentru export de servicii și consultanță în domeniul proprietății intelectuale.",
    taxInfo: {
      vat: "Scutire de TVA pentru servicii IT exportate, TVA 20% pentru servicii locale",
      income: "Impozit pe profit 12%, cu facilități pentru parcurile IT și zonele economice libere",
      benefits: "Scutiri fiscale în parcurile IT, facilități pentru angajații din domeniul IT",
      special: "Regim preferențial în Parcul IT Moldova cu impozit pe profit 0% pentru anumite activități"
    }
  },
  {
    title: "Construcții",
    description: "Servicii contabile pentru companii de construcții și dezvoltare imobiliară",
    icon: HardHat,
    color: "bg-[#FFB343] text-gray-800",
    clients: 28,
    experience: 92,
    details: "Contabilitate specializată pentru construcții: evidența materialelor și lucrărilor, calculul costurilor pe proiecte, gestionarea contractelor pe termen lung și conformitatea cu reglementările din construcții.",
    taxInfo: {
      vat: "TVA 20% pentru lucrări de construcții, cu posibilitatea aplicării sistemului de taxare inversă",
      income: "Impozit pe profit 12%, cu deduceri pentru investiții în echipamente",
      benefits: "Facilități fiscale pentru construcția de locuințe sociale și infrastructură",
      special: "Regimul de taxare inversă pentru anumite lucrări de construcții"
    }
  },
  {
    title: "Producție",
    description: "Contabilitate pentru întreprinderi de producție și prelucrare",
    icon: Factory,
    color: "bg-[#FFB343] text-gray-800",
    clients: 22,
    experience: 90,
    details: "Servicii contabile pentru producție: calculul costurilor de producție, gestionarea stocurilor de materii prime și produse finite, optimizarea proceselor fiscale și conformitatea cu standardele industriale.",
    taxInfo: {
      vat: "TVA 20% standard, cu facilități pentru export și import de echipamente",
      income: "Impozit pe profit 12%, cu deduceri pentru modernizarea tehnologică",
      benefits: "Facilități pentru investiții în echipamente noi și tehnologii verzi",
      special: "Zone economice libere cu facilități fiscale speciale pentru producători"
    }
  },
  {
    title: "Servicii medicale",
    description: "Contabilitate pentru clinici, farmacii și instituții medicale",
    icon: Stethoscope,
    color: "bg-[#FFB343] text-gray-800",
    clients: 18,
    experience: 85,
    details: "Servicii contabile pentru domeniul medical: gestionarea veniturilor din servicii medicale, conformitatea cu reglementările sanitare, calculul TVA pentru servicii și medicamente, raportarea specifică domeniului.",
    taxInfo: {
      vat: "Scutire de TVA pentru servicii medicale de bază, TVA 8% pentru medicamente",
      income: "Impozit pe profit 12%, cu facilități pentru investiții în echipamente medicale",
      benefits: "Scutiri fiscale pentru servicii medicale sociale și de urgență",
      special: "Facilități speciale pentru clinicile private și centrele de diagnostic"
    }
  },
  {
    title: "Transport și logistică",
    description: "Servicii contabile pentru companii de transport și distribuție",
    icon: Truck,
    color: "bg-[#FFB343] text-gray-800",
    clients: 25,
    experience: 87,
    details: "Contabilitate pentru transport: gestionarea costurilor de combustibil, întreținere vehicule, calculul TVA pentru servicii de transport, conformitatea cu reglementările rutiere și internaționale.",
    taxInfo: {
      vat: "TVA 20% pentru servicii de transport, cu facilități pentru transport internațional",
      income: "Impozit pe profit 12%, cu deduceri pentru achiziția și întreținerea vehiculelor",
      benefits: "Facilități pentru transportul de mărfuri și pasageri în regim internațional",
      special: "Regimuri fiscale speciale pentru transportul internațional de mărfuri"
    }
  },
  {
    title: "Agricultură",
    description: "Contabilitate pentru ferme, cooperative agricole și procesarea produselor",
    icon: Package,
    color: "bg-[#FFB343] text-gray-800",
    clients: 35,
    experience: 93,
    details: "Servicii contabile agricole: gestionarea subvențiilor, calculul costurilor de producție agricolă, evidența animalelor și culturilor, conformitatea cu standardele de calitate și siguranță alimentară.",
    taxInfo: {
      vat: "TVA 8% pentru produse agricole de bază, facilități pentru producătorii agricoli",
      income: "Impozit pe profit redus pentru producătorii agricoli, facilități pentru investiții",
      benefits: "Scutiri fiscale pentru producătorii agricoli mici, facilități pentru export",
      special: "Regim fiscal preferențial pentru producătorii agricoli cu venituri sub anumite praguri"
    }
  },
  {
    title: "Servicii financiare",
    description: "Contabilitate pentru bănci, companii de asigurări și servicii financiare",
    icon: Briefcase,
    color: "bg-[#FFB343] text-gray-800",
    clients: 12,
    experience: 82,
    details: "Servicii contabile pentru sectorul financiar: conformitatea cu reglementările bancare, calculul rezervelor, raportarea către autorități, gestionarea riscurilor financiare și conformitatea internațională.",
    taxInfo: {
      vat: "Scutire de TVA pentru majoritatea serviciilor financiare și de asigurare",
      income: "Impozit pe profit 12%, cu reglementări speciale pentru instituțiile financiare",
      benefits: "Facilități pentru investiții în tehnologii financiare și digitalizare",
      special: "Reglementări speciale pentru bănci și companii de asigurări conform BNM"
    }
  },
  {
    title: "Educație",
    description: "Servicii contabile pentru instituții de învățământ și centre de formare",
    icon: Scale,
    color: "bg-[#FFB343] text-gray-800",
    clients: 15,
    experience: 78,
    details: "Contabilitate pentru educație: gestionarea taxelor de școlarizare, subvențiilor de stat, conformitatea cu reglementările educaționale, calculul salariilor pentru personal didactic.",
    taxInfo: {
      vat: "Scutire de TVA pentru servicii educaționale de bază și formare profesională",
      income: "Facilități fiscale pentru instituțiile de învățământ private și publice",
      benefits: "Scutiri pentru activități educaționale și de cercetare științifică",
      special: "Regim fiscal preferențial pentru instituțiile de învățământ acreditate"
    }
  },
  {
    title: "Turism și HoReCa",
    description: "Contabilitate pentru hoteluri, restaurante, agenții de turism",
    icon: Pill,
    color: "bg-[#FFB343] text-gray-800",
    clients: 20,
    experience: 80,
    details: "Servicii contabile pentru turism: gestionarea rezervărilor, calculul TVA pentru servicii turistice, conformitatea cu reglementările din domeniu, optimizarea costurilor operaționale sezoniere.",
    taxInfo: {
      vat: "TVA 20% pentru servicii de cazare și restaurante, facilități pentru turismul rural",
      income: "Impozit pe profit 12%, cu facilități pentru investiții în infrastructura turistică",
      benefits: "Facilități fiscale pentru turismul rural și agroturism",
      special: "Regimuri fiscale speciale pentru zonele turistice și stațiunile balneoclimaterice"
    }
  }
];

export default function BusinessTypesSection() {
  const [consultationForm, setConsultationForm] = useState({
    name: "",
    phone: "",
    businessType: "",
    message: ""
  });
  const [isMobile, setIsMobile] = useState(true);
  const [isOCFormOpen, setIsOCFormOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aici se poate adăuga logica de trimitere a formularului
    console.log("Cerere de consultanță:", consultationForm);
    // Resetarea formularului
    setConsultationForm({ name: "", phone: "", businessType: "", message: "" });
  };

  return (
    <section className="py-10 lg:py-12 px-4 lg:px-3 bg-white dark:bg-[#1e1e1e]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={isMobile ? {} : { duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 lg:mb-10"
        >
          <Badge variant="outline" className="mb-3 lg:mb-4 px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium">
            Sectoare de activitate
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent mb-3 lg:mb-4">
            Tipuri de afaceri cu care lucrăm
          </h2>
          <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Oferim servicii contabile specializate pentru o gamă largă de industrii,
            adaptându-ne la specificul fiecărui domeniu de activitate.
          </p>
        </motion.div>

        {/* Mobile Layout - Compact horizontal scroll cards */}
        <div className="lg:hidden">
          <div className="flex overflow-x-auto gap-3 pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {businessTypes.map((business, index) => {
              const IconComponent = business.icon;
              return (
                <motion.div
                  key={business.title}
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-[280px] snap-start"
                >
                  <Card className="h-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg ${business.color} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                            {business.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                            {business.description}
                          </p>
                        </div>
                      </div>

                      {/* Stats row */}
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>{business.clients} clienți</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[#FFB343] font-medium">{business.experience}%</span>
                          <span>experiență</span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <Progress value={business.experience} className="h-1.5 mb-3" />

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <Drawer>
                          <DrawerTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1 h-9 text-xs">
                              <Info className="w-3.5 h-3.5 mr-1" />
                              Detalii
                            </Button>
                          </DrawerTrigger>
                          <DrawerContent className="max-h-[85vh]">
                            <DrawerHeader className="text-left">
                              <DrawerTitle className="flex items-center gap-2 text-base">
                                <div className={`w-8 h-8 rounded-lg ${business.color} flex items-center justify-center`}>
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                {business.title}
                              </DrawerTitle>
                              <DrawerDescription className="text-sm">
                                Informații despre fiscalitate și servicii
                              </DrawerDescription>
                            </DrawerHeader>

                            <div className="px-4 pb-6 space-y-4 overflow-y-auto">
                              {/* Statistici compacte */}
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                  <div className="flex items-center justify-center gap-1 mb-0.5">
                                    <Users className="w-4 h-4 text-[#FFB343]" />
                                    <span className="text-lg font-bold">{business.clients}</span>
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-300">Clienți activi</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                  <div className="flex items-center justify-center gap-1 mb-0.5">
                                    <TrendingUp className="w-4 h-4 text-[#FFB343]" />
                                    <span className="text-lg font-bold">{business.experience}%</span>
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-300">Nivel expertiză</p>
                                </div>
                              </div>

                              {/* Serviciile noastre */}
                              <div>
                                <h4 className="font-semibold mb-2 text-sm">Serviciile noastre</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{business.details}</p>
                              </div>

                              {/* Informații fiscale compacte */}
                              <div>
                                <h4 className="font-semibold mb-2 text-sm">Fiscalitate în Moldova</h4>
                                <div className="space-y-2">
                                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    <h5 className="font-medium text-xs text-[#FFB343] mb-1">TVA</h5>
                                    <p className="text-xs text-gray-600 dark:text-gray-300">{business.taxInfo.vat}</p>
                                  </div>
                                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    <h5 className="font-medium text-xs text-[#FFB343] mb-1">Impozit pe venit</h5>
                                    <p className="text-xs text-gray-600 dark:text-gray-300">{business.taxInfo.income}</p>
                                  </div>
                                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    <h5 className="font-medium text-xs text-[#FFB343] mb-1">Beneficii</h5>
                                    <p className="text-xs text-gray-600 dark:text-gray-300">{business.taxInfo.benefits}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DrawerContent>
                        </Drawer>

                        <Button
                          size="sm"
                          onClick={() => setIsOCFormOpen(true)}
                          className="flex-1 h-9 text-xs bg-[#FFB343] text-gray-800 hover:bg-[#FF9F2E]"
                        >
                          <Phone className="w-3.5 h-3.5 mr-1" />
                          Consultanță
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          {/* Scroll indicator */}
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2">
            ← Glisați pentru a vedea mai multe →
          </p>
        </div>

        {/* Desktop Layout - Grid */}
        <div className="hidden lg:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {businessTypes.map((business, index) => {
            const IconComponent = business.icon;
            // Для последних двух элементов на xl экранах (4 колонки) добавляем специальное позиционирование
            const isSecondToLast = index === businessTypes.length - 2;
            const isLast = index === businessTypes.length - 1;

            return (
              <motion.div
                key={business.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${isSecondToLast ? 'xl:col-start-2' : ''} ${isLast ? 'xl:col-start-3' : ''}`}
              >
                <Card className="group h-full hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50 py-4 gap-4">
                  <CardHeader className="pb-2 px-4">
                    <div className={`w-10 h-10 rounded-lg ${business.color} flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-base font-semibold text-gray-900 dark:text-white transition-all duration-300 group-hover:text-[#FFB343]">
                      {business.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pt-0 pb-3 space-y-3">
                    <CardDescription className="text-gray-600 dark:text-gray-300 leading-snug">
                      {business.description}
                    </CardDescription>

                    {/* Statistici clienți */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{business.clients} clienți</span>
                    </div>

                    {/* Bara de progres experiență */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Experiență</span>
                        <span className="text-[#FFB343] font-medium">{business.experience}%</span>
                      </div>
                      <Progress value={business.experience} className="h-2" />
                    </div>

                    {/* Butoane acțiuni */}
                    <div className="flex gap-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Info className="w-4 h-4 mr-1" />
                            Detalii
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <IconComponent className="w-5 h-5" />
                              {business.title}
                            </DialogTitle>
                            <DialogDescription>
                              Informații despre fiscalitate și servicii
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4">
                            {/* Statistici compacte */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                  <Users className="w-4 h-4 text-[#FFB343]" />
                                  <span className="text-lg font-bold">{business.clients}</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-300">Clienți activi</p>
                              </div>
                              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                  <TrendingUp className="w-4 h-4 text-[#FFB343]" />
                                  <span className="text-lg font-bold">{business.experience}%</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-300">Nivel expertiză</p>
                              </div>
                            </div>

                            {/* Serviciile noastre */}
                            <div>
                              <h4 className="font-semibold mb-2 text-sm">Serviciile noastre</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{business.details}</p>
                            </div>

                            {/* Informații fiscale compacte */}
                            <div>
                              <h4 className="font-semibold mb-2 text-sm">Fiscalitate în Moldova</h4>
                              <div className="space-y-2">
                                <div className="p-2 border border-gray-200 dark:border-gray-700 rounded">
                                  <h5 className="font-medium text-sm mb-1">TVA</h5>
                                  <p className="text-xs text-gray-600 dark:text-gray-300">{business.taxInfo.vat}</p>
                                </div>
                                <div className="p-2 border border-gray-200 dark:border-gray-700 rounded">
                                  <h5 className="font-medium text-sm mb-1">Impozit pe venit</h5>
                                  <p className="text-xs text-gray-600 dark:text-gray-300">{business.taxInfo.income}</p>
                                </div>
                                <div className="p-2 border border-gray-200 dark:border-gray-700 rounded">
                                  <h5 className="font-medium text-sm mb-1">Beneficii</h5>
                                  <p className="text-xs text-gray-600 dark:text-gray-300">{business.taxInfo.benefits}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        size="sm"
                        onClick={() => setIsOCFormOpen(true)}
                        className="bg-[#FFB343] text-gray-800 hover:bg-[#FF9F2E]"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Consultanță
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* OC Request Form */}
      <OCRequestForm open={isOCFormOpen} onOpenChange={setIsOCFormOpen} />
    </section>
  );
}