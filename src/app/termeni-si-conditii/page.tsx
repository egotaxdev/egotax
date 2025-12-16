import { Metadata } from "next";
import TermeniSiConditiiContent from "@/components/pages/TermeniSiConditiiContent";

export const metadata: Metadata = {
  title: "Termeni și Condiții",
  description:
    "Termeni și condiții de utilizare a serviciilor EgoTax SRL. Informații despre plăți, livrare servicii, returnări, protecția datelor personale.",
  keywords: [
    "termeni și condiții EgoTax",
    "politica de confidențialitate",
    "condiții servicii contabile",
  ],
  openGraph: {
    title: "Termeni și Condiții | EgoTax",
    description:
      "Termeni și condiții de utilizare a serviciilor EgoTax SRL Moldova.",
    url: "https://egotax.md/termeni-si-conditii",
    type: "website",
  },
  alternates: {
    canonical: "https://egotax.md/termeni-si-conditii",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermeniSiConditiiPage() {
  return <TermeniSiConditiiContent />;
}
