"use client";
import { useEffect, useState, FormEvent } from "react";
import { User, Mail, Bell, CreditCard, ArrowRight, MessageCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
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
  const [waMode, setWaMode] = useState<"qr" | "pairing" | "import">("qr");
  const [waPhone, setWaPhone] = useState("");
  const [waRequestingCode, setWaRequestingCode] = useState(false);
  const [waPhoneError, setWaPhoneError] = useState<string | null>(null);
  const [waReconnecting, setWaReconnecting] = useState(false);
  const [waSessionString, setWaSessionString] = useState("");
  const [waImporting, setWaImporting] = useState(false);
  const [waImportError, setWaImportError] = useState<string | null>(null);

  const [waContacts, setWaContacts] = useState<{ jid: string; auto_reply: number; created_at: string }[]>([]);
  const [waContactsLoading, setWaContactsLoading] = useState(true);
  const [waTogglingJid, setWaTogglingJid] = useState<string | null>(null);

  type WaGroup = {
    group_jid: string;
    name: string;
    welcome_enabled: number;
    welcome_message: string;
    antispam_enabled: number;
  };
  const [waGroups, setWaGroups] = useState<WaGroup[]>([]);
  const [waGroupsLoading, setWaGroupsLoading] = useState(true);
  const [waGroupSaving, setWaGroupSaving] = useState<string | null>(null);

  type WaSettings = {
    unlock_viewonce: number;
    anti_delete: number;
    appear_online: number;
    proxy_url: string;
  };
  const [waSettings, setWaSettings] = useState<WaSettings | null>(null);
  const [waSettingsSaving, setWaSettingsSaving] = useState<string | null>(null);
  const [waProxyInput, setWaProxyInput] = useState("");
  const [waProxySaving, setWaProxySaving] = useState(false);

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

  async function refreshWaContacts() {
    try {
      const res = await apiFetch("/api/agent/whatsapp/contacts");
      const data = (await res.json()) as { contacts: typeof waContacts };
      setWaContacts(data.contacts);
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    refreshWaContacts().finally(() => setWaContactsLoading(false));
  }, []);

  async function toggleContactAutoReply(jid: string, currentAutoReply: number) {
    setWaTogglingJid(jid);
    try {
      await apiFetch(`/api/agent/whatsapp/contacts/${encodeURIComponent(jid)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ autoReply: currentAutoReply !== 1 }),
      });
      await refreshWaContacts();
    } finally {
      setWaTogglingJid(null);
    }
  }

  async function refreshWaGroups() {
    try {
      const res = await apiFetch("/api/agent/whatsapp/groups");
      const data = (await res.json()) as { groups: WaGroup[] };
      setWaGroups(data.groups);
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    refreshWaGroups().finally(() => setWaGroupsLoading(false));
  }, []);

  async function patchGroup(groupJid: string, patch: Partial<{ welcomeEnabled: boolean; welcomeMessage: string; antispamEnabled: boolean }>) {
    setWaGroupSaving(groupJid);
    try {
      await apiFetch(`/api/agent/whatsapp/groups/${encodeURIComponent(groupJid)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      await refreshWaGroups();
    } finally {
      setWaGroupSaving(null);
    }
  }

  useEffect(() => {
    apiFetch("/api/agent/whatsapp/settings")
      .then((r) => r.json())
      .then((d: { settings: WaSettings }) => {
        setWaSettings(d.settings);
        setWaProxyInput(d.settings.proxy_url ?? "");
      })
      .catch(() => {});
  }, []);

  async function patchWaSettings(
    key: "unlockViewonce" | "antiDelete" | "appearOnline",
    value: boolean
  ) {
    setWaSettingsSaving(key);
    try {
      const res = await apiFetch("/api/agent/whatsapp/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });
      const data = (await res.json()) as { settings: WaSettings };
      setWaSettings(data.settings);
    } finally {
      setWaSettingsSaving(null);
    }
  }

  async function handleSaveProxy(e: FormEvent) {
    e.preventDefault();
    setWaProxySaving(true);
    try {
      const res = await apiFetch("/api/agent/whatsapp/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proxyUrl: waProxyInput.trim() }),
      });
      const data = (await res.json()) as { settings: WaSettings };
      setWaSettings(data.settings);
    } finally {
      setWaProxySaving(false);
    }
  }

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

    const digits = waPhone.replace(/\D/g, "");
    if (digits.length < 10) {
      setWaPhoneError("Numéro trop court : n'oubliez pas l'indicatif du pays (ex: 229 pour le Bénin) suivi du numéro complet.");
      return;
    }

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

  async function handleImportSession(e: FormEvent) {
    e.preventDefault();
    setWaImportError(null);
    setWaImporting(true);
    try {
      const res = await apiFetch("/api/agent/whatsapp/import-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionString: waSessionString.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Échec de l'import de la session.");
      setWaSessionString("");
      setWaStatus("connecting");
    } catch (err) {
      setWaImportError((err as Error).message);
    } finally {
      setWaImporting(false);
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
                { id: "import", label: "Importer une session" },
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
                  label="Numéro WhatsApp avec l'indicatif du pays (obligatoire)"
                  type="tel"
                  placeholder="22997439379"
                  value={waPhone}
                  onChange={(e) => setWaPhone(e.target.value)}
                  required
                />
                <p className="text-xs text-muted -mt-2">
                  Indicatif pays + numéro complet, sans espace (avec ou sans +). Exemple pour le Bénin (229) : 22997439379.
                  N&apos;oubliez pas l&apos;indicatif, sinon WhatsApp refusera la connexion.
                </p>
                {waPhoneError && <p className="text-sm text-red-400">{waPhoneError}</p>}
                <SubmitButton type="submit" className="sm:w-fit" disabled={waRequestingCode}>
                  {waRequestingCode ? "Génération..." : "Obtenir le code"}
                </SubmitButton>
              </form>
            )}

            {waMode === "import" && (
              <form onSubmit={handleImportSession} className="flex flex-col gap-4 rounded-2xl bg-surface-light p-5">
                <p className="text-sm text-muted leading-relaxed">
                  WhatsApp bloque souvent les connexions directes depuis un serveur cloud. Connectez-vous plutôt
                  depuis votre ordinateur avec le script fourni (dossier <code className="text-foreground">local-pairing</code> du
                  backend, voir son README), puis collez ici la chaîne de session qu&apos;il génère.
                </p>
                <textarea
                  value={waSessionString}
                  onChange={(e) => setWaSessionString(e.target.value)}
                  rows={6}
                  placeholder="Collez ici la chaîne de session générée par le script local..."
                  className="w-full rounded-2xl border border-border-soft bg-surface px-5 py-3 text-sm outline-none transition-colors focus:border-primary/60 resize-none font-mono"
                  required
                />
                {waImportError && <p className="text-sm text-red-400">{waImportError}</p>}
                <SubmitButton type="submit" className="sm:w-fit" disabled={waImporting}>
                  {waImporting ? "Import en cours..." : "Importer et connecter"}
                </SubmitButton>
              </form>
            )}
          </>
        )}

        {waSettings && (
          <div className="flex flex-col gap-4 pt-2 border-t border-border-soft">
            {([
              { key: "unlockViewonce" as const, value: waSettings.unlock_viewonce, label: "Débloquer les vues uniques", desc: "Les photos/vidéos à vue unique reçues sont renvoyées dans votre propre discussion." },
              { key: "antiDelete" as const, value: waSettings.anti_delete, label: "Récupérer les messages supprimés", desc: "Si un contact supprime un message, vous le recevez quand même en privé." },
              { key: "appearOnline" as const, value: waSettings.appear_online, label: "Apparaître en ligne", desc: "Les messages ne sont jamais marqués comme lus automatiquement — seul votre téléphone déclenche les deux traits bleus quand vous ouvrez vraiment la discussion." },
            ]).map((s) => (
              <div key={s.key} className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground/90">{s.label}</p>
                  <p className="text-xs text-muted mt-0.5">{s.desc}</p>
                </div>
                <button
                  onClick={() => patchWaSettings(s.key, s.value !== 1)}
                  disabled={waSettingsSaving === s.key}
                  className={`relative h-6 w-11 shrink-0 rounded-full border border-border-soft transition-colors disabled:opacity-50 ${
                    s.value === 1 ? "bg-gradient-to-r from-primary to-primary-2" : "bg-surface-light"
                  }`}
                  aria-label={s.label}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                      s.value === 1 ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            ))}

            <form onSubmit={handleSaveProxy} className="flex flex-col gap-3 pt-2">
              <div>
                <p className="text-sm font-medium text-foreground/90">Proxy (recommandé)</p>
                <p className="text-xs text-muted mt-0.5">
                  WhatsApp bloque souvent les connexions directes depuis un serveur cloud. Indiquez l&apos;URL d&apos;un
                  proxy résidentiel/mobile à votre charge (ex: <code>http://user:pass@host:port</code> ou{" "}
                  <code>socks5://user:pass@host:port</code>) pour que la connexion passe par cette IP au lieu de
                  celle du serveur. Laissez vide pour ne pas utiliser de proxy.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={waProxyInput}
                  onChange={(e) => setWaProxyInput(e.target.value)}
                  placeholder="http://user:pass@host:port"
                  className="flex-1 rounded-2xl border border-border-soft bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary/60 font-mono"
                />
                <SubmitButton type="submit" className="sm:w-fit" disabled={waProxySaving}>
                  {waProxySaving ? "Enregistrement..." : "Enregistrer le proxy"}
                </SubmitButton>
              </div>
            </form>
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-6">
        <h2 className="font-display font-semibold flex items-center gap-2">
          <MessageCircle size={18} className="text-primary-2" />
          Contacts WhatsApp
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          Par défaut, le jumeau répond automatiquement à qui vous écrit sur WhatsApp. Désactivez la réponse
          automatique pour un contact : le jumeau suivra alors la discussion en silence et vous enverra en privé
          une remarque ou suggestion s&apos;il détecte quelque chose d&apos;important.
        </p>

        {waContactsLoading ? (
          <p className="text-sm text-muted">Chargement...</p>
        ) : waContacts.length === 0 ? (
          <p className="text-sm text-muted">Aucun contact pour l&apos;instant. Les contacts apparaissent ici après leur premier message.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {waContacts.map((c) => {
              const autoReply = c.auto_reply === 1;
              const busy = waTogglingJid === c.jid;
              return (
                <div key={c.jid} className="flex items-center justify-between gap-4 rounded-2xl bg-surface-light px-4 py-3 text-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    {autoReply ? (
                      <Eye size={16} className="text-emerald-400 shrink-0" />
                    ) : (
                      <EyeOff size={16} className="text-muted shrink-0" />
                    )}
                    <div className="truncate">
                      <p className="font-medium truncate">+{c.jid.split("@")[0]}</p>
                      <p className="text-xs text-muted">{autoReply ? "Réponse automatique active" : "Mode observation silencieuse"}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleContactAutoReply(c.jid, c.auto_reply)}
                    disabled={busy}
                    className={`relative h-6 w-11 shrink-0 rounded-full border border-border-soft transition-colors disabled:opacity-50 ${
                      autoReply ? "bg-gradient-to-r from-primary to-primary-2" : "bg-surface"
                    }`}
                    aria-label="Activer ou désactiver la réponse automatique"
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                        autoReply ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-6">
        <h2 className="font-display font-semibold flex items-center gap-2">
          <MessageCircle size={18} className="text-primary-2" />
          Groupes WhatsApp
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          Activez un message de bienvenue automatique pour les nouveaux membres, ou un anti-spam qui supprime les
          messages envoyés trop rapidement et avertit l&apos;auteur (nécessite que votre compte soit administrateur
          du groupe).
        </p>

        {waGroupsLoading ? (
          <p className="text-sm text-muted">Chargement...</p>
        ) : waGroups.length === 0 ? (
          <p className="text-sm text-muted">Aucun groupe détecté. Les groupes apparaissent ici une fois WhatsApp connecté.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {waGroups.map((g) => {
              const saving = waGroupSaving === g.group_jid;
              return (
                <div key={g.group_jid} className="rounded-2xl bg-surface-light p-4 flex flex-col gap-4">
                  <p className="font-semibold text-sm truncate">{g.name || g.group_jid.split("@")[0]}</p>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-foreground/90">Message de bienvenue</span>
                    <button
                      onClick={() => patchGroup(g.group_jid, { welcomeEnabled: g.welcome_enabled !== 1 })}
                      disabled={saving}
                      className={`relative h-6 w-11 shrink-0 rounded-full border border-border-soft transition-colors disabled:opacity-50 ${
                        g.welcome_enabled === 1 ? "bg-gradient-to-r from-primary to-primary-2" : "bg-surface"
                      }`}
                      aria-label="Activer ou désactiver le message de bienvenue"
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                          g.welcome_enabled === 1 ? "translate-x-5" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {g.welcome_enabled === 1 && (
                    <textarea
                      defaultValue={g.welcome_message}
                      onBlur={(e) => {
                        if (e.target.value !== g.welcome_message) patchGroup(g.group_jid, { welcomeMessage: e.target.value });
                      }}
                      rows={2}
                      placeholder="Bienvenue {nom} dans le groupe !"
                      className="w-full rounded-xl border border-border-soft bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary/60 resize-none"
                    />
                  )}

                  <div className="flex items-center justify-between gap-4 pt-2 border-t border-border-soft">
                    <span className="text-sm text-foreground/90">Anti-spam</span>
                    <button
                      onClick={() => patchGroup(g.group_jid, { antispamEnabled: g.antispam_enabled !== 1 })}
                      disabled={saving}
                      className={`relative h-6 w-11 shrink-0 rounded-full border border-border-soft transition-colors disabled:opacity-50 ${
                        g.antispam_enabled === 1 ? "bg-gradient-to-r from-primary to-primary-2" : "bg-surface"
                      }`}
                      aria-label="Activer ou désactiver l'anti-spam"
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                          g.antispam_enabled === 1 ? "translate-x-5" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
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
