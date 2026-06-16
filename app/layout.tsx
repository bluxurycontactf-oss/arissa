import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import SupportChat from "@/components/SupportChat";
import { AuthProvider } from "@/lib/AuthContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Arissa — Votre jumeau numérique intelligent",
  description:
    "Arissa est la première plateforme de jumeaux numériques et d'agents IA autonomes capables de travailler, apprendre et générer de la valeur économique pour vous.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          {children}
          <SupportChat />
        </AuthProvider>
      </body>
    </html>
  );
}
