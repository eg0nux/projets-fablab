import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// @ts-ignore
import script from "./scripts/imprimer.inline"

// Les trois rayons dont les pages sont des fiches. Les deux sites n'en ont
// jamais qu'un ou deux ; la liste vaut pour les deux, comme la feuille de
// style.
const RAYONS = ["objets", "techniques", "projets"]

/**
 * Une fiche, et non une page.
 *
 * Ce qui s'imprime, c'est ce qu'on emporte à l'établi : un objet, une
 * technique, un parcours. L'accueil, « L'atelier », « La méthode », le
 * tableau comparatif et les pages de rubrique se lisent à l'écran et n'ont
 * rien à faire sur papier — pas de bouton pour elles.
 *
 * Une page de rubrique ne se distingue d'une fiche ni par son chemin (les
 * deux sont un `index.md` dans un dossier) ni par son frontmatter (une fiche
 * de parcours n'a que son titre). Elle s'en distingue par ce qu'elle
 * contient : une rubrique a des pages sous elle, une fiche n'a que ses
 * images. C'est la même distinction que fait la feuille de style pour
 * masquer le listing vide d'une fiche logée dans un dossier.
 */
function estUneFiche(slug: string, slugsConnus: string[]): boolean {
  const rayon = slug.split("/")[0]
  if (!RAYONS.includes(rayon)) return false

  const chemin = slug.replace(/\/index$/, "")
  if (chemin === rayon) return false

  return !slugsConnus.some((autre) => autre !== slug && autre.startsWith(chemin + "/"))
}

/**
 * Le bouton d'impression, au bout de la ligne de date et de temps de lecture.
 *
 * Une fiche punaisée près d'une machine est un usage réel, et la feuille se
 * demande là où le lecteur décide de ce qu'il fait de la page : sur la ligne
 * qui dit déjà combien de temps elle prend, et à l'autre bout de celle-ci.
 * Pas dans la colonne de gauche, qui est le mobilier du site et non celui de
 * la fiche.
 *
 * Le dessin est une imprimante de trois traits, au registre du site : angles
 * vifs, pas une courbe. Au repos elle est du gris de la ligne qu'elle
 * termine ; au survol elle s'encre, son voyant s'allume en safran et la
 * feuille descend d'un cran. C'est la troisième animation des deux sites, et
 * la seule qui réponde à un geste : les deux autres tournent toutes seules.
 *
 * Le libellé est porté par `aria-label` et par l'infobulle de la feuille de
 * style, pas par un `<title>` dans le SVG : celui-ci ajouterait une seconde
 * infobulle, celle du système, hors charte et sur un autre tempo.
 *
 * Le fond de la feuille est peint dans `custom.scss` avec la couleur du
 * papier : c'est lui qui mange le bas du bloc et ouvre la fente par où elle
 * sort. Le bouton ne s'imprime évidemment pas, et cette règle-là est dans le
 * bloc d'impression, avec le reste.
 */
export default (() => {
  const Imprimer: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
  }: QuartzComponentProps) => {
    const slug = fileData.slug ?? ""
    if (
      !estUneFiche(
        slug,
        allFiles.map((f) => f.slug ?? ""),
      )
    )
      return null

    return (
      <button
        class={classNames(displayClass, "imprimer")}
        type="button"
        aria-label="Imprimer la fiche"
      >
        <svg
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          aria-hidden="true"
        >
          {/* L'oreille de papier : ce qu'on lui donne. */}
          <path d="M7.5 8V3h9v5" />
          {/* Le bloc, et son voyant. */}
          <path d="M3.5 8h17v7.5h-17z" />
          <path class="voyant" d="M16.8 11.3h1.7" stroke-width="2" stroke-linecap="square" />
          {/* La feuille qui sort : le fond d'abord, puis les trois traits qui
            la dessinent — son bord haut reste ouvert, c'est la fente. */}
          <g class="feuille">
            <path class="fond" d="M7 13.5h10v7H7z" stroke="none" />
            <path d="M7 13.5v7h10v-7" />
            <path d="M9.3 16.4h5.4M9.3 18.4h3.2" stroke-width="1.3" />
          </g>
        </svg>
      </button>
    )
  }

  Imprimer.afterDOMLoaded = script
  return Imprimer
}) satisfies QuartzComponentConstructor
