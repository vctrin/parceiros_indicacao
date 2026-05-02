/*
 * Design: "Warm Authority" — Editorial Corporativo com Alma
 * Home Page: Full landing page for GluoTech Partnership Program
 * Sections: Hero → Program → Benefits → How It Works → Simulation → Launch Offer → FAQ → Form → Footer
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProgramSection from "@/components/ProgramSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import LaunchOfferSection from "@/components/LaunchOfferSection";
import FAQSection from "@/components/FAQSection";
import FormSection from "@/components/FormSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <ProgramSection />
        <BenefitsSection />
        <HowItWorksSection />
        <LaunchOfferSection />
        <FAQSection />
        <FormSection />
      </main>
      <Footer />
    </div>
  );
}
