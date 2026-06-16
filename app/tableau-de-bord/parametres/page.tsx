"use client";
import { useState } from "react";
import { User, Mail, Bell, CreditCard, ArrowRight } from "lucide-react";
import FormField from "@/components/ui/FormField";
import SubmitButton from "@/components/ui/SubmitButton";
import Button from "@/components/ui/Button";

const NOTIF_OPTIONS = [
  { key: "activity", label: "Rapports d'activité de mes agents", checked: true },
  { key: "opportunities", label: "Nouvelles opportunités détectées", checked: true },
  { key: "billing", label: "Rappels de facturation", checked: true },
  { key: "news", label: "Actualités et nouveautés Arissa", checked: false },
];

export default function ParametresPage() {
  const [notifs, setNotifs] = useState(NOTIF_OPTIONS);

  function toggle(key: string) {
    setNotifs((prev) => prev.map((n) => (n.key === key ? { ...n, checked: !n.checked } : n)));
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold">Paramètres</h1>
        <p className="text-muted mt-1">Gérez votre profil, vos notifications et votre abonnement.</p>
      </div>

      <section className="rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-6">
        <h2 className="font-display font-semibold flex items-center gap-2">
          <User size={18} className="text-primary-2" />
          Profil
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Nom complet" type="text" defaultValue="Sophie Martin" />
          <FormField label="Adresse email" type="email" defaultValue="sophie@entreprise.com" icon={<Mail size={16} />} />
          <SubmitButton type="submit" className="sm:col-span-2 sm:w-fit">
            Enregistrer les modifications
          </SubmitButton>
        </form>
      </section>

      <section className="rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-6">
        <h2 className="font-display font-semibold flex items-center gap-2">
          <Bell size={18} className="text-primary-2" />
          Notifications
        </h2>
        <div className="flex flex-col gap-4">
          {notifs.map((n) => (
            <div key={n.key} className="flex items-center justify-between gap-4">
              <span className="text-sm text-foreground/90">{n.label}</span>
              <button
                onClick={() => toggle(n.key)}
                aria-label={n.label}
                className={`relative h-6 w-11 flex-shrink-0 rounded-full border border-border-soft transition-colors ${
                  n.checked ? "bg-gradient-to-r from-primary to-primary-2" : "bg-surface-light"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    n.checked ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-6">
        <h2 className="font-display font-semibold flex items-center gap-2">
          <CreditCard size={18} className="text-primary-2" />
          Abonnement
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-surface-light p-5">
          <div>
            <p className="font-semibold">Plan Pro — $29/mois</p>
            <p className="text-sm text-muted mt-1">5 agents IA actifs · Automatisations illimitées · Support prioritaire</p>
          </div>
          <Button href="/tarifs" variant="outline" icon={<ArrowRight size={16} />}>
            Gérer mon abonnement
          </Button>
        </div>
      </section>

      <section className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 flex flex-col gap-4">
        <h2 className="font-display font-semibold text-red-400">Zone de danger</h2>
        <p className="text-sm text-muted leading-relaxed">
          La suppression de votre compte est définitive et entraîne la perte de toutes les données
          de votre jumeau numérique et de vos agents.
        </p>
        <button className="self-start rounded-full border border-red-500/40 px-5 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors">
          Supprimer mon compte
        </button>
      </section>
    </div>
  );
}
