import { Metadata } from "next";
import AnalizaFinanciaraContent from "@/components/pages/AnalizaFinanciaraContent";
import { ServiceJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Analiză și Diagnostic Financiar",
  description:
    "Analiză financiară profesională în Moldova. Evaluarea performanței, identificarea tendințelor, recomandări pentru optimizare costuri și creșterea profitabilității.",
  keywords: [
    "analiză financiară Moldova",
    "diagnostic financiar",
    "evaluare performanță afacere",
    "consultanță financiară Chișinău",
    "raport financiar",
    "optimizare costuri",
  ],
  openGraph: {
    title: "Analiză și Diagnostic Financiar | EgoTax",
    description:
      "Analiză financiară profesională pentru decizii informate. Rapoarte detaliate și recomandări acționabile.",
    url: "https://egotax.md/servicii/analiza-financiara",
    type: "website",
  },
  alternates: {
    canonical: "https://egotax.md/servicii/analiza-financiara",
  },
};

export default function AnalizaFinanciaraPage() {
  return (
    <>
      <ServiceJsonLd
        name="Analiză și Diagnostic Financiar"
        description="Analiză financiară profesională în Moldova. Evaluarea performanței financiare, identificarea tendințelor, recomandări pentru optimizare."
        url="https://egotax.md/servicii/analiza-financiara"
      />
      <AnalizaFinanciaraContent />
    </>
  );
}
