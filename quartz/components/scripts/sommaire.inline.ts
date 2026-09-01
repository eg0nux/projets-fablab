/**
 * Sommaire : jauge de progression et repère de section courante.
 *
 * Quartz marque d'un `in-view` toute entrée dont le titre est passé au-dessus
 * du bas de la fenêtre — c'est-à-dire tout ce qui a été lu, jamais où l'on se
 * trouve. Il en faut deux choses de plus : la part de la page déjà parcourue,
 * et la seule section en cours.
 *
 * Le script vit à côté de Quartz plutôt que dedans : il ajoute lui-même la
 * jauge au bandeau et pose ses propres classes. Une montée de version de
 * Quartz ne le casse qu'à la condition de renommer `.toc-header`.
 */

const CLASSE_COURANT = "courant"

/** Là où l'œil se pose : le premier quart de la fenêtre. */
const LIGNE_DE_LECTURE = 0.25

function borner(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

/**
 * Ajoute la jauge au bandeau, une fois. Le bandeau est un bouton — cliquer la
 * jauge replie donc le sommaire, ce qui est le comportement attendu de toute
 * la barre de titre.
 */
function poserLaJauge(toc: Element): HTMLElement | null {
  const bandeau = toc.querySelector(".toc-header")
  if (!bandeau) return null

  const existante = bandeau.querySelector(".toc-progression")
  if (existante) return existante as HTMLElement

  const bloc = document.createElement("span")
  bloc.className = "toc-progression"
  bloc.setAttribute("aria-hidden", "true")
  bloc.innerHTML = '<span class="toc-jauge"><i></i></span><span class="toc-pct">0%</span>'

  // Avant le chevron de repli, qui doit rester en bout de ligne.
  const chevron = bandeau.querySelector(".fold")
  bandeau.insertBefore(bloc, chevron)
  return bloc
}

function mesurer() {
  const article = document.querySelector("article")
  if (!article) return null

  const titres = Array.from(
    document.querySelectorAll<HTMLElement>("article :is(h1,h2,h3,h4,h5,h6)[id]"),
  )

  const haut = article.getBoundingClientRect().top + window.scrollY
  const hauteur = article.offsetHeight

  // Ce qui compte n'est pas le haut de la fenêtre mais son bas : la page est
  // lue quand son dernier paragraphe est visible, pas quand il arrive en tête.
  const parcouru = window.scrollY + window.innerHeight - haut
  const part = hauteur > 0 ? borner(parcouru / hauteur, 0, 1) : 0

  // La section courante est le dernier titre passé au-dessus de la ligne de
  // lecture. Avant le premier titre, aucune : le chapeau n'appartient à
  // personne.
  const ligne = window.innerHeight * LIGNE_DE_LECTURE
  let courant: string | null = null
  for (const titre of titres) {
    if (titre.getBoundingClientRect().top <= ligne) courant = titre.id
    else break
  }

  return { part, courant }
}

function peindre() {
  const releve = mesurer()
  if (!releve) return

  const pourcent = Math.round(releve.part * 100)

  for (const toc of Array.from(document.getElementsByClassName("toc"))) {
    const jauge = poserLaJauge(toc)
    if (jauge) {
      const remplissage = jauge.querySelector<HTMLElement>(".toc-jauge > i")
      const chiffre = jauge.querySelector<HTMLElement>(".toc-pct")
      if (remplissage) remplissage.style.width = `${pourcent}%`
      if (chiffre) chiffre.textContent = `${pourcent}%`
    }

    for (const lien of Array.from(toc.querySelectorAll<HTMLElement>("a[data-for]"))) {
      const entree = lien.parentElement
      if (!entree) continue
      entree.classList.toggle(CLASSE_COURANT, lien.dataset.for === releve.courant)
    }
  }
}

let enAttente = false

function auDefilement() {
  if (enAttente) return
  enAttente = true
  requestAnimationFrame(() => {
    enAttente = false
    peindre()
  })
}

document.addEventListener("nav", () => {
  peindre()

  window.addEventListener("scroll", auDefilement, { passive: true })
  window.addEventListener("resize", auDefilement, { passive: true })
  window.addCleanup(() => {
    window.removeEventListener("scroll", auDefilement)
    window.removeEventListener("resize", auDefilement)
  })
})
