# CoteElite.fr - Plateforme d'Expertise en Paris Sportifs

Cette application Node.js + Express est un portail de comparaison haut de gamme pour le marché français, conçu pour répondre aux exigences de conformité de l'ANJ avec une identité visuelle "Elite".

## Architecture Distinctive

- **Branding :** Identité visuelle axée sur l'excellence (Or & Noir).
- **Moteur :** Node.js + Express + EJS.
- **Typographie :** Montserrat (via Google Fonts).
- **Design :** Tailwind CSS avec des composants personnalisés (Glassmorphism, ombres profondes).

## Gestion du Contenu

Les mises à jour se font exclusivement via les fichiers du répertoire `/data` :

- `data/site.js` : Configuration globale (Nom, Couleurs, Helpline).
- `data/operators.js` : Classement des opérateurs et bonus.
- `data/faq.js` : Questions fréquentes paraphrasées pour une identité propre.

## Conformité & Sécurité

- **Âge Légal :** Barrière modale 18+ obligatoire sur chaque page.
- **Transparence :** Divulgation publicitaire "Elite" intégrée.
- **Jeu Responsable :** Focus sur le "Cercle de Prévention" et accès direct au service d'aide ANJ.

## Installation & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the production server:
   ```bash
   npm start
   ```

3. Start the development server (auto-reloads on changes):
   ```bash
   npm run dev
   ```

## SEO & Compliance

- **Sitemap:** Generated dynamically at `/sitemap.xml` based on the `PAGES` array in `server.js`.
- **Robots.txt:** Configured in `server.js` to point to the dynamic sitemap.
- **Age Gate:** A mandatory 18+ modal appears on every page load to ensure compliance.
- **Helpline:** French helpline (09 74 75 13 13) is prominently displayed on all relevant pages.
- **Links:** All affiliate links are marked with `rel="sponsored nofollow"`.

## Adding Assets
- Place operator logos in `public/images/`.
- Place favicon assets in `public/favicon/`.
