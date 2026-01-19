import { FileText, TrendingUp, RefreshCw, BarChart3, Rocket, LucideIcon } from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export const services: Service[] = [
  {
    title: "Servicii de evidență contabilă",
    description: "Asigurăm înregistrarea faptelor economice prin prelucrarea necontenită a documentelor primare, respectând principiile contabilității și raportării financiare",
    icon: FileText,
    href: "/servicii/servicii-contabile"
  },
  {
    title: "Consultanță fiscală",
    description: "Oferim asistență în gestionarea obligațiilor fiscale, asigurăm conformitatea prin prezentarea declarațiilor fiscale corect și în termenele stabilite de lege",
    icon: TrendingUp,
    href: "/servicii/consultanta-fiscala"
  },
  {
    title: "Restabilirea evidenței contabile",
    description: "Recuperăm înregistrările contabile pentru perioade anterioare și corectăm erorile depistate.",
    icon: RefreshCw,
    href: "/servicii/restabilirea-evidentei"
  },
  {
    title: "Analiză și diagnostic financiar",
    description: "Analizăm situația financiară și oferim recomandări pentru optimizare",
    icon: BarChart3,
    href: "/servicii/analiza-financiara"
  },
  {
    title: "Suport în inițierea afacerii",
    description: "Oferim suport complet pentru un start sigur în mediul de afaceri.",
    icon: Rocket,
    href: "/servicii/suport-initiere-afacere"
  }
];
