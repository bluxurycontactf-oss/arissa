import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InteractiveDemo from "@/components/InteractiveDemo";
import DigitalTwin from "@/components/DigitalTwin";
import Agents from "@/components/Agents";
import Comparison from "@/components/Comparison";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import SignupCTA from "@/components/SignupCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <InteractiveDemo />
        <DigitalTwin />
        <Agents />
        <Comparison />
        <Pricing />
        <FAQ />
        <SignupCTA />
      </main>
      <Footer />
    </>
  );
}
