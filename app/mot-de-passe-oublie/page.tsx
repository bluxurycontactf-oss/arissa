"use client";
import { FormEvent, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import AuthShell from "@/components/ui/AuthShell";
import FormField from "@/components/ui/FormField";
import SubmitButton from "@/components/ui/SubmitButton";

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch {
      setError("Aucun compte trouvé avec cet email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Mot de passe oublié"
      description="Entrez votre email pour recevoir un lien de réinitialisation."
      footer={
        <>
          Vous vous souvenez ?{" "}
          <Link href="/connexion" className="font-semibold text-primary-2 hover:underline">
            Se connecter
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <CheckCircle size={40} className="text-emerald-400" />
          <p className="text-sm text-muted">
            Un email de réinitialisation a été envoyé à <strong className="text-foreground">{email}</strong>.
            Vérifiez votre boîte mail (et vos spams).
          </p>
          <Link href="/connexion" className="text-sm font-semibold text-primary-2 hover:underline">
            Retour à la connexion
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField
            label="Adresse email"
            type="email"
            name="email"
            placeholder="vous@entreprise.com"
            required
            icon={<Mail size={16} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <SubmitButton type="submit" size="lg" className="w-full mt-1" icon={<ArrowRight size={18} />} disabled={loading}>
            {loading ? "Envoi..." : "Envoyer le lien"}
          </SubmitButton>
        </form>
      )}
    </AuthShell>
  );
}
