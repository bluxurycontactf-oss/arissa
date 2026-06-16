import { Mail, MapPin, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";

const INFO = [
  {
    icon: Mail,
    title: "Email",
    description: "contact@arissa.ai",
  },
  {
    icon: MessageCircle,
    title: "Centre d'aide",
    description: "Consultez notre FAQ et nos guides sur la page Support.",
  },
  {
    icon: MapPin,
    title: "Présence",
    description: "Équipe distribuée, plateforme accessible dans le monde entier.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Contact"
          title={
            <>
              Parlons de votre <span className="gradient-text">jumeau numérique</span>
            </>
          }
          description="Une question, une demande de partenariat ou un besoin spécifique ? Écrivez-nous, notre équipe vous répond rapidement."
        />

        <section className="pb-24 sm:pb-32">
          <Container className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6">
            <Reveal className="flex flex-col gap-6">
              {INFO.map((item) => (
                <div key={item.title} className="rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary-2/10 border border-border-soft">
                    <item.icon size={22} className="text-primary-2" />
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted leading-relaxed mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.06}>
              <ContactForm />
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
