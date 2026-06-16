import { TrendingUp, Clock, Target } from "lucide-react";

const REVENUE = [
  { month: "Jan", value: 1200 },
  { month: "Fév", value: 1850 },
  { month: "Mar", value: 2100 },
  { month: "Avr", value: 2980 },
  { month: "Mai", value: 3650 },
  { month: "Juin", value: 4820 },
];

const TASKS_BY_AGENT = [
  { label: "Agent Support Client", value: 128 },
  { label: "Agent Commercial", value: 47 },
  { label: "Agent Marketing", value: 23 },
  { label: "Agent Comptable", value: 14 },
];

const SUMMARY = [
  { icon: TrendingUp, label: "Croissance des revenus (6 mois)", value: "+301%" },
  { icon: Clock, label: "Temps économisé total", value: "212h" },
  { icon: Target, label: "Taux de réussite des tâches", value: "97%" },
];

const maxRevenue = Math.max(...REVENUE.map((r) => r.value));
const maxTasks = Math.max(...TASKS_BY_AGENT.map((t) => t.value));

export default function StatistiquesPage() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold">Statistiques</h1>
        <p className="text-muted mt-1">La performance de votre jumeau numérique et de vos agents.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {SUMMARY.map((s) => (
          <div key={s.label} className="rounded-3xl border border-border-soft bg-surface p-5 flex flex-col gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary-2/10 border border-border-soft">
              <s.icon size={18} className="text-primary-2" />
            </div>
            <div>
              <p className="font-display text-2xl font-semibold gradient-text">{s.value}</p>
              <p className="text-sm text-muted">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-6">
          <h2 className="font-display font-semibold">Revenus générés par mois</h2>
          <div className="flex items-end justify-between gap-3 h-48">
            {REVENUE.map((r) => (
              <div key={r.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center h-40">
                  <div
                    className="w-full max-w-10 rounded-t-lg bg-gradient-to-t from-primary to-primary-2"
                    style={{ height: `${(r.value / maxRevenue) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted">{r.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-6">
          <h2 className="font-display font-semibold">Tâches automatisées par agent</h2>
          <div className="flex flex-col gap-5">
            {TASKS_BY_AGENT.map((t) => (
              <div key={t.label} className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">{t.label}</span>
                  <span className="font-semibold">{t.value}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-light overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary-2"
                    style={{ width: `${(t.value / maxTasks) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
