// Thème de coloration des listings, « Sérigraphie » : les encres de la charte
// et rien d'autre. Un thème d'éditeur (One Light, One Dark Pro) posait cinq
// teintes au milieu d'une page qui n'en a que deux, et des commentaires gris
// clair illisibles sur le papier.
//
// Ce que le lecteur doit distinguer dans un listing, et comment :
//   - le corps du code, à la couleur du corps de texte ;
//   - les mots-clés, la ponctuation de préprocesseur et les types de base,
//     à l'encre et en gras — la même graisse que les titres ;
//   - les noms de fonctions, de types et de constantes, à l'encre ;
//   - les commentaires, au gris des mentions.
// Ni italique (JetBrains Mono n'est auto-hébergée qu'en droit) ni safran :
// le safran est un fond, jamais un texte (CHARTE.md, § 4).
//
// Deux thèmes, un par palette de `quartz.config.ts` : Shiki écrit des
// couleurs fixes, pas des variables. Les valeurs sont celles de `light`,
// `darkgray`, `dark` et `gray`, à recopier ici si elles bougent là-bas.
// Fichier jumeau sur fablab et projets-fablab (CHARTE.md, § 9).
import type { ThemeRegistrationRaw } from "shiki"

type Encres = { papier: string; corps: string; encre: string; gris: string }

const CLAIR: Encres = { papier: "#fbf6ec", corps: "#33302a", encre: "#1a1613", gris: "#8a8176" }
const SOMBRE: Encres = { papier: "#171311", corps: "#d8cfc1", encre: "#f5eee2", gris: "#948a7d" }

function theme(name: string, type: "light" | "dark", e: Encres): ThemeRegistrationRaw {
  return {
    name,
    type,
    colors: { "editor.background": e.papier, "editor.foreground": e.corps },
    settings: [
      { settings: { foreground: e.corps, background: e.papier } },
      {
        scope: ["comment", "punctuation.definition.comment"],
        settings: { foreground: e.gris },
      },
      {
        scope: [
          "keyword",
          "storage",
          "storage.type",
          "storage.modifier",
          "keyword.control",
          "meta.preprocessor",
          "keyword.control.directive",
          "punctuation.definition.directive",
        ],
        settings: { foreground: e.encre, fontStyle: "bold" },
      },
      // Les opérateurs sont des mots-clés pour la grammaire, pas pour l'œil :
      // un `=` ou un `+` en gras à chaque ligne ferait un listing criblé.
      {
        scope: ["keyword.operator"],
        settings: { foreground: e.corps, fontStyle: "" },
      },
      {
        scope: [
          "entity.name.function",
          "support.function",
          "entity.name.type",
          "entity.name.class",
          "entity.name.tag",
          "support.class",
          "support.type",
          "constant.numeric",
          "constant.language",
          "constant.character",
          "variable.language",
        ],
        settings: { foreground: e.encre },
      },
    ],
  }
}

export const codeClair = theme("serigraphie-clair", "light", CLAIR)
export const codeSombre = theme("serigraphie-sombre", "dark", SOMBRE)
