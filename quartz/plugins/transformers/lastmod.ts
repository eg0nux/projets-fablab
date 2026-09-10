import fs from "fs"
import { Repository } from "@napi-rs/simple-git"
import { QuartzTransformerPlugin } from "../types"
import path from "path"
import { styleText } from "util"

export interface Options {
  priority: ("frontmatter" | "git" | "filesystem")[]
}

const defaultOptions: Options = {
  priority: ["frontmatter", "git", "filesystem"],
}

// YYYY-MM-DD
const iso8601DateOnlyRegex = /^\d{4}-\d{2}-\d{2}$/

function coerceDate(fp: string, d: any): Date {
  // check ISO8601 date-only format
  // we treat this one as local midnight as the normal
  // js date ctor treats YYYY-MM-DD as UTC midnight
  if (typeof d === "string" && iso8601DateOnlyRegex.test(d)) {
    d = `${d}T00:00:00`
  }

  const dt = new Date(d)
  const invalidDate = isNaN(dt.getTime()) || dt.getTime() === 0
  if (invalidDate && d !== undefined) {
    console.log(
      styleText(
        "yellow",
        `\nWarning: found invalid date "${d}" in \`${fp}\`. Supported formats: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format`,
      ),
    )
  }

  return invalidDate ? new Date() : dt
}

type MaybeDate = undefined | string | number

// Écart au Quartz d'origine, à reporter à chaque montée de version (voir
// CHARTE.md, § 6 et § 9). Deux choses :
//
// 1. `realise-le`, le mois de réalisation d'un objet (`2026-04`), est la date
//    de la fiche : c'est elle qui s'affiche, au mois près, et qui classe la
//    rubrique. Le champ `date` n'est pas employé sur les objets (Quartz le
//    lirait comme date de publication) ; celui-ci porte un sens et une
//    précision qui sont les siens.
//
// 2. Un historique git tronqué ne date rien. Cloudflare Pages clone sans
//    historique : chaque fichier y paraît modifié par le commit de tête, et
//    toutes les pages portaient la date du dernier déploiement. Quand le
//    clone est superficiel (`.git/shallow` existe), ni git ni le système de
//    fichiers, qui date tout du clone, ne sont crus : seul le frontmatter
//    compte, et une page sans date n'en affiche pas.
const MOIS = /^\d{4}-\d{2}$/

function moisEntier(d: string): Date {
  const [annee, mois] = d.split("-").map(Number)
  // Midi, heure locale : le mois affiché ne dépend pas du fuseau du poste
  // qui construit.
  return new Date(annee, mois - 1, 1, 12)
}

export const CreatedModifiedDate: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "CreatedModifiedDate",
    markdownPlugins(ctx) {
      return [
        () => {
          let repo: Repository | undefined = undefined
          let repositoryWorkdir: string
          let historiqueTronque = false
          if (opts.priority.includes("git")) {
            try {
              repo = Repository.discover(ctx.argv.directory)
              repositoryWorkdir = repo.workdir() ?? ctx.argv.directory
              historiqueTronque = fs.existsSync(path.join(repositoryWorkdir, ".git", "shallow"))
              if (historiqueTronque) {
                console.log(
                  styleText(
                    "yellow",
                    "\nHistorique git tronqué (clone superficiel) : les dates ne sont lues que dans le frontmatter.",
                  ),
                )
              }
            } catch (e) {
              console.log(
                styleText(
                  "yellow",
                  `\nWarning: couldn't find git repository for ${ctx.argv.directory}`,
                ),
              )
            }
          }

          return async (_tree, file) => {
            let created: MaybeDate = undefined
            let modified: MaybeDate = undefined
            let published: MaybeDate = undefined
            let precision: "mois" | undefined = undefined

            const fp = file.data.relativePath!
            const fullFp = file.data.filePath!
            for (const source of opts.priority) {
              if (source === "filesystem") {
                if (historiqueTronque) continue
                const st = await fs.promises.stat(fullFp)
                created ||= st.birthtimeMs
                modified ||= st.mtimeMs
              } else if (source === "frontmatter" && file.data.frontmatter) {
                created ||= file.data.frontmatter.created as MaybeDate
                modified ||= file.data.frontmatter.modified as MaybeDate
                published ||= file.data.frontmatter.published as MaybeDate
                const realise = file.data.frontmatter["realise-le"]
                if (realise !== undefined && !modified) {
                  if (typeof realise === "string" && MOIS.test(realise)) {
                    modified = moisEntier(realise).getTime()
                    precision = "mois"
                  } else {
                    modified = realise as MaybeDate
                  }
                  created ||= modified
                }
              } else if (source === "git" && repo) {
                if (historiqueTronque) continue
                try {
                  const relativePath = path.relative(repositoryWorkdir, fullFp)
                  modified ||= await repo.getFileLatestModifiedDateAsync(relativePath)
                } catch {
                  console.log(
                    styleText(
                      "yellow",
                      `\nWarning: ${file.data.filePath!} isn't yet tracked by git, dates will be inaccurate`,
                    ),
                  )
                }
              }
            }

            // Rien de fiable : la page reste sans date plutôt que datée du
            // jour de la construction.
            if (created === undefined && modified === undefined && published === undefined) {
              return
            }

            file.data.dates = {
              created: coerceDate(fp, created),
              modified: coerceDate(fp, modified),
              published: coerceDate(fp, published),
              precision,
            }
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    dates: {
      created: Date
      modified: Date
      published: Date
      // « mois » quand la date vient de `realise-le` : elle s'affiche alors
      // sans le jour.
      precision?: "mois"
    }
  }
}
