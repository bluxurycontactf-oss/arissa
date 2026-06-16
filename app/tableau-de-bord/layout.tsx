"use client";
import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { LayoutDashboard, Bot, BookOpen, Workflow, Repeat, BarChart3, Settings, LogOut, Sparkles, Menu, X } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";

const NAV = [
  { href: "/tableau-de-bord", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/tableau-de-bord/jumeau", label: "Jumeau numérique", icon: Bot },
  { href: "/tableau-de-bord/connaissances", label: "Connaissances", icon: BookOpen },
  { href: "/tableau-de-bord/automatisations", label: "Automatisations", icon: Repeat },
  { href: "/tableau-de-bord/agents", label: "Agents", icon: Workflow },
  { href: "/tableau-de-bord/statistiques", label: "Statistiques", icon: BarChart3 },
  { href: "/tableau-de-bord/parametres", label: "Paramètres", icon: Settings },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/connexion");
    }
  }, [loading, user, router]);

  async function handleLogout() {
    await signOut(auth);
    router.push("/");
  }

  if (loading || !user) {
    return <div className="min-h-screen bg-background" />;
  }

  const navContent = (
    <>
      <Link href="/" className="flex items-center gap-2 font-display text-xl font-semibold">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-2">
          <Sparkles size={18} className="text-white" />
        </span>
        Arissa
      </Link>

      <nav className="flex flex-col gap-1.5">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-gradient-to-r from-primary/20 to-primary-2/10 border border-border-soft text-foreground"
                  : "text-muted hover:text-foreground hover:bg-surface"
              }`}
            >
              <item.icon size={18} className={active ? "text-primary-2" : ""} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-muted hover:text-foreground hover:bg-surface transition-colors"
      >
        <LogOut size={18} />
        Déconnexion
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col gap-8 border-r border-border-soft p-6">
        {navContent}
      </aside>

      {/* Mobile topbar */}
      <header className="lg:hidden flex items-center justify-between border-b border-border-soft px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-2">
            <Sparkles size={16} className="text-white" />
          </span>
          Arissa
        </Link>
        <button
          aria-label="Menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-border-soft text-foreground"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {mobileOpen && (
        <div className="lg:hidden flex flex-col gap-6 border-b border-border-soft p-6 bg-surface">
          {navContent}
        </div>
      )}

      <main className="lg:pl-64">
        <div className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-10 lg:py-12">{children}</div>
      </main>
    </div>
  );
}
