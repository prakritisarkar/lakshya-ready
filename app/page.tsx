import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#0A0704]">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}