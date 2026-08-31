import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
  // Note EcoIndex de la page d'accueil, affichée en pastille dans le pied de
  // page. Optionnel : sans mesure publiée, on n'affiche rien.
  ecoindex?: {
    note: string
    url: string
  }
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    const ecoindex = opts?.ecoindex
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
                <span class="ecoindex-note">{ecoindex.note}</span>
              </a>
            </li>
          )}
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
