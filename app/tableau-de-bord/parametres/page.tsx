"use client";
import { useEffect, useState, FormEvent } from "react";
import { User, Mail, Bell, CreditCard, ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";
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

  const [waStatus, setWaStatus] = useState<"disconnected" | "connecting" | "qr" | "pairing" | "connected" | "expired">("disconnected");
  const [waQr, setWaQr] = useState<string | null>(null);
  const [waPairingCode, setWaPairingCode] = useState<string | null>(null);
  const [waDisconnecting, setWaDisconnecting] = useState(false);
  const [waMode, setWaMode] = useState<"qr" | "pairing">("qr");
  const [waPhone, setWaPhone] = useState("");
  const [waRequestingCode, setWaRequestingCode] = useState(false);
  const [waPhoneError, setWaPhoneError] = useState<string | null>(null);
  const [waReconnecting, setWaReconnecting] = useState(false);

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

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await apiFetch("/api/agent/whatsapp/status");
        const data = (await res.json()) as { status: typeof waStatus; qr: string | null; pairingCode: string | null };
        if (!cancelled) {
          setWaStatus(data.status);
          setWaQr(data.qr);
          setWaPairingCode(data.pairingCode);
        }
      } catch {
        // ignore, will retry
      }
    }

    poll();
    const interval = setInterval(poll, 3000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  async function handleWaDisconnect() {
    setWaDisconnecting(true);
    try {
      await apiFetch("/api/agent/whatsapp/disconnect", { method: "POST" });
      setWaStatus("disconnected");
      setWaQr(null);
      setWaPairingCode(null);
    } finally {
      setWaDisconnecting(false);
    }
  }

  async function handleWaReconnect() {
    setWaReconnecting(true);
    try {
      await apiFetch("/api/agent/whatsapp/reconnect", { method: "POST" });
      setWaStatus("connecting");
      setWaQr(null);
      setWaPairingCode(null);
    } finally {
      setWaReconnecting(false);
    }
  }

  async function handleRequestPairingCode(e: FormEvent) {
    e.preventDefault();
    setWaPhoneError(null);
    setWaRequestingCode(true);
    try {
      const res = await apiFetch("/api/agent/whatsapp/pairing-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: waPhone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Échec de la génération du code.");
      setWaPairingCode(data.code);
      setWaStatus("pairing");
    } catch (err) {
      setWaPhoneError((err as Error).message);
    } finally {
      setWaRequestingCode(false);
    }
  }

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
          <MessageCircle size={18} className="text-primary-2" />
          WhatsApp
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          Connectez votre WhatsApp pour que votre jumeau puisse envoyer des messages en votre nom.
        </p>

        {waStatus === "connected" ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-surface-light p-5">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-emerald-400" />
              <span className="font-semibold">WhatsApp connecté</span>
            </div>
            <button
              onClick={handleWaDisconnect}
              disabled={waDisconnecting}
              className="self-start sm:self-auto rounded-full border border-border-soft px-5 py-2.5 text-sm font-semibold text-muted hover:text-foreground transition-colors disabled:opacity-50"
            >
              {waDisconnecting ? "Déconnexion..." : "Déconnecter"}
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-2 border-b border-border-soft pb-3">
              {([
                { id: "qr", label: "QR code" },
                { id: "pairing", label: "Code d'appairage" },
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setWaMode(tab.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    waMode === tab.id ? "bg-gradient-to-r from-primary to-primary-2 text-white" : "text-muted hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {waMode === "qr" ? (
              waStatus === "qr" && waQr ? (
                <div className="flex flex-col items-center gap-3 rounded-2xl bg-surface-light p-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={waQr} alt="QR code WhatsApp" className="h-56 w-56 rounded-xl bg-white p-2" />
                  <p className="text-sm text-muted text-center max-w-xs">
                    Ouvrez WhatsApp sur votre téléphone → Paramètres → Appareils connectés → Connecter un appareil, puis scannez ce code dans les 5 minutes.
                  </p>
                </div>
              ) : waStatus === "expired" ? (
                <div className="flex flex-col items-center gap-3 rounded-2xl bg-surface-light p-6">
                  <p className="text-sm text-muted text-center max-w-xs">
                    Ce QR code a expiré (5 minutes écoulées). Générez-en un nouveau pour connecter WhatsApp.
                  </p>
                  <button
                    onClick={handleWaReconnect}
                    disabled={waReconnecting}
                    className="rounded-full bg-gradient-to-r from-primary to-primary-2 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                  >
                    {waReconnecting ? "Génération..." : "Générer un nouveau QR code"}
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl bg-surface-light p-5 text-sm text-muted">Génération du QR code en cours...</div>
              )
            ) : waStatus === "pairing" && waPairingCode ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl bg-surface-light p-6">
                <p className="font-display text-3xl font-semibold tracking-widest gradient-text">{waPairingCode}</p>
                <p className="text-sm text-muted text-center max-w-xs">
                  Ouvrez WhatsApp sur votre téléphone → Paramètres → Appareils connectés → Connecter avec un numéro de téléphone, puis entrez ce code dans les 5 minutes.
                </p>
                <button
                  onClick={() => { setWaPairingCode(null); setWaStatus("disconnected"); }}
                  className="text-sm text-muted hover:text-foreground transition-colors underline"
                >
                  Générer un nouveau code
                </button>
              </div>
            ) : (
              <form onSubmit={handleRequestPairingCode} className="flex flex-col gap-4 rounded-2xl bg-surface-light p-5">
                {waStatus === "expired" && (
                  <p className="text-sm text-muted">Le code précédent a expiré (5 minutes écoulées). Demandez-en un nouveau.</p>
                )}
                <FormField
                  label="Numéro de téléphone WhatsApp (format international, sans +)"
                  type="tel"
                  placeholder="33612345678"
                  value={waPhone}
                  onChange={(e) => setWaPhone(e.target.value)}
                  required
                />
                {waPhoneError && <p className="text-sm text-red-400">{waPhoneError}</p>}
                <SubmitButton type="submit" className="sm:w-fit" disabled={waRequestingCode}>
                  {waRequestingCode ? "Génération..." : "Obtenir le code"}
                </SubmitButton>
              </form>
            )}
          </>
        )}
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
