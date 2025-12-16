import { Metadata } from "next";
import RestabilireaEvidenteiContent from "@/components/pages/RestabilireaEvidenteiContent";
import { ServiceJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Restabilirea Evidenței Contabile",
  description:
    "Restabilirea evidenței contabile în Moldova. Corectăm erorile, reconstituim documentele lipsă, eliminăm riscurile de sancțiuni fiscale. Evaluare gratuită.",
  keywords: [
    "restabilire contabilitate Moldova",
    "corectare erori contabile",
    "reconstituire evidență contabilă",
    "audit contabil Moldova",
    "corectare declarații fiscale",
  ],
  openGraph: {
    title: "Restabilirea Evidenței Contabile | EgoTax",
    description:
      "Restabilim evidența contabilă și corectăm erorile din perioade anterioare. Evaluare gratuită.",
    url: "https://egotax.md/servicii/restabilirea-evidentei",
    type: "website",
  },
  alternates: {
    canonical: "https://egotax.md/servicii/restabilirea-evidentei",
  },
};

export default function RestabilireaEvidenteiPage() {
  return (
    <>
      <ServiceJsonLd
        name="Restabilirea Evidenței Contabile"
        description="Restabilirea evidenței contabile pentru perioade anterioare. Corectăm erorile, reconstituim documentele lipsă, eliminăm riscurile de sancțiuni fiscale."
        url="https://egotax.md/servicii/restabilirea-evidentei"
      />
      <RestabilireaEvidenteiContent />
    </>
  );
}
