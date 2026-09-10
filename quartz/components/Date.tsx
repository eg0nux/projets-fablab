import { GlobalConfiguration } from "../cfg"
import { ValidLocale } from "../i18n"
import { QuartzPluginData } from "../plugins/vfile"

// Écart au Quartz d'origine, à reporter à chaque montée de version : une date
// au mois près (celle de `realise-le`, voir `lastmod.ts`) s'écrit sans le
// jour, « avril 2026 », et son `datetime` s'arrête au mois.
type Precision = "mois" | undefined

interface Props {
  date: Date
  locale?: ValidLocale
  precision?: Precision
}

export type ValidDateType = keyof Required<QuartzPluginData>["dates"]

export function getDate(cfg: GlobalConfiguration, data: QuartzPluginData): Date | undefined {
  if (!cfg.defaultDateType) {
    throw new Error(
      `Field 'defaultDateType' was not set in the configuration object of quartz.config.ts. See https://quartz.jzhao.xyz/configuration#general-configuration for more details.`,
    )
  }
  return data.dates?.[cfg.defaultDateType]
}

export function formatDate(d: Date, locale: ValidLocale = "en-US", precision?: Precision): string {
  if (precision === "mois") {
    return d.toLocaleDateString(locale, { year: "numeric", month: "long" })
  }
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}

export function Date({ date, locale, precision }: Props) {
  const datetime =
    precision === "mois"
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      : date.toISOString()
  return <time datetime={datetime}>{formatDate(date, locale, precision)}</time>
}
