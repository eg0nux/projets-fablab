// Le bouton d'impression, et ce que la feuille emporte.
//
// Rien de tout cela n'est dans le HTML servi : une fiche imprimée est la
// seule page qui ait besoin de dire d'où elle vient, et de tenir ses blocs
// ensemble. Tout se fait sur `beforeprint` — que le geste vienne du bouton
// ou du Ctrl+P du navigateur, les deux passent par là — et se défait sur
// `afterprint`, pour que l'écran retrouve sa page telle quelle.
//
// L'adresse est relevée sur `location` plutôt que rendue au build : une même
// page servie en préversion ou en local dit alors où elle a été prise.

const FIGURE = "impression-figure"
const TITRE = "impression-titre"
const FIN = "impression-fin"
const TABLEAU = "impression-tableau"
const COURT = "impression-court"

// Le titre et l'adresse de la fiche : le pied de chaque feuille.
//
// L'accueil n'affiche pas de titre d'article — c'est un seuil, pas une
// fiche : le titre de l'onglet prend le relais, sinon le pied s'ouvrirait
// sur un blanc. L'adresse va sans le protocole ni la barre finale : c'est
// une adresse qu'on recopie, pas un lien qu'on clique.
const titreEtAdresse = () => ({
  titre: document.querySelector("h1.article-title")?.textContent?.trim() || document.title,
  adresse: (location.host + location.pathname).replace(/\/$/, ""),
})

// Une chaîne CSS : entre guillemets, guillemets et barres obliques inverses
// échappés.
const chaineCSS = (texte: string) => `"${texte.replace(/["\\]/g, (c) => "\\" + c)}"`

// Là où le navigateur sait écrire dans la marge de la feuille (Chrome 131,
// Safari 18.2), c'est la feuille de style qui compose le pied, au bas de
// chaque page, avec le numéro de page : elle lit le titre et l'adresse dans
// deux variables posées sur `<html>`. Firefox ne le sait pas encore ; il
// n'expose pas non plus `CSSMarginRule`, et c'est à cela qu'on le reconnaît.
const saitEcrireDansLaMarge = () => "CSSMarginRule" in window

const poserLesVariables = ({ titre, adresse }: { titre: string; adresse: string }) => {
  const racine = document.documentElement.style
  racine.setProperty("--impression-titre", chaineCSS(titre))
  racine.setProperty("--impression-adresse", chaineCSS(adresse))
}

const retirerLesVariables = () => {
  const racine = document.documentElement.style
  racine.removeProperty("--impression-titre")
  racine.removeProperty("--impression-adresse")
}

// Un bloc court : celui qui tient dans la limite donnée, mesurée à l'écran.
// La feuille n'a pas la même colonne, mais l'ordre de grandeur suffit pour
// ce qu'on en fait.
const estCourt = (el: Element, limite: number) => el.getBoundingClientRect().height <= limite

// Un bloc de quatre lignes au plus, à l'interligne de l'élément.
const tientEnQuatreLignes = (el: Element) => {
  const interligne = parseFloat(getComputedStyle(el).lineHeight)
  return Number.isFinite(interligne) && estCourt(el, interligne * 4.2)
}

// Noue deux éléments voisins, et tout ce qui se trouve entre eux, dans un
// bloc qui ne se coupera pas. Les nœuds de texte entre les deux — les
// retours à la ligne du HTML — suivent, pour que `denouer` rende la page
// à l'identique.
const nouer = (premier: Element, dernier: Element, classe: string) => {
  const bloc = document.createElement("div")
  bloc.className = classe
  premier.before(bloc)
  let noeud: Node | null = premier
  while (noeud) {
    const suivant: Node | null = noeud.nextSibling
    bloc.append(noeud)
    if (noeud === dernier) break
    noeud = suivant
  }
  return bloc
}

// Défait ce que `nouer` a fait.
const denouer = (classe: string) => {
  for (const bloc of Array.from(document.getElementsByClassName(classe))) {
    bloc.replaceWith(...Array.from(bloc.childNodes))
  }
}

// Retire une classe, et l'attribut lui-même s'il ne reste rien dedans.
const demarquer = (classe: string) => {
  for (const el of Array.from(document.getElementsByClassName(classe))) {
    el.classList.remove(classe)
    if (el.classList.length === 0) el.removeAttribute("class")
  }
}

// Le pied en fin de document, pour les navigateurs qui n'ont pas de marge à
// écrire : le titre à gauche, l'adresse à droite. Il se pose en dernier
// enfant de l'article et se noue au bloc qui le précède, s'il est court :
// seul en haut d'une dernière page, il ferait une feuille pour une ligne.
const poserLePied = (article: Element, { titre, adresse }: { titre: string; adresse: string }) => {
  const pied = document.getElementById("impression-pied") ?? document.createElement("div")
  pied.id = "impression-pied"
  pied.replaceChildren()
  const gauche = document.createElement("span")
  gauche.textContent = titre
  const droite = document.createElement("span")
  droite.textContent = adresse
  pied.append(gauche, droite)

  const dernier = article.lastElementChild
  article.append(pied)
  if (dernier && estCourt(dernier, 320)) nouer(dernier, pied, FIN)
}

const retirerLePied = () => document.getElementById("impression-pied")?.remove()

const estParagrapheImage = (el: Element | null): el is HTMLParagraphElement =>
  el?.tagName === "P" && el.childElementCount === 1 && el.firstElementChild?.tagName === "IMG"

const estLegende = (el: Element | null): el is HTMLParagraphElement =>
  el?.tagName === "P" && el.childElementCount === 1 && el.firstElementChild?.tagName === "EM"

// Ce que le script noue ou marque, et pourquoi.
//
// Les navigateurs ne savent pas tous garder ensemble ce qui va ensemble :
// Firefox ne tient compte ni de `break-after: avoid` — un titre reste seul
// au bas d'une page —, ni des veuves et orphelines — un paragraphe laisse
// sa dernière ligne seule en haut de la suivante. Et deux flottants, l'image
// et sa légende, se séparent partout. Tous, en revanche, respectent
// `break-inside: avoid` : le script fabrique donc des blocs, et la feuille de
// style leur interdit de se couper.
//
// - la figure : l'image et sa légende, noués en un seul flottant ;
// - les blocs courts : un paragraphe ou un item de quatre lignes au plus, un
//   tableau qui tient dans un tiers de page — avec la phrase qui l'annonce,
//   si elle est courte elle aussi. Les blocs longs se coupent comme avant,
//   et à deux lignes de part et d'autre là où le navigateur sait compter ;
// - le titre et le bloc qui le suit, quand celui-ci est court.
const preparerLesBlocs = (article: Element) => {
  for (const p of Array.from(article.querySelectorAll("p"))) {
    if (estParagrapheImage(p) && estLegende(p.nextElementSibling)) {
      nouer(p, p.nextElementSibling, FIGURE)
    }
  }

  for (const bloc of Array.from(article.querySelectorAll("p, li"))) {
    if (tientEnQuatreLignes(bloc)) bloc.classList.add(COURT)
  }

  for (const table of Array.from(article.querySelectorAll(".table-container"))) {
    if (!estCourt(table, 420)) continue
    const annonce = table.previousElementSibling
    if (annonce?.tagName === "P" && tientEnQuatreLignes(annonce)) nouer(annonce, table, TABLEAU)
    else table.classList.add(COURT)
  }

  // Le dernier bloc de l'article n'est jamais noué à un titre : le colophon
  // s'y trouve, et il tient à sa place d'enfant direct.
  const SUITES = new Set(["P", "UL", "OL", "DL", "PRE", "BLOCKQUOTE", "DIV"])
  for (const titre of Array.from(article.querySelectorAll("h2, h3, h4"))) {
    const suite = titre.nextElementSibling
    if (!suite || !suite.nextElementSibling || !SUITES.has(suite.tagName)) continue
    if (suite.classList.contains(FIGURE) || !estCourt(suite, 320)) continue
    nouer(titre, suite, TITRE)
  }
}

const defaireLesBlocs = () => {
  for (const classe of [TITRE, FIGURE, FIN, TABLEAU]) denouer(classe)
  demarquer(COURT)
}

const preparer = () => {
  const article = document.querySelector("article")
  const identite = titreEtAdresse()
  poserLesVariables(identite)
  if (!article) return
  preparerLesBlocs(article)
  if (saitEcrireDansLaMarge()) retirerLePied()
  else poserLePied(article, identite)
}

const defaire = () => {
  defaireLesBlocs()
  retirerLesVariables()
}

const imprimer = () => window.print()

window.addEventListener("beforeprint", preparer)
window.addEventListener("afterprint", defaire)

document.addEventListener("nav", () => {
  for (const bouton of document.getElementsByClassName("imprimer")) {
    bouton.addEventListener("click", imprimer)
    window.addCleanup(() => bouton.removeEventListener("click", imprimer))
  }
})
