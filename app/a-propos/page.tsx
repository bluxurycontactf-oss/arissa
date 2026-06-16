import { Target, Eye, Rocket, Shield, Globe, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignupCTA from "@/components/SignupCTA";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const VALUES = [
  {
    icon: Target,
    title: "Autonomie réelle",
    description: "Nos agents ne se contentent pas de suggérer — ils agissent, dans les limites que vous définissez.",
  },
  {
    icon: Shield,
    title: "Confiance et contrôle",
    description: "Vous gardez à tout moment la visibilité et le contrôle sur ce que fait votre jumeau numérique.",
  },
  {
    icon: Rocket,
    title: "Innovation continue",
    description: "Nous améliorons constamment les capacités d'Arissa pour qu'il reste à la pointe de l'IA appliquée au business.",
  },
  {
    icon: Globe,
    title: "Accessible à tous",
    description: "Pas besoin de compétences techniques : chacun peut posséder et faire évoluer son propre agent IA.",
  },
];

const TIMELINE = [
  {
    year: "2024",
    title: "Le constat",
    description: "Les entrepreneurs passent trop de temps sur des tâches répétitives au lieu de se concentrer sur la croissance de leur activité.",
  },
  {
    year: "2025",
    title: "Naissance d'Arissa",
    description: "Développement du premier prototype de jumeau numérique capable d'apprendre les habitudes de son propriétaire et d'agir pour lui.",
  },
  {
    year: "2026",
    title: "Lancement de la plateforme",
    description: "Arissa devient accessible à tous : particuliers et entreprises peuvent créer leur jumeau numérique et activer leurs premiers agents IA.",
  },
  {
    year: "Demain",
    title: "Une plateforme mondiale",
    description: "Construire un écosystème où chaque individu ou entreprise possède son propre agent IA autonome, générateur de valeur.",
  },
];

export default function AProposPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="À propos"
          title={
            <>
              Le premier jumeau numérique <span className="gradient-text">qui travaille pour vous</span>
            </>
          }
          description="Arissa est né d'une conviction simple : chacun devrait pouvoir déléguer son travail répétitif à une intelligence artificielle de confiance, qui apprend, agit et crée de la valeur en son nom."
        />

        <section className="py-24 sm:py-32 border-t border-border-soft">
          <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal className="flex flex-col gap-6">
              <span className="inline-flex items-center gap-2 self-start rounded-full border border-border-soft bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-2">
                <Eye size={14} className="inline mr-1" />
                Notre vision
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
                Construire une plateforme <span className="gradient-text">mondiale d&apos;agents IA</span>
              </h2>
              <p className="text-lg text-muted leading-relaxed">
                Notre objectif est de permettre à chaque individu ou entreprise de posséder son
                propre agent IA autonome — un collaborateur infatigable qui travaille, apprend et
                génère de la valeur économique en continu.
              </p>
              <p className="text-lg text-muted leading-relaxed">
                Avec Arissa, l&apos;IA n&apos;est plus seulement un outil de réponse : c&apos;est un
                véritable jumeau numérique qui représente votre activité et agit dans votre
                intérêt, 24h/24 et 7j/7.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="gradient-border glow rounded-3xl p-8 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-2">
                    <Users size={22} className="text-white" />
                  </div>
                  <div>
                    <p className="font-display font-semibold">Notre mission</p>
                    <p className="text-xs text-muted">En une phrase</p>
                  </div>
                </div>
                <p className="text-lg leading-relaxed">
                  &laquo; Le premier jumeau numérique intelligent capable de travailler, apprendre
                  et créer de la valeur économique pour son propriétaire. &raquo;
                </p>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="py-24 sm:py-32 border-t border-border-soft relative overflow-hidden">
          <div className="absolute top-1/2 -right-40 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-primary-2/15 blur-[120px]" />
          <Container className="relative flex flex-col gap-14">
            <SectionHeading eyebrow="Notre histoire" title="D'une idée à une plateforme mondiale" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TIMELINE.map((step, i) => (
                <Reveal key={step.year} delay={i * 0.08}>
                  <div className="h-full rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-3">
                    <span className="font-display text-2xl font-semibold gradient-text">{step.year}</span>
                    <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-24 sm:py-32 border-t border-border-soft">
          <Container className="flex flex-col gap-14">
            <SectionHeading eyebrow="Nos valeurs" title="Ce qui guide chaque décision" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={(i % 4) * 0.06}>
                  <div className="h-full rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary-2/10 border border-border-soft">
                      <v.icon size={22} className="text-primary-2" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{v.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <SignupCTA />
      </main>
      <Footer />
    </>
  );
}
