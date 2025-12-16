import { Metadata } from "next";
import SuportInitiereAfacereContent from "@/components/pages/SuportInitiereAfacereContent";
import { ServiceJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Suport în Inițierea Afacerii",
  description:
    "Înregistrare firmă în Moldova - SRL, II, Asociație. Asistență completă: documente, înregistrare la ASP și SFS, deschidere cont bancar. Consultație gratuită.",
  keywords: [
    "înregistrare firmă Moldova",
    "deschidere SRL Moldova",
    "înregistrare întreprindere individuală",
    "înregistrare afacere Chișinău",
    "start-up Moldova",
    "înființare companie",
  ],
  openGraph: {
    title: "Suport în Inițierea Afacerii | EgoTax",
    description:
      "Asistență completă pentru înregistrarea și lansarea afacerii în Moldova. De la idee la prima factură.",
    url: "https://egotax.md/servicii/suport-initiere-afacere",
    type: "website",
  },
  alternates: {
    canonical: "https://egotax.md/servicii/suport-initiere-afacere",
  },
};

export default function SuportInitiereAfacerePage() {
  return (
    <>
      <ServiceJsonLd
        name="Suport în Inițierea Afacerii"
        description="Asistență completă pentru înregistrarea firmei în Moldova. Înregistrare SRL, II, Asociație. Pregătirea documentelor, înregistrare la ASP și SFS."
        url="https://egotax.md/servicii/suport-initiere-afacere"
      />
      <SuportInitiereAfacereContent />
    </>
  );
}
