import { Rocket, CreditCard, Bot, ShieldCheck, UserCog, Code2, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const CATEGORIES = [
  {
    icon: Rocket,
    title: "Démarrage",
    description: "Créez votre compte, configurez votre jumeau numérique et activez vos premiers agents.",
  },
  {
    icon: Bot,
    title: "Agents IA",
    description: "Comprendre le rôle de chaque agent et comment personnaliser leurs actions.",
  },
  {
    icon: CreditCard,
    title: "Facturation",
    description: "Gérer votre abonnement, vos moyens de paiement et vos factures.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité",
    description: "Comment vos données sont protégées et qui peut y accéder.",
  },
  {
    icon: UserCog,
    title: "Compte",
    description: "Modifier vos informations, vos préférences et vos accès d'équipe.",
  },
  {
    icon: Code2,
    title: "API & intégrations",
    description: "Connecter Arissa à vos outils existants via notre API.",
  },
];

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Support"
          title={
            <>
              Comment pouvons-nous <span className="gradient-text">vous aider</span> ?
            </>
          }
          description="Retrouvez les réponses aux questions les plus fréquentes, ou contactez directement notre équipe."
        />

        <section className="pb-16 sm:pb-24">
          <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-4 hover:border-primary/40 hover:-translate-y-1 transition-all">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary-2/10 border border-border-soft">
                    <c.icon size={22} className="text-primary-2" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{c.description}</p>
                </div>
              </Reveal>
            ))}
          </Container>
        </section>

        <FAQ />

        <section className="py-24 sm:py-32 border-t border-border-soft">
          <Container className="flex flex-col gap-14">
            <SectionHeading
              eyebrow="Contact"
              title="Vous ne trouvez pas votre réponse ?"
              description="Écrivez-nous, notre équipe vous répond généralement en moins de 24h."
            />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6">
              <Reveal>
                <div className="h-full rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary-2/10 border border-border-soft">
                    <Mail size={22} className="text-primary-2" />
                  </div>
                  <div>
                    <p className="font-semibold">Par email</p>
                    <p className="text-sm text-muted leading-relaxed mt-1">
                      support@arissa.ai — réponse en moins de 24h ouvrées.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <ContactForm />
              </Reveal>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
