// Le bouton d'impression, et le pied que la feuille emporte.
//
// Le pied n'est pas dans le HTML servi : il n'a rien à faire à l'écran, et
// une fiche imprimée est la seule page qui ait besoin de dire d'où elle
// vient. Il est donc écrit au moment d'imprimer, sur `beforeprint` — que le
// geste vienne du bouton ou du Ctrl+P du navigateur, les deux passent par là.
//
// L'adresse est relevée sur `location` plutôt que rendue au build : une même
// page servie en préversion ou en local dit alors où elle a été prise.

const poserLePied = () => {
  const pied = document.getElementById("impression-pied") ?? document.createElement("div")
  pied.id = "impression-pied"

  // L'accueil n'affiche pas de titre d'article — c'est un seuil, pas une
  // fiche : le titre de l'onglet prend le relais, sinon le pied s'ouvrirait
  // sur un blanc.
  const titre = document.querySelector("h1.article-title")?.textContent?.trim() || document.title
  // Sans le protocole ni la barre finale : c'est une adresse qu'on recopie,
  // pas un lien qu'on clique.
  const adresse = (location.host + location.pathname).replace(/\/$/, "")

  pied.innerHTML = ""
  const gauche = document.createElement("span")
  gauche.textContent = titre
  const droite = document.createElement("span")
  droite.textContent = adresse
  pied.append(gauche, droite)

  document.body.append(pied)
}

const imprimer = () => window.print()

window.addEventListener("beforeprint", poserLePied)

document.addEventListener("nav", () => {
  for (const bouton of document.getElementsByClassName("imprimer")) {
    bouton.addEventListener("click", imprimer)
    window.addCleanup(() => bouton.removeEventListener("click", imprimer))
  }
})
