/* Pépinière Bochnakian — script.js
   Vanilla JS, no dependencies. Reproduces the interactive behaviors from the
   Design Canvas source (Main.dc.html) DCLogic component:
   - mobile hamburger menu open/close
   - header shadow + scroll-progress bar on scroll
   - .reveal -> .revealed on IntersectionObserver
   - "Cette saison" (season-of-the-month) picker, computed from today's date
   The photo gallery ("La pépinière en photos") is pure CSS animation
   (two rows scrolling in opposite directions) and needs no JavaScript at all.
*/

// Month-by-month planting tips, copied verbatim from Main.dc.html's SEASON_DATA.
const SEASON_DATA = [
  {
    badge: 'Janvier · Hiver',
    intro: "En plein cœur de l'hiver, c'est le moment de préparer et de tailler pour repartir fort au printemps.",
    items: [
      { title: 'Taille des fruitiers', desc: 'La taille hivernale des arbres fruitiers à pépins se fait au repos végétatif, avant le retour de la sève.' },
      { title: 'Rosiers à racines nues', desc: "C'est la meilleure période pour planter les rosiers et arbustes à racines nues, à prix avantageux." },
      { title: 'Protection contre le gel', desc: "Voiles d'hivernage et paillage protègent les plantes les plus sensibles au froid." },
      { title: 'Ail et échalote', desc: "On peut encore mettre en terre l'ail et l'échalote dans les régions les plus douces." },
      { title: 'Entretien des outils', desc: 'Le moment idéal pour affûter, nettoyer et huiler sécateurs et outils avant la reprise.' },
      { title: "Plantes d'intérieur", desc: 'Limitez les arrosages et éloignez les plantes vertes des sources de chaleur trop sèches.' }
    ]
  },
  {
    badge: 'Février · Hiver',
    intro: "La fin d'hiver annonce les premiers semis sous abri et la préparation des massifs.",
    items: [
      { title: 'Semis sous abri', desc: 'Tomates, poivrons et aubergines se sèment au chaud, en godets, pour une avance de saison.' },
      { title: 'Plantation des arbustes', desc: 'Les arbustes en conteneur se plantent par temps hors gel, avant le démarrage de la végétation.' },
      { title: 'Taille de la glycine', desc: "C'est le moment de tailler court les glycines pour favoriser une floraison généreuse." },
      { title: 'Engrais de fond', desc: 'Apportez un engrais organique au pied des massifs pour préparer la reprise du printemps.' },
      { title: 'Division des vivaces', desc: 'Les touffes de vivaces se divisent avant le redémarrage pour multiplier vos plants.' },
      { title: 'Nettoyage du jardin', desc: 'Ramassez feuilles mortes et bois mort pour limiter maladies et parasites au printemps.' }
    ]
  },
  {
    badge: 'Mars · Printemps',
    intro: 'Le jardin se réveille : semis, plantations et premières tontes reprennent leur rythme.',
    items: [
      { title: 'Semis potager', desc: 'Carottes, radis, salades et petits pois se sèment directement en pleine terre.' },
      { title: 'Plantation des vivaces', desc: 'Le sol se réchauffe : idéal pour installer vivaces, graminées et arbustes fleuris.' },
      { title: 'Première tonte', desc: "Relancez la pelouse avec une tonte haute et un léger apport d'engrais gazon." },
      { title: "Bulbes d'été", desc: "Dahlias, glaïeuls et cannas se plantent maintenant pour fleurir tout l'été." },
      { title: 'Taille des rosiers', desc: 'On taille les rosiers avant le débourrement pour une floraison abondante.' },
      { title: 'Traitement préventif', desc: 'Un traitement au savon noir protège les jeunes pousses des premiers pucerons.' }
    ]
  },
  {
    badge: 'Avril · Printemps',
    intro: 'Les plantations méditerranéennes battent leur plein, entre soleil qui revient et sol qui se réchauffe.',
    items: [
      { title: 'Plantes méditerranéennes', desc: 'Lavandes, romarins et agapanthes se plantent en pleine terre dès que les gelées sont passées.' },
      { title: "Potager d'été", desc: 'Courgettes, haricots et aromatiques se sèment ou se repiquent sous abri léger.' },
      { title: 'Jardinières fleuries', desc: "Pétunias, surfinias et géraniums composent de belles jardinières pour tout l'été." },
      { title: 'Paillage', desc: "Un paillage limite l'arrosage et la pousse des mauvaises herbes dès les beaux jours." },
      { title: 'Agrumes en pot', desc: 'Sortez progressivement citronniers et orangers pour les habituer au plein air.' },
      { title: 'Fertilisation', desc: "Un apport de compost ou d'engrais organique relance la croissance des massifs." }
    ]
  },
  {
    badge: 'Mai · Printemps',
    intro: 'Le mois le plus généreux pour planter : tous les risques de gel sont écartés.',
    items: [
      { title: "Tomates & légumes d'été", desc: 'Après les Saints de glace, plantez tomates, poivrons, aubergines et courgettes en pleine terre.' },
      { title: 'Plantes grimpantes', desc: 'Bougainvillées, mandevillas et jasmins se palissent le long de treillages et pergolas.' },
      { title: "Massifs d'été", desc: 'Composez vos massifs avec calibrachoas, verveines et autres vivaces fleuries.' },
      { title: 'Arrosage régulier', desc: "Les températures montent : adaptez la fréquence d'arrosage, de préférence le soir." },
      { title: 'Aromatiques', desc: 'Basilic, thym et menthe se plantent en pleine terre ou en pot près de la cuisine.' },
      { title: 'Traitement bio', desc: 'Surveillez pucerons et limaces avec des solutions naturelles et préventives.' }
    ]
  },
  {
    badge: 'Juin · Été',
    intro: "L'été s'installe : place à l'entretien, à l'arrosage et aux dernières plantations estivales.",
    items: [
      { title: 'Arrosage du soir', desc: "Arrosez tôt le matin ou en soirée pour limiter l'évaporation sous la chaleur." },
      { title: 'Taille des haies', desc: "Une première taille des haies persistantes leur donne une belle forme pour l'été." },
      { title: 'Récolte des légumes', desc: 'Courgettes, tomates cerises et haricots verts démarrent leur récolte.' },
      { title: 'Plantes grasses', desc: 'Cactées et plantes grasses profitent pleinement du soleil, arrosage très limité.' },
      { title: 'Paillage renforcé', desc: "Épaississez le paillis au pied des plantes pour garder l'humidité du sol." },
      { title: 'Fleurs fanées', desc: 'Supprimez les fleurs fanées des rosiers et vivaces pour prolonger la floraison.' }
    ]
  },
  {
    badge: 'Juillet · Été',
    intro: "En plein été méditerranéen, l'arrosage raisonné et l'ombrage sont les priorités du jardin.",
    items: [
      { title: 'Arrosage économe', desc: 'Privilégiez un arrosage profond et espacé plutôt que fréquent et superficiel.' },
      { title: 'Ombrage des jeunes plants', desc: "Protégez les plantations récentes des heures les plus chaudes avec un voile d'ombrage." },
      { title: 'Récolte estivale', desc: 'Tomates, aubergines, poivrons et melons sont à leur pleine saison de récolte.' },
      { title: 'Entretien du bassin', desc: "Surveillez l'évaporation et l'équilibre biologique des points d'eau du jardin." },
      { title: 'Plantes en pot', desc: "Les plantes en pot s'assèchent vite : vérifiez l'humidité du terreau chaque jour." },
      { title: "Préparer l'automne", desc: 'Commandez dès maintenant vos bulbes de printemps pour la plantation d\'automne.' }
    ]
  },
  {
    badge: 'Août · Été',
    intro: "Fin d'été : on prépare doucement la transition vers les plantations d'automne.",
    items: [
      { title: "Semis d'automne", desc: 'Semez dès la fin du mois les salades et légumes qui se récoltent en automne.' },
      { title: 'Bouturage', desc: "C'est la période idéale pour bouturer lauriers, romarins et autres arbustes méditerranéens." },
      { title: 'Taille légère', desc: "Une taille d'entretien légère redonne de la vigueur aux massifs fatigués par la chaleur." },
      { title: 'Récolte des fruits', desc: 'Figues, prunes et premiers raisins sont à surveiller de près pour la récolte.' },
      { title: 'Arrosage maintenu', desc: "Continuez un arrosage régulier, la chaleur reste forte jusqu'à fin de mois." },
      { title: 'Nettoyage estival', desc: 'Retirez les plantes annuelles fatiguées pour préparer les futures plantations.' }
    ]
  },
  {
    badge: 'Septembre · Automne',
    intro: "L'automne est la meilleure saison pour préparer le jardin de demain — nos idées du moment.",
    items: [
      { title: 'Ail, échalote & oignon', desc: "C'est la période idéale pour mettre en terre les bulbes, pour une récolte l'été prochain." },
      { title: 'Arbres & arbustes', desc: "L'automne est la meilleure saison de plantation : le temps de bien s'enraciner avant l'été." },
      { title: 'Bulbes de printemps', desc: 'Narcisses, tulipes et jacinthes se plantent maintenant pour fleurir dès le retour du printemps.' },
      { title: 'Pensées & chrysanthèmes', desc: "Les vedettes de la saison pour fleurir massifs et jardinières jusqu'aux premières gelées." },
      { title: "Salades & légumes d'hiver", desc: 'Mâche, épinard, fèves et petits pois se sèment en ce moment pour l\'hiver.' },
      { title: 'Gazon', desc: "C'est la meilleure période pour semer ou regarnir sa pelouse avant l'hiver." }
    ]
  },
  {
    badge: 'Octobre · Automne',
    intro: "Le sol encore chaud et les pluies qui reviennent font d'octobre un mois idéal pour planter.",
    items: [
      { title: 'Plantation des arbres', desc: 'Octobre est le mois par excellence pour planter arbres et arbustes à racines nues ou en conteneur.' },
      { title: 'Haies persistantes', desc: 'Lauriers, photinias et charmilles se plantent maintenant pour une haie bien installée au printemps.' },
      { title: 'Engazonnement', desc: "Semez ou regarnissez votre pelouse : l'humidité et la douceur favorisent une belle levée." },
      { title: 'Bulbes de printemps', desc: 'Tulipes, narcisses et crocus se plantent tout le mois pour un jardin coloré dès mars.' },
      { title: 'Division des vivaces', desc: 'Profitez de la fraîcheur revenue pour diviser et replanter vos touffes de vivaces.' },
      { title: 'Ramassage des feuilles', desc: 'Récupérez les feuilles mortes pour préparer un compost ou un paillage naturel.' }
    ]
  },
  {
    badge: 'Novembre · Automne',
    intro: "Dernier grand mois de plantation avant l'hiver, pour des racines bien installées au printemps.",
    items: [
      { title: 'Arbres fruitiers', desc: 'Novembre est idéal pour planter les arbres fruitiers à racines nues, en pleine dormance.' },
      { title: 'Oliviers & méditerranéennes', desc: "Les oliviers et arbustes méditerranéens s'installent bien tant que le sol n'est pas gelé." },
      { title: 'Protection hivernale', desc: 'Paillez le pied des plantes sensibles et installez des voiles d\'hivernage si besoin.' },
      { title: 'Ail & échalote', desc: "Dernière ligne droite pour mettre en terre l'ail, l'échalote et l'oignon blanc." },
      { title: 'Taille des arbustes défleuris', desc: 'Une taille légère des arbustes à floraison estivale les prépare pour la reprise.' },
      { title: 'Rangement du jardin', desc: "Videz et nettoyez les pots avant l'hiver pour éviter maladies et parasites." }
    ]
  },
  {
    badge: 'Décembre · Hiver',
    intro: "L'activité ralentit dehors, mais c'est le bon moment pour planifier et protéger le jardin.",
    items: [
      { title: 'Protection contre le gel', desc: "Voiles d'hivernage, paillage épais et rentrée des plantes fragiles en pot." },
      { title: 'Plantation hors gel', desc: 'Par temps doux, arbres et arbustes à racines nues peuvent encore se planter.' },
      { title: 'Taille de structure', desc: 'La taille de structure des arbres fruitiers se fait pendant le repos végétatif.' },
      { title: 'Décoration végétale', desc: 'Houx, sapins et compositions de fêtes pour une décoration naturelle et locale.' },
      { title: 'Entretien du matériel', desc: 'Profitez de l\'hiver pour réviser tondeuse, taille-haie et outillage de jardin.' },
      { title: 'Préparer le printemps', desc: 'C\'est le moment de planifier vos futures plantations et de commander vos graines.' }
    ]
  }
];

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile hamburger menu ---------- */
  (function initMobileMenu() {
    const btn = document.getElementById('hamburger-btn');
    const panel = document.getElementById('mobile-panel');
    const barTop = document.getElementById('bar-top');
    const barMid = document.getElementById('bar-mid');
    const barBot = document.getElementById('bar-bot');
    if (!btn || !panel) return;

    let open = false;

    function render() {
      panel.style.display = open ? 'flex' : 'none';
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (barTop) barTop.style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
      if (barMid) barMid.style.opacity = open ? '0' : '';
      if (barBot) barBot.style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
    }

    btn.addEventListener('click', function () {
      open = !open;
      render();
    });

    // Close the menu when a link inside it is clicked
    panel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        open = false;
        render();
      });
    });

    render();
  })();

  /* ---------- Header shadow + scroll-progress bar ---------- */
  (function initScrollEffects() {
    const header = document.getElementById('site-header');
    const bar = document.getElementById('scroll-progress');

    function onScroll() {
      const y = window.scrollY || document.documentElement.scrollTop;
      if (header) {
        if (y > 24) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      }
      if (bar) {
        const max = (document.documentElement.scrollHeight || 1) - window.innerHeight;
        const pct = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
        bar.style.width = pct + '%';
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  /* ---------- Scroll-reveal animations (.reveal -> .revealed) ---------- */
  (function initReveal() {
    try {
      const els = document.querySelectorAll('.reveal');
      const obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      els.forEach(function (el) { obs.observe(el); });
    } catch (e) {
      // IntersectionObserver unsupported: reveal everything immediately
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('revealed');
      });
    }
  })();

  /* ---------- "Cette saison" (season-of-the-month) picker ---------- */
  (function initSeasonPicker() {
    const badgeEl = document.getElementById('season-badge');
    const introEl = document.getElementById('season-intro');
    const itemsEl = document.getElementById('season-items');
    if (!badgeEl || !introEl || !itemsEl) return;

    const monthIndex = new Date().getMonth(); // 0 = janvier ... 11 = décembre
    const season = SEASON_DATA[monthIndex];
    if (!season) return;

    badgeEl.textContent = season.badge;
    introEl.textContent = season.intro;

    itemsEl.innerHTML = season.items.map(function (item, i) {
      const staggerClass = 'stagger-' + (i + 1);
      return (
        '<div class="reveal ' + staggerClass + '" style="background: rgba(246,241,231,0.08); border: 1px solid rgba(246,241,231,0.14); border-radius: 12px; padding: 14px 16px;">' +
        '<h3 style="font-family: \'Bricolage Grotesque\', sans-serif; font-size: 13.5px; font-weight: 600; margin: 0 0 4px;">' + item.title + '</h3>' +
        '<p style="font-size: 12px; opacity: 0.8; line-height: 1.45; margin: 0;">' + item.desc + '</p>' +
        '</div>'
      );
    }).join('');

    // Re-observe the freshly injected .reveal items so they animate in too
    try {
      const obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      itemsEl.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
    } catch (e) {
      itemsEl.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('revealed'); });
    }
  })();

  /* ---------- Contact form ----------
     The source design has no backend wiring beyond a plain <form> with a
     submit button — there is no fetch/AJAX call in the DCLogic component to
     replicate. Left as a normal HTML form; wire it up to a real form
     endpoint (e.g. Formspree, Netlify Forms, or a custom backend) when one
     is available. */

});
