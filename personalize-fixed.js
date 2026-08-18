(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function el(tag, options = {}, children = []) {
    const node = document.createElement(tag);
    if (options.className) node.className = options.className;
    if (options.text !== undefined) node.textContent = String(options.text);
    if (options.href) node.href = options.href;
    if (options.target) node.target = options.target;
    if (options.rel) node.rel = options.rel;
    if (options.type) node.type = options.type;
    if (options.dataset) Object.assign(node.dataset, options.dataset);
    (Array.isArray(children) ? children : [children]).filter(Boolean).forEach((child) => node.append(child));
    return node;
  }

  function tags(values) {
    const wrap = el('div', { className: 'tech-tags' });
    values.forEach((value) => wrap.append(el('span', { className: 'tag', text: value })));
    return wrap;
  }

  function skillBox(iconClass, title, values, highlight = false) {
    const box = el('div', { className: `skill-box${highlight ? ' highlight-box' : ''}` });
    const header = el('div', { className: 'skill-box-header' });
    header.append(el('i', { className: `${iconClass} skill-icon-large` }), el('h3', { className: 'skill-box-title', text: title }));
    box.append(header, tags(values));
    return box;
  }

  function projectCard(key, iconClass, title, category, description, gameLabel, repo) {
    const card = el('div', { className: 'creator-item experience-project-card', dataset: { projectCard: key } });
    const status = el('div', { className: 'project-status-strip' }, [
      el('span', { text: category }),
      el('span', { className: 'project-signal', text: 'BUILDING' })
    ]);
    const titleButton = el('button', { className: 'creator-project project-title-button', type: 'button', dataset: { projectOverview: key } });
    titleButton.append(el('span', { className: 'creator-name' }, [el('i', { className: iconClass }), document.createTextNode(` ${title}`)]));
    const descriptionNode = el('p', { className: 'creator-tagline', text: description });
    const actions = el('div', { className: 'project-experience-actions' });
    const play = el('button', { className: 'experience-button', type: 'button', text: gameLabel, dataset: { openProject: key } });
    const code = el('a', { className: 'creator-github', text: 'CODE ↗', href: repo, target: '_blank', rel: 'noreferrer' });
    actions.append(play, code);
    card.append(status, titleButton, descriptionNode, actions);
    return card;
  }

  function updateMeta() {
    document.title = 'El Yazid Hammoubel | Software Engineering Student | Full-Stack & Systems';
    const description = $('meta[name="description"]');
    if (description) description.content = 'Engineering student at ENSA Kénitra building backend, full-stack and systems projects with Python, C, JavaScript, TypeScript, SQL, React, Node.js and PostgreSQL.';
    const keywords = $('meta[name="keywords"]');
    if (keywords) keywords.content = 'El Yazid Hammoubel, software engineering, Python, C, JavaScript, TypeScript, SQL, HTML, CSS, Node.js, Express, React, PostgreSQL, Linux, networks, ENSA Kenitra';
  }

  function personalize() {
    document.body.classList.add('experience-personalized');
    updateMeta();
    $('#awwwards')?.remove();

    $$('a[href="https://github.com/hammoubelyazid"]').forEach((link) => {
      link.href = 'https://github.com/MrGray17';
    });

    const heroDescription = $('.hero-description');
    if (heroDescription) heroDescription.textContent = "I'm an engineering student at ENSA Kénitra who learns by building. I care about what sits underneath the abstraction — APIs, databases, networks, runtimes and the trade-offs that make software hold up in the real world.";

    const decoLabel = $('.deco-label');
    if (decoLabel) decoLabel.textContent = 'BUILD • BREAK • UNDERSTAND';

    const heroBadges = $('.hero > .tech-badges');
    if (heroBadges) {
      heroBadges.replaceChildren();
      ['Python', 'C', 'JavaScript', 'TypeScript', 'SQL', 'HTML / CSS', 'Node.js', 'Express', 'React', 'PostgreSQL', 'Git / GitHub', 'Linux', 'Networks'].forEach((name) => {
        heroBadges.append(el('span', { className: 'tech-badge', text: name }));
      });
    }

    const aboutCard = $('#about .card');
    if (aboutCard && !aboutCard.querySelector('[data-real-work-note]')) {
      const note = el('p', { className: 'text', text: "One rule for this site: if I can't explain something in an interview, it doesn't belong here. The work below is meant to be inspected, played with, and questioned." });
      note.dataset.realWorkNote = 'true';
      aboutCard.append(note);
    }

    const exp1Description = $('#exp-1 .timeline-description');
    if (exp1Description) exp1Description.textContent = 'Engineering program spanning networks, telecommunications, databases, algorithms, systems and software engineering.';

    const exp2 = $('#exp-2 .timeline-content-flat');
    if (exp2) {
      exp2.replaceChildren(
        el('h4', { className: 'timeline-title', text: 'Engineering Internship @ Atos' }),
        el('p', { className: 'timeline-date', text: '2026' }),
        el('p', { className: 'timeline-description', text: 'Worked on automation around a Maroc Telecom Jira workflow, including an AI-assisted component using Llama 3 and PostgreSQL-backed data handling.' }),
        el('p', { className: 'timeline-location', text: 'Morocco' })
      );
    }

    const exp3 = $('#exp-3 .timeline-content-flat');
    if (exp3) {
      exp3.replaceChildren(
        el('h4', { className: 'timeline-title', text: 'Building — Rate Limiter · Maw3id · OpenToken' }),
        el('p', { className: 'timeline-date', text: '2026 - Present' }),
        el('p', { className: 'timeline-description', text: 'Turning theory into real engineering output across backend systems, a full-stack clinic product, testing, databases and AI tooling.' }),
        el('p', { className: 'timeline-location', text: 'Morocco' })
      );
    }

    $('.map-pirate-overlay')?.remove();

    const skillsGrid = $('.skills-grid-modern');
    if (skillsGrid) {
      skillsGrid.replaceChildren(
        skillBox('fas fa-code', 'Languages', ['Python', 'C', 'JavaScript', 'TypeScript', 'SQL', 'HTML', 'CSS']),
        skillBox('fas fa-server', 'Web & Backend', ['Node.js', 'Express', 'React', 'HTTP / REST', 'Testing']),
        skillBox('fas fa-database', 'Data', ['PostgreSQL', 'Relational Databases', 'Database Design', 'SQL']),
        skillBox('fas fa-network-wired', 'Systems & Networks', ['Linux', 'Networks', 'TCP/IP Fundamentals', 'CLI']),
        skillBox('fas fa-tools', 'Tools', ['Git / GitHub', 'npm', 'Vite', 'Jira', 'VS Code']),
        skillBox('fas fa-arrow-trend-up', 'Engineering Focus', ['Backend Systems', 'Distributed Systems', 'System Design', 'AI Systems'], true)
      );
    }

    const showcase = $('#projects .creator-showcase');
    if (showcase) {
      showcase.replaceChildren();
      showcase.append(el('p', { className: 'creator-label', text: 'THREE BUILDS. THREE PROBLEMS. PLAY THEM.' }));
      const grid = el('div', { className: 'creator-projects-grid experience-project-grid' });
      grid.append(
        projectCard('rate-limiter', 'fas fa-gauge-high', 'Rate Limiter', 'BACKEND SYSTEMS', 'A TypeScript + Node.js rate limiter built from first principles. Fixed-window limiting, HTTP integration and tests today; more algorithms, distributed state and benchmarking next.', 'PLAY PACKET PANIC', 'https://github.com/MrGray17/rate-limiter'),
        projectCard('maw3id', 'fas fa-hospital-user', 'Maw3id', 'FULL-STACK PRODUCT', 'A clinic queue platform built around how Moroccan clinics actually operate: appointments, walk-ins, one live queue and nearby-doctor discovery. React + TypeScript, Express and PostgreSQL.', 'PLAY QUEUE CHAOS', 'https://github.com/MrGray17/Maw3id'),
        projectCard('opentoken', 'fas fa-compress-alt', 'OpenToken', 'AI TOOLING', 'Open-source TypeScript/Bun tooling exploring token compression for AI workflows, with automated type checking, linting and tests. Benchmarks decide the claims.', 'PLAY CONTEXT CRUNCH', 'https://github.com/MrGray17/opentoken')
      );
      showcase.append(grid);
    }

    const contactIntro = $('.contact-intro');
    if (contactIntro) contactIntro.textContent = 'Open to software engineering internships, collaborations, and conversations about building interesting systems.';

    const footerRole = $('.footer-brand-compact span');
    if (footerRole) footerRole.textContent = 'Software Engineering Student | Full-Stack • Backend • Systems';

    const journeyMap = $('#journey-map');
    if (journeyMap) {
      const rewritePopup = () => {
        const popup = journeyMap.querySelector('.map-popup');
        if (!popup) return;
        popup.replaceChildren();
        popup.append(el('div', { className: 'map-popup-country', text: 'Morocco' }));
        const entries = [
          ['ENSA Kénitra', 'Cycle Ingénieur — Réseaux & Télécoms', 'Kenitra', '2025 - Present'],
          ['Atos', 'Engineering Internship — Maroc Telecom Jira Automation', 'Morocco', '2026'],
          ['Rate Limiter · Maw3id · OpenToken', 'Independent Software Projects', 'Morocco', '2026 - Present']
        ];
        entries.forEach(([name, role, city, period], index) => {
          if (index > 0) popup.append(el('div', { className: 'map-popup-divider' }));
          popup.append(el('div', { className: 'map-popup-company' }, [
            el('strong', { text: name }),
            el('span', { text: role }),
            el('small', { text: city }),
            el('small', { text: period })
          ]));
        });
      };
      new MutationObserver(rewritePopup).observe(journeyMap, { childList: true, subtree: true });
      rewritePopup();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', personalize, { once: true });
  else personalize();
})();