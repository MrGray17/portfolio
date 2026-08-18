(() => {
  const frame = document.getElementById('portfolio-frame');
  if (!frame) return;

  frame.addEventListener('load', () => {
    const win = frame.contentWindow;
    const doc = frame.contentDocument;
    if (!win || !doc) return;

    const q = (selector, root = doc) => root.querySelector(selector);
    const qa = (selector, root = doc) => [...root.querySelectorAll(selector)];

    doc.body.classList.add('experience-personalized');

    if (!q('link[data-experience-preview]')) {
      const link = doc.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'experience-preview.css';
      link.dataset.experiencePreview = 'true';
      doc.head.appendChild(link);
    }

    personalizePortfolio(doc, win, q, qa);
    new ProjectExperience(doc, win, q, qa);
  });

  function personalizePortfolio(doc, win, q, qa) {
    // Remove inherited/template-only UI without disturbing the page skeleton.
    q('#awwwards')?.remove();

    // Point public GitHub links to the repository owner actually being used.
    qa('a[href="https://github.com/hammoubelyazid"]').forEach((link) => {
      link.href = 'https://github.com/MrGray17';
    });

    // Do not expose a personal phone number in the public portfolio.
    qa('a[href^="tel:"]').forEach((link) => link.remove());

    // Hero — preserve all layout/decorative classes.
    const heroDescription = q('.hero-description');
    if (heroDescription) {
      heroDescription.innerHTML = `
        I'm an engineering student at ENSA Kénitra who learns by building. I care about what sits underneath the abstraction — APIs, databases, networks, runtimes and the trade-offs that make software hold up in the real world.
      `;
    }

    const decoLabel = q('.deco-label');
    if (decoLabel) decoLabel.textContent = 'BUILD • BREAK • UNDERSTAND';

    const heroBadges = q('.hero > .tech-badges');
    if (heroBadges) {
      heroBadges.innerHTML = `
        <span class="tech-badge"><i class="fab fa-python"></i> Python</span>
        <span class="tech-badge"><i class="fas fa-code"></i> C</span>
        <span class="tech-badge"><i class="fab fa-js"></i> JavaScript</span>
        <span class="tech-badge"><i class="fab fa-js"></i> TypeScript</span>
        <span class="tech-badge"><i class="fab fa-html5"></i> HTML</span>
        <span class="tech-badge"><i class="fab fa-css3-alt"></i> CSS</span>
        <span class="tech-badge"><i class="fas fa-database"></i> SQL</span>
        <span class="tech-badge"><i class="fab fa-node-js"></i> Node.js / Express</span>
        <span class="tech-badge"><i class="fab fa-react"></i> React</span>
        <span class="tech-badge"><i class="fas fa-database"></i> PostgreSQL</span>
        <span class="tech-badge"><i class="fab fa-git-alt"></i> Git / GitHub</span>
        <span class="tech-badge"><i class="fab fa-linux"></i> Linux & Networks</span>
      `;
    }

    // About — the original story is already personal; add one sentence that explains the portfolio philosophy.
    const aboutCard = q('#about .card');
    if (aboutCard && !q('[data-real-work-note]', aboutCard)) {
      const note = doc.createElement('p');
      note.className = 'text';
      note.dataset.realWorkNote = 'true';
      note.innerHTML = `One rule for this site: <span class="highlight highlight-pink">if I can't explain it in an interview, it doesn't belong here</span>. The projects below are meant to be inspected, played with, and questioned.`;
      aboutCard.appendChild(note);
    }

    // Journey.
    const exp1 = q('#exp-1 .timeline-description');
    if (exp1) {
      exp1.textContent = 'Engineering program spanning networks, telecommunications, databases, algorithms, systems and software engineering.';
    }

    const exp2 = q('#exp-2');
    if (exp2) {
      exp2.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-content-flat">
          <h4 class="timeline-title">Engineering Internship @ Atos</h4>
          <p class="timeline-date">2026</p>
          <p class="timeline-description">Worked on automation around a Maroc Telecom Jira workflow, including an AI-assisted component with Llama 3 and PostgreSQL-backed data handling.</p>
          <p class="timeline-location"><i class="fas fa-map-marker-alt"></i> Morocco</p>
        </div>
      `;
    }

    const exp3 = q('#exp-3');
    if (exp3) {
      exp3.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-content-flat">
          <h4 class="timeline-title">Building in Public — Rate Limiter · Maw3id · OpenToken</h4>
          <p class="timeline-date">2026 - Present</p>
          <p class="timeline-description">Turning theory into real engineering output across backend systems, a full-stack clinic product, testing, databases and AI tooling.</p>
          <p class="timeline-location"><i class="fas fa-map-marker-alt"></i> Morocco</p>
        </div>
      `;
    }

    // Replace the pirate decoration with the exact same portrait used at home.
    const mapPortrait = q('.map-pirate-overlay');
    if (mapPortrait) {
      mapPortrait.src = 'image/img3.jpg';
      mapPortrait.alt = 'El Yazid Hammoubel';
    }

    // The Leaflet popup was created before this preview layer loaded. Rewrite it whenever it appears.
    const journeyMap = q('#journey-map');
    if (journeyMap) {
      const rewritePopup = () => {
        const popup = q('.map-popup', journeyMap);
        if (!popup) return;
        popup.innerHTML = `
          <div class="map-popup-country">Morocco</div>
          <div class="map-popup-company"><strong>ENSA Kénitra</strong><span>Cycle Ingénieur — Réseaux & Télécoms</span><small>Kenitra</small><small>2025 - Present</small></div>
          <div class="map-popup-divider"></div>
          <div class="map-popup-company"><strong>Atos</strong><span>Engineering Internship — Maroc Telecom Jira Automation</span><small>Morocco</small><small>2026</small></div>
          <div class="map-popup-divider"></div>
          <div class="map-popup-company"><strong>Rate Limiter · Maw3id · OpenToken</strong><span>Independent Software Projects</span><small>Morocco</small><small>2026 - Present</small></div>
        `;
      };
      new win.MutationObserver(rewritePopup).observe(journeyMap, { childList: true, subtree: true });
    }

    // Skills — same grid/card vocabulary, real stack only.
    const skillsGrid = q('.skills-grid-modern');
    if (skillsGrid) {
      skillsGrid.innerHTML = `
        <div class="skill-box fade-in">
          <div class="skill-box-header"><i class="fas fa-code skill-icon-large"></i><h3 class="skill-box-title">Languages</h3></div>
          <div class="tech-tags">
            <span class="tag"><i class="fab fa-python"></i> Python</span>
            <span class="tag"><i class="fas fa-code"></i> C</span>
            <span class="tag"><i class="fab fa-js"></i> JavaScript</span>
            <span class="tag"><i class="fab fa-js"></i> TypeScript</span>
            <span class="tag"><i class="fas fa-database"></i> SQL</span>
            <span class="tag"><i class="fab fa-html5"></i> HTML</span>
            <span class="tag"><i class="fab fa-css3-alt"></i> CSS</span>
          </div>
        </div>
        <div class="skill-box fade-in">
          <div class="skill-box-header"><i class="fas fa-server skill-icon-large"></i><h3 class="skill-box-title">Web & Backend</h3></div>
          <div class="tech-tags">
            <span class="tag"><i class="fab fa-node-js"></i> Node.js</span>
            <span class="tag"><i class="fas fa-server"></i> Express</span>
            <span class="tag"><i class="fab fa-react"></i> React</span>
            <span class="tag"><i class="fas fa-network-wired"></i> HTTP / REST</span>
            <span class="tag"><i class="fas fa-vial"></i> Testing</span>
          </div>
        </div>
        <div class="skill-box fade-in">
          <div class="skill-box-header"><i class="fas fa-database skill-icon-large"></i><h3 class="skill-box-title">Data</h3></div>
          <div class="tech-tags">
            <span class="tag"><i class="fas fa-elephant"></i> PostgreSQL</span>
            <span class="tag"><i class="fas fa-database"></i> Relational Databases</span>
            <span class="tag"><i class="fas fa-table"></i> Database Design</span>
          </div>
        </div>
        <div class="skill-box fade-in">
          <div class="skill-box-header"><i class="fas fa-network-wired skill-icon-large"></i><h3 class="skill-box-title">Systems & Networks</h3></div>
          <div class="tech-tags">
            <span class="tag"><i class="fab fa-linux"></i> Linux</span>
            <span class="tag"><i class="fas fa-network-wired"></i> Networks</span>
            <span class="tag"><i class="fas fa-route"></i> TCP/IP Fundamentals</span>
            <span class="tag"><i class="fas fa-terminal"></i> CLI</span>
          </div>
        </div>
        <div class="skill-box fade-in">
          <div class="skill-box-header"><i class="fas fa-tools skill-icon-large"></i><h3 class="skill-box-title">Tools</h3></div>
          <div class="tech-tags">
            <span class="tag"><i class="fab fa-git-alt"></i> Git / GitHub</span>
            <span class="tag"><i class="fab fa-npm"></i> npm</span>
            <span class="tag"><i class="fas fa-bolt"></i> Vite</span>
            <span class="tag"><i class="fas fa-tasks"></i> Jira</span>
            <span class="tag"><i class="fas fa-code"></i> VS Code</span>
          </div>
        </div>
        <div class="skill-box learning-box fade-in">
          <div class="skill-box-header"><i class="fas fa-arrow-trend-up skill-icon-large"></i><h3 class="skill-box-title">Currently Deepening</h3></div>
          <div class="tech-tags">
            <span class="tag">TypeScript</span>
            <span class="tag">Backend Systems</span>
            <span class="tag">Distributed State</span>
            <span class="tag">System Design</span>
          </div>
        </div>
      `;
    }

    // Projects — cards stay in the same section, but now each one is an experience door.
    const showcase = q('#projects .creator-showcase');
    if (showcase) {
      showcase.innerHTML = `
        <p class="creator-label">THREE BUILDS. THREE PROBLEMS. PLAY THEM.</p>
        <div class="creator-projects-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
          <div class="creator-item" data-project-card="rate-limiter">
            <div class="project-status-strip"><span>BACKEND SYSTEMS</span><span class="project-signal">BUILDING</span></div>
            <button class="creator-project project-title-button" data-project-overview="rate-limiter"><span class="creator-name"><i class="fas fa-gauge-high"></i> Rate Limiter</span></button>
            <p class="creator-tagline">A TypeScript + Node.js rate limiter built from first principles. Fixed-window limiting, HTTP integration and tests today; more algorithms, distributed state and benchmarking next.</p>
            <div class="project-experience-actions">
              <button class="experience-button" data-open-project="rate-limiter"><i class="fas fa-gamepad"></i> PLAY PACKET PANIC</button>
              <a href="https://github.com/MrGray17/rate-limiter" target="_blank" rel="noreferrer" class="creator-github"><i class="fab fa-github"></i> CODE ↗</a>
            </div>
          </div>
          <div class="creator-item" data-project-card="maw3id">
            <div class="project-status-strip"><span>FULL-STACK PRODUCT</span><span class="project-signal">BUILDING</span></div>
            <button class="creator-project project-title-button" data-project-overview="maw3id"><span class="creator-name"><i class="fas fa-hospital-user"></i> Maw3id</span></button>
            <p class="creator-tagline">A clinic queue platform built around how Moroccan clinics actually operate: appointments, walk-ins, one live queue and nearby-doctor discovery. React + TypeScript, Express and PostgreSQL.</p>
            <div class="project-experience-actions">
              <button class="experience-button" data-open-project="maw3id"><i class="fas fa-gamepad"></i> PLAY QUEUE CHAOS</button>
              <a href="https://github.com/MrGray17/Maw3id" target="_blank" rel="noreferrer" class="creator-github"><i class="fab fa-github"></i> CODE ↗</a>
            </div>
          </div>
          <div class="creator-item" data-project-card="opentoken">
            <div class="project-status-strip"><span>AI TOOLING</span><span class="project-signal">EXPERIMENTING</span></div>
            <button class="creator-project project-title-button" data-project-overview="opentoken"><span class="creator-name"><i class="fas fa-compress-alt"></i> OpenToken</span></button>
            <p class="creator-tagline">Open-source TypeScript/Bun tooling exploring token compression for AI workflows, with automated type checking, linting and tests. Benchmarks decide the claims.</p>
            <div class="project-experience-actions">
              <button class="experience-button" data-open-project="opentoken"><i class="fas fa-gamepad"></i> PLAY CONTEXT CRUNCH</button>
              <a href="https://github.com/MrGray17/opentoken" target="_blank" rel="noreferrer" class="creator-github"><i class="fab fa-github"></i> CODE ↗</a>
            </div>
          </div>
        </div>
      `;
    }

    const contactIntro = q('.contact-intro');
    if (contactIntro) {
      contactIntro.textContent = 'Open to software engineering internships, collaborations, and conversations about building interesting systems.';
    }

    // Footer text and remaining profile links.
    const footerRole = q('.footer-brand-compact span');
    if (footerRole) footerRole.textContent = 'Software Engineering Student | Full-Stack • Backend • Systems';
    qa('.footer-social-compact a[href="https://github.com/MrGray17"], .contact-card[href="https://github.com/MrGray17"]').forEach((link) => {
      link.href = 'https://github.com/MrGray17';
    });
  }

  class ProjectExperience {
    constructor(doc, win, q, qa) {
      this.doc = doc;
      this.win = win;
      this.q = q;
      this.qa = qa;
      this.current = null;
      this.cleanup = null;
      this.projects = this.projectData();
      this.progress = this.loadProgress();
      this.mount();
      this.bind();
      this.renderProgress();
    }

    projectData() {
      return {
        'rate-limiter': {
          title: 'Rate Limiter',
          kicker: 'TRAFFIC CONTROL / BACKEND SYSTEMS',
          repo: 'https://github.com/MrGray17/rate-limiter',
          overview: 'APIs do not fail only because they are slow. They fail when too much work arrives at once. This project is where request limits, time windows, HTTP behavior, tests and eventually distributed state become concrete instead of diagrams.',
          architecture: [
            'A client key identifies who is consuming capacity.',
            'A fixed time window tracks how many requests that key has made.',
            'Requests inside the limit pass; excess requests are rejected.',
            'Tests cover acceptance, rejection, reset behavior and HTTP integration.',
            'Next experiments: other algorithms, Redis-backed state and benchmarks.'
          ],
          game: 'rate'
        },
        maw3id: {
          title: 'Maw3id',
          kicker: 'REAL QUEUES / FULL-STACK PRODUCT',
          repo: 'https://github.com/MrGray17/Maw3id',
          overview: 'Maw3id starts from a real clinic workflow: phone appointments, walk-ins, one daily queue, doctor state, and the option to discover a nearby doctor with a shorter wait. The hard part is not drawing a calendar. It is coordinating a queue that keeps changing.',
          architecture: [
            'Reception staff add appointments and walk-ins into one operational queue.',
            'The doctor advances patients through queue states instead of managing separate lists.',
            'PostgreSQL holds durable clinic, appointment and queue state.',
            'The React + TypeScript frontend talks to an Express API.',
            'Map-based nearby-doctor discovery turns wait data into a patient decision.'
          ],
          game: 'maw3id'
        },
        opentoken: {
          title: 'OpenToken',
          kicker: 'AI TOOLING / INFORMATION DENSITY',
          repo: 'https://github.com/MrGray17/opentoken',
          overview: 'OpenToken explores a pressure in AI systems: context is finite and repeated structure can be expensive. The engineering question is not simply how much text can be removed, but whether useful information survives the transformation.',
          architecture: [
            'Inputs can contain repeated structures such as schemas, JSON and tool traces.',
            'Compression is useful only if downstream behavior still has the information it needs.',
            'The TypeScript/Bun repository uses automated type checking, linting and tests.',
            'Any compression claim should be backed by reproducible benchmarks.',
            'The real trade-off is token savings versus information loss and latency.'
          ],
          game: 'token'
        }
      };
    }

    mount() {
      const modal = this.doc.createElement('div');
      modal.id = 'project-experience';
      modal.className = 'project-experience-modal';
      modal.setAttribute('aria-hidden', 'true');
      modal.innerHTML = `
        <div class="experience-backdrop" data-close-experience></div>
        <div class="experience-window" role="dialog" aria-modal="true" aria-labelledby="experience-title">
          <div class="experience-header">
            <div><small id="experience-kicker">PROJECT EXPERIENCE</small><h2 id="experience-title">Project</h2></div>
            <button class="experience-close" data-close-experience aria-label="Close">×</button>
          </div>
          <div class="experience-tabs">
            <button data-experience-tab="overview">OVERVIEW</button>
            <button data-experience-tab="play">PLAY 🎮</button>
            <button data-experience-tab="architecture">ARCHITECTURE</button>
            <button data-experience-tab="code">CODE ↗</button>
          </div>
          <div class="experience-stage" id="experience-stage"></div>
        </div>
      `;
      this.doc.body.appendChild(modal);
      this.modal = modal;
      this.stage = this.q('#experience-stage', modal);
      this.title = this.q('#experience-title', modal);
      this.kicker = this.q('#experience-kicker', modal);

      const progress = this.doc.createElement('div');
      progress.className = 'experience-progress-chip';
      progress.dataset.experienceProgress = 'true';
      this.doc.body.appendChild(progress);

      const achievement = this.doc.createElement('div');
      achievement.id = 'experience-achievement';
      achievement.className = 'experience-achievement';
      achievement.innerHTML = '🏆 RECRUITER% SPEEDRUN COMPLETE<br><small>you survived all three systems</small>';
      this.doc.body.appendChild(achievement);
    }

    bind() {
      this.qa('[data-open-project]').forEach((button) => button.addEventListener('click', () => this.open(button.dataset.openProject, 'play')));
      this.qa('[data-project-overview]').forEach((button) => button.addEventListener('click', () => this.open(button.dataset.projectOverview, 'overview')));
      this.qa('[data-experience-tab]', this.modal).forEach((button) => button.addEventListener('click', () => this.switchTab(button.dataset.experienceTab)));
      this.qa('[data-close-experience]', this.modal).forEach((button) => button.addEventListener('click', () => this.close()));
      this.doc.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && this.modal.classList.contains('is-open')) this.close();
      });
    }

    open(key, tab) {
      const project = this.projects[key];
      if (!project) return;
      this.stopGame();
      this.current = key;
      this.title.textContent = project.title;
      this.kicker.textContent = project.kicker;
      this.modal.classList.add('is-open');
      this.modal.setAttribute('aria-hidden', 'false');
      this.doc.body.classList.add('experience-open');
      this.switchTab(tab || 'play');
    }

    close() {
      this.stopGame();
      this.modal.classList.remove('is-open');
      this.modal.setAttribute('aria-hidden', 'true');
      this.doc.body.classList.remove('experience-open');
    }

    stopGame() {
      if (typeof this.cleanup === 'function') this.cleanup();
      this.cleanup = null;
    }

    switchTab(tab) {
      if (!this.current) return;
      this.stopGame();
      this.qa('[data-experience-tab]', this.modal).forEach((button) => button.classList.toggle('is-active', button.dataset.experienceTab === tab));
      const project = this.projects[this.current];
      if (tab === 'overview') this.renderOverview(project);
      else if (tab === 'architecture') this.renderArchitecture(project);
      else if (tab === 'code') this.renderCode(project);
      else this.renderGame(project);
    }

    renderOverview(project) {
      this.stage.innerHTML = `
        <div class="experience-copy">
          <span class="experience-sticker">WHY IT EXISTS</span>
          <h3>${project.title} in plain English</h3>
          <p>${project.overview}</p>
          <div class="result-actions"><button class="game-primary" data-jump-play>PLAY THE PROBLEM →</button></div>
        </div>`;
      this.q('[data-jump-play]', this.stage)?.addEventListener('click', () => this.switchTab('play'));
    }

    renderArchitecture(project) {
      this.stage.innerHTML = `
        <div class="experience-copy">
          <span class="experience-sticker">UNDER THE HOOD</span>
          <h3>How the system fits together</h3>
          <div class="architecture-stack">${project.architecture.map((item, i) => `<div class="architecture-row"><span>0${i + 1}</span><p>${item}</p></div>`).join('')}</div>
        </div>`;
    }

    renderCode(project) {
      this.stage.innerHTML = `
        <div class="experience-copy">
          <span class="experience-sticker">NO MAGIC BEHIND THE CURTAIN</span>
          <h3>The repository is the evidence.</h3>
          <p>The game is only a metaphor for the problem. The implementation is public so the code, tests and progress can be inspected directly.</p>
          <div class="result-actions"><a class="game-primary" href="${project.repo}" target="_blank" rel="noreferrer">OPEN GITHUB ↗</a></div>
        </div>`;
    }

    renderGame(project) {
      if (project.game === 'rate') this.cleanup = this.rateLimiterGame();
      if (project.game === 'maw3id') this.cleanup = this.maw3idGame();
      if (project.game === 'token') this.cleanup = this.openTokenGame();
    }

    loadProgress() {
      try { return JSON.parse(this.win.localStorage.getItem('yazidPortfolioWins')) || {}; }
      catch { return {}; }
    }

    markWin(key) {
      this.progress[key] = true;
      try { this.win.localStorage.setItem('yazidPortfolioWins', JSON.stringify(this.progress)); } catch {}
      this.renderProgress();
      if (Object.keys(this.projects).every((projectKey) => this.progress[projectKey])) {
        const toast = this.q('#experience-achievement');
        toast?.classList.add('is-visible');
        this.win.setTimeout(() => toast?.classList.remove('is-visible'), 6000);
      }
    }

    renderProgress() {
      const solved = Object.keys(this.projects).filter((key) => this.progress[key]).length;
      this.qa('[data-experience-progress]').forEach((el) => { el.textContent = `${solved}/3 SYSTEMS SOLVED`; });
      this.qa('[data-project-card]').forEach((card) => card.classList.toggle('is-solved', Boolean(this.progress[card.dataset.projectCard])));
    }

    rateLimiterGame() {
      this.stage.innerHTML = `
        <div class="game-shell">
          <div class="game-intro"><div><span class="experience-sticker">PACKET PANIC</span><h3>Keep the server alive.</h3></div><p>Every window, watch each client's request count. If a client goes past <strong>5 requests</strong>, throttle it. Throttling normal traffic costs points.</p></div>
          <div class="game-hud"><div><span>SERVER</span><strong id="rl-health">100%</strong></div><div><span>SCORE</span><strong id="rl-score">0</strong></div><div><span>WINDOW</span><strong id="rl-window">1/5</strong></div></div>
          <div class="server-health"><div id="rl-health-bar" style="width:100%"></div></div>
          <div class="client-grid" id="rl-clients"></div>
          <div class="game-log" id="rl-log">Window opened. Watch the counters.</div>
        </div>`;

      const clientsEl = this.q('#rl-clients', this.stage);
      const logEl = this.q('#rl-log', this.stage);
      const scoreEl = this.q('#rl-score', this.stage);
      const healthEl = this.q('#rl-health', this.stage);
      const healthBar = this.q('#rl-health-bar', this.stage);
      const windowEl = this.q('#rl-window', this.stage);
      const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
      const state = {
        score: 0, health: 100, window: 1, tick: 0, ended: false,
        clients: ['client.alpha', 'client.beta', 'client.gamma'].map((name) => ({ name, count: 0, target: 0, throttled: false }))
      };

      const roll = () => {
        const abusive = Math.floor(Math.random() * 3);
        state.clients.forEach((client, index) => {
          client.count = 0;
          client.throttled = false;
          if (index === abusive) client.target = 8 + Math.floor(Math.random() * 5);
          else client.target = Math.random() > .72 ? 6 + Math.floor(Math.random() * 3) : 2 + Math.floor(Math.random() * 4);
        });
      };

      const render = () => {
        clientsEl.innerHTML = state.clients.map((client, index) => `
          <button class="client-card ${client.throttled ? 'is-throttled' : ''}" data-client="${index}">
            <div class="client-top"><span>${client.name}</span><b>${client.count}</b></div>
            <div class="request-meter"><div style="width:${clamp(client.count / 10 * 100, 4, 100)}%"></div></div>
            <small>${client.count <= 5 ? 'within limit' : 'LIMIT EXCEEDED'}</small>
            <strong>${client.throttled ? 'THROTTLED ✓' : 'CLICK TO THROTTLE'}</strong>
          </button>`).join('');
        this.qa('[data-client]', clientsEl).forEach((button) => button.addEventListener('click', () => {
          const client = state.clients[Number(button.dataset.client)];
          client.throttled = !client.throttled;
          render();
        }));
      };

      const updateHud = () => {
        scoreEl.textContent = state.score;
        healthEl.textContent = `${state.health}%`;
        healthBar.style.width = `${state.health}%`;
        windowEl.textContent = `${state.window}/5`;
      };

      const evaluate = () => {
        const summary = [];
        state.clients.forEach((client) => {
          const excess = client.target > 5;
          if (excess && client.throttled) {
            state.score += 80 + (client.target - 5) * 4;
            summary.push(`${client.name}: excess blocked`);
          } else if (excess && !client.throttled) {
            const damage = (client.target - 5) * 7;
            state.health = clamp(state.health - damage, 0, 100);
            state.score -= 30;
            summary.push(`${client.name}: overload -${damage}%`);
          } else if (!excess && client.throttled) {
            state.score -= 45;
            summary.push(`${client.name}: false positive`);
          } else {
            state.score += 25;
            summary.push(`${client.name}: served`);
          }
        });
        logEl.textContent = summary.join(' • ');
        updateHud();
      };

      const finish = () => {
        state.ended = true;
        const win = state.health >= 55 && state.score > 0;
        if (win) this.markWin('rate-limiter');
        this.stage.innerHTML = `
          <div class="game-result ${win ? 'is-win' : 'is-loss'}">
            <span class="experience-sticker">${win ? 'SERVER SURVIVED' : 'SERVER OVERLOADED'}</span>
            <h3>${win ? 'You found the noisy clients.' : 'Too much traffic got through.'}</h3>
            <div class="result-grid"><div><span>Health</span><strong>${state.health}%</strong></div><div><span>Score</span><strong>${state.score}</strong></div></div>
            <p>This manual game is the human version of what the real limiter automates per client key.</p>
            <div class="result-actions"><button class="game-primary" data-replay>REPLAY</button><button class="game-secondary" data-learn>SEE ARCHITECTURE</button></div>
          </div>`;
        this.q('[data-replay]', this.stage)?.addEventListener('click', () => this.switchTab('play'));
        this.q('[data-learn]', this.stage)?.addEventListener('click', () => this.switchTab('architecture'));
      };

      roll(); render(); updateHud();
      const timer = this.win.setInterval(() => {
        if (state.ended) return;
        state.tick += 1;
        state.clients.forEach((client) => { client.count = Math.round(client.target * state.tick / 5); });
        render();
        if (state.tick >= 5) {
          evaluate();
          if (state.health <= 0 || state.window >= 5) {
            this.win.clearInterval(timer);
            finish();
            return;
          }
          state.window += 1;
          state.tick = 0;
          roll(); render(); updateHud();
        }
      }, 800);

      return () => { state.ended = true; this.win.clearInterval(timer); };
    }

    maw3idGame() {
      this.stage.innerHTML = `
        <div class="game-shell">
          <div class="game-intro"><div><span class="experience-sticker">QUEUE CHAOS</span><h3>Run the morning clinic.</h3></div><p>Choose who the doctor sees next. Respect appointments, don't starve walk-ins, and redirect only when the nearby doctor is actually faster.</p></div>
          <div class="game-hud"><div><span>TIME</span><strong id="mq-time">08:30</strong></div><div><span>SCORE</span><strong id="mq-score">0</strong></div><div><span>SEEN</span><strong id="mq-seen">0</strong></div></div>
          <div class="nearby-doctor" id="mq-nearby"></div>
          <div class="queue-board"><div class="queue-heading"><span>WAITING ROOM</span><small>call or redirect one patient</small></div><div class="patient-list" id="mq-queue"></div></div>
          <div class="game-log" id="mq-log">The doctor is ready. Make the first call.</div>
        </div>`;

      const queueEl = this.q('#mq-queue', this.stage);
      const nearbyEl = this.q('#mq-nearby', this.stage);
      const logEl = this.q('#mq-log', this.stage);
      const timeEl = this.q('#mq-time', this.stage);
      const scoreEl = this.q('#mq-score', this.stage);
      const seenEl = this.q('#mq-seen', this.stage);
      const names = ['Amal', 'Youssef', 'Khadija', 'Omar', 'Sara', 'Hamza', 'Nadia', 'Mehdi', 'Salma', 'Anas', 'Lina', 'Ilyas'];
      let patientId = 0;
      const state = { minute: 510, turn: 0, score: 0, seen: 0, redirected: 0, totalWait: 0, ended: false, queue: [] };
      const format = (minute) => `${String(Math.floor(minute / 60)).padStart(2, '0')}:${String(minute % 60).padStart(2, '0')}`;
      const makePatient = (offset = 0) => {
        const appointment = Math.random() > .45;
        const arrival = state.minute - Math.floor(Math.random() * 18);
        const slot = appointment ? state.minute + offset + (Math.floor(Math.random() * 3) - 1) * 10 : null;
        patientId += 1;
        return { id: patientId, name: names[patientId % names.length], type: appointment ? 'appointment' : 'walk-in', arrival, slot };
      };
      const waitOf = (patient) => Math.max(0, state.minute - patient.arrival);
      const urgency = (patient) => waitOf(patient) + (patient.type === 'appointment' && state.minute >= patient.slot - 5 ? 28 : 0);
      const nearbyWait = () => 7 + ((state.turn * 5 + 3) % 14);
      state.queue = [makePatient(0), makePatient(10), makePatient(-10), makePatient(20)];

      const updateHud = () => {
        timeEl.textContent = format(state.minute);
        scoreEl.textContent = state.score;
        seenEl.textContent = state.seen;
        nearbyEl.innerHTML = `<div><span>NEARBY</span><strong>Dr. Amrani ★ 4.7</strong></div><div><span>EST. WAIT</span><strong>${nearbyWait()} min</strong></div>`;
      };

      const render = () => {
        queueEl.innerHTML = state.queue.map((patient) => {
          const label = patient.type === 'appointment' ? `APPT ${format(patient.slot)}` : `WALK-IN ${format(patient.arrival)}`;
          return `<div class="patient-card">
            <div class="patient-main"><span class="patient-avatar">${patient.type === 'appointment' ? '📅' : '🚶'}</span><div><strong>${patient.name}</strong><small>${label}</small></div></div>
            <div class="patient-wait"><span>WAIT</span><strong>${waitOf(patient)}m</strong></div>
            <div class="patient-actions"><button data-call="${patient.id}">CALL</button><button data-redirect="${patient.id}">REDIRECT</button></div>
          </div>`;
        }).join('');
        this.qa('[data-call]', queueEl).forEach((button) => button.addEventListener('click', () => choose(Number(button.dataset.call), false)));
        this.qa('[data-redirect]', queueEl).forEach((button) => button.addEventListener('click', () => choose(Number(button.dataset.redirect), true)));
      };

      const finish = () => {
        state.ended = true;
        const avg = state.seen ? Math.round(state.totalWait / state.seen) : 0;
        const win = state.score >= 95 && avg <= 38;
        if (win) this.markWin('maw3id');
        this.stage.innerHTML = `
          <div class="game-result ${win ? 'is-win' : 'is-loss'}">
            <span class="experience-sticker">${win ? 'CLINIC FLOWING' : 'WAITING ROOM MELTDOWN'}</span>
            <h3>${win ? 'You kept the queue moving.' : 'The queue needs a better policy.'}</h3>
            <div class="result-grid"><div><span>Patients seen</span><strong>${state.seen}</strong></div><div><span>Avg wait</span><strong>${avg}m</strong></div><div><span>Redirected</span><strong>${state.redirected}</strong></div><div><span>Score</span><strong>${state.score}</strong></div></div>
            <p>The real product turns these changing states into one shared operational queue.</p>
            <div class="result-actions"><button class="game-primary" data-replay>REPLAY</button><button class="game-secondary" data-learn>SEE ARCHITECTURE</button></div>
          </div>`;
        this.q('[data-replay]', this.stage)?.addEventListener('click', () => this.switchTab('play'));
        this.q('[data-learn]', this.stage)?.addEventListener('click', () => this.switchTab('architecture'));
      };

      const choose = (id, redirect) => {
        if (state.ended) return;
        const patient = state.queue.find((item) => item.id === id);
        if (!patient) return;
        const best = [...state.queue].sort((a, b) => urgency(b) - urgency(a))[0];
        const wait = waitOf(patient);
        if (redirect) {
          const useful = wait >= 25 && nearbyWait() + 8 < wait;
          state.score += useful ? 24 : -18;
          state.redirected += 1;
          logEl.textContent = useful ? `${patient.name} can be seen faster nearby. Good redirect.` : `${patient.name} did not need redirecting.`;
        } else {
          const bestChoice = best?.id === patient.id;
          state.score += bestChoice ? 32 : -12;
          state.seen += 1;
          state.totalWait += wait;
          logEl.textContent = bestChoice ? `${patient.name} was the strongest next choice.` : `Someone else had higher queue urgency.`;
        }
        state.queue = state.queue.filter((item) => item.id !== id);
        state.turn += 1;
        state.minute += 10;
        if (state.turn >= 8) { finish(); return; }
        state.queue.push(makePatient(10));
        if (state.turn % 3 === 1) state.queue.push(makePatient(20));
        updateHud(); render();
      };

      updateHud(); render();
      return () => { state.ended = true; };
    }

    openTokenGame() {
      const chunks = [
        { name: 'Tool schema', tokens: 320, redundancy: .82, icon: '🧰' },
        { name: 'Chat history', tokens: 260, redundancy: .55, icon: '💬' },
        { name: 'Repeated logs', tokens: 300, redundancy: .88, icon: '📜' },
        { name: 'User request', tokens: 130, redundancy: .10, icon: '🧑' },
        { name: 'JSON payload', tokens: 280, redundancy: .62, icon: '{}' },
        { name: 'System rules', tokens: 180, redundancy: .15, icon: '⚖️' },
        { name: 'Tool traces', tokens: 260, redundancy: .75, icon: '🔧' },
        { name: 'Recent context', tokens: 210, redundancy: .35, icon: '🧠' }
      ];
      const state = { round: 0, used: 0, capacity: 1120, integrity: 100, saved: 0, score: 0, ended: false };
      const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

      this.stage.innerHTML = `
        <div class="game-shell">
          <div class="game-intro"><div><span class="experience-sticker">CONTEXT CRUNCH</span><h3>Fit the context. Keep the meaning.</h3></div><p>You have <strong>${state.capacity} tokens</strong>. Repetitive chunks tolerate stronger compression. Unique instructions do not. Finish under capacity with at least <strong>90% integrity</strong>.</p></div>
          <div class="game-hud"><div><span>CONTEXT</span><strong id="ot-used">0/${state.capacity}</strong></div><div><span>INTEGRITY</span><strong id="ot-integrity">100%</strong></div><div><span>SAVED</span><strong id="ot-saved">0</strong></div></div>
          <div class="context-meter"><div id="ot-context-bar" style="width:0"></div></div>
          <div id="ot-card"></div>
          <div class="game-log" id="ot-log">Inspect the first chunk.</div>
        </div>`;

      const cardEl = this.q('#ot-card', this.stage);
      const logEl = this.q('#ot-log', this.stage);
      const usedEl = this.q('#ot-used', this.stage);
      const integrityEl = this.q('#ot-integrity', this.stage);
      const savedEl = this.q('#ot-saved', this.stage);
      const bar = this.q('#ot-context-bar', this.stage);

      const updateHud = () => {
        usedEl.textContent = `${state.used}/${state.capacity}`;
        integrityEl.textContent = `${state.integrity}%`;
        savedEl.textContent = state.saved;
        bar.style.width = `${clamp(state.used / state.capacity * 100, 0, 100)}%`;
        bar.classList.toggle('is-over', state.used > state.capacity);
      };

      const finish = () => {
        state.ended = true;
        const win = state.used <= state.capacity && state.integrity >= 90;
        if (win) this.markWin('opentoken');
        this.stage.innerHTML = `
          <div class="game-result ${win ? 'is-win' : 'is-loss'}">
            <span class="experience-sticker">${win ? 'CONTEXT SAVED' : 'CONTEXT FAILED'}</span>
            <h3>${win ? 'Dense enough. Meaning intact.' : state.used > state.capacity ? 'The context window overflowed.' : 'Too much information was destroyed.'}</h3>
            <div class="result-grid"><div><span>Final tokens</span><strong>${state.used}</strong></div><div><span>Saved</span><strong>${state.saved}</strong></div><div><span>Integrity</span><strong>${state.integrity}%</strong></div><div><span>Score</span><strong>${state.score}</strong></div></div>
            <p>That trade-off — representation cost versus retained information — is the interesting part of the project.</p>
            <div class="result-actions"><button class="game-primary" data-replay>REPLAY</button><button class="game-secondary" data-learn>SEE ARCHITECTURE</button></div>
          </div>`;
        this.q('[data-replay]', this.stage)?.addEventListener('click', () => this.switchTab('play'));
        this.q('[data-learn]', this.stage)?.addEventListener('click', () => this.switchTab('architecture'));
      };

      const process = (mode) => {
        const chunk = chunks[state.round];
        let finalTokens = chunk.tokens;
        let loss = 0;
        if (mode === 'safe') {
          const reduction = .08 + chunk.redundancy * .35;
          finalTokens = Math.round(chunk.tokens * (1 - reduction));
          state.score += Math.round(chunk.redundancy * 30);
        } else if (mode === 'hard') {
          const reduction = clamp(.35 + chunk.redundancy * .5, 0, .82);
          finalTokens = Math.round(chunk.tokens * (1 - reduction));
          loss = chunk.redundancy >= .6 ? 0 : Math.ceil((.6 - chunk.redundancy) * 18);
          state.integrity = clamp(state.integrity - loss, 0, 100);
          state.score += loss === 0 ? 45 : -loss * 8;
        } else {
          state.score += chunk.redundancy < .25 ? 28 : -10;
        }
        state.used += finalTokens;
        state.saved += chunk.tokens - finalTokens;
        logEl.textContent = `${chunk.name}: ${chunk.tokens} → ${finalTokens} tokens${loss ? `, integrity -${loss}%` : ''}.`;
        state.round += 1;
        updateHud();
        if (state.round >= chunks.length) finish();
        else renderChunk();
      };

      const renderChunk = () => {
        const chunk = chunks[state.round];
        const redundancy = Math.round(chunk.redundancy * 100);
        cardEl.innerHTML = `
          <div class="token-card">
            <div class="token-card-head"><span class="token-icon">${chunk.icon}</span><div><small>CHUNK ${state.round + 1}/${chunks.length}</small><h4>${chunk.name}</h4></div><strong>${chunk.tokens} TOKENS</strong></div>
            <div class="redundancy-row"><span>STRUCTURAL REDUNDANCY</span><strong>${redundancy}%</strong></div>
            <div class="redundancy-meter"><div style="width:${redundancy}%"></div></div>
            <div class="compression-actions">
              <button data-compress="keep"><span>KEEP</span><small>0% risk · 0% savings</small></button>
              <button data-compress="safe"><span>SAFE</span><small>moderate savings</small></button>
              <button data-compress="hard"><span>HARD</span><small>big savings · risky</small></button>
            </div>
          </div>`;
        this.qa('[data-compress]', cardEl).forEach((button) => button.addEventListener('click', () => process(button.dataset.compress)));
      };

      updateHud(); renderChunk();
      return () => { state.ended = true; };
    }
  }
})();
