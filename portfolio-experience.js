(() => {
  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const PROJECTS = {
    'rate-limiter': {
      title: 'Rate Limiter',
      kicker: 'BACKEND SYSTEMS / TRAFFIC CONTROL',
      repo: 'https://github.com/MrGray17/rate-limiter',
      overview: 'APIs need a way to protect themselves when one client sends too much traffic. I am building the limiter from first principles so the implementation forces me to understand time windows, state, HTTP behavior, testing and eventually distributed coordination.',
      architecture: [
        'A request is identified by a key such as user, token or IP.',
        'The limiter stores request state for that key and decides whether the next request is allowed.',
        'The current implementation explores fixed-window behavior and HTTP integration.',
        'The next engineering step is comparing algorithms, distributed state and benchmarks.'
      ]
    },
    maw3id: {
      title: 'Maw3id',
      kicker: 'FULL-STACK PRODUCT / CLINIC FLOW',
      repo: 'https://github.com/MrGray17/Maw3id',
      overview: 'Maw3id models how clinics in Morocco actually work: people call for appointments, others walk in early, reception manages the day and patients have very little visibility into waiting time. The product unifies that into one operational queue and can surface less crowded nearby doctors.',
      architecture: [
        'React + TypeScript frontend for patient and clinic workflows.',
        'Express API for queue, appointment and clinic operations.',
        'PostgreSQL for durable relational state.',
        'MapLibre for nearby-doctor discovery and location-based experiences.'
      ]
    },
    opentoken: {
      title: 'OpenToken',
      kicker: 'AI TOOLING / CONTEXT EFFICIENCY',
      repo: 'https://github.com/MrGray17/opentoken',
      overview: 'OpenToken explores a simple question: how much repeated structure can an AI workflow remove before the representation stops being useful? It is an experimental TypeScript/Bun codebase, and I want benchmarks—not slogans—to decide whether the idea is actually valuable.',
      architecture: [
        'Inputs can contain repeated structure such as tool schemas, logs, JSON and agent traces.',
        'Compression should reduce representation cost without destroying information needed downstream.',
        'The repository uses type checks, linting and tests as part of its build.',
        'The long-term evaluation is measurable: token savings versus information loss and latency.'
      ]
    }
  };

  function personalize() {
    document.body.classList.add('experience-personalized');
    q('#awwwards')?.remove();
    qa('a[href="https://github.com/hammoubelyazid"]').forEach((link) => link.href = 'https://github.com/MrGray17');
    qa('a[href^="tel:"]').forEach((link) => link.remove());

    const heroDescription = q('.hero-description');
    if (heroDescription) heroDescription.textContent = "I'm an engineering student at ENSA Kénitra who learns by building. I care about what sits underneath the abstraction — APIs, databases, networks, runtimes and the trade-offs that make software hold up in the real world.";
    const decoLabel = q('.deco-label');
    if (decoLabel) decoLabel.textContent = 'BUILD • BREAK • UNDERSTAND';

    const heroBadges = q('.hero > .tech-badges');
    if (heroBadges) heroBadges.innerHTML = `
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
      <span class="tech-badge"><i class="fab fa-linux"></i> Linux & Networks</span>`;

    const aboutCard = q('#about .card');
    if (aboutCard && !q('[data-real-work-note]', aboutCard)) {
      const note = document.createElement('p');
      note.className = 'text';
      note.dataset.realWorkNote = 'true';
      note.innerHTML = `One rule for this site: <span class="highlight highlight-pink">if I can't explain it in an interview, it doesn't belong here</span>. Everything below is meant to be inspected, played with, and questioned.`;
      aboutCard.appendChild(note);
    }

    const exp1 = q('#exp-1 .timeline-description');
    if (exp1) exp1.textContent = 'Engineering program spanning networks, telecommunications, databases, algorithms, systems and software engineering.';

    const exp2 = q('#exp-2');
    if (exp2) exp2.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content-flat">
        <h4 class="timeline-title">Engineering Internship @ Atos</h4>
        <p class="timeline-date">2026</p>
        <p class="timeline-description">Worked on automation around a Maroc Telecom Jira workflow, including an AI-assisted component using Llama 3 and PostgreSQL-backed data handling.</p>
        <p class="timeline-location"><i class="fas fa-map-marker-alt"></i> Morocco</p>
      </div>`;

    const exp3 = q('#exp-3');
    if (exp3) exp3.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content-flat">
        <h4 class="timeline-title">Building in Public — Rate Limiter · Maw3id · OpenToken</h4>
        <p class="timeline-date">2026 - Present</p>
        <p class="timeline-description">Turning theory into real engineering output across backend systems, a full-stack clinic product, testing, databases and AI tooling.</p>
        <p class="timeline-location"><i class="fas fa-map-marker-alt"></i> Morocco</p>
      </div>`;

    const mapPortrait = q('.map-pirate-overlay');
    if (mapPortrait) {
      mapPortrait.src = 'image/img3.jpg';
      mapPortrait.alt = 'El Yazid Hammoubel';
      mapPortrait.style.objectFit = 'cover';
      mapPortrait.style.objectPosition = 'center';
      mapPortrait.style.border = '4px solid #000';
      mapPortrait.style.boxShadow = '6px 6px 0 #000';
    }

    const skillsGrid = q('.skills-grid-modern');
    if (skillsGrid) skillsGrid.innerHTML = `
      ${skillBox('fas fa-code', 'Languages', ['Python','C','JavaScript','TypeScript','SQL','HTML','CSS'])}
      ${skillBox('fas fa-server', 'Web & Backend', ['Node.js','Express','React','HTTP / REST','Testing'])}
      ${skillBox('fas fa-database', 'Data', ['PostgreSQL','Relational Databases','Database Design'])}
      ${skillBox('fas fa-network-wired', 'Systems & Networks', ['Linux','Networks','TCP/IP Fundamentals','CLI'])}
      ${skillBox('fas fa-tools', 'Tools', ['Git / GitHub','npm','Vite','Jira','VS Code'])}
      ${skillBox('fas fa-arrow-trend-up', 'Currently Deepening', ['TypeScript','Backend Systems','Distributed State','System Design'], true)}`;

    const showcase = q('#projects .creator-showcase');
    if (showcase) showcase.innerHTML = `
      <p class="creator-label">THREE BUILDS. THREE PROBLEMS. PLAY THEM.</p>
      <div class="creator-projects-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        ${projectCard('rate-limiter','fas fa-gauge-high','Rate Limiter','BACKEND SYSTEMS','A TypeScript + Node.js rate limiter built from first principles. Fixed-window limiting, HTTP integration and tests today; more algorithms, distributed state and benchmarking next.','PLAY PACKET PANIC')}
        ${projectCard('maw3id','fas fa-hospital-user','Maw3id','FULL-STACK PRODUCT','A clinic queue platform built around how Moroccan clinics actually operate: appointments, walk-ins, one live queue and nearby-doctor discovery. React + TypeScript, Express and PostgreSQL.','PLAY QUEUE CHAOS')}
        ${projectCard('opentoken','fas fa-compress-alt','OpenToken','AI TOOLING','Open-source TypeScript/Bun tooling exploring token compression for AI workflows, with automated type checking, linting and tests. Benchmarks decide the claims.','PLAY CONTEXT CRUNCH')}
      </div>`;

    const contactIntro = q('.contact-intro');
    if (contactIntro) contactIntro.textContent = 'Open to software engineering internships, collaborations, and conversations about building interesting systems.';
    const footerRole = q('.footer-brand-compact span');
    if (footerRole) footerRole.textContent = 'Software Engineering Student | Full-Stack • Backend • Systems';
  }

  function skillBox(icon, title, tags, highlight = false) {
    return `<div class="skill-box ${highlight ? 'highlight-box' : ''} fade-in"><div class="skill-box-header"><i class="${icon} skill-icon-large"></i><h3 class="skill-box-title">${title}</h3></div><div class="tech-tags">${tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div></div>`;
  }

  function projectCard(key, icon, title, category, description, playLabel) {
    return `<div class="creator-item" data-project-card="${key}">
      <div class="project-status-strip"><span>${category}</span><span class="project-signal">BUILDING</span></div>
      <button class="creator-project project-title-button" data-project-overview="${key}"><span class="creator-name"><i class="${icon}"></i> ${title}</span></button>
      <p class="creator-tagline">${description}</p>
      <div class="project-experience-actions"><button class="experience-button" data-open-project="${key}"><i class="fas fa-gamepad"></i> ${playLabel}</button><a href="${PROJECTS[key].repo}" target="_blank" rel="noreferrer" class="creator-github"><i class="fab fa-github"></i> CODE ↗</a></div>
    </div>`;
  }

  class Experience {
    constructor() {
      this.progress = this.loadProgress();
      this.current = null;
      this.mount();
      this.bind();
      this.renderProgress();
    }

    mount() {
      const modal = document.createElement('div');
      modal.id = 'project-experience';
      modal.className = 'project-experience-modal';
      modal.setAttribute('aria-hidden','true');
      modal.innerHTML = `<div class="experience-backdrop" data-close-experience></div><div class="experience-window"><div class="experience-window-head"><div><small id="experience-kicker"></small><h2 id="experience-title"></h2></div><button class="experience-close" data-close-experience aria-label="Close">×</button></div><div class="experience-tabs"><button data-tab="overview">OVERVIEW</button><button data-tab="play" class="is-active">PLAY</button><button data-tab="architecture">ARCHITECTURE</button><button data-tab="code">CODE</button></div><div id="experience-stage"></div></div>`;
      document.body.appendChild(modal);
      const badge = document.createElement('button');
      badge.id = 'experience-progress';
      badge.className = 'experience-progress-badge';
      badge.type = 'button';
      document.body.appendChild(badge);
      const toast = document.createElement('div');
      toast.id = 'experience-achievement';
      toast.className = 'experience-achievement';
      toast.innerHTML = '<strong>RECRUITER% SPEEDRUN COMPLETE</strong><span>You solved all three systems.</span>';
      document.body.appendChild(toast);
      this.modal = modal;
      this.stage = q('#experience-stage', modal);
    }

    bind() {
      qa('[data-open-project]').forEach((button) => button.addEventListener('click', () => this.open(button.dataset.openProject,'play')));
      qa('[data-project-overview]').forEach((button) => button.addEventListener('click', () => this.open(button.dataset.projectOverview,'overview')));
      qa('[data-close-experience]', this.modal).forEach((button) => button.addEventListener('click', () => this.close()));
      qa('[data-tab]', this.modal).forEach((button) => button.addEventListener('click', () => this.switchTab(button.dataset.tab)));
      document.addEventListener('keydown', (event) => { if (event.key === 'Escape') this.close(); });
    }

    open(key, tab) {
      if (!PROJECTS[key]) return;
      this.current = key;
      q('#experience-title', this.modal).textContent = PROJECTS[key].title;
      q('#experience-kicker', this.modal).textContent = PROJECTS[key].kicker;
      this.modal.classList.add('is-open');
      this.modal.setAttribute('aria-hidden','false');
      document.body.classList.add('experience-open');
      this.switchTab(tab);
    }

    close() {
      this.modal.classList.remove('is-open');
      this.modal.setAttribute('aria-hidden','true');
      document.body.classList.remove('experience-open');
    }

    switchTab(tab) {
      if (!this.current) return;
      qa('[data-tab]', this.modal).forEach((button) => button.classList.toggle('is-active', button.dataset.tab === tab));
      const project = PROJECTS[this.current];
      if (tab === 'overview') this.renderOverview(project);
      else if (tab === 'architecture') this.renderArchitecture(project);
      else if (tab === 'code') this.renderCode(project);
      else this.renderGame(this.current);
    }

    renderOverview(project) {
      this.stage.innerHTML = `<div class="experience-copy"><span class="experience-sticker">WHY IT EXISTS</span><h3>${project.title} in plain English</h3><p>${project.overview}</p><button class="game-primary" data-play-now>PLAY THE IDEA →</button></div>`;
      q('[data-play-now]', this.stage)?.addEventListener('click', () => this.switchTab('play'));
    }

    renderArchitecture(project) {
      this.stage.innerHTML = `<div class="experience-copy"><span class="experience-sticker">UNDER THE HOOD</span><h3>How I think about the system</h3><div class="architecture-stack">${project.architecture.map((item,index) => `<div class="architecture-row"><span>0${index+1}</span><p>${item}</p></div>`).join('')}</div></div>`;
    }

    renderCode(project) {
      this.stage.innerHTML = `<div class="experience-copy code-door"><span class="experience-sticker">NO MAGIC BEHIND THE CURTAIN</span><h3>Inspect the actual repository.</h3><p>The game is the metaphor. The repository is the evidence.</p><a class="game-primary game-link" href="${project.repo}" target="_blank" rel="noreferrer">OPEN GITHUB ↗</a></div>`;
    }

    renderGame(key) {
      if (key === 'rate-limiter') this.rateLimiterGame();
      else if (key === 'maw3id') this.maw3idGame();
      else this.openTokenGame();
    }

    rateLimiterGame() {
      const clients = [
        {name:'Normal user',rate:2,icon:'🙂'}, {name:'Mobile app',rate:4,icon:'📱'}, {name:'Scraper',rate:11,icon:'🤖'}, {name:'Bot burst',rate:16,icon:'⚡'}, {name:'API client',rate:5,icon:'🧑‍💻'}
      ];
      let score = 0, round = 0, health = 100;
      const render = () => {
        if (round >= clients.length) return finish();
        const c = clients[round];
        this.stage.innerHTML = `<div class="game-shell"><div class="game-intro"><div><span class="experience-sticker">PACKET PANIC</span><h3>Protect the server without blocking real traffic.</h3></div><p>Your policy allows <strong>5 req/s</strong>. Decide what to do with each client.</p></div><div class="game-hud"><div><span>SERVER</span><strong>${health}%</strong></div><div><span>SCORE</span><strong>${score}</strong></div><div><span>ROUND</span><strong>${round+1}/${clients.length}</strong></div></div><div class="traffic-card"><span class="traffic-avatar">${c.icon}</span><div><small>${c.name.toUpperCase()}</small><h4>${c.rate} requests / second</h4></div></div><div class="game-choice-row"><button data-choice="allow">ALLOW</button><button data-choice="limit">RATE LIMIT</button></div></div>`;
        qa('[data-choice]', this.stage).forEach((button) => button.addEventListener('click', () => choose(button.dataset.choice)));
      };
      const choose = (choice) => {
        const c = clients[round];
        const shouldLimit = c.rate > 5;
        const correct = (choice === 'limit') === shouldLimit;
        score += correct ? 25 : -15;
        if (!correct && choice === 'allow') health -= Math.min(35, c.rate * 2);
        round += 1;
        render();
      };
      const finish = () => {
        const win = score >= 75 && health > 40;
        if (win) this.markWin('rate-limiter');
        this.stage.innerHTML = result(win, win ? 'SERVER SURVIVED' : 'SERVER MELTDOWN', win ? 'You balanced protection and legitimate traffic.' : 'The policy needs better decisions.', [['Score',score],['Server',`${health}%`],['Limit','5 req/s']]);
        this.bindResult('rate-limiter');
      };
      render();
    }

    maw3idGame() {
      const queue = [
        {name:'Amina',type:'Appointment',wait:8,urgency:3}, {name:'Youssef',type:'Walk-in',wait:28,urgency:5}, {name:'Salma',type:'Appointment',wait:20,urgency:4}, {name:'Hassan',type:'Walk-in',wait:42,urgency:7}
      ];
      let score = 0, seen = 0, redirected = 0, round = 0, totalWait = 0;
      const render = () => {
        if (!queue.length || round >= 4) return finish();
        const nearbyWait = 12 + round * 2;
        this.stage.innerHTML = `<div class="game-shell"><div class="game-intro"><div><span class="experience-sticker">QUEUE CHAOS</span><h3>Run the clinic without making people wait forever.</h3></div><p>Nearby doctor wait: <strong>${nearbyWait}m</strong>. Call the best next patient or redirect someone who can genuinely be seen faster nearby.</p></div><div class="game-hud"><div><span>SCORE</span><strong>${score}</strong></div><div><span>SEEN</span><strong>${seen}</strong></div><div><span>REDIRECTED</span><strong>${redirected}</strong></div></div><div class="queue-list">${queue.map((p,i) => `<div class="patient-card"><div><strong>${p.name}</strong><small>${p.type} · waited ${p.wait}m</small></div><div class="patient-actions"><button data-call="${i}">CALL</button><button data-redirect="${i}">REDIRECT</button></div></div>`).join('')}</div></div>`;
        qa('[data-call]', this.stage).forEach((b) => b.addEventListener('click', () => choose(Number(b.dataset.call),false)));
        qa('[data-redirect]', this.stage).forEach((b) => b.addEventListener('click', () => choose(Number(b.dataset.redirect),true)));
      };
      const choose = (index, redirect) => {
        const p = queue[index];
        if (!p) return;
        const nearbyWait = 12 + round * 2;
        if (redirect) {
          const useful = p.wait >= 30 && nearbyWait + 8 < p.wait;
          score += useful ? 30 : -15; redirected += 1;
        } else {
          const bestUrgency = Math.max(...queue.map((x) => x.urgency));
          score += p.urgency === bestUrgency ? 30 : -10; seen += 1; totalWait += p.wait;
        }
        queue.splice(index,1); round += 1; queue.forEach((x) => x.wait += 10); render();
      };
      const finish = () => {
        const avg = seen ? Math.round(totalWait/seen) : 0;
        const win = score >= 60;
        if (win) this.markWin('maw3id');
        this.stage.innerHTML = result(win, win ? 'CLINIC FLOWING' : 'WAITING ROOM CHAOS', win ? 'You kept the queue moving intelligently.' : 'The queue policy created unnecessary waiting.', [['Score',score],['Seen',seen],['Avg wait',`${avg}m`],['Redirected',redirected]]);
        this.bindResult('maw3id');
      };
      render();
    }

    openTokenGame() {
      const chunks = [
        {name:'Tool schema',tokens:300,redundancy:.85}, {name:'User request',tokens:120,redundancy:.1}, {name:'Repeated logs',tokens:280,redundancy:.9}, {name:'JSON payload',tokens:260,redundancy:.65}, {name:'System rules',tokens:190,redundancy:.15}
      ];
      let used = 0, integrity = 100, saved = 0, score = 0, round = 0;
      const capacity = 760;
      const render = () => {
        if (round >= chunks.length) return finish();
        const c = chunks[round];
        this.stage.innerHTML = `<div class="game-shell"><div class="game-intro"><div><span class="experience-sticker">CONTEXT CRUNCH</span><h3>Fit the context. Keep the meaning.</h3></div><p>Capacity <strong>${capacity} tokens</strong>. High redundancy tolerates stronger compression; unique instructions do not.</p></div><div class="game-hud"><div><span>CONTEXT</span><strong>${used}/${capacity}</strong></div><div><span>INTEGRITY</span><strong>${integrity}%</strong></div><div><span>SAVED</span><strong>${saved}</strong></div></div><div class="token-card"><small>CHUNK ${round+1}/${chunks.length}</small><h4>${c.name}</h4><strong>${c.tokens} TOKENS</strong><p>Structural redundancy: ${Math.round(c.redundancy*100)}%</p><div class="compression-actions"><button data-mode="keep">KEEP</button><button data-mode="safe">SAFE</button><button data-mode="hard">HARD</button></div></div></div>`;
        qa('[data-mode]', this.stage).forEach((b) => b.addEventListener('click', () => choose(b.dataset.mode)));
      };
      const choose = (mode) => {
        const c = chunks[round];
        let final = c.tokens, loss = 0;
        if (mode === 'safe') final = Math.round(c.tokens * (1 - (.1 + c.redundancy*.3)));
        if (mode === 'hard') { final = Math.round(c.tokens * (1 - clamp(.35 + c.redundancy*.45,0,.8))); if (c.redundancy < .5) loss = Math.ceil((.5-c.redundancy)*20); }
        if (mode === 'keep' && c.redundancy > .7) score -= 8; else score += mode === 'hard' && loss === 0 ? 30 : mode === 'safe' ? 20 : 10;
        integrity = clamp(integrity-loss,0,100); used += final; saved += c.tokens-final; round += 1; render();
      };
      const finish = () => {
        const win = used <= capacity && integrity >= 90;
        if (win) this.markWin('opentoken');
        this.stage.innerHTML = result(win, win ? 'CONTEXT SAVED' : 'CONTEXT FAILED', win ? 'Dense enough. Meaning intact.' : used > capacity ? 'The context window overflowed.' : 'Too much information was destroyed.', [['Tokens',used],['Saved',saved],['Integrity',`${integrity}%`],['Score',score]]);
        this.bindResult('opentoken');
      };
      render();
    }

    bindResult(key) {
      q('[data-replay]', this.stage)?.addEventListener('click', () => this.renderGame(key));
      q('[data-learn]', this.stage)?.addEventListener('click', () => this.switchTab('architecture'));
    }

    loadProgress() {
      try { return JSON.parse(localStorage.getItem('yazidPortfolioWins')) || {}; } catch { return {}; }
    }

    markWin(key) {
      this.progress[key] = true;
      localStorage.setItem('yazidPortfolioWins', JSON.stringify(this.progress));
      this.renderProgress();
      if (Object.keys(PROJECTS).every((k) => this.progress[k])) {
        const toast = q('#experience-achievement');
        toast?.classList.add('show');
        setTimeout(() => toast?.classList.remove('show'), 4500);
      }
    }

    renderProgress() {
      const solved = Object.keys(PROJECTS).filter((k) => this.progress[k]).length;
      const badge = q('#experience-progress');
      if (badge) badge.textContent = `${solved}/3 SYSTEMS SOLVED`;
    }
  }

  function result(win, sticker, heading, values) {
    return `<div class="game-result ${win ? 'is-win' : 'is-loss'}"><span class="experience-sticker">${sticker}</span><h3>${heading}</h3><div class="result-grid">${values.map(([label,value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('')}</div><div class="result-actions"><button class="game-primary" data-replay>REPLAY</button><button class="game-secondary" data-learn>SEE ARCHITECTURE</button></div></div>`;
  }

  personalize();
  new Experience();
})();
