import { Metadata } from "next";
import CalculatorContent from "@/components/pages/CalculatorContent";

export const metadata: Metadata = {
  title: "Calculator Salariu și Impozite",
  description:
    "Calculator gratuit pentru calcul salariu net, impozite și contribuții sociale în Moldova. Calculează salariul de mână, CAS, CASS, impozit pe venit.",
  keywords: [
    "calculator salariu Moldova",
    "calcul impozit pe venit",
    "calculator contribuții sociale",
    "salariu net Moldova",
    "calculator fiscal",
    "CAS CASS calculator",
  ],
  openGraph: {
    title: "Calculator Salariu și Impozite | EgoTax",
    description:
      "Calculator gratuit pentru calcul salariu net, impozite și contribuții sociale în Moldova.",
    url: "https://egotax.md/calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://egotax.md/calculator",
  },
};

export default function CalculatorPage() {
  return <CalculatorContent />;
}
