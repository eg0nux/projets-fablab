import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

/**
 * Logo de La Traverse, en tête de la colonne de droite.
 *
 * Le FabLab est hébergé par l'Atelier Partagé de La Traverse : le logo
 * marque cette appartenance sur chaque page. Au survol, il reprend le
 * « soubresaut » de maquette.egonux.com — un tremblement par pas discrets
 * avec décalages rouge et jaune, qui imite un défaut de repérage
 * d'impression. L'animation est décrite dans la feuille de style.
 */

interface Options {
  lien: string
  texte: string
}

const defaut: Options = {
  lien: "https://www.latraverse-bergerac.fr/",
  texte: "La Traverse",
}

export default ((opts?: Partial<Options>) => {
  const o = { ...defaut, ...opts }

  function LogoTraverse({ displayClass }: QuartzComponentProps) {
    return (
      <div class={classNames(displayClass, "logo-traverse")}>
        <a href={o.lien} target="_blank" rel="noopener noreferrer" aria-label={o.texte}>
          <img src="/static/logo-traverse.png" alt={o.texte} width="104" height="auto" />
        </a>
      </div>
    )
  }

  return LogoTraverse
}) satisfies QuartzComponentConstructor
