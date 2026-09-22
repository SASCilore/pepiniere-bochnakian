# Pépinière Bochnakian — site statique

Site vitrine converti depuis l'artifact Claude Design en HTML/CSS/JS pur, prêt pour un hébergement statique (Vercel, Netlify, GitHub Pages...).

## Contenu
- `index.html` — la page (tout le CSS est inline dans le `<head>`)
- `script.js` — logique JS (menu mobile, slider, saison du moment, animations au scroll)
- `images/` — 21 photos optimisées pour le web (~660 Ko au total)

Aucune dépendance, aucun build : c'est du HTML/JS statique pur.

## Mettre en ligne via GitHub + Vercel

1. Crée un nouveau repo GitHub (ex: `pepiniere-bochnakian`), vide.
2. Pousse ce dossier dedans :
   ```bash
   git init
   git add .
   git commit -m "Site initial Pépinière Bochnakian"
   git branch -M main
   git remote add origin https://github.com/<ton-compte>/pepiniere-bochnakian.git
   git push -u origin main
   ```
3. Sur [vercel.com](https://vercel.com), clique "Add New... > Project", choisis "Import Git Repository" et sélectionne ce repo.
4. Vercel détecte un site statique automatiquement (pas de framework à choisir, "Other" convient). Clique "Deploy".
5. À chaque `git push` sur `main`, Vercel redéploiera automatiquement — c'est le fonctionnement "autonome" recherché.

Un projet Vercel `pepiniere-bochnakian` a déjà été créé sous ton compte (jarvisromain) — tu peux soit le réutiliser en le connectant à ce repo dans ses réglages ("Settings > Git"), soit en créer un nouveau à l'import.
