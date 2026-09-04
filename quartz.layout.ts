import { PageLayout, SharedLayout } from "./quartz/cfg"
import { QuartzComponent } from "./quartz/components/types"
import * as Component from "./quartz/components"

// L'accueil garde son titre et sa date (le catalogue est daté, c'est son
// millésime), mais ni fil d'Ariane ni sommaire : comme sur fablab.egonux.com,
// la colonne de droite n'y porte que les logos des structures, que la grille
// à deux colonnes fait tomber sous le contenu.
const saufAccueil = (component: QuartzComponent) =>
  Component.ConditionalRender({
    component,
    condition: (page) => page.fileData.slug !== "index",
  })

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      contact: "mailto:florian@egonux.com",
      "ego/nux": "https://www.egonux.com",
    },
    ecoindex: {
      note: "A",
      url: "https://www.ecoindex.fr/resultat/?id=05ecb87b-50f2-442b-81f0-6d28f74ba13d",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    saufAccueil(Component.Breadcrumbs({ rootName: "Accueil", spacerSymbol: "›" })),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      mapFn: (node) => {
        if (node.slugSegment === "projets") {
          node.displayName = "Projets"
        }
      },
    }),
  ],
  right: [
    // Le CIDFF Dordogne anime l'atelier numérique, La Traverse l'héberge :
    // les deux logos ouvrent la colonne de droite sur chaque page, comme sur
    // fablab.egonux.com.
    Component.Logos(),
    saufAccueil(Component.DesktopOnly(Component.TableOfContents())),
    // Ne rend rien : embarque le script qui donne au sommaire sa jauge de
    // progression et son repère de section courante.
    saufAccueil(Component.DesktopOnly(Component.Sommaire())),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs({ rootName: "Accueil", spacerSymbol: "›" }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      mapFn: (node) => {
        if (node.slugSegment === "projets") {
          node.displayName = "Projets"
        }
      },
    }),
  ],
  // Même mobilier que les pages de contenu : une page de dossier ne doit pas
  // perdre le logo ni le sommaire en chemin.
  right: [
    Component.Logos(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.Sommaire()),
  ],
}
