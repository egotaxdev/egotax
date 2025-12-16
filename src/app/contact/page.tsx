import { Metadata } from "next";
import ContactContent from "@/components/pages/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactați EgoTax pentru servicii de contabilitate și consultanță fiscală în Moldova. Telefon: +(373) 61 142 323, Email: info@egotax.md. Consultație gratuită disponibilă.",
  keywords: [
    "contact EgoTax",
    "telefon contabilitate Moldova",
    "email contabilitate Chișinău",
    "consultație gratuită contabilitate",
    "program lucru EgoTax",
  ],
  openGraph: {
    title: "Contact | EgoTax",
    description:
      "Contactați-ne pentru servicii de contabilitate și consultanță fiscală. Consultație gratuită disponibilă.",
    url: "https://egotax.md/contact",
    type: "website",
  },
  alternates: {
    canonical: "https://egotax.md/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
