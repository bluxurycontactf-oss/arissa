import { Megaphone, Headset, LineChart, Receipt, Search, Workflow } from "lucide-react";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const AGENTS = [
  {
    icon: Megaphone,
    title: "Agent Commercial",
    description: "Prospection, qualification de leads et relances automatiques pour remplir votre pipeline de ventes.",
  },
  {
    icon: Headset,
    title: "Agent Support Client",
    description: "Réponses instantanées, résolution des tickets et suivi de la satisfaction client en continu.",
  },
  {
    icon: LineChart,
    title: "Agent Marketing",
    description: "Création de contenu, gestion des réseaux sociaux et pilotage de vos campagnes publicitaires.",
  },
  {
    icon: Receipt,
    title: "Agent Comptable",
    description: "Suivi des finances, génération de factures et rapports comptables prêts à l'emploi.",
  },
  {
    icon: Search,
    title: "Agent Recherche",
    description: "Veille concurrentielle, analyse de marché et synthèses d'information pour éclairer vos décisions.",
  },
  {
    icon: Workflow,
    title: "Agent Opérations",
    description: "Automatisation des tâches répétitives et coordination des outils de votre entreprise.",
  },
];

export default function Agents() {
  return (
    <section id="agents" className="py-24 sm:py-32 border-t border-border-soft">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Agents IA"
          title="Des agents spécialisés pour chaque besoin"
          description="Activez les agents dont votre activité a besoin. Chacun travaille de façon autonome, sous la supervision de votre jumeau numérique."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AGENTS.map((agent, i) => (
            <Reveal key={agent.title} delay={(i % 3) * 0.08}>
              <div className="group h-full rounded-3xl border border-border-soft bg-surface p-6 transition-all hover:border-primary/50 hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary-2/10 border border-border-soft mb-5 group-hover:from-primary group-hover:to-primary-2 transition-all">
                  <agent.icon size={22} className="text-primary-2 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{agent.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{agent.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
