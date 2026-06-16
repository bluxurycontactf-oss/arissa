"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const QUESTIONS = [
  {
    q: "Qu'est-ce qu'un jumeau numérique ?",
    a: "C'est une réplique intelligente de vous-même dans le monde digital. Il connaît votre activité, vos préférences et vos objectifs, et agit en continu pour les faire progresser, en s'appuyant sur des agents IA spécialisés.",
  },
  {
    q: "En quoi Arissa diffère-t-il d'un assistant comme ChatGPT ?",
    a: "Un assistant classique répond à vos questions. Arissa va plus loin : il garde la mémoire de votre activité, exécute des actions de façon autonome (prospection, support, marketing, comptabilité...) et continue de travailler même lorsque vous n'êtes pas connecté.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Oui. Vos données sont chiffrées et ne sont jamais partagées avec des tiers. Vous gardez le contrôle total sur les actions que vos agents sont autorisés à effectuer.",
  },
  {
    q: "Les agents peuvent-ils vraiment générer des revenus ?",
    a: "Oui — par exemple en automatisant la prospection commerciale, en optimisant vos campagnes marketing ou en identifiant de nouvelles opportunités. Le revenu généré dépend de votre activité et de l'usage que vous en faites.",
  },
  {
    q: "Puis-je annuler mon abonnement à tout moment ?",
    a: "Oui, vous pouvez mettre à niveau, rétrograder ou annuler votre abonnement à tout moment depuis votre tableau de bord, sans engagement.",
  },
  {
    q: "Ai-je besoin de compétences techniques pour utiliser Arissa ?",
    a: "Non. La création de votre jumeau numérique et l'activation de vos agents se font en quelques minutes, sans aucune compétence technique requise.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32 border-t border-border-soft">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="FAQ" title="Questions fréquentes" />

        <Reveal className="max-w-3xl mx-auto w-full flex flex-col gap-3">
          {QUESTIONS.map((item, i) => (
            <div key={item.q} className="rounded-2xl border border-border-soft bg-surface overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold">{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-muted transition-transform ${open === i ? "rotate-180 text-primary-2" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-muted leading-relaxed">{item.a}</div>
              )}
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
