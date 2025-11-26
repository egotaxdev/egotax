import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import BentoGrid from "@/components/BentoGrid";
import PartnersSection from "@/components/PartnersSection";
import ServiceSection from "@/components/ServiceSection";
import WorkProcessSection from "@/components/WorkProcessSection";
import BusinessTypesSection from "@/components/BusinessTypesSection";
import FAQSection from "@/components/FAQSection";
import MapSection from "@/components/MapSection";
import DarkSection from "@/components/DarkSection";
import SectionDivider from "@/components/SectionDivider";

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

      <SectionDivider className="my-8" />
      <ServiceSection />

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
