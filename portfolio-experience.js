(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function node(tag, options = {}, children = []) {
    const el = document.createElement(tag);
    if (options.className) el.className = options.className;
    if (options.text !== undefined) el.textContent = options.text;
    if (options.href) el.href = options.href;
    if (options.target) el.target = options.target;
    if (options.type) el.type = options.type;
    if (options.title) el.title = options.title;
    if (options.dataset) Object.assign(el.dataset, options.dataset);
    if (options.attrs) Object.entries(options.attrs).forEach(([key, value]) => el.setAttribute(key, value));
    const list = Array.isArray(children) ? children : [children];
    list.filter(Boolean).forEach((child) => el.append(child));
    return el;
  }

  const PROJECTS = {
    'rate-limiter': {
      title: 'Rate Limiter',
      category: 'BACKEND SYSTEMS',
      game: 'PACKET PANIC',
      repo: 'https://github.com/MrGray17/rate-limiter',
      description: 'A TypeScript + Node.js rate limiter built from first principles. The current implementation covers fixed-window limiting, HTTP integration and tests, with more algorithms, distributed state and benchmarks planned.',
      overview: 'Rate limiting is traffic control for APIs. A limiter tracks how much traffic a client is sending and decides whether the next request should pass or be rejected before one noisy client can consume the whole service.',
      architecture: [
        'Identify the request by a key such as a user ID, API token or IP address.',
        'Track request state for that key inside a time window.',
        'Allow or reject the request based on the configured policy.',
        'Extend the same idea to multiple algorithms, distributed state and benchmarking.'
      ]
    },
    maw3id: {
      title: 'Maw3id',
      category: 'FULL-STACK PRODUCT',
      game: 'QUEUE CHAOS',
      repo: 'https://github.com/MrGray17/Maw3id',
      description: 'A clinic queue and appointment platform for Morocco using React + TypeScript, Express and PostgreSQL, with nearby-doctor discovery and real clinic-flow constraints.',
      overview: 'Maw3id is about turning a messy real-world clinic day into a visible operational queue: appointments, walk-ins, late arrivals, no-shows and nearby alternatives all need to coexist without forcing reception to juggle everything mentally.',
      architecture: [
        'React + TypeScript frontend for patient and clinic workflows.',
        'Express API for appointments, queues and clinic operations.',
        'PostgreSQL for durable relational data.',
        'Map-based discovery for nearby doctors and lower-wait alternatives.'
      ]
    },
    opentoken: {
      title: 'OpenToken',
      category: 'AI TOOLING',
      game: 'CONTEXT CRUNCH',
      repo: 'https://github.com/MrGray17/opentoken',
      description: 'An experimental TypeScript/Bun project exploring token compression for AI workflows. The goal is measurable: reduce repeated representation without destroying information the model still needs.',
      overview: 'AI workflows often repeat tool schemas, JSON structures, logs and context. OpenToken explores how much of that representation can be compressed while preserving the information that actually matters downstream.',
      architecture: [
        'Accept structured or repeated context from an AI workflow.',
        'Detect repetition or compressible structure.',
        'Reduce representation cost while preserving useful information.',
        'Evaluate the result with tests and benchmarks instead of relying on headline claims.'
      ]
    }
  };

  personalizePortfolio();
  const experience = new ProjectExperience();
  window.yazidProjectExperience = experience;

  function personalizePortfolio() {
    document.body.classList.add('experience-personalized');

    $('#awwwards')?.remove();

    $$('a[href="https://github.com/hammoubelyazid"]').forEach((link) => {
      link.href = 'https://github.com/MrGray17';
    });

    const description = $('.hero-description');
    if (description) {
      description.textContent = "I'm an engineering student at ENSA Kénitra who learns by building. I care about APIs, databases, networks, runtimes, systems and the trade-offs that make software hold up in the real world.";
    }

    const label = $('.deco-label');
    if (label) label.textContent = 'BUILD • BREAK • UNDERSTAND';

    const badges = $('.hero > .tech-badges');
    if (badges) {
      badges.replaceChildren();
      [
        'Python', 'C', 'JavaScript', 'TypeScript', 'SQL', 'HTML / CSS',
        'Node.js', 'Express', 'React', 'PostgreSQL', 'Git / GitHub', 'Linux', 'Networks'
      ].forEach((skill) => badges.append(node('span', { className: 'tech-badge', text: skill })));
    }

    const aboutCard = $('#about .card');
    if (aboutCard && !aboutCard.querySelector('[data-real-work-note]')) {
      const p = node('p', { className: 'text', text: "One rule for this site: if I can't explain it in an interview, it doesn't belong here. The work below is here to be inspected, played with and questioned." });
      p.dataset.realWorkNote = 'true';
      aboutCard.append(p);
    }

    replaceTimelineItem('exp-1', {
      title: 'Cycle Ingénieur — Réseaux & Télécoms @ ENSA Kénitra',
      date: '2025 - Present',
      description: 'Engineering program spanning networks, telecommunications, databases, algorithms, systems and software engineering.',
      location: 'Kenitra, Morocco'
    });

    replaceTimelineItem('exp-2', {
      title: 'Engineering Internship @ Atos',
      date: '2026',
      description: 'Worked on automation around a Maroc Telecom Jira workflow, including an AI-assisted component using Llama 3 and PostgreSQL-backed data handling.',
      location: 'Morocco'
    });

    replaceTimelineItem('exp-3', {
      title: 'Building — Rate Limiter · Maw3id · OpenToken',
      date: '2026 - Present',
      description: 'Turning systems and software theory into real engineering output across backend infrastructure, a full-stack clinic product and AI tooling.',
      location: 'Morocco'
    });

    const portrait = $('.map-pirate-overlay');
    if (portrait) {
      portrait.src = 'image/img3.jpg';
      portrait.alt = 'El Yazid Hammoubel';
      portrait.classList.add('map-profile-overlay');
    }

    personalizeMapPopup();
    rebuildSkills();
    rebuildProjects();

    const contactIntro = $('.contact-intro');
    if (contactIntro) {
      contactIntro.textContent = 'Open to software engineering internships, collaborations and interesting engineering conversations.';
    }

    const footerRole = $('.footer-brand-compact span');
    if (footerRole) footerRole.textContent = 'Software Engineer | Full-Stack & Systems';
  }

  function replaceTimelineItem(id, data) {
    const item = document.getElementById(id);
    if (!item) return;
    item.replaceChildren();
    item.append(node('div', { className: 'timeline-dot' }));
    const content = node('div', { className: 'timeline-content-flat' });
    content.append(
      node('h4', { className: 'timeline-title', text: data.title }),
      node('p', { className: 'timeline-date', text: data.date }),
      node('p', { className: 'timeline-description', text: data.description }),
      node('p', { className: 'timeline-location', text: data.location })
    );
    item.append(content);
  }

  function personalizeMapPopup() {
    const map = document.getElementById('journey-map');
    if (!map) return;

    const rewrite = () => {
      const popup = map.querySelector('.map-popup');
      if (!popup || popup.dataset.personalized === 'true') return;
      popup.dataset.personalized = 'true';
      popup.replaceChildren(
        popupCompany('ENSA Kénitra', 'Cycle Ingénieur — Réseaux & Télécoms', 'Kenitra', '2025 - Present'),
        node('div', { className: 'map-popup-divider' }),
        popupCompany('Atos', 'Engineering Internship — Maroc Telecom Jira Automation', 'Morocco', '2026'),
        node('div', { className: 'map-popup-divider' }),
        popupCompany('Rate Limiter · Maw3id · OpenToken', 'Independent software projects', 'Morocco', '2026 - Present')
      );
    };

    new MutationObserver(rewrite).observe(map, { childList: true, subtree: true });
    rewrite();
  }

  function popupCompany(company, role, city, period) {
    const wrap = node('div', { className: 'map-popup-company' });
    wrap.append(
      node('strong', { text: company }),
      node('span', { text: role }),
      node('small', { text: city }),
      node('small', { text: period })
    );
    return wrap;
  }

  function rebuildSkills() {
    const grid = $('.skills-grid-modern');
    if (!grid) return;
    grid.replaceChildren(
      skillBox('Languages', ['Python', 'C', 'JavaScript', 'TypeScript', 'SQL']),
      skillBox('Web', ['HTML', 'CSS', 'React', 'Node.js', 'Express']),
      skillBox('Data', ['PostgreSQL', 'SQL', 'Relational databases']),
      skillBox('Systems', ['Linux', 'Networks', 'TCP/IP', 'HTTP / REST']),
      skillBox('Tools', ['Git', 'GitHub', 'npm', 'Vite', 'Jira'])
    );
  }

  function skillBox(title, skills) {
    const box = node('div', { className: 'skill-box fade-in' });
    const header = node('div', { className: 'skill-box-header' }, node('h3', { className: 'skill-box-title', text: title }));
    const tags = node('div', { className: 'tech-tags' });
    skills.forEach((skill) => tags.append(node('span', { className: 'tag', text: skill })));
    box.append(header, tags);
    return box;
  }

  function rebuildProjects() {
    const showcase = $('#projects .creator-showcase');
    if (!showcase) return;
    showcase.replaceChildren();
    showcase.append(node('p', { className: 'creator-label', text: 'THREE BUILDS. THREE PROBLEMS. PLAY THEM.' }));
    const grid = node('div', { className: 'creator-projects-grid experience-project-grid' });
    Object.entries(PROJECTS).forEach(([key, project]) => grid.append(projectCard(key, project)));
    showcase.append(grid);
  }

  function projectCard(key, project) {
    const card = node('div', { className: 'creator-item experience-project-card' });
    const strip = node('div', { className: 'project-status-strip' }, [
      node('span', { text: project.category }),
      node('span', { className: 'project-signal', text: 'BUILDING' })
    ]);
    const titleButton = node('button', { className: 'project-title-button', type: 'button' });
    titleButton.append(node('span', { className: 'creator-name', text: project.title }));
    titleButton.addEventListener('click', () => window.yazidProjectExperience?.open(key, 'overview'));

    const description = node('p', { className: 'creator-tagline', text: project.description });
    const actions = node('div', { className: 'project-experience-actions' });
    const play = node('button', { className: 'experience-button', type: 'button', text: `PLAY ${project.game}` });
    play.addEventListener('click', () => window.yazidProjectExperience?.open(key, 'play'));
    const code = node('a', { className: 'creator-github', text: 'CODE ↗', href: project.repo, target: '_blank', attrs: { rel: 'noreferrer' } });
    actions.append(play, code);
    card.append(strip, titleButton, description, actions);
    return card;
  }

  class ProjectExperience {
    constructor() {
      this.current = null;
      this.progress = this.loadProgress();
      this.mount();
      this.renderProgress();
    }

    mount() {
      this.root = node('div', { className: 'project-experience-modal', attrs: { 'aria-hidden': 'true' } });
      const backdrop = node('button', { className: 'experience-backdrop', type: 'button', attrs: { 'aria-label': 'Close project experience' } });
      backdrop.addEventListener('click', () => this.close());

      this.window = node('section', { className: 'experience-window', attrs: { role: 'dialog', 'aria-modal': 'true' } });
      const head = node('div', { className: 'experience-window-head' });
      const titleWrap = node('div');
      this.kicker = node('small');
      this.title = node('h2');
      titleWrap.append(this.kicker, this.title);
      const close = node('button', { className: 'experience-close', type: 'button', text: '×', attrs: { 'aria-label': 'Close' } });
      close.addEventListener('click', () => this.close());
      head.append(titleWrap, close);

      this.tabs = node('div', { className: 'experience-tabs' });
      ['overview', 'play', 'architecture', 'code'].forEach((tab) => {
        const button = node('button', { type: 'button', text: tab.toUpperCase(), dataset: { tab } });
        button.addEventListener('click', () => this.showTab(tab));
        this.tabs.append(button);
      });

      this.stage = node('div', { className: 'experience-stage' });
      this.window.append(head, this.tabs, this.stage);
      this.root.append(backdrop, this.window);
      document.body.append(this.root);

      this.progressBadge = node('button', { className: 'experience-progress-badge', type: 'button' });
      this.progressBadge.addEventListener('click', () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }));
      document.body.append(this.progressBadge);

      this.toast = node('div', { className: 'experience-achievement' }, [
        node('strong', { text: 'RECRUITER% SPEEDRUN COMPLETE' }),
        node('span', { text: 'You solved all three systems.' })
      ]);
      document.body.append(this.toast);

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && this.root.classList.contains('is-open')) this.close();
      });
    }

    open(key, tab = 'overview') {
      const project = PROJECTS[key];
      if (!project) return;
      this.current = key;
      this.kicker.textContent = `${project.category} / ${project.game}`;
      this.title.textContent = project.title;
      this.root.classList.add('is-open');
      this.root.setAttribute('aria-hidden', 'false');
      document.body.classList.add('experience-open');
      this.showTab(tab);
    }

    close() {
      this.root.classList.remove('is-open');
      this.root.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('experience-open');
      this.stage.replaceChildren();
    }

    showTab(tab) {
      if (!this.current) return;
      $$('button[data-tab]', this.tabs).forEach((button) => button.classList.toggle('is-active', button.dataset.tab === tab));
      if (tab === 'overview') this.renderOverview();
      else if (tab === 'architecture') this.renderArchitecture();
      else if (tab === 'code') this.renderCode();
      else this.renderGame();
    }

    renderOverview() {
      const project = PROJECTS[this.current];
      const wrap = node('div', { className: 'experience-copy' });
      wrap.append(
        node('span', { className: 'experience-sticker', text: 'WHY IT EXISTS' }),
        node('h3', { text: `${project.title} in plain English` }),
        node('p', { text: project.overview })
      );
      const play = node('button', { className: 'game-primary', type: 'button', text: `PLAY ${project.game} →` });
      play.addEventListener('click', () => this.showTab('play'));
      wrap.append(play);
      this.stage.replaceChildren(wrap);
    }

    renderArchitecture() {
      const project = PROJECTS[this.current];
      const wrap = node('div', { className: 'experience-copy' });
      wrap.append(node('span', { className: 'experience-sticker', text: 'UNDER THE HOOD' }), node('h3', { text: 'How the system fits together' }));
      const stack = node('div', { className: 'architecture-stack' });
      project.architecture.forEach((item, index) => {
        stack.append(node('div', { className: 'architecture-row' }, [
          node('span', { text: String(index + 1).padStart(2, '0') }),
          node('p', { text: item })
        ]));
      });
      wrap.append(stack);
      this.stage.replaceChildren(wrap);
    }

    renderCode() {
      const project = PROJECTS[this.current];
      const wrap = node('div', { className: 'experience-copy code-door' });
      wrap.append(
        node('span', { className: 'experience-sticker', text: 'THE REPOSITORY IS THE EVIDENCE' }),
        node('h3', { text: 'Inspect the real code.' }),
        node('p', { text: 'The game explains the problem. GitHub shows what I actually built.' }),
        node('a', { className: 'game-primary game-link', text: 'OPEN GITHUB ↗', href: project.repo, target: '_blank', attrs: { rel: 'noreferrer' } })
      );
      this.stage.replaceChildren(wrap);
    }

    renderGame() {
      if (this.current === 'rate-limiter') this.packetPanic();
      else if (this.current === 'maw3id') this.queueChaos();
      else this.contextCrunch();
    }

    packetPanic() {
      const clients = [
        ['Student app', 2, '🙂'], ['Mobile client', 4, '📱'], ['API client', 5, '🧑‍💻'],
        ['Scraper', 10, '🤖'], ['Bot burst', 16, '⚡'], ['Normal user', 3, '🙂']
      ];
      let round = 0;
      let score = 0;
      let server = 100;

      const render = () => {
        if (round >= clients.length) return finish();
        const [name, rate, icon] = clients[round];
        const shell = gameShell('PACKET PANIC', 'Policy: maximum 5 requests / second. Protect the server without blocking legitimate traffic.');
        shell.append(hud([['SERVER', `${server}%`], ['SCORE', score], ['ROUND', `${round + 1}/${clients.length}`]]));
        const card = node('div', { className: 'game-card traffic-card' });
        card.append(node('div', { className: 'game-emoji', text: icon }), node('strong', { text: name }), node('p', { text: `${rate} requests / second` }));
        const actions = node('div', { className: 'game-actions' });
        const allow = node('button', { type: 'button', text: 'ALLOW' });
        const limit = node('button', { type: 'button', text: 'RATE LIMIT', className: 'danger' });
        allow.addEventListener('click', () => choose(false));
        limit.addEventListener('click', () => choose(true));
        actions.append(allow, limit);
        card.append(actions);
        shell.append(card);
        this.stage.replaceChildren(shell);
      };

      const choose = (limited) => {
        const rate = clients[round][1];
        const shouldLimit = rate > 5;
        if (limited === shouldLimit) score += 20;
        else {
          score -= 10;
          if (!limited && shouldLimit) server = Math.max(0, server - Math.round(rate * 2.5));
        }
        round += 1;
        render();
      };

      const finish = () => {
        const won = score >= 80 && server >= 50;
        if (won) this.markWin('rate-limiter');
        this.showResult(won, won ? 'SERVER SURVIVED' : 'SERVER MELTDOWN', [
          ['Score', score], ['Server', `${server}%`], ['Policy', '5 req/s']
        ], () => this.packetPanic());
      };

      render();
    }

    queueChaos() {
      let patients = [
        { name: 'Amina', kind: 'Appointment', wait: 8, priority: 2 },
        { name: 'Youssef', kind: 'Walk-in', wait: 27, priority: 4 },
        { name: 'Salma', kind: 'Appointment', wait: 19, priority: 3 },
        { name: 'Hassan', kind: 'Walk-in', wait: 41, priority: 5 }
      ];
      let score = 0;
      let seen = 0;
      let redirected = 0;
      let round = 0;

      const render = () => {
        if (!patients.length || round >= 4) return finish();
        const nearby = 12 + round * 2;
        const shell = gameShell('QUEUE CHAOS', `Nearby doctor wait: ${nearby} min. Call the best next patient, or redirect someone only when it really saves time.`);
        shell.append(hud([['SCORE', score], ['SEEN', seen], ['REDIRECTED', redirected]]));
        const list = node('div', { className: 'queue-list' });
        patients.forEach((patient, index) => {
          const card = node('div', { className: 'game-card patient-card' });
          const info = node('div');
          info.append(node('strong', { text: patient.name }), node('p', { text: `${patient.kind} · waited ${patient.wait} min` }));
          const actions = node('div', { className: 'game-actions' });
          const call = node('button', { type: 'button', text: 'CALL' });
          const redirect = node('button', { type: 'button', text: 'REDIRECT', className: 'danger' });
          call.addEventListener('click', () => choose(index, false));
          redirect.addEventListener('click', () => choose(index, true));
          actions.append(call, redirect);
          card.append(info, actions);
          list.append(card);
        });
        shell.append(list);
        this.stage.replaceChildren(shell);
      };

      const choose = (index, redirect) => {
        const patient = patients[index];
        const nearby = 12 + round * 2;
        if (redirect) {
          const useful = patient.wait >= 30 && nearby + 8 < patient.wait;
          score += useful ? 25 : -15;
          redirected += 1;
        } else {
          const maxPriority = Math.max(...patients.map((p) => p.priority));
          score += patient.priority === maxPriority ? 25 : -10;
          seen += 1;
        }
        patients.splice(index, 1);
        patients = patients.map((p) => ({ ...p, wait: p.wait + 9 }));
        round += 1;
        render();
      };

      const finish = () => {
        const won = score >= 55;
        if (won) this.markWin('maw3id');
        this.showResult(won, won ? 'CLINIC FLOWING' : 'WAITING ROOM CHAOS', [
          ['Score', score], ['Seen', seen], ['Redirected', redirected]
        ], () => this.queueChaos());
      };

      render();
    }

    contextCrunch() {
      const chunks = [
        { name: 'Tool schema', tokens: 280, redundancy: 0.85 },
        { name: 'User instruction', tokens: 120, redundancy: 0.10 },
        { name: 'Repeated logs', tokens: 260, redundancy: 0.90 },
        { name: 'JSON payload', tokens: 230, redundancy: 0.65 },
        { name: 'System rules', tokens: 180, redundancy: 0.15 }
      ];
      const capacity = 760;
      let round = 0;
      let used = 0;
      let integrity = 100;
      let saved = 0;
      let score = 0;

      const render = () => {
        if (round >= chunks.length) return finish();
        const chunk = chunks[round];
        const shell = gameShell('CONTEXT CRUNCH', `Context capacity: ${capacity} tokens. Compress repeated structure, but do not destroy unique instructions.`);
        shell.append(hud([['CONTEXT', `${used}/${capacity}`], ['INTEGRITY', `${integrity}%`], ['SAVED', saved]]));
        const card = node('div', { className: 'game-card token-card' });
        card.append(
          node('small', { text: `CHUNK ${round + 1}/${chunks.length}` }),
          node('h4', { text: chunk.name }),
          node('strong', { text: `${chunk.tokens} TOKENS` }),
          node('p', { text: `Structural redundancy: ${Math.round(chunk.redundancy * 100)}%` })
        );
        const actions = node('div', { className: 'game-actions' });
        [['KEEP', 'keep'], ['SAFE COMPRESS', 'safe'], ['HARD COMPRESS', 'hard']].forEach(([label, mode]) => {
          const button = node('button', { type: 'button', text: label, className: mode === 'hard' ? 'danger' : '' });
          button.addEventListener('click', () => choose(mode));
          actions.append(button);
        });
        card.append(actions);
        shell.append(card);
        this.stage.replaceChildren(shell);
      };

      const choose = (mode) => {
        const chunk = chunks[round];
        let finalTokens = chunk.tokens;
        let loss = 0;
        if (mode === 'safe') finalTokens = Math.round(chunk.tokens * (1 - (0.12 + chunk.redundancy * 0.28)));
        if (mode === 'hard') {
          finalTokens = Math.round(chunk.tokens * (1 - Math.min(0.78, 0.35 + chunk.redundancy * 0.43)));
          if (chunk.redundancy < 0.5) loss = Math.ceil((0.5 - chunk.redundancy) * 25);
        }
        if (mode === 'keep' && chunk.redundancy > 0.7) score -= 5;
        else if (mode === 'hard' && loss === 0) score += 25;
        else if (mode === 'safe') score += 18;
        else score += 8;

        used += finalTokens;
        saved += chunk.tokens - finalTokens;
        integrity = Math.max(0, integrity - loss);
        round += 1;
        render();
      };

      const finish = () => {
        const won = used <= capacity && integrity >= 90;
        if (won) this.markWin('opentoken');
        this.showResult(won, won ? 'CONTEXT SAVED' : 'CONTEXT FAILED', [
          ['Tokens', used], ['Saved', saved], ['Integrity', `${integrity}%`], ['Score', score]
        ], () => this.contextCrunch());
      };

      render();
    }

    showResult(won, title, values, replay) {
      const wrap = node('div', { className: `game-result ${won ? 'is-win' : 'is-loss'}` });
      wrap.append(node('span', { className: 'experience-sticker', text: won ? 'SYSTEM STABLE' : 'SYSTEM FAILED' }), node('h3', { text: title }));
      const grid = node('div', { className: 'result-grid' });
      values.forEach(([label, value]) => {
        grid.append(node('div', {}, [node('span', { text: label }), node('strong', { text: String(value) })]));
      });
      const actions = node('div', { className: 'result-actions' });
      const again = node('button', { className: 'game-primary', type: 'button', text: 'REPLAY' });
      again.addEventListener('click', replay);
      const architecture = node('button', { className: 'game-secondary', type: 'button', text: 'SEE ARCHITECTURE' });
      architecture.addEventListener('click', () => this.showTab('architecture'));
      actions.append(again, architecture);
      wrap.append(grid, actions);
      this.stage.replaceChildren(wrap);
    }

    loadProgress() {
      try {
        return JSON.parse(localStorage.getItem('yazidPortfolioWins')) || {};
      } catch {
        return {};
      }
    }

    markWin(key) {
      this.progress[key] = true;
      localStorage.setItem('yazidPortfolioWins', JSON.stringify(this.progress));
      this.renderProgress();
      if (Object.keys(PROJECTS).every((projectKey) => this.progress[projectKey])) {
        this.toast.classList.add('show');
        setTimeout(() => this.toast.classList.remove('show'), 4200);
      }
    }

    renderProgress() {
      const solved = Object.keys(PROJECTS).filter((key) => this.progress[key]).length;
      this.progressBadge.textContent = `${solved}/3 SYSTEMS SOLVED`;
    }
  }

  function gameShell(title, instructions) {
    const shell = node('div', { className: 'game-shell' });
    const intro = node('div', { className: 'game-intro' });
    intro.append(node('span', { className: 'experience-sticker', text: title }), node('p', { text: instructions }));
    shell.append(intro);
    return shell;
  }

  function hud(stats) {
    const bar = node('div', { className: 'game-hud' });
    stats.forEach(([label, value]) => {
      bar.append(node('div', { className: 'game-stat' }, [node('span', { text: label }), node('strong', { text: String(value) })]));
    });
    return bar;
  }
})();
