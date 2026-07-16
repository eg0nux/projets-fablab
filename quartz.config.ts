import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Projets FabLab · 2026-2027",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "fr-FR",
    baseUrl: "fablab.egonux.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "local",
      cdnCaching: true,
      typography: {
        header: "Ubuntu",
        body: "Ubuntu",
        code: "Ubuntu Mono",
      },
      colors: {
        // Palette Kanagawa (d'après ssp.sh/brain) — mode clair « lotus »
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e0ddd0",
          gray: "#8a8778",
          darkgray: "#545464",
          dark: "#141021",
          secondary: "#ff5d62",
          tertiary: "#3150aa",
          highlight: "rgba(255, 93, 98, 0.1)",
          textHighlight: "#e6c38499",
        },
        // Palette Kanagawa — mode sombre « wave »
        darkMode: {
          light: "#1f1f28",
          lightgray: "#363646",
          gray: "#727169",
          darkgray: "#dcd7ba",
          dark: "#dcd7ba",
          secondary: "#658594",
          tertiary: "#e46876",
          highlight: "rgba(101, 133, 148, 0.15)",
          textHighlight: "#e6c38455",
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
      // Désactivé : incompatible avec les polices locales (Iosevka/Fraunces auto-hébergées)
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
