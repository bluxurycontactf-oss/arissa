import { CreditCard, Smartphone, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import SignupCTA from "@/components/SignupCTA";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const PAYMENT_METHODS = [
  { icon: CreditCard, label: "Carte bancaire", description: "Visa, Mastercard" },
  { icon: Smartphone, label: "MTN Mobile Money", description: "Paiement mobile" },
  { icon: Smartphone, label: "Moov Money", description: "Paiement mobile" },
  { icon: Smartphone, label: "Orange Money", description: "Paiement mobile" },
];

const BILLING_FAQ = [
  {
    q: "Puis-je changer de plan à tout moment ?",
    a: "Oui. Vous pouvez passer à un plan supérieur ou inférieur depuis votre tableau de bord, et le changement s'applique immédiatement.",
  },
  {
    q: "Quels moyens de paiement acceptez-vous ?",
    a: "Tous les paiements sont traités de façon sécurisée par FedaPay : carte bancaire (Visa, Mastercard) et Mobile Money (MTN, Moov, Orange).",
  },
  {
    q: "Que se passe-t-il si j'annule mon abonnement ?",
    a: "Vous conservez l'accès jusqu'à la fin de votre période de facturation en cours, sans frais supplémentaires.",
  },
  {
    q: "Proposez-vous une remise pour la facturation annuelle ?",
    a: "Oui, l'abonnement annuel équivaut à 2 mois offerts par rapport à la facturation mensuelle.",
  },
];

export default function TarifsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Tarifs"
          title={
            <>
              Une tarification <span className="gradient-text">simple et transparente</span>
            </>
          }
          description="Pas de frais cachés, pas d'engagement. Choisissez le plan adapté à votre activité et faites évoluer votre jumeau numérique à votre rythme."
        />

        <Pricing />

        <section className="py-24 sm:py-32 border-t border-border-soft">
          <Container className="flex flex-col gap-14">
            <SectionHeading
              eyebrow="Paiements"
              title="Payez comme vous le souhaitez"
              description="Tous les paiements et abonnements sont traités de façon sécurisée par notre partenaire FedaPay."
            />

            <Reveal className="flex flex-col gap-8">
              <div className="gradient-border glow rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-2">
                  <ShieldCheck size={26} className="text-white" />
                </div>
                <div>
                  <p className="font-display text-xl font-semibold">
                    Paiements sécurisés via <span className="gradient-text">FedaPay</span>
                  </p>
                  <p className="text-sm text-muted leading-relaxed mt-1">
                    Vos abonnements sont gérés par FedaPay, une plateforme de paiement de confiance
                    couvrant l&apos;Afrique de l&apos;Ouest et Centrale.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {PAYMENT_METHODS.map((m) => (
                  <div key={m.label} className="flex flex-col items-center gap-3 rounded-3xl border border-border-soft bg-surface p-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary-2/10 border border-border-soft">
                      <m.icon size={22} className="text-primary-2" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{m.label}</p>
                      <p className="text-xs text-muted mt-0.5">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="py-24 sm:py-32 border-t border-border-soft">
          <Container className="flex flex-col gap-14">
            <SectionHeading eyebrow="Facturation" title="Questions sur la facturation" />

            <Reveal className="max-w-3xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
              {BILLING_FAQ.map((item) => (
                <div key={item.q} className="rounded-2xl border border-border-soft bg-surface p-6">
                  <p className="font-semibold mb-2">{item.q}</p>
                  <p className="text-sm text-muted leading-relaxed">{item.a}</p>
                </div>
              ))}
            </Reveal>
          </Container>
        </section>

        <SignupCTA />
      </main>
      <Footer />
    </>
  );
}
