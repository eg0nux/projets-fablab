// Rend les ressources de thème insensibles au cache.
//
// Quartz émet toujours les mêmes noms — index.css, prescript.js,
// postscript.js — quel que soit leur contenu. Un navigateur ou un nœud de
// bord qui garde l'ancienne version continue donc de l'appliquer après un
// changement de charte, sans qu'aucun rechargement ordinaire ne le corrige.
// C'est ce qui a fait servir la palette héritée pendant des heures alors
// que le site déployé était le bon.
//
// L'outil insère une empreinte du contenu dans le nom du fichier
// (index.a1b2c3d4.css) et réécrit les références dans les pages. Le nom
// change dès que le contenu change : un cache ne peut plus masquer une
// modification, et les fichiers inchangés gardent leur nom, donc leur cache.
//
// À lancer après `npx quartz build` et `node tools/accueil.mjs`.

import { readdir, readFile, rename, writeFile, stat } from "node:fs/promises"
import { createHash } from "node:crypto"
import path from "node:path"

const RACINE = "public"
const RESSOURCES = ["index.css", "prescript.js", "postscript.js"]

async function existe(p) {
  try {
    await stat(p)
    return true
  } catch {
    return false
  }
}

/** Toutes les pages HTML, à n'importe quelle profondeur. */
async function pages(dir, acc = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) await pages(p, acc)
    else if (e.name.endsWith(".html")) acc.push(p)
  }
  return acc
}

if (!(await existe(RACINE))) {
  console.error(`${RACINE}/ n'existe pas : lancer \`npx quartz build\` d'abord.`)
  process.exit(1)
}

const renommages = new Map()

for (const nom of RESSOURCES) {
  const src = path.join(RACINE, nom)
  if (!(await existe(src))) continue

  const contenu = await readFile(src)
  const empreinte = createHash("sha256").update(contenu).digest("hex").slice(0, 8)
  const { name, ext } = path.parse(nom)
  const nouveau = `${name}.${empreinte}${ext}`

  await rename(src, path.join(RACINE, nouveau))
  renommages.set(nom, nouveau)
  console.log(`  ${nom.padEnd(16)} -> ${nouveau}`)
}

if (renommages.size === 0) {
  console.log("Aucune ressource à versionner.")
  process.exit(0)
}

// Réécriture des références. Les chemins sont relatifs et de profondeur
// variable (./index.css, ../../index.css) : on ne remplace que le nom de
// fichier, le préfixe reste intact.
const fichiers = await pages(RACINE)
let touchees = 0

for (const f of fichiers) {
  let html = await readFile(f, "utf8")
  const avant = html
  for (const [ancien, nouveau] of renommages) {
    html = html.replaceAll(ancien, nouveau)
  }
  if (html !== avant) {
    await writeFile(f, html)
    touchees++
  }
}

console.log(`\n  ${renommages.size} ressource(s) versionnée(s), ${touchees}/${fichiers.length} page(s) mise(s) à jour.`)
