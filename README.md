# L'Atelier 166

Site d'une page pour la jam hebdomadaire des musiciens débutants à Allonnes (49).
HTML + CSS simples, hébergé sur GitHub Pages. Le formulaire écrit dans le Google Sheet « Élèves » via Google Apps Script et envoie un mail de notification.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | La page d'accueil (contenu, formulaire, FAQ) |
| `mentions-legales.html` | Mentions légales SF PROD + données personnelles |
| `style.css` | Styles (bois, crème, noir), responsive |
| `images/` | Photo d'en-tête en 800 et 1448 px |
| `logo.svg` | Logo « 166 », sert aussi d'icône d'onglet |
| `apps-script/Code.gs` | Script à coller dans le Google Sheet (pas utilisé par GitHub Pages) |
| `.nojekyll` | Dit à GitHub Pages de servir les fichiers tels quels |

## Crédits photo

- Bloc d'en-tête : photo de la salle de l'atelier (photo personnelle). Deux tailles dans `images/` : `atelier-800.jpg` et `atelier-1448.jpg` (via `srcset`, la photo source fait 1448 px de large), sans métadonnées.

## À compléter avant la mise en ligne

1. `CONTACT@A-REMPLACER.fr` → le mail dédié (dans `index.html` et `mentions-legales.html`).
2. Les crochets `[...]` dans `mentions-legales.html` : capital, siège, SIREN/SIRET, TVA, nom du gérant (affiché seulement sur cette page, pas sur l'accueil).
3. `URL_APPS_SCRIPT` dans `index.html` (étape 1 ci-dessous).

## Étape 1 : relier le formulaire au Google Sheet

1. Depuis le compte Google **samuel@guitarisation.fr**, créer un Google Sheet nommé **Élèves** (ou ouvrir celui qui existe).
2. Menu **Extensions > Apps Script**. Effacer le contenu de `Code.gs`, coller celui de `apps-script/Code.gs`, enregistrer.
3. Dans la liste des fonctions en haut, choisir **testerInscription** puis **Exécuter**. Google demande des autorisations (Sheets + envoi de mail) : accepter. Résultat attendu : un onglet « Atelier 166 » apparaît avec une ligne « Test », et un mail arrive. Supprimer ensuite la ligne de test.
4. **Déployer > Nouveau déploiement** → type **Application Web** :
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tout le monde**
   - Cliquer **Déployer**, copier l'**URL de l'application Web** (elle finit par `/exec`).
5. Coller cette URL dans `index.html` : `const URL_APPS_SCRIPT = "https://script.google.com/macros/s/.../exec";`

Si le script est modifié plus tard : **Déployer > Gérer les déploiements > Modifier > Nouvelle version**, pour garder la même URL.

## Étape 2 : en ligne (fait le 2026-11-26)

- Dépôt : `atelier166/atelier166.github.io` (organisation GitHub gratuite « atelier166 », propriétaire samFTN).
- GitHub Pages : branche `main`, dossier racine.
- Adresse : **https://atelier166.github.io/**
- Chaque `git push` met le site à jour en 1 à 2 minutes.

## Plus tard : brancher un nom de domaine

1. Acheter le domaine (ex. chez OVH).
2. GitHub : **Settings > Pages > Custom domain**, saisir le domaine (ex. `atelier166.fr`). GitHub crée un fichier `CNAME` dans le dépôt.
3. Chez le registrar, zone DNS :
   - domaine nu : 4 enregistrements **A** vers `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www` : un **CNAME** vers `atelier166.github.io.`
4. Une fois le certificat prêt, cocher **Enforce HTTPS**.

Tous les liens du site sont relatifs : rien d'autre à changer.
