import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// Écart au Quartz d'origine, à reporter à chaque montée de version : le
// cartouche de portée termine la ligne du titre. Tout ce qu'il est tient dans
// `Portee.tsx` ; il ne reste ici qu'un import et une balise.
import PorteeConstructor from "./Portee"

const Portee = PorteeConstructor()

const ArticleTitle: QuartzComponent = (props: QuartzComponentProps) => {
  const { fileData, displayClass } = props
  const title = fileData.frontmatter?.title
  if (title) {
    // Le croisillon employé comme séparateur prend le rouge des marqueurs de
    // titre en gouttière : dans ce site, le # est déjà un signe de balisage,
    // et il serait incohérent qu'il passe à l'encre quand il entre dans un
    // titre. Le texte reste intact dans l'onglet, le flux et les partages.
    const morceaux = title.split("#")
    return (
      <h1 class={classNames(displayClass, "article-title")}>
        {morceaux.map((m, i) => (
          <>
            {i > 0 && <span class="diese">#</span>}
            {m}
          </>
        ))}
        <Portee {...props} />
      </h1>
    )
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-title {
  margin: 2rem 0 0 0;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
