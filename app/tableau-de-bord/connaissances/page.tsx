"use client";

import { useEffect, useState, FormEvent } from "react";
import { Trash2, Plus, FileText, Link2, Upload, BrainCircuit, UserCog } from "lucide-react";
import { apiFetch } from "@/lib/api";
import FormField from "@/components/ui/FormField";
import SubmitButton from "@/components/ui/SubmitButton";

type ProfileEntry = { key: string; value: string };

type MemoryFact = {
  id: number;
  content: string;
  category: string;
  importance: number;
  times_used: number;
  created_at: string;
};

type DocumentEntry = {
  id: number;
  title: string;
  source_type: "text" | "pdf" | "url";
  source_ref: string | null;
  chunk_count: number;
  created_at: string;
};

type DocSourceTab = "text" | "url" | "pdf";

export default function ConnaissancesPage() {
  const [profile, setProfile] = useState<ProfileEntry[]>([]);
  const [facts, setFacts] = useState<MemoryFact[]>([]);
  const [documents, setDocuments] = useState<DocumentEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const [profileKey, setProfileKey] = useState("");
  const [profileValue, setProfileValue] = useState("");

  const [docTab, setDocTab] = useState<DocSourceTab>("text");
  const [docTitle, setDocTitle] = useState("");
  const [docContent, setDocContent] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docError, setDocError] = useState<string | null>(null);
  const [docLoading, setDocLoading] = useState(false);

  async function refresh() {
    const [profileRes, factsRes, docsRes] = await Promise.all([
      apiFetch(`/api/agent/profile`),
      apiFetch(`/api/agent/memory`),
      apiFetch(`/api/agent/documents`),
    ]);
    const profileData = (await profileRes.json()) as { profile: Record<string, string> };
    const factsData = (await factsRes.json()) as { facts: MemoryFact[] };
    const docsData = (await docsRes.json()) as { documents: DocumentEntry[] };

    setProfile(Object.entries(profileData.profile).map(([key, value]) => ({ key, value })));
    setFacts(factsData.facts);
    setDocuments(docsData.documents);
  }

  useEffect(() => {
    refresh()
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleProfileSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!profileKey.trim() || !profileValue.trim()) return;

    await apiFetch(`/api/agent/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: profileKey.trim(), value: profileValue.trim() }),
    });

    setProfileKey("");
    setProfileValue("");
    await refresh();
  }

  async function deleteProfileEntry(key: string) {
    await apiFetch(`/api/agent/profile/${encodeURIComponent(key)}`, { method: "DELETE" });
    await refresh();
  }

  async function deleteFact(id: number) {
    await apiFetch(`/api/agent/memory/${id}`, { method: "DELETE" });
    await refresh();
  }

  async function deleteDocument(id: number) {
    await apiFetch(`/api/agent/documents/${id}`, { method: "DELETE" });
    await refresh();
  }

  async function handleDocumentSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!docTitle.trim()) return;
    setDocError(null);
    setDocLoading(true);

    try {
      let res: Response;

      if (docTab === "pdf") {
        if (!docFile) throw new Error("Sélectionnez un fichier PDF.");
        const formData = new FormData();
        formData.append("title", docTitle.trim());
        formData.append("sourceType", "pdf");
        formData.append("file", docFile);
        res = await apiFetch(`/api/agent/documents`, { method: "POST", body: formData });
      } else {
        const payload: Record<string, string> = { title: docTitle.trim(), sourceType: docTab };
        if (docTab === "text") payload.content = docContent;
        if (docTab === "url") payload.url = docUrl;

        res = await apiFetch(`/api/agent/documents`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Échec de l'ingestion du document.");

      setDocTitle("");
      setDocContent("");
      setDocUrl("");
      setDocFile(null);
      await refresh();
    } catch (err) {
      setDocError((err as Error).message);
    } finally {
      setDocLoading(false);
    }
  }

  if (loading) {
    return <div className="min-h-[40vh]" />;
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold">Connaissances</h1>
        <p className="text-muted mt-1">
          Ce que votre jumeau numérique sait sur vous : profil, mémoire apprise et documents fournis pour le RAG.
        </p>
      </div>

      {/* Profil */}
      <section className="rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <UserCog size={18} className="text-primary-2" />
          <h2 className="font-display font-semibold">Profil</h2>
        </div>

        {profile.length > 0 && (
          <div className="flex flex-col gap-2">
            {profile.map((entry) => (
              <div
                key={entry.key}
                className="flex items-center justify-between gap-3 rounded-2xl bg-surface-light px-4 py-3 text-sm"
              >
                <div>
                  <span className="font-semibold">{entry.key}</span>
                  <span className="text-muted"> : {entry.value}</span>
                </div>
                <button
                  onClick={() => deleteProfileEntry(entry.key)}
                  className="text-muted hover:text-red-400 transition-colors"
                  aria-label="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] gap-3 items-end">
          <FormField label="Clé" placeholder="ex: secteur" value={profileKey} onChange={(e) => setProfileKey(e.target.value)} />
          <FormField label="Valeur" placeholder="ex: Immobilier de luxe" value={profileValue} onChange={(e) => setProfileValue(e.target.value)} />
          <SubmitButton type="submit" icon={<Plus size={16} />}>
            Ajouter
          </SubmitButton>
        </form>
      </section>

      {/* Mémoire */}
      <section className="rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <BrainCircuit size={18} className="text-primary-2" />
          <h2 className="font-display font-semibold">Mémoire apprise</h2>
        </div>

        {facts.length === 0 ? (
          <p className="text-sm text-muted">
            Votre jumeau n&apos;a encore rien mémorisé. Au fil de vos conversations, les informations importantes sur
            votre activité apparaîtront ici.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {facts.map((fact) => (
              <div key={fact.id} className="flex items-center justify-between gap-3 rounded-2xl bg-surface-light px-4 py-3 text-sm">
                <div>
                  <p>{fact.content}</p>
                  <p className="text-xs text-muted mt-1">
                    {fact.category} · importance {fact.importance} · utilisé {fact.times_used} fois
                  </p>
                </div>
                <button
                  onClick={() => deleteFact(fact.id)}
                  className="text-muted hover:text-red-400 transition-colors shrink-0"
                  aria-label="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Documents */}
      <section className="rounded-3xl border border-border-soft bg-surface p-6 flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-primary-2" />
          <h2 className="font-display font-semibold">Documents (RAG)</h2>
        </div>

        {documents.length === 0 ? (
          <p className="text-sm text-muted">Aucun document ajouté. Ajoutez une note, un PDF ou une page web ci-dessous.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between gap-3 rounded-2xl bg-surface-light px-4 py-3 text-sm">
                <div>
                  <p className="font-semibold">{doc.title}</p>
                  <p className="text-xs text-muted mt-1">
                    {doc.source_type.toUpperCase()} · {doc.chunk_count} extraits
                    {doc.source_ref ? ` · ${doc.source_ref}` : ""}
                  </p>
                </div>
                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="text-muted hover:text-red-400 transition-colors shrink-0"
                  aria-label="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 border-b border-border-soft pb-3">
          {([
            { id: "text", label: "Note", icon: FileText },
            { id: "url", label: "Page web", icon: Link2 },
            { id: "pdf", label: "PDF", icon: Upload },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setDocTab(tab.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                docTab === tab.id ? "bg-gradient-to-r from-primary to-primary-2 text-white" : "text-muted hover:text-foreground"
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleDocumentSubmit} className="flex flex-col gap-4">
          <FormField label="Titre" placeholder="ex: Notes stratégie marketing" value={docTitle} onChange={(e) => setDocTitle(e.target.value)} required />

          {docTab === "text" && (
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-foreground/90">Contenu</span>
              <textarea
                rows={5}
                required
                value={docContent}
                onChange={(e) => setDocContent(e.target.value)}
                placeholder="Collez vos notes, idées ou informations ici..."
                className="w-full rounded-2xl border border-border-soft bg-surface-light px-5 py-3 text-sm outline-none transition-colors focus:border-primary/60 resize-none"
              />
            </label>
          )}

          {docTab === "url" && (
            <FormField
              label="URL"
              type="url"
              placeholder="https://exemple.com/article"
              value={docUrl}
              onChange={(e) => setDocUrl(e.target.value)}
              required
            />
          )}

          {docTab === "pdf" && (
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-foreground/90">Fichier PDF</span>
              <input
                type="file"
                accept="application/pdf"
                required
                onChange={(e) => setDocFile(e.target.files?.[0] ?? null)}
                className="w-full rounded-2xl border border-border-soft bg-surface-light px-5 py-3 text-sm outline-none transition-colors focus:border-primary/60"
              />
            </label>
          )}

          {docError && <p className="text-sm text-red-400">{docError}</p>}

          <SubmitButton type="submit" size="lg" className="sm:w-fit" icon={<Plus size={16} />} disabled={docLoading}>
            {docLoading ? "Ajout en cours..." : "Ajouter le document"}
          </SubmitButton>
        </form>
      </section>
    </div>
  );
}
