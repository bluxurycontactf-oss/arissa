"use client";
import { useEffect, useState, FormEvent } from "react";
import { User, Mail, Bell, CreditCard, ArrowRight } from "lucide-react";
import { updateProfile, updateEmail, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import { apiFetch } from "@/lib/api";
import FormField from "@/components/ui/FormField";
import SubmitButton from "@/components/ui/SubmitButton";
import Button from "@/components/ui/Button";

const NOTIF_KEYS = [
  { key: "notif_activity", label: "Rapports d'activité de mes agents" },
  { key: "notif_opportunities", label: "Nouvelles opportunités détectées" },
  { key: "notif_billing", label: "Rappels de facturation" },
  { key: "notif_news", label: "Actualités et nouveautés Arissa" },
];

export default function ParametresPage() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [profileMsg, setProfileMsg] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const [notifs, setNotifs] = useState<Record<string, boolean>>({
    notif_activity: true,
    notif_opportunities: true,
    notif_billing: true,
    notif_news: false,
  });

  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName ?? "");
      setEmail(user.email ?? "");
    }
  }, [user]);

  useEffect(() => {
    apiFetch("/api/agent/profile")
      .then((r) => r.json())
      .then((d: { profile: Record<string, string> }) => {
        const updated: Record<string, boolean> = { ...notifs };
        for (const key of NOTIF_KEYS.map((n) => n.key)) {
          if (key in d.profile) updated[key] = d.profile[key] === "true";
        }
        setNotifs(updated);
      })
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleProfileSave(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setProfileLoading(true);
    setProfileMsg(null);
    try {
      if (displayName !== user.displayName) await updateProfile(user, { displayName });
      if (email !== user.email) await updateEmail(user, email);
      setProfileMsg("Profil mis à jour.");
    } catch {
      setProfileMsg("Erreur : reconnectez-vous puis réessayez.");
    } finally {
      setProfileLoading(false);
    }
  }

  async function toggleNotif(key: string) {
    const newVal = !notifs[key];
    setNotifs((prev) => ({ ...prev, [key]: newVal }));
    await apiFetch("/api/agent/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: String(newVal) }),
    }).catch(() => {});
  }

  async function handleDeleteAccount() {
    if (!user || deleteConfirm !== "SUPPRIMER") return;
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const password = prompt("Entrez votre mot de passe pour confirmer :");
      if (!password) { setDeleteLoading(false); return; }
      const credential = EmailAuthProvider.credential(user.email!, password);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
    } catch {
      setDeleteError("Échec de la suppression. Vérifiez votre mot de passe.");
      setDeleteLoading(false);
    }
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
        <form onSubmit={handleProfileSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Nom complet"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <FormField
            label="Adresse email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail size={16} />}
          />
          {profileMsg && <p className={`sm:col-span-2 text-sm ${profileMsg.startsWith("Erreur") ? "text-red-400" : "text-emerald-400"}`}>{profileMsg}</p>}
          <SubmitButton type="submit" className="sm:col-span-2 sm:w-fit" disabled={profileLoading}>
            {profileLoading ? "Enregistrement..." : "Enregistrer les modifications"}
          </SubmitButton>
        </form>
      </section>

      <section className="rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-6">
        <h2 className="font-display font-semibold flex items-center gap-2">
          <Bell size={18} className="text-primary-2" />
          Notifications
        </h2>
        <div className="flex flex-col gap-4">
          {NOTIF_KEYS.map((n) => (
            <div key={n.key} className="flex items-center justify-between gap-4">
              <span className="text-sm text-foreground/90">{n.label}</span>
              <button
                onClick={() => toggleNotif(n.key)}
                aria-label={n.label}
                className={`relative h-6 w-11 flex-shrink-0 rounded-full border border-border-soft transition-colors ${
                  notifs[n.key] ? "bg-gradient-to-r from-primary to-primary-2" : "bg-surface-light"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    notifs[n.key] ? "translate-x-5" : ""
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
            <p className="font-semibold">Plan gratuit</p>
            <p className="text-sm text-muted mt-1">Jumeau numérique · Automatisations illimitées · RAG local</p>
          </div>
          <Button href="/tarifs" variant="outline" icon={<ArrowRight size={16} />}>
            Voir les plans
          </Button>
        </div>
      </section>

      <section className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 flex flex-col gap-4">
        <h2 className="font-display font-semibold text-red-400">Zone de danger</h2>
        <p className="text-sm text-muted leading-relaxed">
          Pour confirmer la suppression, tapez <strong className="text-foreground">SUPPRIMER</strong> ci-dessous.
          Cette action est irréversible.
        </p>
        <input
          type="text"
          value={deleteConfirm}
          onChange={(e) => setDeleteConfirm(e.target.value)}
          placeholder="SUPPRIMER"
          className="w-full max-w-xs rounded-2xl border border-red-500/30 bg-surface-light px-4 py-2.5 text-sm outline-none focus:border-red-500/60"
        />
        {deleteError && <p className="text-sm text-red-400">{deleteError}</p>}
        <button
          onClick={handleDeleteAccount}
          disabled={deleteConfirm !== "SUPPRIMER" || deleteLoading}
          className="self-start rounded-full border border-red-500/40 px-5 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          {deleteLoading ? "Suppression..." : "Supprimer mon compte"}
        </button>
      </section>
    </div>
  );
}
