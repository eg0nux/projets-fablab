import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)

  // Un titre de la forme « marque/section » se rend sur deux lignes : la
  // marque, puis la section sous elle, barre oblique comprise. La chaîne
  // complète reste celle de la configuration ; c'est la présentation qui
  // se dédouble, pas le contenu, et l'onglet comme le flux RSS gardent
  // « fablab/projets ». Un titre sans barre oblique est rendu tel quel.
  const coupure = title.indexOf("/")
  const marque = coupure === -1 ? title : title.slice(0, coupure)
  const section = coupure === -1 ? null : title.slice(coupure)

  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        <span class="marque">{marque}</span>
        {section && <span class="section">{section}</span>}
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
