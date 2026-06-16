"use client";
import { useState } from "react";
import { Megaphone, Headset, LineChart, Receipt, Search, Workflow, Settings } from "lucide-react";

const INITIAL_AGENTS = [
  {
    icon: Megaphone,
    title: "Agent Commercial",
    description: "Prospection, qualification de leads et relances automatiques.",
    active: true,
    tasks: 47,
  },
  {
    icon: Headset,
    title: "Agent Support Client",
    description: "Réponses instantanées et résolution des tickets en continu.",
    active: true,
    tasks: 128,
  },
  {
    icon: LineChart,
    title: "Agent Marketing",
    description: "Création de contenu et pilotage des campagnes publicitaires.",
    active: true,
    tasks: 23,
  },
  {
    icon: Receipt,
    title: "Agent Comptable",
    description: "Suivi des finances, factures et rapports comptables.",
    active: true,
    tasks: 14,
  },
  {
    icon: Search,
    title: "Agent Recherche",
    description: "Veille concurrentielle et analyse de marché.",
    active: false,
    tasks: 0,
  },
  {
    icon: Workflow,
    title: "Agent Opérations",
    description: "Automatisation des tâches répétitives de votre entreprise.",
    active: false,
    tasks: 0,
  },
];

export default function AgentsPage() {
  const [agents, setAgents] = useState(INITIAL_AGENTS);

  function toggle(title: string) {
    setAgents((prev) => prev.map((a) => (a.title === title ? { ...a, active: !a.active } : a)));
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold">Agents IA</h1>
        <p className="text-muted mt-1">Activez ou désactivez les agents qui travaillent pour vous.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.title} className="rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary-2/10 border border-border-soft">
                <agent.icon size={22} className="text-primary-2" />
              </div>
              <button
                onClick={() => toggle(agent.title)}
                aria-label={`Activer ou désactiver ${agent.title}`}
                className={`relative h-6 w-11 rounded-full border border-border-soft transition-colors ${
                  agent.active ? "bg-gradient-to-r from-primary to-primary-2" : "bg-surface-light"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    agent.active ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold">{agent.title}</h3>
              <p className="text-sm text-muted leading-relaxed mt-1">{agent.description}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border-soft text-sm">
              <span className={agent.active ? "text-emerald-400" : "text-muted"}>
                {agent.active ? `${agent.tasks} tâches ce mois` : "Inactif"}
              </span>
              <button className="flex items-center gap-1.5 text-muted hover:text-foreground transition-colors">
                <Settings size={14} />
                Configurer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
