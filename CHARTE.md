# Charte `{fablab}`

Ce document décrit l'identité graphique commune à **fablab.egonux.com**
(`{fablab}/DOC`) et **lab.egonux.com** (`{fablab}/PROJETS`). Il est le même
dans les deux dépôts, à l'octet près, comme la feuille de style qu'il
explique : toute modification se reporte de l'un à l'autre.

Il dit ce qui est décidé et pourquoi. Le *comment* est dans le code, commenté
en français : `quartz/styles/custom.scss` pour l'essentiel, les composants
`PageTitle`, `Logos`, `Marques` et `Footer` pour le reste.

## 1. Une maison, deux sites

**ego/nux** est la maison : le domaine, le sigle en favicon, la page d'accueil
de `egonux.com` qui aligne les trois logotypes sans en hiérarchiser aucun.

`{fablab}` est la marque de l'atelier. Elle se décline en deux sections, qui
sont deux sites :

| Site | Logotype | Ce qu'on y trouve |
|---|---|---|
| fablab.egonux.com | `{fablab}` `/DOC` | **ce qui a été fait** : les objets fabriqués, les techniques pour les refaire, les parcours menés |
| lab.egonux.com | `{fablab}` `/PROJETS` | **ce qui pourrait se faire** : un catalogue de parcours à proposer, datés d'un millésime |

C'est la seule différence affichée, et c'est voulu : même charte, même
mobilier, même ton. Un lecteur qui passe de l'un à l'autre ne change pas de
maison, il change de rayon. Le troisième site, `{maquette}/LATRAVERSE`,
partage la palette et la police mais pas le régime : c'est une page
d'exposition, avec ses cadres épais et ses aplats, là où les deux sites du
FabLab sont des fiches.

Ce que le lecteur doit trouver sans chercher, sur chacun des deux accueils :
où ça se passe, avec qui, grâce à qui, et où est l'autre site.

## 2. Le logotype

### Construction

```
┌──────────────┐
│ {fablab}     │   la marque : JetBrains Mono 700, bas de casse,
│         /DOC │   accolades rouges, nom à l'encre, interlettrage -0,01 em
└──────────────┘   la section : 0,56 du corps, capitales, graisse normale,
                   interlettrage 0,08 em, 0,1 em sous la marque, calée à droite
                   sous la dernière lettre du nom, sur une bande rouge
```

La section est celle de l'accueil du domaine, reprise à l'identique partout :
texte anthracite sur une bande rouge translucide (rouge plein et texte papier
sur fond sombre), qui couvre la hauteur des capitales et dont le bord droit
tombe à 0,58 em du bord droit de la marque.

Le cadre est un trait de 0,08 du corps (2 px pour le corps de 24,8 px de la
colonne de gauche), angles à 2 px, marges intérieures 0,3 em en haut, 0,5 em
sur les côtés, 0,34 em en bas. Le trait du cadre est celui du chapeau, du
sommaire, des photos et de la carte de fabrication : sur ces sites, un trait
de 2 px à l'encre veut dire « ceci est un bloc ».

Le logotype n'est pas une image : dans les pages, c'est du texte, et la
feuille de style pose les accolades en pseudo-éléments. Le titre de site
reste « fablab/doc » ou « fablab/projets » dans la configuration ; c'est
`PageTitle.tsx` qui le coupe à la barre oblique pour l'afficher sur deux
lignes. L'onglet, le flux RSS et les métadonnées de partage gardent la chaîne
entière.

### Déclinaisons

| Version | Où | Fichier |
|---|---|---|
| **encadrée** | colonne de gauche de chaque page, images de partage | `logos/fablab-doc-clair.svg`, `-sombre`, et `fablab-projets-*` |
| **libre**, sans cadre | accueil de egonux.com, documents, signatures | `logos/*-libre-*.svg` |
| **gravure**, monochrome | découpe et gravure laser, tampon, sérigraphie | `logos/*-gravure.svg`, `-gravure-inverse` pour matériau sombre |
| **réduction** `{}` | en dessous de 32 px | `logos/reduction-*.svg` |
| **marque seule** `{fablab}` | quand la section n'a pas de sens : l'atelier lui-même, un objet gravé | `logos/fablab-clair.svg` et déclinaisons |

Les rubriques de l'accueil (`{techniques}`, `{objets}`, `{la méthode}`),
côte à côte, et le bouton `{recherche}` sont rendus dans la même construction,
sans section, au même corps ou plus petit : ce sont des déclinaisons du
logotype, pas des boutons.

Tous les fichiers de `logos/` sont des tracés, générés depuis les polices du
site. Leur README dit comment ils sont faits et ce qu'on ne fait pas avec.

### Zone de protection et taille minimale

Le cadre est la zone de protection : rien ne le touche, et l'on garde autour
de lui au moins la largeur de sa marge intérieure (0,5 em). Sans cadre, la
même réserve vaut autour du texte.

En dessous de 32 px de haut, on passe à la réduction. Le favicon n'est pas la
réduction mais le sigle de la maison : l'onglet dit ego/nux, la page dit
`{fablab}`.

### Ce qu'on ne fait pas

Pas d'autre couleur que l'encre et le rouge ; pas de dégradé, d'ombre ou de
contour ; pas de majuscule dans la marque ni de bas de casse dans la section ;
pas de section inventée ; pas de déformation, le cadre suit le texte et ne
s'étire jamais pour remplir une largeur ; pas de logotype posé sur une photo.

## 3. Les signes

La charte tient à cinq signes de clavier, chacun avec un sens fixe. C'est ce
qui donne aux deux sites leur unité sans recourir à la couleur ni à
l'illustration.

| Signe | Sens | Où on le voit |
|---|---|---|
| `{ }` | la marque, ce qui appartient à l'atelier | logotype, rubriques de l'accueil, bouton de recherche |
| `/` | la section, le chemin | `/DOC`, `/PROJETS`, `/SOMMAIRE`, le fil d'Ariane |
| `#` | la structure | dièses en filigrane derrière le titre de page et les sous-titres (`#`, `##`, `###`), marqueur `####` en gouttière, croisillon du millésime du catalogue, séparateurs du pied de page |
| `&` | la maison, deux structures qui font une chose ensemble | entre les logos du CIDFF et de La Traverse, en Cormorant italique |
| `==` | le surlignage, ce qu'on retient | chapeau, légendes de photos, titres d'encadrés, coup de surligneur des liens |

Le `#` est rouge quand il est un signe (marqueur `####`, croisillon du titre,
pied de page) et rouge très pâli quand il est un motif : le filigrane du titre
de page, rouge à 20 %, et celui des sous-titres, rouge clair à 24 %, plus
grand que le titre et mordu par sa première lettre.
Le `&` est à l'encre : c'est la couleur des titres, et le rouge reste aux
accolades, aux chapeaux et aux liens.

## 4. Les couleurs

Neuf variables Quartz, deux thèmes, déclarées dans `quartz.config.ts`.

| Variable | Clair | Sombre | Rôle |
|---|---|---|---|
| `light` | `#fafafa` papier | `#1c1b19` | fond de page |
| `lightgray` | `#e6e1d9` | `#33312c` | filets, zébrure des tableaux, rail du sommaire |
| `gray` | `#8c8578` | `#7d786d` | texte effacé : dates, fil d'Ariane, pied de page |
| `darkgray` | `#38352f` | `#ded8cc` | corps de texte |
| `dark` | `#212121` encre | `#f6ece0` crème | titres, cadres, logotype, `&` |
| `secondary` | `#d32f2f` rouge | `#f4675c` | accolades, section, marqueurs, alertes, jauge |
| `tertiary` | `#f44336` | `#f8998f` | surlignage : le chapeau et le surligneur des liens à 60 %, comme les titres d'encadrés ; les légendes de photos (thème clair) et les dièses en filigrane à 24 % ; en sombre, le chapeau reprend `secondary` à 78 % et le surligneur garde le vif du thème clair |
| `highlight` | pêche à 32 % | pêche à 12 % | survol de l'explorateur |
| `textHighlight` | jaune à 60 % | jaune à 27 % | jamais employé tel quel |

Quatre règles :

1. **Le rouge est un accent, jamais un aplat.** Il marque un signe, une
   alerte, une bande de surlignage ; il ne colore ni un fond de bloc, ni un
   bouton, ni des liens par dizaines.
2. **Un seul rouge par usage.** Le surlignage n'a qu'un rouge, le vif
   `#f44336` : le chapeau et les liens reçoivent la même teinte. Sur papier
   c'est `tertiary`, pris tel quel ; sur fond noir `tertiary` est le rouge
   pâle, trop délavé pour s'y voir, et `--stabilo` garde le vif — la seule
   valeur écrite en dur hors de la configuration.
3. **Les marques d'autrui passent en noir.** Le logo du CIDFF est le seul en
   couleur ; il est ramené à l'encre par un filtre, et tous les logos passent
   en blanc plein sur fond sombre. Sur ces pages, la couleur d'une marque ne
   dit rien.
4. **Le doré `#d4a53a` n'existe que sur le tableau comparatif** du
   catalogue, pour tenir les étoiles à distance du rouge d'accent. Il est
   délimité par la page et ne doit pas en sortir.

Les codes couleur cités dans une fiche (les consignes Trotec, par exemple)
s'affichent avec une pastille pastel : c'est le seul endroit où d'autres
teintes apparaissent, et elles y sont assourdies vers le papier.

## 5. La typographie

| Famille | Graisses | Emploi |
|---|---|---|
| **JetBrains Mono** | 400, 700 | titres, logotype, interface, signalétique en capitales espacées, code, tableaux d'en-tête, carte de fabrication |
| **Literata** | 400, 400 italique, 600 | corps de texte, entrées du sommaire, tableaux |
| **Cormorant Garamond** italique | 400, réduite au seul `&` | l'esperluette entre les logos de la maison, rien d'autre |

Toutes auto-hébergées dans `quartz/static/fonts/`, sous-ensembles latin et
latin étendu. L'appariement mono / serif donne le contraste sans couleur : la
monospace impose un rythme aux titres, la serif tient la lecture longue.

Échelle : titre de page 2 rem, `##` 1,45 rem, `###` 1,15 rem, `####` 1 rem en
capitales grises ; logotype et rubriques 1,55 rem ; corps 1 rem, interligne
1,7 ; chapeau 1,05 rem, interligne 2 ; signalétique de 0,68 à 0,82 rem.

La **signalétique** est un registre à part : capitales, interlettrage de 0,07
em, JetBrains Mono, petit corps. C'est le registre des étiquettes de
navigation, `/SOMMAIRE`, l'explorateur entier, le fil d'Ariane, les intitulés
d'encadrés, la ligne « Repères », le pied de page. Les titres de pages, eux,
gardent leur casse en tête de page.

Les chiffres sont à chasse fixe partout où ils se comparent : tableaux, carte
de fabrication, pourcentage du sommaire.

## 6. Le mobilier de page

**Colonne de gauche**, sur toutes les pages : le logotype encadré, le bouton
`{recherche}` dans la même construction, la bascule de thème, le mode
lecture, puis l'explorateur ouvert, tout en capitales, rubriques en gras et
en rouge, entrées sans enfant (pages, et fiches logées dans un dossier)
alternant anthracite et rouge clair (crème et rouge pâle sur fond sombre), la
page courante en rouge plein et en gras. La liste de l'explorateur défile
sous la molette comme sous le pavé tactile : les sous-listes de dossiers ne
retiennent plus le geste (voir le commentaire sur `overscroll-behavior`).

**Colonne de droite** : les logos de la maison en tête, `CIDFF & La Traverse`,
puis `/SOMMAIRE` encadré, avec sa jauge de lecture et son rail où la section
courante est marquée en rouge, puis les rétroliens.

**En-tête de page** : le fil d'Ariane en capitales, le titre avec son dièse en
filigrane, la date et le temps de lecture en gris ; à droite, sur la ligne du
titre, le bandeau de marques quand la fiche en a (voir §7).

**Corps** :

- le **chapeau**, deux ou trois lignes surlignées dans un cadre, qui dit à
  quoi sert la chose ; il s'écrit `==ainsi==` en premier paragraphe ;
- les **titres** avec leurs dièses en filigrane, le `####` seul restant en
  gouttière ;
- les **encadrés** à filet gauche, à l'encre ; rouge pour ce qui alerte ;
  italique pour le temps fort d'un parcours ; sans icône, sans fond ;
- les **photos** cadrées de 2 px, habillées par le texte sur deux cinquièmes
  de colonne, légende en italique surlignée juste en dessous ;
- le **bandeau**, quand une page s'ouvre sur une photo avant son premier
  titre : toute la largeur de la colonne, trois fois plus large que haut,
  même cadre et même légende que les photos ;
- les **tableaux** à filets fins et zébrure très légère ;
- la **carte de fabrication** (fablab) : machines, matériaux, temps, coût,
  dans un cadre, pictogramme par ligne ;
- les **repères** (lab) : six appréciations en jauges segmentées, entre deux
  filets ;
- les **liens** au surligneur, une bande légèrement de biais, du rouge du
  chapeau, qui suit le retour à la ligne, soulignée d'un pointillé à l'encre, en points de 2 px ; le
  texte y garde la couleur du corps ; jamais de lien rouge ;
- le **colophon** : le dernier paragraphe, s'il est en italique, dit avec qui
  et grâce à qui ; il passe en signalétique sous un filet.

**Page 404**, la seule qui bouge : le nombre tressaute et se dédouble en rouge
et en jaune comme un défaut de repérage d'impression, des tranches de l'image
partent de travers, et un semis de pixels morts sautille par-dessus. Trois
cadences premières entre elles — 0,7 s, 1,1 s et 2,3 s — pour que l'oeil n'y
retrouve pas de boucle, et des pas discrets partout : un glitch ne glisse pas,
il saute. Le texte dit que la page existera peut-être dans le futur, et le lien
de retour qu'en attendant on repart dans le passé. Même traitement sur
egonux.com, dont la page est écrite à la main.

**Pied de page** : une seule ligne, en capitales grises, mentions séparées
d'un croisillon rouge pâli : Quartz, EcoIndex, contact, ego/nux.

**Accueil**, même structure sur les deux sites : le chapeau, puis les
rubriques rendues au logotype (`> [!rubriques]` dans le markdown), puis
quelques lignes qui disent d'où vient ce qu'on va lire et où est l'autre
site, puis les logos de la maison centrés sous le contenu. Le catalogue garde
son titre et sa date, qui sont son millésime ; la documentation n'en a pas :
c'est un seuil.

## 7. Les trois rangs de logos

Les logos d'autrui répondent à trois questions différentes et n'occupent donc
pas la même place.

| Rang | Question | Où | Comment |
|---|---|---|---|
| **la maison** | qui porte l'atelier | colonne de droite, toutes les pages | `Logos.tsx` : CIDFF Dordogne `&` La Traverse, en noir, blanc sur fond sombre, soubresaut au survol |
| **le partenaire d'un projet** | avec qui cette fiche a été faite | bandeau de fiche, sur la ligne du titre | `Marques.tsx` : le champ `partenaire` du frontmatter ; à gauche le pictogramme de situation (aides techniques), à droite le logo du partenaire |
| **les soutiens** | grâce à qui | colophon, en fin de fiche | un paragraphe en italique, en texte, avec liens |

Les lieux ne sont pas un rang : La Traverse est déjà la maison, et un lieu se
nomme dans le texte, avec la date.

Inventaire au 2026-09-02 :

| Structure | Rang | Fichier | État |
|---|---|---|---|
| CIDFF Dordogne | maison | `quartz/static/logo-cidff.svg` | en place |
| La Traverse | maison | `quartz/static/logo-traverse.png` | en place |
| APF France Handicap | partenaire | `quartz/static/logo-apf.svg` + pictos | en place |
| École de la deuxième chance | partenaire | | **manque** : à ajouter dans `PARTENAIRES` (`Marques.tsx`) avec un SVG |
| La Pelle aux Idées | partenaire | | **manque**, idem |
| Le Fabulieu, La Force | lieu | | rien à prévoir : c'est un lieu, il se nomme dans le texte ; s'il devient co-porteur, il rejoint la maison |
| Fondation Afnic | soutien | | texte seulement, en colophon |
| Fondation groupe EDF | soutien | | texte seulement, en colophon |

Si un financeur exige l'affichage de son logo, il prend place dans le
colophon, en noir, à la hauteur du texte, jamais en tête de page : le
bandeau de fiche dit avec qui, pas grâce à qui.

## 8. Sombre, immobile, imprimé

**Thème sombre** : la palette s'inverse, le rouge s'éclaircit, les
surlignages montent en opacité et leur texte repasse en clair, tous les logos
passent en blanc, le surligneur des liens passe en `screen` — sur papier il
est posé à plat. Rien ne prend de fond.

**Mouvement réduit** : le soubresaut des logos s'arrête, mais garde son
décalage chromatique ; la page 404 se fige de la même façon — le nombre garde
son dédoublement, la déchirure une tranche, le semis de pixels sa position de
départ. Ce sont les deux seules animations des sites.

**Impression** : les colonnes et le pied de page disparaissent, tout passe en
noir, les marqueurs `##` reviennent devant les titres (ils portent la
hiérarchie sur papier), le filigrane du titre de page s'efface, les surlignages tombent et le chapeau garde son cadre, les
adresses des liens externes s'écrivent entre parenthèses. Une fiche punaisée
près d'une machine est un usage réel.

## 9. Où ça vit

| Fichier | Rôle | Jumeau sur l'autre site |
|---|---|---|
| `quartz/styles/custom.scss` | toute la charte | identique |
| `quartz.config.ts` | palette, polices, titre de site | identique sauf `pageTitle` et `baseUrl` |
| `quartz.layout.ts` | mobilier des pages | identique dans l'esprit ; fablab a le bandeau de marques et ses libellés de dossiers |
| `quartz/components/PageTitle.tsx` | le logotype sur deux lignes | identique |
| `quartz/components/Logos.tsx` | la maison | identique |
| `quartz/components/Marques.tsx` | le partenaire d'un projet | fablab seulement |
| `quartz/plugins/transformers/fabrication.ts` | la carte de fabrication | fablab seulement |
| `quartz/plugins/transformers/reperes.ts` | les jauges du catalogue | lab seulement |
| `quartz/static/og-image.png` | image de partage | propre à chaque site, générée avec les logotypes |
| `logos/` | la famille de logotypes en tracés | fablab seulement, dossier de référence |
| `CHARTE.md` | ce document | identique |

Après un changement de charte : `npx quartz build` puis
`node tools/versionner-assets.mjs`, sinon un cache continue de servir
l'ancienne feuille.

## 10. Ce qui reste à trancher

- **Le nom.** `fablab` est un provisoire ; s'il change, `logos/` se régénère
  et les deux configurations suivent.
- **Les logos manquants** (§7) : l'École de la deuxième chance et La Pelle aux
  Idées, en SVG monochrome de préférence.
- **Le sort de lab.egonux.com** une fois le millésime passé : renommé pour
  dire son statut, ou absorbé dans la documentation comme axe `parcours/`.
- **Deux vestiges** dans le dépôt fablab, `tools/accueil.mjs` et `wip/`, à
  retirer quand la commande de build de Cloudflare Pages ne les appellera
  plus.
