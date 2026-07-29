const express = require('express');
const path = require('path');
const site = require('./data/site');
const operators = require('./data/operators');
const faq = require('./data/faq');

const app = express();
const PORT = process.env.PORT || 3002;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const PAGES = [
  {
    path: '/',
    view: 'index',
    key: 'home',
    title: `Meilleures Plateformes de Jeux en France | ${site.fullSiteName}`,
    description: `Découvrez les meilleures plateformes de jeux en ligne agréées en France. Comparatif indépendant des bonus et services par ${site.fullSiteName}.`,
    keywords: 'plateformes de jeux, bonus, France, ANJ, services de jeux',
    changefreq: 'daily',
    priority: 1.0
  },
  {
    path: '/a-propos.html',
    view: 'a-propos',
    key: 'a-propos',
    title: `Notre Expertise & Méthodologie | ${site.fullSiteName}`,
    description: `En savoir plus sur comment ${site.fullSiteName} évalue les plateformes de jeux pour garantir votre sécurité.`,
    keywords: 'expertise, méthodologie, évaluation plateformes',
    changefreq: 'monthly',
    priority: 0.5
  },
  {
    path: '/contact.html',
    view: 'contact',
    key: 'contact',
    title: `Contactez-nous | ${site.fullSiteName}`,
    description: `Besoin d'aide ou d'informations ? Contactez l'équipe de ${site.fullSiteName}.`,
    keywords: 'contact, aide, support',
    changefreq: 'monthly',
    priority: 0.5
  },
  {
    path: '/conditions-generales.html',
    view: 'conditions-generales',
    key: 'cgu',
    title: `Conditions Générales d'Utilisation | ${site.fullSiteName}`,
    description: `Consultez les conditions générales d'utilisation du site ${site.fullSiteName}.`,
    keywords: 'CGU, conditions générales, mentions légales',
    changefreq: 'monthly',
    priority: 0.3
  },
  {
    path: '/confidentialite.html',
    view: 'confidentialite',
    key: 'confidentialite',
    title: `Politique de Confidentialité | ${site.fullSiteName}`,
    description: `Votre vie privée est importante. Découvrez comment ${site.fullSiteName} protège vos données.`,
    keywords: 'confidentialité, données personnelles, RGPD',
    changefreq: 'monthly',
    priority: 0.3
  },
  {
    path: '/politique-cookies.html',
    view: 'politique-cookies',
    key: 'cookies',
    title: `Politique relative aux Cookies | ${site.fullSiteName}`,
    description: `Informations sur l'utilisation des cookies sur le site ${site.fullSiteName}.`,
    keywords: 'cookies, traceurs, vie privée',
    changefreq: 'monthly',
    priority: 0.3
  },
  {
    path: '/jeu-responsable.html',
    view: 'jeu-responsable',
    key: 'jeu-responsable',
    title: `Jeu Responsable | ${site.fullSiteName}`,
    description: `Conseils et ressources pour pratiquer le jeu de manière responsable en France.`,
    keywords: 'jeu responsable, addiction, aide, ANJ',
    changefreq: 'monthly',
    priority: 0.8
  }
];

// Routes
PAGES.forEach(page => {
  app.get(page.path, (req, res) => {
    const activeOperators = operators.filter(op => op.active).sort((a, b) => a.rank - b.rank);
    res.render(page.view, {
      site,
      page,
      operators: activeOperators,
      faq,
      today: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    });
  });
});

// Sitemap
app.get('/sitemap.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  PAGES.forEach(page => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>https://${site.domain}${page.path}</loc>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  res.send(sitemap);
});

// robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *\nAllow: /\nSitemap: https://${site.domain}/sitemap.xml`);
});

// 404
app.use((req, res) => {
  res.status(404).render('404', {
    site,
    page: {
      title: `Page Non Trouvée | ${site.fullSiteName}`,
      description: "La page que vous recherchez n'existe pas."
    },
    today: new Date().toLocaleDateString('fr-FR')
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
