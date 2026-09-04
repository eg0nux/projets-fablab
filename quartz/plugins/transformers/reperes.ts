import { QuartzTransformerPlugin } from "../types"
import { Root, Element, RootContent } from "hast"

/**
 * Bloc « Repères » : des étoiles dans le markdown, des jauges à l'écran.
 *
 * Chaque fiche de parcours porte, sous son chapeau, une ligne de six
 * appréciations notées sur cinq. Elle s'écrit en clair dans Obsidian
 * (`**Repères** : Originalité ★★★★☆ · …`) parce que c'est là qu'on la
 * relit et qu'on l'ajuste, et que des étoiles s'y lisent d'un coup d'œil.
 *
 * À l'écran, ces mêmes étoiles tiennent mal : composées dans la serif du
 * corps de texte, elles se mêlent aux mots, et la ligne se replie au milieu
 * d'une paire critère-note. On les remplace donc par des segments dessinés
 * en CSS, disposés en grille : chaque repère reste d'un bloc, la notation
 * se compare colonne par colonne, et le tout survit au noir et blanc ; un
 * segment plein reste plein à l'impression.
 *
 * Le tableau comparatif du catalogue reçoit la même jauge : toute cellule
 * qui ne contient qu'une note en étoiles est redessinée en segments, et les
 * colonnes se comparent d'un coup d'œil, sans glyphe de police.
 *
 * La transformation se fait à l'affichage : le markdown n'est pas touché.
 */

const ETOILE_PLEINE = "★"
const NOTE = /^(.+?)\s*([★☆]{2,})$/
const SEPARATEUR = /\s*·\s*/

type Repere = { nom: string; note: number; total: number }

function lireReperes(texte: string): Repere[] | null {
  // Le deux-points sépare l'étiquette de la série ; il est précédé d'une
  // espace insécable, posée par le greffon de typographie. Le cadratin reste
  // accepté : c'est la forme qu'avaient les fiches avant qu'on le bannisse du
  // contenu, et une note ancienne doit continuer de s'afficher.
  const serie = texte.replace(/^[\s  ]*[—:][\s  ]*/, "")
  if (serie === texte) return null

  const reperes: Repere[] = []
  for (const morceau of serie.split(SEPARATEUR)) {
    const m = morceau.trim().match(NOTE)
    if (!m) return null
    const [, nom, notation] = m
    reperes.push({
      nom: nom.trim(),
      note: [...notation].filter((c) => c === ETOILE_PLEINE).length,
      total: notation.length,
    })
  }
  return reperes.length ? reperes : null
}

function jauge(r: Repere): Element {
  const segments: Element[] = []
  for (let i = 0; i < r.total; i++) {
    segments.push({
      type: "element",
      tagName: "i",
      properties: { className: i < r.note ? ["plein"] : [] },
      children: [],
    })
  }
  return {
    type: "element",
    tagName: "span",
    properties: {
      className: ["repere-jauge"],
      // La note reste lisible aux lecteurs d'écran, pour qui une suite de
      // segments vides ne dit rien.
      role: "img",
      ariaLabel: `${r.note} sur ${r.total}`,
    },
    children: segments,
  }
}

function bloc(reperes: Repere[]): Element {
  return {
    type: "element",
    tagName: "div",
    properties: { className: ["reperes"] },
    children: [
      {
        type: "element",
        tagName: "p",
        properties: { className: ["reperes-etiquette"] },
        children: [{ type: "text", value: "Repères" }],
      },
      {
        type: "element",
        tagName: "ul",
        properties: { className: ["reperes-liste"] },
        children: reperes.map((r) => ({
          type: "element" as const,
          tagName: "li",
          properties: {},
          children: [
            {
              type: "element" as const,
              tagName: "span",
              properties: { className: ["repere-nom"] },
              children: [{ type: "text" as const, value: r.nom }],
            },
            jauge(r),
          ],
        })),
      },
    ],
  }
}

function estEtiquette(n: RootContent): boolean {
  return (
    n.type === "element" &&
    n.tagName === "strong" &&
    n.children.length === 1 &&
    n.children[0].type === "text" &&
    n.children[0].value.trim() === "Repères"
  )
}

function parcourir(noeuds: RootContent[]): void {
  noeuds.forEach((n, i) => {
    if (n.type !== "element") return
    const e = n as Element

    if (e.tagName === "p" && e.children.length === 2 && estEtiquette(e.children[0])) {
      const suite = e.children[1]
      if (suite.type === "text") {
        const reperes = lireReperes(suite.value)
        if (reperes) {
          noeuds[i] = bloc(reperes)
          return
        }
      }
    }

    // Une cellule qui ne contient qu'une note en étoiles : le tableau
    // comparatif. Même jauge que le bloc, sans nom.
    if (e.tagName === "td" && e.children.length === 1 && e.children[0].type === "text") {
      const m = e.children[0].value.trim().match(/^[★☆]{2,}$/)
      if (m) {
        const notation = m[0]
        e.children = [
          jauge({
            nom: "",
            note: [...notation].filter((c) => c === ETOILE_PLEINE).length,
            total: notation.length,
          }),
        ]
        return
      }
    }

    parcourir(e.children)
  })
}

export const Reperes: QuartzTransformerPlugin = () => ({
  name: "Reperes",
  htmlPlugins() {
    return [
      () => (tree: Root) => {
        parcourir(tree.children)
      },
    ]
  },
})
