import { TrendingUp, Zap, Bot, Clock, Activity, Sparkles } from "lucide-react";

const STATS = [
  { icon: TrendingUp, label: "Revenus générés (30j)", value: "$4 820", trend: "+18%" },
  { icon: Zap, label: "Tâches automatisées", value: "312", trend: "+12%" },
  { icon: Bot, label: "Agents actifs", value: "4 / 6", trend: "" },
  { icon: Clock, label: "Temps économisé", value: "38h", trend: "+5h" },
];

const PROGRESS = [
  { label: "Apprentissage", value: 92 },
  { label: "Autonomie", value: 87 },
  { label: "Valeur générée", value: 78 },
];

const ACTIVITY = [
  { agent: "Agent Commercial", action: "12 relances envoyées, 3 réponses positives", time: "Il y a 12 min" },
  { agent: "Agent Support", action: "8 tickets résolus automatiquement", time: "Il y a 34 min" },
  { agent: "Agent Marketing", action: "Publication programmée sur 2 réseaux", time: "Il y a 1h" },
  { agent: "Agent Comptable", action: "Facture #2026-014 générée et envoyée", time: "Il y a 2h" },
  { agent: "Jumeau numérique", action: "Rapport hebdomadaire généré", time: "Il y a 3h" },
];

export default function DashboardOverview() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold">Bonjour 👋</h1>
        <p className="text-muted mt-1">Voici l&apos;activité de votre jumeau numérique aujourd&apos;hui.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-3xl border border-border-soft bg-surface p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary-2/10 border border-border-soft">
                <s.icon size={18} className="text-primary-2" />
              </div>
              {s.trend && <span className="text-xs font-semibold text-emerald-400">{s.trend}</span>}
            </div>
            <div>
              <p className="font-display text-2xl font-semibold">{s.value}</p>
              <p className="text-sm text-muted">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
        <div className="gradient-border glow rounded-3xl p-6 flex flex-col gap-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border-soft">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-2">
              <Bot size={22} className="text-white" />
              <span className="absolute inset-0 rounded-2xl animate-pulse-ring" />
            </div>
            <div>
              <p className="font-semibold">Jumeau numérique — Alex</p>
              <p className="text-xs text-muted flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> En ligne · agit pour vous
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {PROGRESS.map((p) => (
              <div key={p.label} className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">{p.label}</span>
                  <span className="font-semibold">{p.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-light overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary-2"
                    style={{ width: `${p.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-surface-light p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles size={16} className="text-primary-2" />
              Suggestion du jour
            </div>
            <p className="text-sm text-muted leading-relaxed">
              J&apos;ai détecté 2 opportunités de vente additionnelle auprès de clients existants.
              Voulez-vous que je prépare une proposition personnalisée pour chacun ?
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-primary-2" />
            <h2 className="font-display font-semibold">Activité récente</h2>
          </div>
          <div className="flex flex-col gap-4">
            {ACTIVITY.map((item, i) => (
              <div key={i} className="flex flex-col gap-1 border-b border-border-soft pb-4 last:border-0 last:pb-0">
                <p className="text-sm font-semibold">{item.agent}</p>
                <p className="text-sm text-muted leading-relaxed">{item.action}</p>
                <p className="text-xs text-muted/70">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
