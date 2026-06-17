"use client";
import { useEffect, useState } from "react";
import { Megaphone, Headset, LineChart, Receipt, Search, Workflow, Settings } from "lucide-react";
import { apiFetch } from "@/lib/api";

type Task = {
  id: number;
  title: string;
  run_count: number;
  last_run_at: string | null;
  enabled: number;
};

const AGENT_TEMPLATES = [
  {
    icon: Megaphone,
    title: "Agent Commercial",
    description: "Prospection, qualification de leads et relances automatiques.",
    instruction: "Analyse mon profil, mes documents et mes opportunités commerciales. Propose 3 actions prioritaires pour développer mon chiffre d'affaires cette semaine.",
  },
  {
    icon: Headset,
    title: "Agent Support Client",
    description: "Réponses instantanées et résolution des tickets en continu.",
    instruction: "Passe en revue mes connaissances et identifie les lacunes dans mes réponses support. Génère 5 nouvelles entrées FAQ pertinentes pour mon activité.",
  },
  {
    icon: LineChart,
    title: "Agent Marketing",
    description: "Création de contenu et pilotage des campagnes publicitaires.",
    instruction: "Génère 3 idées de contenu marketing (post LinkedIn, article de blog ou email) adaptées à mon secteur et à ma cible, en t'appuyant sur mon profil.",
  },
  {
    icon: Receipt,
    title: "Agent Comptable",
    description: "Suivi des finances, factures et rapports comptables.",
    instruction: "Résume les points financiers importants à surveiller pour mon activité cette semaine et liste les actions à ne pas oublier (factures, déclarations, etc.).",
  },
  {
    icon: Search,
    title: "Agent Recherche",
    description: "Veille concurrentielle et analyse de marché.",
    instruction: "Effectue une veille sur les tendances de mon secteur et identifie 3 opportunités ou menaces à prendre en compte dans ma stratégie.",
  },
  {
    icon: Workflow,
    title: "Agent Opérations",
    description: "Automatisation des tâches répétitives de votre entreprise.",
    instruction: "Identifie dans mon activité les 3 tâches les plus répétitives et propose un plan d'automatisation concret pour chacune.",
  },
];

export default function AgentsPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  async function refresh() {
    const res = await apiFetch("/api/agent/tasks");
    const data = (await res.json()) as { tasks: Task[] };
    setTasks(data.tasks);
  }

  useEffect(() => {
    refresh().catch(() => {}).finally(() => setLoading(false));
  }, []);

  function getTask(title: string) {
    return tasks.find((t) => t.title === title);
  }

  async function toggle(template: (typeof AGENT_TEMPLATES)[0]) {
    if (toggling) return;
    setToggling(template.title);
    try {
      const existing = getTask(template.title);
      if (existing) {
        await apiFetch(`/api/agent/tasks/${existing.id}`, { method: "DELETE" });
      } else {
        await apiFetch("/api/agent/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: template.title, instruction: template.instruction, frequency: "daily" }),
        });
      }
      await refresh();
    } finally {
      setToggling(null);
    }
  }

  if (loading) return <div className="min-h-[40vh]" />;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold">Agents IA</h1>
        <p className="text-muted mt-1">
          Activez un agent pour créer une automatisation quotidienne. Vous pouvez personnaliser l&apos;instruction depuis la page Automatisations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {AGENT_TEMPLATES.map((agent) => {
          const task = getTask(agent.title);
          const active = !!task;
          const isBusy = toggling === agent.title;

          return (
            <div key={agent.title} className="rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-5">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary-2/10 border border-border-soft">
                  <agent.icon size={22} className="text-primary-2" />
                </div>
                <button
                  onClick={() => toggle(agent)}
                  disabled={isBusy}
                  aria-label={`Activer ou désactiver ${agent.title}`}
                  className={`relative h-6 w-11 rounded-full border border-border-soft transition-colors disabled:opacity-50 ${
                    active ? "bg-gradient-to-r from-primary to-primary-2" : "bg-surface-light"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                      active ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold">{agent.title}</h3>
                <p className="text-sm text-muted leading-relaxed mt-1">{agent.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border-soft text-sm">
                <span className={active ? "text-emerald-400" : "text-muted"}>
                  {active
                    ? task.run_count > 0
                      ? `${task.run_count} exécution${task.run_count > 1 ? "s" : ""}`
                      : "Actif · jamais exécuté"
                    : "Inactif"}
                </span>
                {active && (
                  <a
                    href="/tableau-de-bord/automatisations"
                    className="flex items-center gap-1.5 text-muted hover:text-foreground transition-colors"
                  >
                    <Settings size={14} />
                    Configurer
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
