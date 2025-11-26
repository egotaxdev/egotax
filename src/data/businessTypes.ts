import { Building2, Briefcase, Scale, Pill, Truck, Stethoscope, Package, ShoppingCart, Factory, HardHat, LucideIcon } from "lucide-react";

export interface BusinessType {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  clients: number;
  experience: number;
  details: string;
  taxInfo: {
    vat: string;
    income: string;
    benefits: string;
    special: string;
  };
}

export const businessTypes: BusinessType[] = [
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
