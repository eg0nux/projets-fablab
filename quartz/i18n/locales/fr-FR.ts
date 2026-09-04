import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Sans titre",
    description: "Aucune description fournie",
  },
  components: {
    callout: {
      note: "Note",
      abstract: "Résumé",
      info: "Info",
      todo: "À faire",
      tip: "Conseil",
      success: "Succès",
      question: "Question",
      warning: "Avertissement",
      failure: "Échec",
      danger: "Danger",
      bug: "Bogue",
      example: "Exemple",
      quote: "Citation",
    },
    backlinks: {
      title: "Liens retour",
      noBacklinksFound: "Aucun lien retour trouvé",
    },
    themeToggle: {
      lightMode: "Mode clair",
      darkMode: "Mode sombre",
    },
    readerMode: {
      title: "Mode lecture",
    },
    explorer: {
      title: "Explorateur",
    },
    footer: {
      createdWith: "Créé avec",
    },
    graph: {
      title: "Vue Graphique",
    },
    recentNotes: {
      title: "Notes Récentes",
      seeRemainingMore: ({ remaining }) => `Voir ${remaining} de plus →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Transclusion de ${targetSlug}`,
      linkToOriginal: "Lien vers l'original",
    },
    search: {
      title: "Recherche",
      searchBarPlaceholder: "Rechercher quelque chose",
    },
    tableOfContents: {
      title: "Table des Matières",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes} min de lecture`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Notes récentes",
      lastFewNotes: ({ count }) => `Les dernières ${count} notes`,
    },
    error: {
      title: "Introuvable",
      notFound: "Cette page existera peut-être dans le futur.",
      home: "En attendant, je retourne dans le passé.",
    },
    folderContent: {
      folder: "Rubrique",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 fiche dans cette rubrique." : `${count} fiches dans cette rubrique.`,
    },
    tagContent: {
      tag: "Étiquette",
      tagIndex: "Index des étiquettes",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 élément avec cette étiquette." : `${count} éléments avec cette étiquette.`,
      showingFirst: ({ count }) => `Affichage des premières ${count} étiquettes.`,
      totalTags: ({ count }) => `Trouvé ${count} étiquettes au total.`,
    },
  },
} as const satisfies Translation
