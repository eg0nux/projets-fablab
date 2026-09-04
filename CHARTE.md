# Charte `{fablab}`

Ce document décrit l'identité graphique commune à **fablab.egonux.com**
(`{fablab}/DOC`) et **lab.egonux.com** (`{fablab}/PROJETS`). Il est le même
dans les deux dépôts, à l'octet près, comme la feuille de style qu'il
explique : toute modification se reporte de l'un à l'autre.

C'est la charte **Sérigraphie**, arrêtée le 2026-09-04 : deux encres à plat,
le noir et le safran, sur un papier crème. Elle remplace la charte « encre,
papier et rouge » du 2026-08-30, dont elle garde le mobilier, les polices, le
logotype et les signes.

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
partage la police mais ni la palette ni le régime : il a gardé le rouge de la
première charte, et c'est une page d'exposition, avec ses cadres épais et ses
ombres, là où les deux sites du FabLab sont des fiches.

Ce que le lecteur doit trouver sans chercher, sur chacun des deux accueils :
où ça se passe, avec qui, grâce à qui, et où est l'autre site.

## 2. Le logotype

### Construction

```
┌──────────────┐
│ {fablab}     │   la marque : JetBrains Mono 700, bas de casse,
│         /DOC │   accolades safran, nom à l'encre, interlettrage -0,01 em
└──────────────┘   la section : 0,56 du corps, capitales, graisse 700,
                   interlettrage 0,1 em, 0,15 em sous la marque, calée à droite
                   sous la dernière lettre du nom, en étiquette safran pleine
```

La section est une étiquette : safran plein, texte au noir de la page (l'encre
sur papier, le fond lui-même sur thème sombre), la même étiquette que les
liens. Son bord droit — celui du texte, pas du bloc — tombe à 0,58 em du bord
droit de la marque.

Dans les pages, sur papier, le logotype est une étiquette safran pleine,
texte à l'encre, accolades au papier, section cernée d'un filet fin à
l'encre ; au survol il s'encre, texte papier, accolades safran. Sur fond sombre il est nu au repos —
crème sur la page, accolades safran, section en étiquette — et devient
l'étiquette safran au survol. Le trait de 2 px, de la couleur du bloc, reste
le cadre de la version gravure : un trait de 0,08
du corps, angles à 2 px, marges intérieures 0,3 em en haut, 0,5 em sur les
côtés, 0,34 em en bas — celui du sommaire, des photos et de la carte de
fabrication, où un trait de 2 px à l'encre veut dire « ceci est un bloc ».

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
sans section, au corps de 1,05 rem : ce sont des déclinaisons du logotype,
pas des boutons. Les rubriques sont des étiquettes comme lui ; le bouton de
recherche, seul, garde le fond de la page et son cadre d'encre.

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

Pas d'autre couleur que l'encre et le safran ; pas de dégradé, d'ombre ou de
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
| `#` | la structure | dièse en filigrane derrière le titre de page, croisillon du millésime du catalogue, séparateurs du pied de page — et, sans être écrite, la barre de repérage au-dessus des sous-titres, qui dit le niveau à sa longueur |
| `&` | la maison, deux structures qui font une chose ensemble | entre les logos du CIDFF et de La Traverse, en Cormorant italique |
| `==` | la marque du chapeau, ce qu'on retient | le chapeau, qui s'écrit ainsi dans le markdown ; à l'écran c'est un bloc d'encre plein |

Le `#` est safran quand il est écrit (croisillon du titre, pied de page), et
safran pâli vers le papier quand il est un motif : le filigrane du titre de
page, deux lignes de haut, mordu par la première lettre du titre. C'est le
seul safran qui ne soit pas plein. Les sous-titres n'affichent plus leurs
dièses : leur niveau se lit à la barre de repérage posée au-dessus — 4 px sur
2 rem pour un `##`, 3 px sur 1,25 rem pour un `###`, et un filet devant le
`####`. Le `&` est à l'encre : c'est la couleur des titres, et le
safran reste aux accolades et aux liens.

## 4. Les couleurs

Deux encres à plat, comme une affiche sérigraphiée en deux passages : le
**noir** et le **safran**, sur un papier crème. Pas de transparence, pas de
dégradé, pas de bande de biais. Neuf variables Quartz, deux thèmes, déclarées
dans `quartz.config.ts`.

| Variable | Clair | Sombre | Rôle |
|---|---|---|---|
| `light` | `#fbf6ec` papier crème | `#171311` | fond de page ; texte du chapeau |
| `lightgray` | `#e4dbc9` | `#332d27` | filets, zébrure des tableaux, rail du sommaire |
| `gray` | `#8a8176` | `#948a7d` | texte effacé : dates, fil d'Ariane, pied de page, `####` |
| `darkgray` | `#33302a` | `#d8cfc1` | corps de texte |
| `dark` | `#1a1613` encre | `#f5eee2` crème | titres, cadres, logotype, `&` ; bloc du chapeau ; survol des liens |
| `secondary` | `#f26b1d` safran | le même | l'autre encre : étiquettes des liens et de la section, barres de repérage, filets d'alerte et de légende, jauge, croisillons, accolades |
| `tertiary` | `#f26b1d` | le même | Quartz veut deux accents, la charte n'en a qu'un |
| `highlight` | safran à 16 % | safran à 20 % | survols de Quartz hors charte (résultats de recherche) |
| `textHighlight` | `#f26b1d` | le même | un `==surlignage==` hors chapeau, rare |

Quatre règles :

1. **Le safran est un fond, jamais un texte.** À 2,8:1 sur le papier, il ne
   se lit pas : il n'est jamais la couleur d'une ligne à lire. Il est
   toujours un bloc, une barre ou un filet, et le texte posé sur lui est le
   noir de la page — `--sur-safran` dans la feuille : l'encre sur papier, le
   fond lui-même sur thème sombre. Trois entorses, qui sont des marques et
   non des lignes : les accolades du logotype, le croisillon du millésime, et
   les intitulés racine de l'explorateur — les rayons — en gras et en
   capitales. Le seul safran pâli est le dièse en filigrane du titre de page,
   mélangé vers le papier, jamais transparent.
2. **Le noir est un fond aussi.** Le chapeau est un bloc d'encre plein, texte
   au papier ; sur thème sombre le bloc est crème et le texte noir, `--dark`
   et `--light` s'inversent et la règle est la même. Le logotype et les
   rubriques de l'accueil s'échangent avec le thème : sur papier, étiquette
   safran au repos, accolades au papier, section cernée d'un filet fin, et
   bloc d'encre à texte papier au survol, accolades safran ; sur fond sombre,
   la marque nue au repos — crème, accolades safran, section en étiquette
   sans filet — et l'étiquette safran au survol, section cernée de crème.
   Quand plusieurs étiquettes se suivent — les rubriques de l'accueil, la
   liste d'une rubrique, la première colonne du tableau comparatif — une
   sur deux s'encre, bloc d'encre à texte papier (crème et noir sur le
   sombre), et les deux s'échangent au survol : deux encres qui alternent
   font une affiche, une rangée toute safran faisait un aplat. Les liens du
   texte courant gardent une seule encre.
   Le bouton `{recherche}`, seul, garde le fond de la page et son cadre
   d'encre dans les deux thèmes : c'est un outil, pas un rayon.
3. **Les marques d'autrui passent en noir.** Le logo du CIDFF est le seul en
   couleur ; il est ramené à l'encre par un filtre, et tous les logos passent
   en blanc plein sur fond sombre. Sur ces pages, la couleur d'une marque ne
   dit rien.
4. **Pas de troisième encre.** Le doré qui tenait les étoiles du tableau
   comparatif à distance du rouge n'a plus de raison d'être : les étoiles
   sont devenues les jauges des repères, à l'encre.

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

Échelle : titres en capitales ; titre de page de 1,35 à 1,75 rem selon la
largeur de la colonne, `##` 1,1 rem, `###` 0,95 rem, `####` 0,82 rem en gris ;
logotype 1,55 rem, rubriques et recherche 1,05 rem ; corps 1 rem, interligne 1,7 ; chapeau
1,05 rem, interligne 1,75 ; signalétique de 0,68 à 0,82 rem.

La **signalétique** est un registre à part : capitales, interlettrage de 0,07
em, JetBrains Mono, petit corps. C'est le registre des étiquettes de
navigation, `/SOMMAIRE`, l'explorateur entier, le fil d'Ariane, les intitulés
d'encadrés, la ligne « Repères », le pied de page. Les titres sont en
capitales eux aussi, mais au corps et à la graisse d'un titre : la
signalétique est petite, un titre ne l'est pas.

Les chiffres sont à chasse fixe partout où ils se comparent : tableaux, carte
de fabrication, pourcentage du sommaire.

## 6. Le mobilier de page

**Colonne de gauche**, sur toutes les pages : le logotype encadré, le bouton
`{recherche}` dans la même construction, la bascule de thème, le mode
lecture, puis l'explorateur ouvert, tout en capitales, les intitulés racine
en safran et en gras, les rubriques imbriquées à l'encre, les entrées sans
enfant d'un dossier (pages, et fiches logées dans un dossier) alternant le
corps et le gris, la page courante en étiquette safran. La liste de l'explorateur défile
sous la molette comme sous le pavé tactile : les sous-listes de dossiers ne
retiennent plus le geste (voir le commentaire sur `overscroll-behavior`).

**Colonne de droite** : les logos de la maison en tête, `CIDFF & La Traverse`,
puis `/SOMMAIRE` en étiquette safran dans son cadre, avec sa jauge de lecture
et son rail où la section courante est marquée en safran, puis les rétroliens.

**En-tête de page** : le fil d'Ariane en petites capitales grises, maillons
séparés de chevrons, le titre en
capitales sur son dièse en filigrane, la date et le temps de lecture en gris ; à droite, sur la ligne du
titre, le bandeau de marques quand la fiche en a (voir §7).

**Corps** :

- le **chapeau**, deux ou trois lignes en italique dans un bloc d'encre
  plein, texte au papier, qui dit à quoi sert la chose ; il s'écrit
  `==ainsi==` en premier paragraphe ;
- les **sous-titres** en capitales sous leur barre de repérage, plus courte
  d'un niveau à l'autre ; le `####` derrière un filet ;
- les **encadrés** à filet gauche, à l'encre ; safran pour ce qui alerte ;
  leur intitulé en étiquette safran ; italique pour le temps fort d'un
  parcours ; sans icône, sans fond ;
- les **photos** cadrées de 2 px, habillées par le texte sur deux cinquièmes
  de colonne, légende en italique derrière un filet safran juste en dessous ;
- le **bandeau**, quand une page s'ouvre sur une photo avant son premier
  titre : toute la largeur de la colonne, trois fois plus large que haut,
  même cadre et même légende que les photos ;
- les **tableaux** à filets fins et zébrure très légère ;
- la **carte de fabrication** (fablab) : machines, matériaux, temps, coût,
  dans un cadre, pictogramme par ligne ;
- les **repères** (lab) : six appréciations en jauges segmentées, entre deux
  filets ; le tableau comparatif reprend la même jauge dans chaque cellule ;
- les **liens** en étiquettes safran à angles vifs, texte au noir de la page,
  une étiquette par fragment quand le lien passe à la ligne ; au survol
  l'étiquette s'inverse en bloc d'encre ; jamais de lien coloré en texte ;
- le **colophon** : le dernier paragraphe, s'il est en italique, dit avec qui
  et grâce à qui ; il passe en signalétique sous un filet ;
- les **pages de rubrique** (`/objets/`, `/techniques/`, `/projets/`) : le
  nom de la rubrique en titre, le décompte des fiches en signalétique, puis
  la liste — date en gris, titre en étiquette, safran et encre en alternance.

**Page 404**, la seule qui bouge : le nombre tressaute et se dédouble en safran
et en encre comme un défaut de repérage d'impression, des tranches de l'image
partent de travers, et un semis de pixels morts sautille par-dessus. Trois
cadences premières entre elles — 0,7 s, 1,1 s et 2,3 s — pour que l'oeil n'y
retrouve pas de boucle, et des pas discrets partout : un glitch ne glisse pas,
il saute. Le texte dit que la page existera peut-être dans le futur, et le lien
de retour qu'en attendant on repart dans le passé. Même traitement sur
egonux.com, dont la page est écrite à la main.

**Pied de page** : une seule ligne, en capitales grises, mentions séparées
d'un croisillon safran : Quartz, EcoIndex, contact, ego/nux.

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

**Thème sombre** : la palette s'inverse — papier noir, encre crème — et le
safran ne bouge pas : c'est le texte posé dessus qui suit, noir dans les deux
thèmes. Les blocs s'inversent avec l'encre : le chapeau devient crème, texte
noir. Tous les logos passent en blanc.

**Mouvement réduit** : le soubresaut des logos s'arrête, mais garde son
décalage chromatique ; la page 404 se fige de la même façon — le nombre garde
son dédoublement, la déchirure une tranche, le semis de pixels sa position de
départ. Ce sont les deux seules animations des sites.

**Impression** : les colonnes et le pied de page disparaissent, tout passe en
noir, les barres de repérage restent et s'impriment en noir (elles portent la
hiérarchie sur papier), le filigrane du titre s'efface, le chapeau quitte son bloc d'encre pour un cadre, les
étiquettes des liens tombent et leur texte se souligne, les adresses des liens
externes s'écrivent entre parenthèses. Une fiche punaisée
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
| `quartz/plugins/emitters/folderPage.tsx` | le titre des pages de rubrique, sans le « Dossier : » de Quartz | identique |
| `quartz/i18n/locales/fr-FR.ts` | les libellés : décompte des fiches, page 404 | identique |
| `quartz/static/og-image.png` | image de partage | propre à chaque site : le logotype encadré sur papier crème, le domaine en dessous |
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
- **Les tracés de `logos/`** ont été passés à Sérigraphie sur les fichiers
  eux-mêmes, le script qui les avait produits n'étant pas dans le dépôt ; au
  prochain changement de construction, il faudra le réécrire.
