import { Brain, Infinity as InfinityIcon, Workflow, TrendingUp, Bot, Activity, GitBranch, Building2, LineChart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Agents from "@/components/Agents";
import SignupCTA from "@/components/SignupCTA";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const TWIN_FEATURES = [
  {
    icon: Brain,
    title: "Apprend votre style et vos décisions",
    description: "Arissa observe vos préférences et votre façon de travailler pour agir comme vous le feriez.",
  },
  {
    icon: InfinityIcon,
    title: "Disponible 24h/24, 7j/7",
    description: "Votre jumeau numérique ne dort jamais : il continue de travailler pendant que vous vous reposez.",
  },
  {
    icon: Workflow,
    title: "Agit en votre nom",
    description: "Il prend des décisions et exécute des actions réelles, dans les limites que vous définissez.",
  },
  {
    icon: TrendingUp,
    title: "Évolue avec votre activité",
    description: "Plus vous l'utilisez, plus il devient précis, pertinent et générateur de valeur.",
  },
];

const AUTOMATIONS = [
  {
    icon: GitBranch,
    title: "Automatisations",
    description: "Créez des workflows qui s'exécutent automatiquement, sans aucune intervention de votre part.",
    items: [
      "Déclencheurs basés sur des événements (nouveau prospect, facture due, etc.)",
      "Enchaînement d'actions entre plusieurs agents",
      "Règles personnalisables selon votre activité",
    ],
  },
  {
    icon: Building2,
    title: "Gestion d'entreprises",
    description: "Gérez plusieurs entreprises ou marques depuis un seul tableau de bord.",
    items: [
      "Bascule rapide entre vos différentes entités",
      "Jumeaux numériques et agents dédiés par entreprise",
      "Rôles et accès pour votre équipe",
    ],
  },
  {
    icon: LineChart,
    title: "Génération de revenus",
    description: "Vos agents identifient et exploitent activement de nouvelles opportunités économiques.",
    items: [
      "Détection d'opportunités de vente additionnelle",
      "Optimisation continue des campagnes marketing",
      "Rapports d'impact sur le chiffre d'affaires",
    ],
  },
];

export default function FonctionnalitesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Fonctionnalités"
          title={
            <>
              Tout ce que votre <span className="gradient-text">jumeau numérique</span> peut faire
            </>
          }
          description="Du jumeau numérique aux agents spécialisés, en passant par les automatisations et la génération de revenus — découvrez l'ensemble des capacités d'Arissa."
        />

        <section className="py-24 sm:py-32 border-t border-border-soft relative overflow-hidden">
          <div className="absolute top-1/2 -left-40 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />

          <Container className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal className="flex flex-col gap-8 order-2 lg:order-1">
              <div className="flex flex-col gap-4">
                <span className="inline-flex items-center gap-2 self-start rounded-full border border-border-soft bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-2">
                  Le concept
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
                  Un jumeau numérique qui <span className="gradient-text">vous représente</span>
                </h2>
                <p className="text-lg text-muted leading-relaxed">
                  Votre jumeau numérique est une réplique intelligente de vous-même dans le monde
                  digital. Il connaît votre activité, vos objectifs et vos préférences — et agit en
                  continu pour les faire progresser.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                {TWIN_FEATURES.map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-surface border border-border-soft">
                      <f.icon size={20} className="text-primary-2" />
                    </div>
                    <div>
                      <p className="font-semibold">{f.title}</p>
                      <p className="text-sm text-muted leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="order-1 lg:order-2">
              <div className="gradient-border rounded-3xl p-8 glow animate-float-slow flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-primary-2">
                      <Bot size={26} className="text-white" />
                    </div>
                    <div>
                      <p className="font-display font-semibold">Votre jumeau numérique</p>
                      <p className="text-xs text-muted">Synchronisé en temps réel</p>
                    </div>
                  </div>
                  <Activity size={20} className="text-primary-2" />
                </div>

                <div className="flex flex-col gap-4">
                  {[
                    { label: "Apprentissage", value: 92 },
                    { label: "Autonomie", value: 87 },
                    { label: "Valeur générée", value: 78 },
                  ].map((b) => (
                    <div key={b.label} className="flex flex-col gap-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">{b.label}</span>
                        <span className="font-semibold">{b.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-surface-light overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-primary-2"
                          style={{ width: `${b.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-2xl bg-surface-light p-4">
                    <p className="text-xs text-muted mb-1">Tâches automatisées</p>
                    <p className="font-display text-2xl font-semibold gradient-text">312</p>
                  </div>
                  <div className="rounded-2xl bg-surface-light p-4">
                    <p className="text-xs text-muted mb-1">Temps économisé</p>
                    <p className="font-display text-2xl font-semibold gradient-text">38h</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <Agents />

        <section className="py-24 sm:py-32 border-t border-border-soft">
          <Container className="flex flex-col gap-14">
            <SectionHeading
              eyebrow="Aller plus loin"
              title="Automatisations, multi-entreprises et revenus"
              description="Arissa ne s'arrête pas aux agents individuels : il orchestre des workflows complets et identifie des opportunités économiques pour vous."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {AUTOMATIONS.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.08}>
                  <div className="h-full rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary-2/10 border border-border-soft">
                      <a.icon size={22} className="text-primary-2" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{a.title}</h3>
                      <p className="text-sm text-muted leading-relaxed mt-2">{a.description}</p>
                    </div>
                    <ul className="flex flex-col gap-2.5 mt-auto pt-2 border-t border-border-soft">
                      {a.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
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
