# Pépinière Bochnakian — site statique

Site vitrine converti depuis l'artifact Claude Design (`Main.dc.html`) en HTML/CSS/JS pur, prêt pour un hébergement statique (Vercel, Netlify, GitHub Pages...).

## Contenu
- `index.html` — la page (tout le CSS est inline dans le `<head>`)
- `script.js` — logique JS (menu mobile, ombre du header + barre de progression au scroll, animations au scroll, saison du moment). La galerie photo ("La pépinière en photos") est en pur CSS (deux rangées qui défilent en sens opposés) et ne nécessite aucun JavaScript.
- `images/` — 21 photos optimisées pour le web (~7,2 Mo au total)

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

## Notes sur ce contenu à préciser

La section "À propos" contient un paragraphe de type `[Espace réservé : ...]` — à compléter avec l'histoire réelle de la pépinière avant mise en ligne définitive.

Le formulaire de contact est un `<form>` HTML simple, sans backend branché derrière — à connecter à un service (Formspree, une fonction serverless, etc.) pour qu'il envoie réellement les demandes.
