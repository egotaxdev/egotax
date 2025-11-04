import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import StatsSection from "@/components/StatsSection";
import BentoGrid from "@/components/BentoGrid";
import ServiceSection from "@/components/ServiceSection";
import WorkProcessSection from "@/components/WorkProcessSection";
import BusinessTypesSection from "@/components/BusinessTypesSection";
import FAQSection from "@/components/FAQSection";
import MapSection from "@/components/MapSection";
import CostCalculator from "@/components/CostCalculator";
import DarkSection from "@/components/DarkSection";
import SectionDivider from "@/components/SectionDivider";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <NavBar />
      <HeroSection />
      
      <SectionDivider variant="accent" className="my-8" />
      <StatsSection />
      
      <SectionDivider className="my-8" />
      <BentoGrid />
      
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
      
      <SectionDivider variant="accent" className="my-8" />
      <CostCalculator />
      
      <Footer />
    </div>
  );
}
