"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import Button from "./ui/Button";
import Container from "./ui/Container";

const LINKS = [
  { href: "/fonctionnalites", label: "Fonctionnalités" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/blog", label: "Blog" },
  { href: "/support", label: "Support" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border-soft bg-background/70 backdrop-blur-xl">
      <Container className="flex h-18 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-2">
            <Sparkles size={18} className="text-white" />
          </span>
          Arissa
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/connexion" className="text-sm font-semibold text-muted hover:text-foreground transition-colors">
            Connexion
          </Link>
          <Button href="/inscription" size="md">
            Commencer gratuitement
          </Button>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-border-soft text-foreground"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {open && (
        <Container className="md:hidden pb-6 flex flex-col gap-4 border-t border-border-soft pt-4">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-muted hover:text-foreground">
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <Link href="/connexion" className="text-sm font-semibold text-muted">
              Connexion
            </Link>
            <Button href="/inscription" size="md" className="w-full">
              Commencer gratuitement
            </Button>
          </div>
        </Container>
      )}
    </header>
  );
}
