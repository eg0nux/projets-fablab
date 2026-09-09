import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

/**
 * Portée d'un parcours : transposable partout, ou ancré en Bergeracois.
 *
 * Les vingt-cinq projets se sont écrits en deux familles : ceux qui se
 * refont tels quels dans n'importe quel territoire, et ceux qui tiennent à
 * la Dordogne — sa vallée du papier, ses vignes, ses gabares, son ciel noir.
 * La distinction commandait autrefois le rangement en volumes ; l'arborescence
 * est passée à plat, mais l'information reste utile à qui choisit un projet
 * pour ailleurs.
 *
 * Elle se déclare en frontmatter (`portee: partout` ou `portee: bergeracois`)
 * parce que c'est une propriété de la fiche, pas une phrase de son texte ; le
 * cartouche termine la ligne du titre, entre les accolades de la maison.
 * Une page sans le champ ne rend rien.
 */

const LIBELLES: Record<string, string> = {
  partout: "Partout",
  bergeracois: "Bergeracois",
}

const Portee: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const portee = fileData.frontmatter?.portee as string | undefined
  const libelle = portee && LIBELLES[portee]
  if (!libelle) return null

  return (
    <span class={classNames(displayClass, "portee")}>
      <span class="portee-cartouche" data-portee={portee}>
        {libelle}
      </span>
    </span>
  )
}

export default (() => Portee) satisfies QuartzComponentConstructor
