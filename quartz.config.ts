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
        // Sérigraphie : deux encres à plat, le noir et le safran, sur un
        // papier crème. Le safran est un fond, jamais un texte : à 2,8:1 sur
        // le papier il ne se lit pas, et c'est ce qui le tient à sa place.
        // Quartz veut deux accents, la charte n'en a qu'un : `secondary` et
        // `tertiary` sont la même encre. Le reste est dérivé en gris chauds.
        lightMode: {
          light: "#fbf6ec", // papier crème
          lightgray: "#e4dbc9", // filets, zébrure
          gray: "#8a8176", // texte effacé, signalétique
          darkgray: "#33302a", // corps de texte
          dark: "#1a1613", // encre : titres, blocs pleins
          secondary: "#f26b1d", // safran : l'autre encre, toujours en fond
          tertiary: "#f26b1d", // idem
          highlight: "rgba(242, 107, 29, 0.16)", // survols de Quartz hors charte
          textHighlight: "#f26b1d", // ==surlignage== hors chapeau
        },
        darkMode: {
          light: "#171311",
          lightgray: "#332d27",
          gray: "#948a7d",
          darkgray: "#d8cfc1",
          dark: "#f5eee2", // crème : titres, blocs pleins
          secondary: "#f26b1d", // le même safran : c'est le texte posé dessus qui suit le thème
          tertiary: "#f26b1d",
          highlight: "rgba(242, 107, 29, 0.2)",
          textHighlight: "#f26b1d",
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
