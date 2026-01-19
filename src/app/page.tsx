import { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import BentoGrid from "@/components/BentoGrid";
import PartnersSection from "@/components/PartnersSection";
import WorkProcessSection from "@/components/WorkProcessSection";
import BusinessTypesSection from "@/components/BusinessTypesSection";
import FAQSection from "@/components/FAQSection";
import MapSection from "@/components/MapSection";
import DarkSection from "@/components/DarkSection";
import SectionDivider from "@/components/SectionDivider";

export const metadata: Metadata = {
  title: "EgoTax - Servicii de Contabilitate Profesionale în Moldova",
  description:
    "EgoTax oferă servicii complete de contabilitate, consultanță fiscală, restabilirea evidenței contabile și suport pentru afaceri în Moldova. Peste 7 ani de experiență, 500+ clienți activi.",
  openGraph: {
    title: "EgoTax - Servicii de Contabilitate Profesionale în Moldova",
    description:
      "Servicii complete de contabilitate și consultanță fiscală în Moldova. Experiență de 7+ ani, 500+ clienți mulțumiți.",
    url: "https://egotax.md",
  },
  alternates: {
    canonical: "https://egotax.md",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1e1e1e]">
      <HeroSection />

      <SectionDivider variant="accent" className="my-8" />
      <StatsSection />

      <SectionDivider className="my-8" />
      <BentoGrid />

      <SectionDivider variant="accent" className="my-8" />
      <PartnersSection />

      <SectionDivider variant="subtle" className="my-8" />
      <DarkSection />


      <SectionDivider variant="accent" className="my-8" />
      <WorkProcessSection />

      <SectionDivider className="my-8" />
      <BusinessTypesSection />

      <SectionDivider variant="subtle" className="my-8" />
      <FAQSection />

      <SectionDivider className="my-8" />
      <MapSection />
    </div>
  );
}
