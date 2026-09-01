import { QuartzComponent, QuartzComponentConstructor } from "./types"

// @ts-ignore
import script from "./scripts/sommaire.inline"

/**
 * Ne rend rien : ce composant n'existe que pour embarquer le script qui donne
 * au sommaire sa jauge de progression et son repère de section courante.
 *
 * On aurait pu greffer ce code dans `TableOfContents`, mais c'est un fichier
 * de Quartz, remplacé à chaque montée de version. Un composant à part le tient
 * hors de portée ; le prix étant cette ligne de plus dans la mise en page.
 *
 * À poser dans la même colonne que {@link TableOfContents}, et sous la même
 * condition : sans sommaire à l'écran, le script ne trouve rien à peindre et
 * s'arrête là, mais autant ne pas l'embarquer pour rien.
 */
export default (() => {
  const Sommaire: QuartzComponent = () => null
  Sommaire.afterDOMLoaded = script
  return Sommaire
}) satisfies QuartzComponentConstructor
