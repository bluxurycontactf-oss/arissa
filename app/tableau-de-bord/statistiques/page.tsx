"use client";
import { useEffect, useState } from "react";
import { TrendingUp, MessageSquare, BrainCircuit, FileText, Repeat } from "lucide-react";
import { apiFetch } from "@/lib/api";

type Stats = {
  messages: number;
  memories: number;
  documents: number;
  totalRuns: number;
  tasks: { id: number; title: string; run_count: number; last_run_at: string | null; enabled: number }[];
};

export default function StatistiquesPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/agent/stats")
      .then((r) => r.json())
      .then((d) => setStats(d as Stats))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const SUMMARY = [
    { icon: MessageSquare, label: "Messages échangés avec le jumeau", value: stats?.messages ?? 0 },
    { icon: BrainCircuit, label: "Souvenirs mémorisés", value: stats?.memories ?? 0 },
    { icon: FileText, label: "Documents dans la base RAG", value: stats?.documents ?? 0 },
    { icon: Repeat, label: "Automatisations exécutées", value: stats?.totalRuns ?? 0 },
  ];

  const maxRuns = Math.max(...(stats?.tasks.map((t) => t.run_count) ?? [1]), 1);

  if (loading) return <div className="min-h-[40vh]" />;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold">Statistiques</h1>
        <p className="text-muted mt-1">La performance réelle de votre jumeau numérique et de vos agents.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SUMMARY.map((s) => (
          <div key={s.label} className="rounded-3xl border border-border-soft bg-surface p-5 flex flex-col gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary-2/10 border border-border-soft">
              <s.icon size={18} className="text-primary-2" />
            </div>
            <div>
              <p className="font-display text-3xl font-semibold gradient-text">{s.value}</p>
              <p className="text-sm text-muted mt-1">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-6">
        <h2 className="font-display font-semibold">Automatisations par tâche</h2>
        {!stats?.tasks.length ? (
          <p className="text-sm text-muted">Aucune automatisation créée pour l&apos;instant.</p>
        ) : (
          <div className="flex flex-col gap-5">
            {stats.tasks.map((t) => (
              <div key={t.id} className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted truncate">{t.title}</span>
                  <span className="font-semibold ml-4 shrink-0">{t.run_count} exécution{t.run_count !== 1 ? "s" : ""}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-light overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary-2 transition-all"
                    style={{ width: `${(t.run_count / maxRuns) * 100}%` }}
                  />
                </div>
                {t.last_run_at && (
                  <p className="text-xs text-muted">
                    Dernière exécution : {new Date(t.last_run_at).toLocaleString("fr-FR")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
