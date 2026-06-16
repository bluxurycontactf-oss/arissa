"use client";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

const PLANS = [
  {
    key: "starter",
    name: "Starter",
    tagline: "Pour découvrir votre premier jumeau numérique",
    monthly: 0,
    annual: 0,
    features: [
      "1 agent IA actif",
      "Jumeau numérique basique",
      "100 actions automatisées / mois",
      "Support communautaire",
    ],
    cta: "Commencer gratuitement",
  },
  {
    key: "pro",
    name: "Pro",
    tagline: "Pour les indépendants et petites équipes",
    monthly: 29,
    annual: 290,
    popular: true,
    features: [
      "5 agents IA actifs",
      "Jumeau numérique avancé",
      "Automatisations illimitées",
      "Statistiques et rapports",
      "Support prioritaire",
    ],
    cta: "Essayer Pro",
  },
  {
    key: "business",
    name: "Business",
    tagline: "Pour les entreprises en croissance",
    monthly: 99,
    annual: 990,
    features: [
      "Agents IA illimités",
      "Gestion multi-entreprises",
      "Génération de revenus automatisée",
      "Accès API",
      "Support dédié",
    ],
    cta: "Essayer Business",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    tagline: "Pour les organisations à grande échelle",
    monthly: null,
    annual: null,
    features: [
      "Déploiement dédié",
      "SLA garanti",
      "Intégrations personnalisées",
      "Sécurité et conformité avancées",
      "Accompagnement dédié",
    ],
    cta: "Contacter l'équipe",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="tarifs" className="py-24 sm:py-32 border-t border-border-soft">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Tarifs"
          title="Un plan pour chaque ambition"
          description="Commencez gratuitement, puis évoluez au rythme de la valeur que votre jumeau numérique vous apporte. Changez ou annulez à tout moment."
        />

        <Reveal className="flex items-center justify-center gap-3">
          <span className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted"}`}>Mensuel</span>
          <button
            onClick={() => setAnnual((v) => !v)}
            className="relative h-7 w-14 rounded-full bg-surface-light border border-border-soft transition-colors"
            aria-label="Basculer entre mensuel et annuel"
          >
            <span
              className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-gradient-to-r from-primary to-primary-2 transition-transform ${
                annual ? "translate-x-7" : ""
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${annual ? "text-foreground" : "text-muted"}`}>
            Annuel <span className="text-primary-2">— 2 mois offerts</span>
          </span>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.key} delay={i * 0.06}>
              <div
                className={`relative flex h-full flex-col gap-6 rounded-3xl p-6 ${
                  plan.popular
                    ? "gradient-border glow"
                    : "border border-border-soft bg-surface"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-primary-2 px-4 py-1 text-xs font-semibold text-white">
                    Le plus populaire
                  </span>
                )}

                <div>
                  <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
                  <p className="text-sm text-muted mt-1">{plan.tagline}</p>
                </div>

                <div className="flex items-end gap-1">
                  {plan.monthly === null ? (
                    <span className="font-display text-3xl font-semibold">Sur devis</span>
                  ) : (
                    <>
                      <span className="font-display text-4xl font-semibold">
                        ${annual ? plan.annual : plan.monthly}
                      </span>
                      <span className="text-muted text-sm pb-1">{annual ? "/an" : "/mois"}</span>
                    </>
                  )}
                </div>

                <ul className="flex flex-col gap-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check size={16} className="text-primary-2 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href={plan.key === "enterprise" ? "/contact" : "/inscription"}
                  variant={plan.popular ? "primary" : "outline"}
                  className="w-full"
                  icon={<ArrowRight size={16} />}
                >
                  {plan.cta}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
