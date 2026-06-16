import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";

const SECTIONS = [
  {
    title: "1. Acceptation des conditions",
    body: "En créant un compte ou en utilisant la plateforme Arissa, vous acceptez sans réserve les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser le service.",
  },
  {
    title: "2. Description du service",
    body: "Arissa fournit une plateforme de jumeaux numériques et d'agents IA autonomes permettant à ses utilisateurs d'automatiser des tâches liées à leur activité (commerciale, support, marketing, comptabilité, etc.).",
  },
  {
    title: "3. Compte utilisateur",
    body: "Vous êtes responsable de la confidentialité de vos identifiants de connexion et de toute activité effectuée depuis votre compte. Vous devez nous informer immédiatement de toute utilisation non autorisée.",
  },
  {
    title: "4. Utilisation des agents IA",
    body: "Vous définissez le périmètre d'actions autorisé pour chaque agent. Arissa n'est pas responsable des conséquences d'actions effectuées par un agent dans le cadre du périmètre que vous avez configuré.",
  },
  {
    title: "5. Abonnements et facturation",
    body: "Les abonnements sont facturés de façon mensuelle ou annuelle selon le plan choisi. Vous pouvez modifier ou annuler votre abonnement à tout moment depuis votre tableau de bord, conformément à notre politique de facturation.",
  },
  {
    title: "6. Propriété intellectuelle",
    body: "L'ensemble des éléments de la plateforme Arissa (marque, logo, interface, code) est la propriété exclusive d'Arissa et est protégé par les lois applicables en matière de propriété intellectuelle.",
  },
  {
    title: "7. Limitation de responsabilité",
    body: "Arissa met en œuvre des moyens raisonnables pour assurer la disponibilité et la fiabilité du service, sans pouvoir garantir une disponibilité ininterrompue. Arissa ne saurait être tenu responsable des pertes indirectes liées à l'utilisation du service.",
  },
  {
    title: "8. Modification des conditions",
    body: "Arissa peut modifier les présentes conditions à tout moment. Les utilisateurs seront informés des changements significatifs par email ou via la plateforme.",
  },
];

export default function ConditionsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Mentions légales"
          title="Conditions d'utilisation"
          description="Dernière mise à jour : juin 2026. Veuillez lire attentivement ces conditions avant d'utiliser la plateforme Arissa."
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
