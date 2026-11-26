# L'Atelier 166

Site d'une page pour la jam hebdomadaire des musiciens débutants à Allonnes (49).
HTML + CSS simples, hébergé sur GitHub Pages. Le formulaire écrit dans le Google Sheet « Élèves » via Google Apps Script et envoie un mail de notification.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | La page d'accueil (contenu, formulaire, FAQ) |
| `mentions-legales.html` | Mentions légales SF PROD + données personnelles |
| `style.css` | Styles (bois, crème, noir), responsive |
| `logo.svg` | Logo « 166 », sert aussi d'icône d'onglet |
| `apps-script/Code.gs` | Script à coller dans le Google Sheet (pas utilisé par GitHub Pages) |
| `.nojekyll` | Dit à GitHub Pages de servir les fichiers tels quels |

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

## Étape 2 : mettre le site sur GitHub

1. Sur github.com : **New repository**, nom `atelier-166`, visibilité **Public** (GitHub Pages gratuit l'exige), sans README.
2. Dans le Terminal :
   ```bash
   cd ~/Documents/Repo/atelier-166
   git add .
   git commit -m "Site L'Atelier 166"
   git remote add origin https://github.com/<ton-compte>/atelier-166.git
   git push -u origin main
   ```

## Étape 3 : activer GitHub Pages

1. Sur le dépôt : **Settings > Pages**.
2. Source : **Deploy from a branch**, branche **main**, dossier **/ (root)**, **Save**.
3. Après 1 à 2 minutes, le site est en ligne à l'adresse gratuite :
   `https://<ton-compte>.github.io/atelier-166/`
4. Tester le formulaire depuis cette adresse (une vraie inscription test), vérifier la ligne dans le Sheet et le mail, puis supprimer la ligne.

Chaque `git push` ensuite met le site à jour automatiquement.

## Plus tard : brancher un nom de domaine

1. Acheter le domaine (ex. chez OVH).
2. GitHub : **Settings > Pages > Custom domain**, saisir le domaine (ex. `atelier166.fr`). GitHub crée un fichier `CNAME` dans le dépôt.
3. Chez le registrar, zone DNS :
   - domaine nu : 4 enregistrements **A** vers `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www` : un **CNAME** vers `<ton-compte>.github.io.`
4. Une fois le certificat prêt, cocher **Enforce HTTPS**.

Tous les liens du site sont relatifs : rien d'autre à changer.
