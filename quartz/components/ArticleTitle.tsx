import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
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
