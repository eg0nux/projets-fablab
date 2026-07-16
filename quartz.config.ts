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
        header: "Fraunces",
        body: "Iosevka",
        code: "Iosevka",
      },
      colors: {
        // Mode clair : palette One Light (assortie à One Dark)
        lightMode: {
          light: "#fafafa",
          lightgray: "#e5e5e6",
          gray: "#a0a1a7",
          darkgray: "#383a42",
          dark: "#202227",
          secondary: "#4078f2",
          tertiary: "#50a14f",
          highlight: "rgba(64, 120, 242, 0.12)",
          textHighlight: "#e5c07b88",
        },
        // Mode sombre : palette One Dark
        darkMode: {
          light: "#282c34",
          lightgray: "#3e4451",
          gray: "#5c6370",
          darkgray: "#abb2bf",
          dark: "#dcdfe4",
          secondary: "#61afef",
          tertiary: "#98c379",
          highlight: "rgba(97, 175, 239, 0.15)",
          textHighlight: "#e5c07b88",
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
