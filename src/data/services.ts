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
    description: "Scăpăm de observațiile Fiscului, de blocări și de debitări neclare, precum și de problemele cu fondurile.",
    icon: FileText,
    href: "/servicii/servicii-contabile"
  },
  {
    title: "Consultanță fiscală",
    description: "Consultanță fiscală eficientă: vă ajutăm să respectați obligațiile legale, optimizăm taxele și vă oferim soluții personalizate pentru afacerea dumneavoastră.",
    icon: TrendingUp,
    href: "/servicii/consultanta-fiscala"
  },
  {
    title: "Restabilirea evidenței contabile",
    description: "Restabilim evidența contabilă pentru perioade anterioare și corectăm erorile",
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
    description: "Vă ajutăm să porniți afacerea cu toate documentele și procedurile necesare",
    icon: Rocket,
    href: "/servicii/suport-initiere-afacere"
  }
];
