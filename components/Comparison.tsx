import { Check, X, Sparkles, MessageSquare } from "lucide-react";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const ROWS = [
  { label: "Mémoire à long terme de votre activité", classic: false, arissa: true },
  { label: "Exécute des actions de façon autonome", classic: false, arissa: true },
  { label: "Travaille en continu, sans supervision", classic: false, arissa: true },
  { label: "Apprend et s'améliore avec le temps", classic: false, arissa: true },
  { label: "Peut générer des revenus pour vous", classic: false, arissa: true },
  { label: "Coordonne plusieurs agents spécialisés", classic: false, arissa: true },
  { label: "Répond à des questions ponctuelles", classic: true, arissa: true },
];

export default function Comparison() {
  return (
    <section className="py-24 sm:py-32 border-t border-border-soft">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Comparaison"
          title="Pas un simple assistant. Un jumeau qui agit."
          description="Les assistants IA classiques répondent à vos questions. Arissa va plus loin : il travaille pour vous, prend des décisions et crée de la valeur."
        />

        <Reveal>
          <div className="overflow-x-auto rounded-3xl border border-border-soft bg-surface">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border-soft">
                  <th className="text-left font-medium text-muted px-6 py-5">Capacité</th>
                  <th className="px-6 py-5 text-center">
                    <span className="inline-flex items-center gap-2 text-muted font-semibold">
                      <MessageSquare size={16} /> Assistant classique
                    </span>
                  </th>
                  <th className="px-6 py-5 text-center">
                    <span className="inline-flex items-center gap-2 font-display font-semibold gradient-text">
                      <Sparkles size={16} className="text-primary-2" /> Jumeau numérique Arissa
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "" : "bg-surface-light/40"}>
                    <td className="px-6 py-4 font-medium">{row.label}</td>
                    <td className="px-6 py-4 text-center">
                      {row.classic ? (
                        <Check size={18} className="mx-auto text-muted" />
                      ) : (
                        <X size={18} className="mx-auto text-muted/40" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.arissa ? (
                        <Check size={18} className="mx-auto text-primary-2" />
                      ) : (
                        <X size={18} className="mx-auto text-muted/40" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
