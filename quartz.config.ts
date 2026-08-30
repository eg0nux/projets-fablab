import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    // Le titre porte les deux niveaux : la marque et la section. Le logotype
    // les sépare à l'affichage (voir PageTitle et la charte), mais l'onglet,
    // le flux RSS et les métadonnées de partage gardent la chaîne entière —
    // c'est elle qui distingue ce site de fablab.egonux.com.
    pageTitle: "fablab/projets",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "fr-FR",
    baseUrl: "lab.egonux.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "local",
      cdnCaching: true,
      // Même appariement que fablab.egonux.com : titres et interface en
      // JetBrains Mono, corps en Literata, serif dessinée pour la lecture
      // longue à l'écran. Le contraste mono / serif tient sans couleur.
      typography: {
        header: "JetBrains Mono",
        body: "Literata",
        code: "JetBrains Mono",
      },
      colors: {
        // Encre, papier et rouge repris de maquette.egonux.com ; le reste
        // est dérivé en gris chauds. Régime sobre : la couleur est un
        // accent ponctuel, jamais un aplat.
        lightMode: {
          light: "#fafafa", // papier
          lightgray: "#e6e1d9", // filets, zébrure
          gray: "#8c8578", // texte effacé, table des matières
          darkgray: "#38352f", // corps de texte
          dark: "#212121", // encre : titres
          secondary: "#d32f2f", // accent : survol, encadrés
          tertiary: "#f44336", // accent vif
          highlight: "rgba(237, 209, 176, 0.32)", // pêche
          textHighlight: "#eddd6e99", // jaune
        },
        darkMode: {
          light: "#1c1b19",
          lightgray: "#33312c",
          gray: "#7d786d",
          darkgray: "#ded8cc",
          dark: "#f6ece0", // crème : titres
          secondary: "#f4675c",
          tertiary: "#f8998f",
          highlight: "rgba(237, 209, 176, 0.12)",
          textHighlight: "#eddd6e44",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "one-light",
          dark: "one-dark-pro",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      // Les codes hexadécimaux s'affichent dans leur couleur : sur une fiche
      // machine, le code couleur est la consigne elle-même.
      Plugin.CodesCouleur(),
      // Espaces insécables devant la ponctuation double française.
      Plugin.Typographie(),
      // Les étoiles du bloc « Repères » deviennent des jauges segmentées.
      Plugin.Reperes(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Désactivé : incompatible avec les polices locales
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
