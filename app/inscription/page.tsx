"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { auth } from "@/lib/firebase";
import AuthShell from "@/components/ui/AuthShell";
import FormField from "@/components/ui/FormField";
import SubmitButton from "@/components/ui/SubmitButton";
import Link from "next/link";

export default function InscriptionPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(credential.user, { displayName: name });
      router.push("/tableau-de-bord");
    } catch (err) {
      const code = (err as { code?: string }).code;
      if (code === "auth/email-already-in-use") {
        setError("Un compte existe déjà avec cette adresse email.");
      } else if (code === "auth/weak-password") {
        setError("Le mot de passe doit contenir au moins 6 caractères.");
      } else {
        setError("Impossible de créer le compte. Vérifiez vos informations et réessayez.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Créez votre compte Arissa"
      description="Configurez votre jumeau numérique et activez vos premiers agents IA en quelques minutes."
      footer={
        <>
          Vous avez déjà un compte ?{" "}
          <Link href="/connexion" className="font-semibold text-primary-2 hover:underline">
            Se connecter
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField label="Nom complet" type="text" name="name" placeholder="Ex. Sophie Martin" required icon={<User size={16} />} />
        <FormField label="Adresse email" type="email" name="email" placeholder="vous@entreprise.com" required icon={<Mail size={16} />} />
        <FormField label="Mot de passe" type="password" name="password" placeholder="8 caractères minimum" required minLength={8} icon={<Lock size={16} />} />

        <label className="flex items-start gap-3 text-xs text-muted leading-relaxed">
          <input
            type="checkbox"
            required
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border-soft bg-surface accent-primary"
          />
          J&apos;accepte les{" "}
          <Link href="/conditions" className="text-primary-2 hover:underline">
            conditions d&apos;utilisation
          </Link>{" "}
          et la{" "}
          <Link href="/confidentialite" className="text-primary-2 hover:underline">
            politique de confidentialité
          </Link>
          .
        </label>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <SubmitButton type="submit" size="lg" className="w-full mt-1" icon={<ArrowRight size={18} />} disabled={loading}>
          {loading ? "Création..." : "Créer mon compte"}
        </SubmitButton>
      </form>
    </AuthShell>
  );
}
