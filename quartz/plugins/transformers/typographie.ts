import { QuartzTransformerPlugin } from "../types"
import { Root, Element, RootContent } from "hast"

/**
 * Ponctuation française : espaces insécables automatiques.
 *
 * En français, la ponctuation double appelle une espace avant, et cette
 * espace doit être insécable — sans quoi le signe peut se retrouver seul en
 * début de ligne. Personne ne devrait avoir à saisir ces caractères à la
 * main dans Obsidian.
 *
 * Conventions retenues, celles de l'Imprimerie nationale :
 *
 * - espace fine insécable (U+202F) devant `;` `!` `?` et `%` ;
 * - espace insécable pleine (U+00A0) devant `:`, plus large parce que le
 *   deux-points introduit et demande une respiration ;
 * - espace insécable à l'intérieur des guillemets français.
 *
 * Le code n'est jamais touché : une espace fine glissée dans un extrait de
 * commande ou un code hexadécimal le rendrait faux.
 */

const IGNORER = new Set(["code", "pre", "kbd", "samp", "script", "style", "math"])

/* Ces caractères sont écrits en séquences d'échappement, jamais
   littéralement : ils sont invisibles à la relecture et se dégradent au
   moindre passage par un outil qui se trompe d'encodage. */
const FINE = " " // espace fine insécable
const INSEC = " " // espace insécable
const ESPACES = "[ \\t\\u00A0\\u202F\\u2009]" // toute espace déjà présente

const AVANT_FINE = new RegExp(`${ESPACES}*([;!?%])`, "g")
const AVANT_DEUX_POINTS = new RegExp(`${ESPACES}*:`, "g")
const APRES_GUILLEMET_OUVRANT = new RegExp(`«${ESPACES}*`, "g")
const AVANT_GUILLEMET_FERMANT = new RegExp(`${ESPACES}*»`, "g")

/* Un deux-points d'URL ou d'horaire n'est pas de la ponctuation : il ne
   prend pas d'espace. On répare après coup plutôt que de compliquer la
   première expression. */
const URL = new RegExp(`([A-Za-z])${INSEC}:(//)`, "g")
const HORAIRE = new RegExp(`(\\d)${INSEC}:(\\d)`, "g")

function corriger(t: string): string {
  return t
    .replace(AVANT_FINE, `${FINE}$1`)
    .replace(AVANT_DEUX_POINTS, `${INSEC}:`)
    .replace(APRES_GUILLEMET_OUVRANT, `«${INSEC}`)
    .replace(AVANT_GUILLEMET_FERMANT, `${INSEC}»`)
    .replace(URL, "$1:$2")
    .replace(HORAIRE, "$1:$2")
}

function parcourir(noeuds: RootContent[], dansCode: boolean): void {
  for (const n of noeuds) {
    if (n.type === "text") {
      if (!dansCode) n.value = corriger(n.value)
      continue
    }
    if (n.type === "element") {
      const e = n as Element
      parcourir(e.children, dansCode || IGNORER.has(e.tagName))
    }
  }
}

export const Typographie: QuartzTransformerPlugin = () => ({
  name: "Typographie",
  htmlPlugins() {
    return [
      () => (tree: Root) => {
        parcourir(tree.children, false)
      },
    ]
  },
})
