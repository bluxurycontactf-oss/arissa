"use client";
import { ArrowRight } from "lucide-react";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

export default function SignupCTA() {
  return (
    <section id="inscription" className="py-24 sm:py-32 border-t border-border-soft relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30rem] w-[30rem] rounded-full bg-primary/20 blur-[120px]" />

      <Container className="relative">
        <Reveal className="gradient-border glow rounded-3xl px-6 py-14 sm:px-16 flex flex-col items-center text-center gap-6">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight max-w-2xl">
            Prêt à créer votre <span className="gradient-text">jumeau numérique</span> ?
          </h2>
          <p className="text-muted text-lg max-w-xl">
            Rejoignez Arissa et laissez votre premier agent IA commencer à travailler pour vous
            dès aujourd&apos;hui.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md pt-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="vous@entreprise.com"
              className="flex-1 rounded-full border border-border-soft bg-surface px-5 py-3 text-sm outline-none focus:border-primary/60 transition-colors"
            />
            <Button href="/inscription" size="md" icon={<ArrowRight size={16} />}>
              Créer mon compte
            </Button>
          </form>

          <p className="text-xs text-muted">Aucune carte bancaire requise · Configuration en 5 minutes</p>
        </Reveal>
      </Container>
    </section>
  );
}
