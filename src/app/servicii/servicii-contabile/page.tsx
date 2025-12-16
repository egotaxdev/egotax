import { Metadata } from "next";
import ServiciiContabileContent from "@/components/pages/ServiciiContabileContent";
import { ServiceJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Servicii de Evidență Contabilă",
  description:
    "Servicii profesionale de evidență contabilă în Moldova. Ținerea contabilității, întocmirea rapoartelor fiscale, calculul impozitelor. Pachete personalizate de la 3000 MDL/lună.",
  keywords: [
    "servicii contabile Moldova",
    "evidență contabilă Chișinău",
    "contabilitate pentru afaceri",
    "rapoarte fiscale Moldova",
    "ținere contabilitate",
    "contabil extern Moldova",
  ],
  openGraph: {
    title: "Servicii de Evidență Contabilă | EgoTax",
    description:
      "Servicii profesionale de evidență contabilă în Moldova. Pachete personalizate pentru afaceri mici și mijlocii.",
    url: "https://egotax.md/servicii/servicii-contabile",
    type: "website",
  },
  alternates: {
    canonical: "https://egotax.md/servicii/servicii-contabile",
  },
};

export default function ServiciiContabilePage() {
  return (
    <>
      <ServiceJsonLd
        name="Servicii de Evidență Contabilă"
        description="Servicii profesionale de evidență contabilă pentru afaceri în Moldova. Ținerea contabilității complete, întocmirea rapoartelor fiscale, calculul și plata impozitelor."
        url="https://egotax.md/servicii/servicii-contabile"
      />
      <ServiciiContabileContent />
    </>
  );
}
