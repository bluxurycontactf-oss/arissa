"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { auth } from "@/lib/firebase";
import AuthShell from "@/components/ui/AuthShell";
import FormField from "@/components/ui/FormField";
import SubmitButton from "@/components/ui/SubmitButton";
import Link from "next/link";

export default function ConnexionPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/tableau-de-bord");
    } catch {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Connexion à Arissa"
      description="Accédez à votre jumeau numérique et à vos agents IA."
      footer={
        <>
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-semibold text-primary-2 hover:underline">
            Créer un compte
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField label="Adresse email" type="email" name="email" placeholder="vous@entreprise.com" required icon={<Mail size={16} />} />
        <FormField label="Mot de passe" type="password" name="password" placeholder="••••••••" required icon={<Lock size={16} />} />

        <div className="flex justify-end -mt-1">
          <Link href="#" className="text-xs text-primary-2 hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <SubmitButton type="submit" size="lg" className="w-full mt-1" icon={<ArrowRight size={18} />} disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </SubmitButton>
      </form>
    </AuthShell>
  );
}
