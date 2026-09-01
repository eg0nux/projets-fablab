import { Fragment } from "preact"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

/**
 * Logos des structures qui portent le FabLab, en tête de la colonne de
 * droite : le CIDFF Dordogne, qui anime l'atelier numérique, puis La
 * Traverse, qui l'héberge. Ils vont côte à côte, sur toutes les pages,
 * séparés d'une esperluette : l'atelier est une collaboration des deux,
 * pas deux structures qui se trouvent sur la même page.
 *
 * À ne pas confondre avec le bandeau de {@link Marques}, en tête de fiche :
 * celui-ci dit la maison, celui-là le partenaire d'un projet précis.
 *
 * Au survol, chaque logo reprend le « soubresaut » de maquette.egonux.com —
 * un tremblement par pas discrets avec décalages rouge et jaune, qui imite un
 * défaut de repérage d'impression. L'animation est décrite dans la feuille de
 * style.
 */

interface Logo {
  nom: string
  lien: string
  fichier: string
}

interface Options {
  logos: Logo[]
}

const defaut: Options = {
  logos: [
    {
      nom: "CIDFF Dordogne",
      lien: "https://www.cidff24.fr",
      fichier: "/static/logo-cidff.svg",
    },
    {
      nom: "La Traverse",
      lien: "https://www.latraverse-bergerac.fr/",
      fichier: "/static/logo-traverse.png",
    },
  ],
}

export default ((opts?: Partial<Options>) => {
  const o = { ...defaut, ...opts }

  function Logos({ displayClass }: QuartzComponentProps) {
    return (
      <div class={classNames(displayClass, "logos")}>
        {o.logos.map((logo, i) => (
          <Fragment key={logo.nom}>
            {/* L'esperluette de Literata en italique — la police du corps
                de texte, dont c'est le plus beau caractère. Un logotype
                dessiné aurait fait une troisième marque entre deux marques ;
                une ligature de labeur, elle, se contente de relier.

                Décoratif : les deux liens portent déjà leur nom, et un
                lecteur d'écran n'a pas à annoncer « et commercial ». */}
            {i > 0 && (
              <span class="logos-et" aria-hidden="true">
                &amp;
              </span>
            )}
            <a
              class="logo"
              href={logo.lien}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={logo.nom}
            >
              <img src={logo.fichier} alt={logo.nom} />
            </a>
          </Fragment>
        ))}
      </div>
    )
  }

  return Logos
}) satisfies QuartzComponentConstructor
