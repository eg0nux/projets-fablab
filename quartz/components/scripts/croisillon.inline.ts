// Le croisillon caché : le sélecteur de thème derrière le # du pied de page.
//
// Ce script est chargé avant le DOM, comme celui de la bascule de thème de
// Quartz, parce qu'il a une chose à faire avant le premier rendu : reposer
// sur <html> le thème secret mémorisé, sans quoi la page s'afficherait en
// encre sur papier le temps d'un éclair. Le reste attend `nav`, comme tout
// ce qui touche au pied de page : la navigation du site le remplace à chaque
// page, et le bouton avec.
//
// Ce que ça fait, et pourquoi, est dans CHARTE.md, § 6, « Le croisillon
// caché ». Ici, le comment.

const CLE = "theme-secret"
// Le thème de Quartz qu'on avait avant d'adopter un secret, pour y revenir.
const CLE_AVANT = "theme-avant"
const SECRETS = ["matrice", "ibm-5155", "dos"] as const
type Secret = (typeof SECRETS)[number]
const LIBELLES: Record<Secret, string> = {
  matrice: "matrice",
  "ibm-5155": "IBM 5155",
  dos: "dos",
}

const html = document.documentElement
const estUnSecret = (t: string | null): t is Secret => SECRETS.includes(t as Secret)
const secretCourant = (): Secret | null => {
  const t = html.getAttribute("data-theme")
  return estUnSecret(t) ? t : null
}
const themeDeQuartz = () => (html.getAttribute("saved-theme") === "dark" ? "dark" : "light")

// Un thème secret se pose par-dessus le sombre de Quartz, dont il garde
// toutes les règles — c'est le sombre, en changeant les encres. Le retirer
// rend à Quartz le thème qu'il avait. `themechange` est émis comme le fait
// Quartz, pour Mermaid et consorts, et marqué pour que l'écouteur d'en
// dessous ne le prenne pas pour un clic sur la bascule.
let emisIci = false
const poser = (secret: Secret | null, avant: "light" | "dark") => {
  if (secret) html.setAttribute("data-theme", secret)
  else html.removeAttribute("data-theme")
  html.setAttribute("saved-theme", secret ? "dark" : avant)
  emisIci = true
  const event: CustomEventMap["themechange"] = new CustomEvent("themechange", {
    detail: { theme: secret ? "dark" : avant },
  })
  document.dispatchEvent(event)
  emisIci = false
}

// Ce que le navigateur retient : le secret et le thème d'avant, ou rien. La
// clé de Quartz suit, pour qu'il retrouve ce qu'il attend au prochain
// chargement.
const memoriser = (secret: Secret | null, avant: "light" | "dark") => {
  if (secret) {
    localStorage.setItem(CLE, secret)
    localStorage.setItem(CLE_AVANT, avant)
    localStorage.setItem("theme", "dark")
  } else {
    localStorage.removeItem(CLE)
    localStorage.removeItem(CLE_AVANT)
    localStorage.setItem("theme", avant)
  }
}

// La bascule soleil / lune ne connaît que papier et encre : quand c'est elle
// qui parle, le thème secret s'efface.
document.addEventListener("themechange", () => {
  if (emisIci || !html.hasAttribute("data-theme")) return
  html.removeAttribute("data-theme")
  localStorage.removeItem(CLE)
  localStorage.removeItem(CLE_AVANT)
})

// Avant le premier rendu. La clé de Quartz est alignée sur le sombre au
// passage : les deux scripts se chargent dans un ordre qui ne nous regarde
// pas, et le sien doit trouver ce qu'il attend.
const memorise = localStorage.getItem(CLE)
if (estUnSecret(memorise)) {
  html.setAttribute("data-theme", memorise)
  html.setAttribute("saved-theme", "dark")
  localStorage.setItem("theme", "dark")
}

// La panne : la secousse, les tranches et le semis de la 404, posés sur la
// page entière le temps d'un clic. Les images-clés sont celles de la feuille
// de style ; ici on choisit les blocs qui se déchirent — quatre, pris au
// hasard parmi ceux qui sont à l'écran — et le calque du semis, qui ne prend
// pas le clic.
const melanger = <T>(liste: T[]) => {
  for (let i = liste.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[liste[i], liste[j]] = [liste[j], liste[i]]
  }
  return liste
}

const panne = (duree: number) => {
  const page = document.querySelector<HTMLElement>(".page") ?? document.body
  page.style.setProperty("--panne-duree", `${duree}ms`)
  page.classList.remove("en-panne")
  void page.offsetWidth
  page.classList.add("en-panne")

  const visibles = [
    ...document.querySelectorAll<HTMLElement>("article > *, .sidebar > *, .page-header > *"),
  ].filter((bloc) => {
    const r = bloc.getBoundingClientRect()
    return r.bottom > 0 && r.top < innerHeight && r.height > 8
  })
  for (const bloc of melanger(visibles).slice(0, 4)) {
    const dx = (Math.random() < 0.5 ? -1 : 1) * (6 + Math.floor(Math.random() * 8))
    bloc.style.setProperty("--dx", `${dx}px`)
    bloc.classList.add("panne-tranche")
    setTimeout(() => {
      bloc.classList.remove("panne-tranche")
      bloc.style.removeProperty("--dx")
    }, 520)
  }

  const semis = document.createElement("div")
  semis.className = "panne-semis"
  semis.style.setProperty("--panne-duree", `${duree}ms`)
  document.body.append(semis)
  setTimeout(() => semis.remove(), duree)
  setTimeout(() => {
    page.classList.remove("en-panne")
    page.style.removeProperty("--panne-duree")
  }, duree)
}

document.addEventListener("nav", () => {
  const bouton = document.querySelector<HTMLButtonElement>("footer .croisillon")
  const footer = bouton?.closest("footer")
  if (!bouton || !footer) return

  let rangee: HTMLUListElement | null = null
  let etiquettes: HTMLButtonElement[] = []
  // Le secret adopté, ou rien ; et le thème de Quartz auquel « rien » ramène.
  let adopte: Secret | null = null
  let avant: "light" | "dark" = "light"
  // Le focus posé par le script à l'ouverture n'est pas un geste : il ne
  // déclenche pas d'essai. Celui qui vient du clavier, si.
  let focusPose = false

  // Changer de thème change la police du corps, donc la hauteur de la page :
  // le pied de page filerait sous le curseur et l'essai s'annulerait de
  // lui-même. On le garde à la même hauteur d'écran.
  const essayer = (secret: Secret | null) => {
    const haut = footer.getBoundingClientRect().top
    poser(secret, avant)
    const ecart = footer.getBoundingClientRect().top - haut
    if (ecart) window.scrollBy(0, ecart)
  }

  const marquer = () => {
    for (const e of etiquettes) e.classList.toggle("actif", e.dataset.theme === adopte)
  }

  const fermer = () => {
    if (!rangee) return
    essayer(adopte)
    memoriser(adopte, avant)
    rangee.remove()
    rangee = null
    etiquettes = []
    footer.classList.remove("selecteur")
    bouton.setAttribute("aria-expanded", "false")
    document.removeEventListener("keydown", touche)
    bouton.focus({ preventScroll: true })
  }

  // Échap referme ; les flèches passent d'une étiquette à l'autre, en plus
  // de la tabulation.
  const touche = (e: KeyboardEvent) => {
    if (e.key === "Escape") return fermer()
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
    const i = etiquettes.indexOf(document.activeElement as HTMLButtonElement)
    if (i < 0) return
    const pas = e.key === "ArrowRight" ? 1 : -1
    etiquettes[(i + pas + etiquettes.length) % etiquettes.length].focus()
    e.preventDefault()
  }

  // La rangée : « Thème », les trois étiquettes, « Retour ». Chaque entrée
  // connaît son rang, la feuille de style les fait apparaître une à une.
  const ouvrir = () => {
    if (rangee) return fermer()
    adopte = secretCourant()
    const memoireAvant = localStorage.getItem(CLE_AVANT)
    avant = adopte ? (memoireAvant === "dark" ? "dark" : "light") : themeDeQuartz()
    panne(700)

    rangee = document.createElement("ul")
    rangee.className = "themes"
    rangee.setAttribute("aria-label", "Thème")
    let rang = 0
    const entree = (classe?: string) => {
      const li = document.createElement("li")
      if (classe) li.className = classe
      li.style.setProperty("--rang", String(rang++))
      rangee!.append(li)
      return li
    }

    entree().textContent = "Thème"
    etiquettes = SECRETS.map((secret) => {
      const etiquette = document.createElement("button")
      etiquette.type = "button"
      etiquette.className = "etiquette"
      etiquette.dataset.theme = secret
      etiquette.textContent = LIBELLES[secret]
      etiquette.addEventListener("mouseenter", () => essayer(secret))
      etiquette.addEventListener("focus", () => {
        if (!focusPose) essayer(secret)
      })
      etiquette.addEventListener("mouseleave", () => essayer(adopte))
      etiquette.addEventListener("blur", () => essayer(adopte))
      // Cliquer l'étiquette adoptée la retire : la page revient au thème de
      // la charte qu'elle avait.
      etiquette.addEventListener("click", () => {
        adopte = adopte === secret ? null : secret
        essayer(adopte)
        memoriser(adopte, avant)
        marquer()
        panne(320)
      })
      entree("etiquette-li").append(etiquette)
      return etiquette
    })
    marquer()
    const retour = document.createElement("button")
    retour.type = "button"
    retour.className = "retour"
    retour.textContent = "Retour"
    retour.addEventListener("click", fermer)
    entree().append(retour)

    footer.classList.add("selecteur")
    footer.append(rangee)
    bouton.setAttribute("aria-expanded", "true")
    document.addEventListener("keydown", touche)
    // Le focus rejoint l'étiquette adoptée, ou la première, une fois la
    // rangée apparue — sans rien essayer.
    setTimeout(() => {
      focusPose = true
      ;(etiquettes.find((e) => e.dataset.theme === adopte) ?? etiquettes[0])?.focus({
        preventScroll: true,
      })
      focusPose = false
    }, 500)
  }

  bouton.addEventListener("click", ouvrir)
  window.addCleanup(() => {
    bouton.removeEventListener("click", ouvrir)
    document.removeEventListener("keydown", touche)
  })
})
