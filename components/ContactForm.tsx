"use client";
import { useState, FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import FormField from "./ui/FormField";
import SubmitButton from "./ui/SubmitButton";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-border-soft bg-surface p-8 flex flex-col items-center text-center gap-3">
        <CheckCircle2 size={32} className="text-primary-2" />
        <h3 className="font-display text-xl font-semibold">Message envoyé !</h3>
        <p className="text-sm text-muted leading-relaxed max-w-sm">
          Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-border-soft bg-surface p-6 sm:p-8 flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Nom complet" type="text" name="name" placeholder="Votre nom" required />
        <FormField label="Adresse email" type="email" name="email" placeholder="vous@entreprise.com" required />
      </div>
      <FormField label="Sujet" type="text" name="subject" placeholder="Comment pouvons-nous vous aider ?" required />
      <label className="flex flex-col gap-2 text-sm">
        <span className="font-medium text-foreground/90">Message</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Décrivez votre demande en détail..."
          className="w-full rounded-2xl border border-border-soft bg-surface-light px-5 py-3 text-sm outline-none transition-colors focus:border-primary/60 resize-none"
        />
      </label>
      <SubmitButton type="submit" size="lg" className="sm:w-fit" icon={<Send size={16} />}>
        Envoyer le message
      </SubmitButton>
    </form>
  );
}
