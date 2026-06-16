import Link from "next/link";
import { Sparkles } from "lucide-react";
import Container from "./ui/Container";

const SOCIALS = [
  {
    label: "X (Twitter)",
    href: "#",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.26 10.99h-6.466l-5.066-6.62-5.797 6.62H1.95l7.73-8.83L1.69 2.25h6.624l4.601 6.082L18.244 2.25Z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5ZM2.5 9.75h5v12.5h-5v-12.5Zm7.5 0h4.79v1.71h.07c.67-1.21 2.3-2.49 4.73-2.49 5.06 0 6 3.33 6 7.66v8.62h-5v-7.64c0-1.82-.03-4.16-2.54-4.16-2.54 0-2.93 1.98-2.93 4.03v7.77h-5v-12.5Z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23.5 7.2s-.23-1.64-.94-2.36c-.9-.95-1.9-.95-2.36-1C16.97 3.5 12 3.5 12 3.5h-.01s-4.97 0-8.2.34c-.46.05-1.46.05-2.36 1-.71.72-.94 2.36-.94 2.36S.25 9.13.25 11.06v1.78c0 1.93.24 3.86.24 3.86s.23 1.64.94 2.36c.9.95 2.08.92 2.6 1.02 1.9.18 8.04.34 8.04.34s4.98-.01 8.21-.35c.46-.05 1.46-.05 2.36-1 .71-.72.94-2.36.94-2.36s.24-1.93.24-3.86v-1.78c0-1.93-.24-3.86-.24-3.86ZM9.6 14.93V8.66l6.27 3.14-6.27 3.13Z",
  },
];

const COLUMNS = [
  {
    title: "Produit",
    links: [
      { label: "Fonctionnalités", href: "/fonctionnalites" },
      { label: "Agents IA", href: "/fonctionnalites" },
      { label: "Tarifs", href: "/tarifs" },
      { label: "Démo", href: "/#demo" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Blog", href: "/blog" },
      { label: "Support", href: "/support" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Conditions d'utilisation", href: "/conditions" },
      { label: "Politique de confidentialité", href: "/confidentialite" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-soft py-16">
      <Container className="flex flex-col gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col gap-4 max-w-xs">
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-semibold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-2">
                <Sparkles size={18} className="text-white" />
              </span>
              Arissa
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              Le premier jumeau numérique intelligent capable de travailler, apprendre et créer
              de la valeur économique pour son propriétaire.
            </p>
            <div className="flex gap-3 pt-1">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-soft text-muted hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="font-display font-semibold text-sm">{col.title}</p>
              {col.links.map((l) => (
                <Link key={l.label} href={l.href} className="text-sm text-muted hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border-soft pt-8 text-xs text-muted">
          <p>© {new Date().getFullYear()} Arissa. Tous droits réservés.</p>
          <p>Construit pour une nouvelle génération d&apos;entrepreneurs augmentés par l&apos;IA.</p>
        </div>
      </Container>
    </footer>
  );
}
