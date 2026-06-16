"use client";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles, Bot, TrendingUp, Zap } from "lucide-react";
import Button from "./ui/Button";
import Container from "./ui/Container";

const STATS = [
  { label: "Disponibilité", value: "24/7" },
  { label: "Agents spécialisés", value: "6+" },
  { label: "Autonomie", value: "100%" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      {/* Background grid + glow */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[36rem] w-[36rem] rounded-full bg-primary/25 blur-[120px] animate-float-slow" />
      <div className="absolute top-40 right-0 h-[24rem] w-[24rem] rounded-full bg-primary-2/20 blur-[100px] animate-float" />

      <Container className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-7">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 self-start rounded-full border border-border-soft bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-2"
          >
            <Sparkles size={14} />
            Nouvelle génération d&apos;IA autonome
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight"
          >
            Votre jumeau numérique.
            <br />
            <span className="gradient-text">Votre meilleur collaborateur.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted leading-relaxed max-w-xl"
          >
            Arissa est le premier jumeau numérique intelligent capable de travailler, apprendre
            et créer de la valeur économique pour son propriétaire — grâce à des agents IA
            autonomes qui agissent pour vous, 24h/24.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <Button href="/inscription" size="lg" icon={<ArrowRight size={18} />}>
              Créer mon jumeau numérique
            </Button>
            <Button href="#demo" variant="outline" size="lg" icon={<PlayCircle size={18} />}>
              Voir la démo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-8 pt-6"
          >
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="font-display text-2xl font-semibold gradient-text">{s.value}</span>
                <span className="text-sm text-muted">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="gradient-border rounded-3xl p-6 glow animate-float">
            <div className="flex items-center gap-3 pb-4 border-b border-border-soft">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-2">
                <Bot size={20} className="text-white" />
                <span className="absolute inset-0 rounded-2xl animate-pulse-ring" />
              </div>
              <div>
                <p className="font-semibold text-sm">Jumeau numérique — Alex</p>
                <p className="text-xs text-muted flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> En ligne · agit pour vous
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 py-5">
              <div className="self-end max-w-[80%] rounded-2xl rounded-tr-sm bg-surface-light px-4 py-2.5 text-sm">
                Relance les 12 prospects en attente et prépare le rapport hebdo.
              </div>
              <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-gradient-to-br from-primary/20 to-primary-2/10 border border-border-soft px-4 py-2.5 text-sm">
                C&apos;est fait ✅ — 12 relances envoyées, 3 réponses positives.
                Rapport généré et envoyé par email.
              </div>
              <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-gradient-to-br from-primary/20 to-primary-2/10 border border-border-soft px-4 py-2.5 text-sm">
                💡 J&apos;ai aussi détecté 2 opportunités de vente additionnelle.
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border-soft">
              {[
                { icon: TrendingUp, label: "Revenus", value: "+18%" },
                { icon: Zap, label: "Tâches", value: "47" },
                { icon: Bot, label: "Agents actifs", value: "4" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-surface-light p-3 text-center">
                  <s.icon size={16} className="mx-auto mb-1 text-primary-2" />
                  <p className="font-display text-sm font-semibold">{s.value}</p>
                  <p className="text-[11px] text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
