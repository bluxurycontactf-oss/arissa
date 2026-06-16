"use client";

import { useEffect, useState, FormEvent } from "react";
import { Trash2, Plus, Play, Repeat, ChevronDown, ChevronUp } from "lucide-react";
import { apiFetch } from "@/lib/api";
import FormField from "@/components/ui/FormField";
import SubmitButton from "@/components/ui/SubmitButton";

type Frequency = "hourly" | "daily" | "weekly";

type ScheduledTask = {
  id: number;
  title: string;
  instruction: string;
  frequency: Frequency;
  enabled: number;
  last_run_at: string | null;
  last_result: string | null;
  next_run_at: string;
};

const FREQUENCY_LABELS: Record<Frequency, string> = {
  hourly: "Toutes les heures",
  daily: "Tous les jours",
  weekly: "Toutes les semaines",
};

export default function AutomatisationsPage() {
  const [tasks, setTasks] = useState<ScheduledTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [runningId, setRunningId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [instruction, setInstruction] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  async function refresh() {
    const res = await apiFetch(`/api/agent/tasks`);
    const data = (await res.json()) as { tasks: ScheduledTask[] };
    setTasks(data.tasks);
  }

  useEffect(() => {
    refresh()
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim() || !instruction.trim()) return;
    setCreating(true);
    setError(null);

    try {
      const res = await apiFetch(`/api/agent/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), instruction: instruction.trim(), frequency }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Échec de la création de l'automatisation.");

      setTitle("");
      setInstruction("");
      setFrequency("daily");
      await refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setCreating(false);
    }
  }

  async function toggleEnabled(task: ScheduledTask) {
    await apiFetch(`/api/agent/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: !task.enabled }),
    });
    await refresh();
  }

  async function deleteTask(id: number) {
    await apiFetch(`/api/agent/tasks/${id}`, { method: "DELETE" });
    await refresh();
  }

  async function runNow(id: number) {
    setRunningId(id);
    try {
      await apiFetch(`/api/agent/tasks/${id}/run`, { method: "POST" });
      await refresh();
      setExpanded(id);
    } finally {
      setRunningId(null);
    }
  }

  if (loading) {
    return <div className="min-h-[40vh]" />;
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold">Automatisations</h1>
        <p className="text-muted mt-1">
          Votre jumeau numérique peut agir seul, à intervalles réguliers, avec les mêmes outils que dans le chat
          (mémoire, documents, email, WhatsApp...). Décrivez l&apos;instruction comme vous le feriez dans une
          conversation.
        </p>
      </div>

      <section className="rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <Repeat size={18} className="text-primary-2" />
          <h2 className="font-display font-semibold">Tâches planifiées</h2>
        </div>

        {tasks.length === 0 ? (
          <p className="text-sm text-muted">Aucune automatisation pour le moment. Créez-en une ci-dessous.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {tasks.map((task) => (
              <div key={task.id} className="rounded-2xl bg-surface-light px-4 py-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{task.title}</p>
                    <p className="text-xs text-muted mt-1 truncate">{task.instruction}</p>
                    <p className="text-xs text-muted mt-1">
                      {FREQUENCY_LABELS[task.frequency]}
                      {task.last_run_at ? ` · dernière exécution : ${new Date(task.last_run_at).toLocaleString("fr-FR")}` : " · jamais exécutée"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleEnabled(task)}
                      aria-label="Activer ou désactiver"
                      className={`relative h-6 w-11 rounded-full border border-border-soft transition-colors ${
                        task.enabled ? "bg-gradient-to-r from-primary to-primary-2" : "bg-surface"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                          task.enabled ? "translate-x-5" : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => runNow(task.id)}
                      disabled={runningId === task.id}
                      className="text-muted hover:text-foreground transition-colors disabled:opacity-50"
                      aria-label="Exécuter maintenant"
                      title="Exécuter maintenant"
                    >
                      <Play size={16} />
                    </button>
                    {task.last_result && (
                      <button
                        onClick={() => setExpanded(expanded === task.id ? null : task.id)}
                        className="text-muted hover:text-foreground transition-colors"
                        aria-label="Voir le résultat"
                      >
                        {expanded === task.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    )}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-muted hover:text-red-400 transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {expanded === task.id && task.last_result && (
                  <div className="mt-3 rounded-xl border border-border-soft bg-surface px-3 py-2 text-xs text-foreground/80 whitespace-pre-wrap">
                    {task.last_result}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleCreate} className="flex flex-col gap-4 border-t border-border-soft pt-5">
          <FormField label="Titre" placeholder="ex: Résumé hebdomadaire des opportunités" value={title} onChange={(e) => setTitle(e.target.value)} required />

          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-foreground/90">Instruction</span>
            <textarea
              rows={3}
              required
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="ex: Analyse mes notes et documents récents et propose 3 actions prioritaires pour la semaine."
              className="w-full rounded-2xl border border-border-soft bg-surface-light px-5 py-3 text-sm outline-none transition-colors focus:border-primary/60 resize-none"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-foreground/90">Fréquence</span>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as Frequency)}
              className="w-full rounded-2xl border border-border-soft bg-surface-light px-5 py-3 text-sm outline-none transition-colors focus:border-primary/60"
            >
              <option value="hourly">Toutes les heures</option>
              <option value="daily">Tous les jours</option>
              <option value="weekly">Toutes les semaines</option>
            </select>
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <SubmitButton type="submit" size="lg" className="sm:w-fit" icon={<Plus size={16} />} disabled={creating}>
            {creating ? "Création..." : "Créer l'automatisation"}
          </SubmitButton>
        </form>
      </section>
    </div>
  );
}
