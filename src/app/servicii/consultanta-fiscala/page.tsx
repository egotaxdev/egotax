import { Metadata } from "next";
import ConsultantaFiscalaContent from "@/components/pages/ConsultantaFiscalaContent";
import { ServiceJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Consultanță Fiscală",
  description:
    "Consultanță fiscală profesională în Moldova. Optimizare fiscală legală, asistență la controale fiscale, planificare fiscală strategică. Consultație gratuită disponibilă.",
  keywords: [
    "consultanță fiscală Moldova",
    "optimizare fiscală",
    "planificare fiscală",
    "consultant fiscal Chișinău",
    "reducere impozite legal",
    "IT Park Moldova",
  ],
  openGraph: {
    title: "Consultanță Fiscală | EgoTax",
    description:
      "Consultanță fiscală profesională pentru optimizare legală a obligațiilor fiscale în Moldova.",
    url: "https://egotax.md/servicii/consultanta-fiscala",
    type: "website",
  },
  alternates: {
    canonical: "https://egotax.md/servicii/consultanta-fiscala",
  },
};

export default function ConsultantaFiscalaPage() {
  return (
    <>
      <ServiceJsonLd
        name="Consultanță Fiscală"
        description="Consultanță fiscală profesională în Moldova. Optimizare fiscală legală, asistență la controale fiscale, planificare fiscală strategică."
        url="https://egotax.md/servicii/consultanta-fiscala"
      />
      <ConsultantaFiscalaContent />
    </>
  );
}
