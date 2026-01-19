"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Scale, Pill, Truck, Package, ShoppingCart, Factory, HardHat, Info, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import OCRequestForm from "@/components/OCRequestForm";

const businessTypes = [
  {
    title: "Comerț cu amănuntul",
    description: "Servicii contabile pentru magazine, supermarketuri și centre comerciale",
    icon: ShoppingCart,
    color: "bg-[#FFB343] text-gray-800",
    details: "Oferim servicii complete de contabilitate pentru afacerile ce desfășoară comerț cu amănuntul sau cu ridicata.",
    taxInfo: {
      vat: "TVA standard 20% la majoritatea produselor, exceptând produsele alimentare de primă necesitate (8%)",
      income: "Regimul general de impozitare 12% din profit (venituri-cheltuieli) cu posibilitatea aplicării regimului pentru IMM-uri (4% din venituri ajustate)",
      benefits: "Scutiri de TVA pentru anumite produse alimentare și medicale, facilități pentru întreprinderile mici",
      special: "Regimul fiscal simplificat pentru întreprinderi cu venituri sub 9 milioane lei"
    }
  },
  {
    title: "Servicii IT",
    description: "Contabilitate specializată pentru companii de dezvoltare software și servicii digitale",
    icon: Building2,
    color: "bg-[#FFB343] text-gray-800",
    details: "Servicii contabile adaptate specificului IT: transferuri internaționale, consultanță privind contractele cu nerezidenții, optimizare fiscală",
    taxInfo: {
      vat: "Serviciile exportate sunt scutite de TVA, iar pentru serviciile locale se aplică TVA 20%. Posibilitatea restituirii TVA acumulată în cont.",
      income: "Regimul general de impozitare 12% din profit (venituri-cheltuieli) cu posibilitatea aplicării regimului pentru IMM-uri. Regimul special de impozitare al rezidenților MITP – suma maximă dintre a) 7% din veniturile din vânzări sau b) numărul de angajați la companie înmulțit la 30% din salariul mediu pe economie",
      benefits: "Regimul fiscal special pentru rezidenții parcului IT, facilități pentru angajați",
      special: "Regim preferențial în Parcul IT Moldova cu impozit pe profit 0% pentru anumite activități"
    }
  },
  {
    title: "Construcții",
    description: "Servicii contabile pentru companii de construcții și servicii de renovare/montare",
    icon: HardHat,
    color: "bg-[#FFB343] text-gray-800",
    details: "Contabilitate specializată pentru construcții: evidența materialelor și lucrărilor, calculul costurilor, gestionarea contractelor.",
    taxInfo: {
      vat: "TVA standard 20% pentru lucrări de renovare, finisare, reparații, montare. Vânzarea locuințelor – cota TVA 0%.",
      income: "Regimul general de impozitare 12% din profit (venituri-cheltuieli), cu posibilitatea aplicării regimului pentru IMM-uri (4% din venituri ajustate)",
      benefits: "Facilități fiscale pentru construcția de locuințe sociale și infrastructură",
      special: "Regimul de taxare inversă pentru anumite lucrări de construcții"
    }
  },
  {
    title: "Producție",
    description: "Contabilitate pentru întreprinderi de producere și prelucrare a materiilor prime.",
    icon: Factory,
    color: "bg-[#FFB343] text-gray-800",
    details: "Servicii contabile pentru producție: calculul costurilor de producție, gestionarea stocurilor de materii prime și produse finite.",
    taxInfo: {
      vat: "TVA standard 20%, exportul TVA 0%, unele facilități la importul utilajelor",
      income: "Regimul general de impozitare 12% din profit, cu posibilitatea aplicării regimului pentru IMM-uri 4%",
      benefits: "Facilități pentru investiții în echipamente noi și tehnologii verzi",
      special: "Zone economice libere cu facilități fiscale speciale pentru producători"
    }
  },
  {
    title: "Transport și logistică",
    description: "Servicii contabile pentru companii de transport și expediții",
    icon: Truck,
    color: "bg-[#FFB343] text-gray-800",
    details: "Evidență contabilă pentru serviciile de transport și expediții: calculația costurilor, gestionarea expedițiilor, restituirea TVA pentru serviciile de transport internațional",
    taxInfo: {
      vat: "TVA standard 20% pentru servicii transport național, TVA 0% pentru serviciile de transport internațional",
      income: "Regimul general de impozitare 12% din profit",
      benefits: "Facilități pentru transportul de mărfuri și pasageri în regim internațional",
      special: "Regimuri fiscale speciale pentru transportul internațional de mărfuri"
    }
  },
  {
    title: "Agricultură",
    description: "Contabilitate pentru companii care desfășoară activitate în domeniul agricol",
    icon: Package,
    color: "bg-[#FFB343] text-gray-800",
    details: "Evidență contabilă pentru întreprinderile agricole: calculul costurilor, evidența materialelor și culturilor, gestionarea subvențiilor",
    taxInfo: {
      vat: "TVA 8% pentru produse agricole de bază, posibilitatea restituirii TVA",
      income: "Regimul general de impozitare 12% din profit",
      benefits: "Facilități fiscale pentru producătorii agricoli, facilități la export, accesul la subvenții de stat",
      special: "Regim fiscal preferențial pentru producătorii agricoli cu venituri sub anumite praguri"
    }
  },
  {
    title: "Educație",
    description: "Servicii contabile pentru instituții private de învățământ și centre de formare",
    icon: Scale,
    color: "bg-[#FFB343] text-gray-800",
    details: "Evidență contabilă pentru companii din domeniul educației: calculul costurilor, calculul salariilor și evidența personalului.",
    taxInfo: {
      vat: "Scutire de TVA pentru servicii educaționale de bază și formare profesională",
      income: "Regimul general de impozitare 12% din profit sau regimul pentru IMM (4% din venitul din vânzări)",
      benefits: "Scutiri pentru activități educaționale și de cercetare științifică",
      special: "Regim fiscal preferențial pentru instituțiile de învățământ acreditate"
    }
  },
  {
    title: "Turism și HoReCa",
    description: "Contabilitate pentru hoteluri, restaurante, agenții de turism",
    icon: Pill,
    color: "bg-[#FFB343] text-gray-800",
    details: "Evidență contabilă pentru companii din domeniul turism și HoReCa: calculul costurilor, gestionarea pachetelor turistice, raportarea TVA",
    taxInfo: {
      vat: "TVA 8% pentru servicii cazare, alimentație publică",
      income: "Regimul general de impozitare 12% din profit sau regimul pentru IMM (4% din venitul din vânzări)",
      benefits: "Facilități fiscale privind cota TVA, facilități la investiții",
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

            return (
              <motion.div
                key={business.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
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