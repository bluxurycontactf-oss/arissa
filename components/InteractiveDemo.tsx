"use client";
import { useState } from "react";
import { Megaphone, Headset, LineChart, Receipt, CheckCircle2 } from "lucide-react";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const TABS = [
  {
    key: "commercial",
    label: "Agent Commercial",
    icon: Megaphone,
    title: "Prospection et relances, en pilote automatique",
    description:
      "Votre agent commercial identifie les prospects, envoie des relances personnalisées et met à jour votre pipeline — sans que vous leviez le petit doigt.",
    items: [
      "12 prospects relancés aujourd'hui",
      "3 rendez-vous qualifiés planifiés",
      "Pipeline mis à jour automatiquement",
    ],
  },
  {
    key: "support",
    label: "Agent Support",
    icon: Headset,
    title: "Un service client disponible jour et nuit",
    description:
      "Réponses instantanées, résolution des tickets courants et escalade intelligente vers vous uniquement quand c'est nécessaire.",
    items: [
      "94% des tickets résolus automatiquement",
      "Temps de réponse moyen : 8 secondes",
      "Satisfaction client : 4.8/5",
    ],
  },
  {
    key: "marketing",
    label: "Agent Marketing",
    icon: LineChart,
    title: "Du contenu et des campagnes qui tournent seuls",
    description:
      "Création de posts, planification sur les réseaux sociaux et analyse des performances pour ajuster la stratégie en continu.",
    items: [
      "5 publications programmées cette semaine",
      "Campagne email : +23% d'ouvertures",
      "Rapport de performance généré",
    ],
  },
  {
    key: "comptable",
    label: "Agent Comptable",
    icon: Receipt,
    title: "Vos finances suivies en temps réel",
    description:
      "Suivi des revenus et dépenses, génération de factures et synthèse financière prête pour votre comptable.",
    items: [
      "8 factures générées et envoyées",
      "Trésorerie consolidée automatiquement",
      "Synthèse mensuelle prête le 1er du mois",
    ],
  },
];

export default function InteractiveDemo() {
  const [active, setActive] = useState(TABS[0].key);
  const tab = TABS.find((t) => t.key === active)!;

  return (
    <section id="demo" className="py-24 sm:py-32 border-t border-border-soft">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Démonstration"
          title="Découvrez Arissa en action"
          description="Une seule plateforme, plusieurs agents qui travaillent pour vous en parallèle. Explorez ce que chacun accomplit au quotidien."
        />

        <Reveal>
          <div className="gradient-border rounded-3xl p-4 sm:p-6">
            <div className="flex flex-wrap gap-2 pb-6">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all ${
                    active === t.key
                      ? "bg-gradient-to-r from-primary to-primary-2 text-white shadow-lg shadow-primary/25"
                      : "bg-surface text-muted hover:text-foreground"
                  }`}
                >
                  <t.icon size={16} />
                  {t.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col gap-4">
                <h3 className="font-display text-2xl sm:text-3xl font-semibold">{tab.title}</h3>
                <p className="text-muted leading-relaxed">{tab.description}</p>
              </div>

              <div className="rounded-2xl bg-surface-light p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-2">
                    <tab.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{tab.label}</p>
                    <p className="text-xs text-muted">Activité du jour</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {tab.items.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3 text-sm">
                      <CheckCircle2 size={16} className="text-primary-2 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
