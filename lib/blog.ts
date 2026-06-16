export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Actualités IA" | "Conseils business" | "Étude de cas";
  date: string;
  readTime: string;
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "jumeaux-numeriques-avenir-travail",
    title: "Les jumeaux numériques : l'avenir du travail autonome",
    excerpt:
      "Comment les jumeaux numériques transforment la façon dont les entrepreneurs et les entreprises délèguent leur travail quotidien à l'IA.",
    category: "Actualités IA",
    date: "3 juin 2026",
    readTime: "6 min",
    content: [
      "Pendant des années, l'intelligence artificielle s'est limitée à répondre à des questions. Avec l'arrivée des jumeaux numériques, elle devient un véritable collaborateur autonome, capable d'agir au nom de son propriétaire.",
      "Un jumeau numérique apprend en continu : il observe vos décisions, comprend vos priorités et ajuste ses actions en conséquence. Plus vous l'utilisez, plus il devient précis et pertinent.",
      "Contrairement à un assistant classique, il ne se contente pas de répondre — il exécute. Relances commerciales, support client, gestion administrative : autant de tâches qui peuvent être déléguées en toute confiance.",
      "Pour les entrepreneurs, cela représente un changement radical : du temps libéré pour se concentrer sur la stratégie, la créativité et la croissance, tandis que le jumeau numérique s'occupe de l'exécution.",
    ],
  },
  {
    slug: "5-taches-a-automatiser-avec-agents-ia",
    title: "5 tâches à automatiser dès aujourd'hui avec des agents IA",
    excerpt:
      "Un guide pratique pour identifier les tâches répétitives de votre entreprise les plus rentables à confier à des agents IA.",
    category: "Conseils business",
    date: "27 mai 2026",
    readTime: "5 min",
    content: [
      "Toutes les tâches ne se valent pas lorsqu'il s'agit d'automatisation. Voici cinq catégories qui offrent le meilleur retour sur investissement.",
      "1. La relance commerciale : un agent peut suivre vos prospects, envoyer des rappels personnalisés et qualifier les leads avant de vous les transmettre.",
      "2. Le support client de premier niveau : la majorité des questions reçues sont répétitives et peuvent être résolues instantanément par un agent dédié.",
      "3. La gestion des factures : génération, envoi et suivi des paiements peuvent être entièrement automatisés.",
      "4. La veille concurrentielle : un agent de recherche peut surveiller votre marché et vous alerter des changements importants.",
      "5. La publication sur les réseaux sociaux : planification et analyse de performance, pour une présence constante sans effort manuel.",
    ],
  },
  {
    slug: "etude-de-cas-pme-double-pipeline-commercial",
    title: "Étude de cas : comment une PME a doublé son pipeline commercial",
    excerpt:
      "Découvrez comment une petite entreprise de services a utilisé son agent commercial Arissa pour multiplier ses opportunités de vente.",
    category: "Étude de cas",
    date: "14 mai 2026",
    readTime: "7 min",
    content: [
      "Une PME de services B2B peinait à maintenir un rythme de prospection régulier : faute de temps, de nombreux prospects restaient sans réponse pendant des semaines.",
      "Après l'activation de son agent commercial Arissa, l'entreprise a configuré des relances automatiques basées sur le comportement de chaque prospect.",
      "En trois mois, le nombre de relances effectuées a été multiplié par 4, sans aucune charge de travail supplémentaire pour l'équipe.",
      "Résultat : le pipeline commercial a doublé, avec un taux de réponse positive en hausse de 35%. L'équipe a pu se concentrer uniquement sur la conclusion des ventes.",
      "Ce cas illustre une tendance plus large : l'automatisation intelligente ne remplace pas les humains, elle leur permet de se concentrer sur ce qu'ils font de mieux.",
    ],
  },
  {
    slug: "ia-generative-vs-jumeau-numerique",
    title: "IA générative vs jumeau numérique : quelle différence ?",
    excerpt:
      "ChatGPT, agents IA, jumeaux numériques... on s'y perd. Voici les distinctions essentielles à connaître avant de choisir un outil.",
    category: "Actualités IA",
    date: "2 mai 2026",
    readTime: "4 min",
    content: [
      "L'IA générative classique répond à des requêtes ponctuelles : vous posez une question, elle répond. Chaque échange repart de zéro.",
      "Un jumeau numérique, en revanche, conserve une mémoire continue de votre activité. Il connaît votre historique, vos préférences et vos objectifs.",
      "Surtout, un jumeau numérique agit : il ne se limite pas à formuler une réponse, il exécute des actions concrètes via des agents spécialisés.",
      "En résumé : l'IA générative est un outil que vous utilisez ponctuellement. Le jumeau numérique est un collaborateur qui travaille en continu, même lorsque vous n'êtes pas connecté.",
    ],
  },
  {
    slug: "securiser-donnees-agents-ia",
    title: "Comment sécuriser les données de vos agents IA",
    excerpt:
      "Confier des tâches à des agents IA implique de leur donner accès à des informations sensibles. Voici les bonnes pratiques à adopter.",
    category: "Conseils business",
    date: "18 avril 2026",
    readTime: "5 min",
    content: [
      "Avant d'activer un agent IA, définissez précisément le périmètre d'actions et de données auquel il a accès.",
      "Privilégiez des plateformes qui chiffrent les données au repos et en transit, et qui ne les partagent jamais avec des tiers.",
      "Mettez en place des limites claires : par exemple, un agent commercial n'a pas besoin d'accéder aux données comptables.",
      "Enfin, gardez toujours un œil sur le journal d'activité de vos agents : la transparence est la clé d'une automatisation de confiance.",
    ],
  },
  {
    slug: "etude-de-cas-agence-marketing-automatisation",
    title: "Étude de cas : une agence marketing gagne 15h par semaine",
    excerpt:
      "Comment une agence marketing a délégué la création de contenu et le reporting à son agent IA pour se concentrer sur la stratégie créative.",
    category: "Étude de cas",
    date: "5 avril 2026",
    readTime: "6 min",
    content: [
      "Une agence marketing de taille moyenne consacrait près de 15 heures par semaine à la planification de contenu et à la création de rapports de performance pour ses clients.",
      "En configurant son agent marketing Arissa, l'agence a automatisé la planification des publications ainsi que la génération hebdomadaire des rapports clients.",
      "L'agent analyse également les performances des campagnes et propose des ajustements, que l'équipe valide en quelques clics.",
      "Le temps libéré a été réinvesti dans la stratégie créative et l'acquisition de nouveaux clients — un gain direct sur la croissance de l'agence.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
