import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";

const SECTIONS = [
  {
    title: "1. Données collectées",
    body: "Nous collectons les informations que vous nous fournissez directement (nom, email, informations de facturation) ainsi que les données générées par l'utilisation de votre jumeau numérique et de vos agents IA.",
  },
  {
    title: "2. Utilisation des données",
    body: "Vos données sont utilisées pour fournir et améliorer le service, permettre à votre jumeau numérique d'apprendre vos préférences, et assurer la sécurité de votre compte.",
  },
  {
    title: "3. Partage des données",
    body: "Arissa ne vend ni ne partage vos données personnelles avec des tiers à des fins commerciales. Vos données peuvent être partagées avec des prestataires techniques nécessaires au fonctionnement du service (hébergement, paiement), sous engagement de confidentialité.",
  },
  {
    title: "4. Sécurité",
    body: "Vos données sont chiffrées au repos et en transit. L'accès aux données est strictement limité aux personnes et systèmes nécessaires au fonctionnement de votre compte.",
  },
  {
    title: "5. Contrôle de vos agents",
    body: "Vous définissez à tout moment le périmètre d'accès et d'actions de vos agents IA. Vous pouvez consulter, modifier ou révoquer ces accès depuis votre tableau de bord.",
  },
  {
    title: "6. Conservation des données",
    body: "Vos données sont conservées tant que votre compte est actif. En cas de suppression de compte, vos données sont supprimées dans un délai raisonnable, sauf obligation légale de conservation.",
  },
  {
    title: "7. Vos droits",
    body: "Vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous via la page Support.",
  },
  {
    title: "8. Cookies",
    body: "Arissa utilise des cookies essentiels au fonctionnement de la plateforme (authentification, préférences) ainsi que des cookies de mesure d'audience anonymisée.",
  },
];

export default function ConfidentialitePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Mentions légales"
          title="Politique de confidentialité"
          description="Dernière mise à jour : juin 2026. La protection de vos données est une priorité pour Arissa."
        />

        <section className="pb-24 sm:pb-32">
          <Container className="max-w-3xl">
            <Reveal className="flex flex-col gap-10">
              {SECTIONS.map((s) => (
                <div key={s.title} className="flex flex-col gap-3">
                  <h2 className="font-display text-xl sm:text-2xl font-semibold">{s.title}</h2>
                  <p className="text-muted leading-relaxed">{s.body}</p>
                </div>
              ))}
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
