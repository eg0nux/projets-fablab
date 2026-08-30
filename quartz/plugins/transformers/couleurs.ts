import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { Root, Element, ElementContent } from "hast"

/**
 * Codes couleur affichés dans leur couleur.
 *
 * Sur une fiche machine, le code couleur *est* la consigne : la Trotec lit
 * un rouge pur comme un ordre de découpe. L'écrire en noir fait perdre
 * l'information la plus utile du tableau.
 *
 * Ce greffon repère les codes hexadécimaux écrits en `code` inline et pose
 * la valeur dans une propriété personnalisée `--c`, plus une classe. Toute
 * la présentation reste dans la feuille de style : le greffon ne décide
 * ni d'une pastille, ni d'une couleur de texte.
 *
 * Quand un tel code apparaît dans une ligne de tableau, la ligne entière
 * reçoit la propriété : la première cellule (le nom de la couleur) peut
 * ainsi être teintée sans que personne ait à la baliser à la main.
 */

const HEXA = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

function texteDe(node: ElementContent): string {
  if (node.type === "text") return node.value
  if (node.type === "element") return node.children.map(texteDe).join("")
  return ""
}

function codeCouleur(node: Element): string | null {
  if (node.tagName !== "code") return null
  const t = node.children.map(texteDe).join("").trim()
  return HEXA.test(t) ? t : null
}

export const CodesCouleur: QuartzTransformerPlugin = () => ({
  name: "CodesCouleur",
  htmlPlugins() {
    return [
      () => (tree: Root) => {
        visit(tree, "element", (node: Element) => {
          // Le code lui-même
          const couleur = codeCouleur(node)
          if (couleur) {
            node.properties = {
              ...node.properties,
              className: [
                ...((node.properties?.className as string[]) ?? []),
                "code-couleur",
              ],
              style: `--c: ${couleur}`,
            }
            return
          }

          // La ligne de tableau qui en contient un
          if (node.tagName !== "tr") return
          let trouvee: string | null = null
          visit(node, "element", (enfant: Element) => {
            const c = codeCouleur(enfant)
            if (c && !trouvee) trouvee = c
          })
          if (!trouvee) return

          node.properties = {
            ...node.properties,
            className: [...((node.properties?.className as string[]) ?? []), "ligne-couleur"],
            style: `--c: ${trouvee}`,
          }
        })
      },
    ]
  },
})
