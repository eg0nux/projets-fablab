import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

// @ts-ignore
import croisillonScript from "./scripts/croisillon.inline"

interface Options {
  links: Record<string, string>
  // Note EcoIndex de la page d'accueil, affichée en pastille dans le pied de
  // page. Optionnel : sans mesure publiée, on n'affiche rien.
  ecoindex?: {
    note: string
    url: string
  }
}

/**
 * Le pied de page, et le croisillon caché.
 *
 * Le croisillon qui précède la dernière mention — ego/nux — est un bouton,
 * et non le pseudo-élément que la feuille de style pose devant les autres :
 * même dessin, même place, mais il répond au clic et porte sa glose,
 * « Toc toc Neo. », au survol et au focus. La feuille retire son propre
 * croisillon devant ce `<li>`-là. Ce qu'il ouvre est dans
 * `scripts/croisillon.inline.ts`, chargé avant le DOM parce qu'il a une
 * chose à faire avant le premier rendu ; ce que la charte en dit, en § 6.
 *
 * La glose fait partie du nom du bouton, comme sur egonux.com : un lecteur
 * d'écran entend « # Toc toc Neo. », ce qui est exactement ce que voit
 * l'autre.
 */
export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    const ecoindex = opts?.ecoindex
    const mentions = Object.entries(links)
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
        </p>
        <ul>
          {ecoindex && (
            <li>
              <a
                class="ecoindex"
                href={ecoindex.url}
                title={`EcoIndex : note ${ecoindex.note}`}
                aria-label={`EcoIndex : note ${ecoindex.note}, voir le rapport`}
              >
                <span class="ecoindex-nom">ecoindex</span>
                <span class="ecoindex-note" data-note={ecoindex.note}>
                  {ecoindex.note}
                </span>
              </a>
            </li>
          )}
          {mentions.map(([text, link], rang) => (
            <li>
              {rang === mentions.length - 1 && (
                <button class="croisillon" type="button" aria-expanded="false">
                  #<span class="croisillon-glose">Toc toc Neo.</span>
                </button>
              )}
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  Footer.beforeDOMLoaded = croisillonScript
  return Footer
}) satisfies QuartzComponentConstructor
