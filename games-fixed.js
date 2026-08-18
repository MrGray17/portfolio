(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const PROJECTS = {
    'rate-limiter': {
      title: 'Rate Limiter',
      kicker: 'BACKEND SYSTEMS / TRAFFIC CONTROL',
      repo: 'https://github.com/MrGray17/rate-limiter',
      overview: 'Rate limiting is traffic control for APIs. The system tracks how much traffic a client is sending and decides whether the next request should pass or be rejected before one noisy client can overwhelm the service.',
      architecture: [
        'Identify a request by a key such as user ID, token or IP.',
        'Track request state for that key inside a time window.',
        'Allow or reject the request according to the configured policy.',
        'Compare algorithms and eventually move state into a distributed store.'
      ]
    },
    maw3id: {
      title: 'Maw3id',
      kicker: 'FULL-STACK PRODUCT / CLINIC FLOW',
      repo: 'https://github.com/MrGray17/Maw3id',
      overview: 'Maw3id turns a messy clinic day into one visible operational queue: appointments, walk-ins, late arrivals, no-shows and nearby alternatives all need to coexist without reception juggling everything mentally.',
      architecture: [
        'React + TypeScript frontend for patient and clinic workflows.',
        'Express API for queue, appointment and clinic operations.',
        'PostgreSQL for durable relational state.',
        'Map-based discovery for nearby doctors and lower-wait alternatives.'
      ]
    },
    opentoken: {
      title: 'OpenToken',
      kicker: 'AI TOOLING / CONTEXT EFFICIENCY',
      repo: 'https://github.com/MrGray17/opentoken',
      overview: 'OpenToken explores how much repeated context can be compressed without destroying information an AI workflow still needs. The useful result is not a flashy percentage; it is measurable savings with preserved meaning.',
      architecture: [
        'Accept repeated structured context such as schemas, logs and JSON.',
        'Detect repetition or compressible structure.',
        'Reduce representation cost while preserving useful information.',
        'Use tests and benchmarks to measure savings, integrity and latency.'
      ]
    }
  };

  function el(tag, options = {}, children = []) {
    const node = document.createElement(tag);
    if (options.className) node.className = options.className;
    if (options.text !== undefined) node.textContent = String(options.text);
    if (options.type) node.type = options.type;
    if (options.href) node.href = options.href;
    if (options.target) node.target = options.target;
    if (options.rel) node.rel = options.rel;
    if (options.dataset) Object.assign(node.dataset, options.dataset);
    if (options.attrs) Object.entries(options.attrs).forEach(([key, value]) => node.setAttribute(key, value));
    (Array.isArray(children) ? children : [children]).filter(Boolean).forEach((child) => node.append(child));
    return node;
  }

  function ensureSQL() {
    const hero = $('.hero > .tech-badges');
    if (hero && !Array.from(hero.children).some((item) => item.textContent.trim().toLowerCase() === 'sql')) {
      hero.append(el('span', { className: 'tech-badge', text: 'SQL' }));
    }

    const languageBox = $$('.skill-box').find((box) => box.querySelector('.skill-box-title')?.textContent.trim() === 'Languages');
    const tags = languageBox?.querySelector('.tech-tags');
    if (tags && !Array.from(tags.children).some((item) => item.textContent.trim().toLowerCase() === 'sql')) {
      tags.append(el('span', { className: 'tag', text: 'SQL' }));
    }
  }

  class GamesApp {
    constructor() {
      this.current = null;
      this.progress = this.loadProgress();
      this.removeStaleUI();
      this.mount();
      this.bindProjectButtons();
      this.renderProgress();
    }

    removeStaleUI() {
      ['#project-experience', '#experience-progress', '#experience-achievement'].forEach((selector) => {
        $$(selector).forEach((node) => node.remove());
      });
    }

    mount() {
      this.modal = el('div', { className: 'project-experience-modal', attrs: { id: 'project-experience', 'aria-hidden': 'true' } });
      const backdrop = el('button', { className: 'experience-backdrop', type: 'button', attrs: { 'aria-label': 'Close project experience' } });
      const windowBox = el('div', { className: 'experience-window' });
      const head = el('div', { className: 'experience-window-head' });
      const titleWrap = el('div');
      this.kicker = el('small');
      this.title = el('h2');
      titleWrap.append(this.kicker, this.title);
      const close = el('button', { className: 'experience-close', text: '×', type: 'button', attrs: { 'aria-label': 'Close' } });
      head.append(titleWrap, close);

      this.tabs = el('div', { className: 'experience-tabs' });
      ['overview', 'play', 'architecture', 'code'].forEach((name) => {
        const button = el('button', { text: name.toUpperCase(), type: 'button', dataset: { tab: name } });
        button.addEventListener('click', () => this.switchTab(name));
        this.tabs.append(button);
      });

      this.stage = el('div', { className: 'experience-stage', attrs: { id: 'experience-stage' } });
      windowBox.append(head, this.tabs, this.stage);
      this.modal.append(backdrop, windowBox);
      document.body.append(this.modal);

      this.progressBadge = el('button', { className: 'experience-progress-badge', type: 'button' });
      document.body.append(this.progressBadge);

      this.toast = el('div', { className: 'experience-achievement' }, [
        el('strong', { text: 'RECRUITER% SPEEDRUN COMPLETE' }),
        el('span', { text: 'You solved all three systems.' })
      ]);
      document.body.append(this.toast);

      backdrop.addEventListener('click', () => this.close());
      close.addEventListener('click', () => this.close());
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && this.modal.classList.contains('is-open')) this.close();
      });
    }

    bindProjectButtons() {
      $$('[data-open-project]').forEach((button) => {
        const clone = button.cloneNode(true);
        button.replaceWith(clone);
        clone.addEventListener('click', (event) => {
          event.preventDefault();
          this.open(clone.dataset.openProject, 'play');
        });
      });

      $$('[data-project-overview]').forEach((button) => {
        const clone = button.cloneNode(true);
        button.replaceWith(clone);
        clone.addEventListener('click', (event) => {
          event.preventDefault();
          this.open(clone.dataset.projectOverview, 'overview');
        });
      });
    }

    open(key, tab = 'play') {
      if (!PROJECTS[key]) return;
      this.current = key;
      this.title.textContent = PROJECTS[key].title;
      this.kicker.textContent = PROJECTS[key].kicker;
      this.modal.classList.add('is-open');
      this.modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('experience-open');
      this.switchTab(tab);
    }

    close() {
      this.modal.classList.remove('is-open');
      this.modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('experience-open');
    }

    switchTab(tab) {
      if (!this.current) return;
      $$('[data-tab]', this.tabs).forEach((button) => button.classList.toggle('is-active', button.dataset.tab === tab));
      this.stage.replaceChildren();
      const project = PROJECTS[this.current];
      if (tab === 'overview') this.renderOverview(project);
      else if (tab === 'architecture') this.renderArchitecture(project);
      else if (tab === 'code') this.renderCode(project);
      else this.renderGame(this.current);
    }

    renderOverview(project) {
      const wrap = el('div', { className: 'experience-copy' });
      wrap.append(
        el('span', { className: 'experience-sticker', text: 'WHY IT EXISTS' }),
        el('h3', { text: `${project.title} in plain English` }),
        el('p', { text: project.overview })
      );
      const play = el('button', { className: 'game-primary', text: 'PLAY THE IDEA →', type: 'button' });
      play.addEventListener('click', () => this.switchTab('play'));
      wrap.append(play);
      this.stage.append(wrap);
    }

    renderArchitecture(project) {
      const wrap = el('div', { className: 'experience-copy' });
      wrap.append(el('span', { className: 'experience-sticker', text: 'UNDER THE HOOD' }), el('h3', { text: 'How the system fits together' }));
      const stack = el('div', { className: 'architecture-stack' });
      project.architecture.forEach((item, index) => {
        stack.append(el('div', { className: 'architecture-row' }, [
          el('span', { text: `0${index + 1}` }),
          el('p', { text: item })
        ]));
      });
      wrap.append(stack);
      this.stage.append(wrap);
    }

    renderCode(project) {
      const wrap = el('div', { className: 'experience-copy' });
      wrap.append(
        el('span', { className: 'experience-sticker', text: 'THE REPO IS THE EVIDENCE' }),
        el('h3', { text: 'Inspect the actual code.' }),
        el('p', { text: 'The game is the metaphor. The repository is where the engineering should hold up.' }),
        el('a', { className: 'game-primary game-link', text: 'OPEN GITHUB ↗', href: project.repo, target: '_blank', rel: 'noreferrer' })
      );
      this.stage.append(wrap);
    }

    gameShell(sticker, heading, intro, stats) {
      const shell = el('div', { className: 'game-shell' });
      const introBox = el('div', { className: 'game-intro' }, [
        el('span', { className: 'experience-sticker', text: sticker }),
        el('h3', { text: heading }),
        el('p', { text: intro })
      ]);
      const hud = el('div', { className: 'game-hud' });
      stats.forEach(([label, value]) => hud.append(this.stat(label, value)));
      shell.append(introBox, hud);
      return shell;
    }

    stat(label, value) {
      return el('div', { className: 'game-stat' }, [el('span', { text: label }), el('strong', { text: value })]);
    }

    renderGame(key) {
      if (key === 'rate-limiter') this.packetPanic();
      else if (key === 'maw3id') this.queueChaos();
      else this.contextCrunch();
    }

    packetPanic() {
      const clients = [
        { name: 'Normal user', rate: 2, icon: '🙂' },
        { name: 'Mobile app', rate: 4, icon: '📱' },
        { name: 'Scraper', rate: 11, icon: '🤖' },
        { name: 'Bot burst', rate: 16, icon: '⚡' },
        { name: 'API client', rate: 5, icon: '🧑‍💻' }
      ];
      let round = 0;
      let score = 0;
      let health = 100;

      const render = () => {
        this.stage.replaceChildren();
        if (round >= clients.length) return finish();
        const client = clients[round];
        const shell = this.gameShell('PACKET PANIC', 'Protect the server without blocking normal traffic.', 'Policy: clients above 5 requests/second should be rate limited.', [
          ['SERVER', `${health}%`], ['SCORE', score], ['ROUND', `${round + 1}/${clients.length}`]
        ]);
        const card = el('div', { className: 'game-card' }, [
          el('div', { className: 'game-emoji', text: client.icon }),
          el('small', { text: client.name.toUpperCase() }),
          el('h4', { text: `${client.rate} requests / second` })
        ]);
        const actions = el('div', { className: 'game-actions' });
        const allow = el('button', { text: 'ALLOW', type: 'button' });
        const limit = el('button', { className: 'danger', text: 'RATE LIMIT', type: 'button' });
        const choose = (choice) => {
          const shouldLimit = client.rate > 5;
          const correct = (choice === 'limit') === shouldLimit;
          score += correct ? 25 : -15;
          if (!correct && choice === 'allow') health = Math.max(0, health - Math.min(35, client.rate * 2));
          round += 1;
          render();
        };
        allow.addEventListener('click', () => choose('allow'));
        limit.addEventListener('click', () => choose('limit'));
        actions.append(allow, limit);
        card.append(actions);
        shell.append(card);
        this.stage.append(shell);
      };

      const finish = () => {
        const won = score >= 75 && health > 40;
        if (won) this.markWin('rate-limiter');
        this.renderResult('rate-limiter', won, won ? 'SERVER SURVIVED' : 'SERVER MELTDOWN', won ? 'You protected the service without blocking normal traffic.' : 'The policy decisions let bad traffic through or blocked too many good clients.', [
          ['Score', score], ['Server', `${health}%`], ['Limit', '5 req/s']
        ]);
      };

      render();
    }

    queueChaos() {
      let queue = [
        { name: 'Amina', type: 'Appointment', wait: 8, urgency: 3 },
        { name: 'Youssef', type: 'Walk-in', wait: 28, urgency: 5 },
        { name: 'Salma', type: 'Appointment', wait: 20, urgency: 4 },
        { name: 'Hassan', type: 'Walk-in', wait: 42, urgency: 7 }
      ];
      let round = 0;
      let score = 0;
      let seen = 0;
      let redirected = 0;
      let totalWait = 0;

      const render = () => {
        this.stage.replaceChildren();
        if (!queue.length || round >= 4) return finish();
        const nearbyWait = 12 + round * 2;
        const shell = this.gameShell('QUEUE CHAOS', 'Keep the clinic moving.', `Nearby doctor wait: ${nearbyWait} minutes. Call the best next patient, or redirect someone only when the nearby option is genuinely faster.`, [
          ['SCORE', score], ['SEEN', seen], ['REDIRECTED', redirected]
        ]);
        const list = el('div', { className: 'queue-list' });
        queue.forEach((patient, index) => {
          const actions = el('div', { className: 'game-actions' });
          const call = el('button', { text: 'CALL', type: 'button' });
          const redirect = el('button', { className: 'danger', text: 'REDIRECT', type: 'button' });
          call.addEventListener('click', () => choose(index, false));
          redirect.addEventListener('click', () => choose(index, true));
          actions.append(call, redirect);
          list.append(el('div', { className: 'game-card patient-card' }, [
            el('div', {}, [el('strong', { text: patient.name }), el('p', { text: `${patient.type} · waited ${patient.wait}m` })]),
            actions
          ]));
        });
        shell.append(list);
        this.stage.append(shell);
      };

      const choose = (index, redirecting) => {
        const patient = queue[index];
        if (!patient) return;
        const nearbyWait = 12 + round * 2;
        if (redirecting) {
          const useful = patient.wait >= 30 && nearbyWait + 8 < patient.wait;
          score += useful ? 30 : -15;
          redirected += 1;
        } else {
          const highestUrgency = Math.max(...queue.map((item) => item.urgency));
          score += patient.urgency === highestUrgency ? 30 : -10;
          seen += 1;
          totalWait += patient.wait;
        }
        queue.splice(index, 1);
        round += 1;
        queue = queue.map((item) => ({ ...item, wait: item.wait + 10 }));
        render();
      };

      const finish = () => {
        const average = seen ? Math.round(totalWait / seen) : 0;
        const won = score >= 60;
        if (won) this.markWin('maw3id');
        this.renderResult('maw3id', won, won ? 'CLINIC FLOWING' : 'WAITING ROOM CHAOS', won ? 'Your decisions kept the queue moving intelligently.' : 'Your queue policy created unnecessary waiting.', [
          ['Score', score], ['Seen', seen], ['Avg wait', `${average}m`], ['Redirected', redirected]
        ]);
      };

      render();
    }

    contextCrunch() {
      const chunks = [
        { name: 'Tool schema', tokens: 300, redundancy: 0.85 },
        { name: 'User request', tokens: 120, redundancy: 0.10 },
        { name: 'Repeated logs', tokens: 280, redundancy: 0.90 },
        { name: 'JSON payload', tokens: 260, redundancy: 0.65 },
        { name: 'System rules', tokens: 190, redundancy: 0.15 }
      ];
      const capacity = 760;
      let round = 0;
      let used = 0;
      let integrity = 100;
      let saved = 0;
      let score = 0;

      const render = () => {
        this.stage.replaceChildren();
        if (round >= chunks.length) return finish();
        const chunk = chunks[round];
        const shell = this.gameShell('CONTEXT CRUNCH', 'Fit the context. Keep the meaning.', `Capacity: ${capacity} tokens. High-redundancy chunks tolerate stronger compression than unique instructions.`, [
          ['CONTEXT', `${used}/${capacity}`], ['INTEGRITY', `${integrity}%`], ['SAVED', saved]
        ]);
        const actions = el('div', { className: 'game-actions' });
        ['KEEP', 'SAFE', 'HARD'].forEach((mode) => {
          const button = el('button', { className: mode === 'HARD' ? 'danger' : '', text: mode, type: 'button' });
          button.addEventListener('click', () => choose(mode.toLowerCase()));
          actions.append(button);
        });
        shell.append(el('div', { className: 'game-card token-card' }, [
          el('small', { text: `CHUNK ${round + 1}/${chunks.length}` }),
          el('h4', { text: chunk.name }),
          el('strong', { text: `${chunk.tokens} TOKENS` }),
          el('p', { text: `Structural redundancy: ${Math.round(chunk.redundancy * 100)}%` }),
          actions
        ]));
        this.stage.append(shell);
      };

      const choose = (mode) => {
        const chunk = chunks[round];
        let finalTokens = chunk.tokens;
        let loss = 0;
        if (mode === 'safe') finalTokens = Math.round(chunk.tokens * (1 - (0.1 + chunk.redundancy * 0.3)));
        if (mode === 'hard') {
          const reduction = Math.min(0.8, Math.max(0, 0.35 + chunk.redundancy * 0.45));
          finalTokens = Math.round(chunk.tokens * (1 - reduction));
          if (chunk.redundancy < 0.5) loss = Math.ceil((0.5 - chunk.redundancy) * 20);
        }
        if (mode === 'keep' && chunk.redundancy > 0.7) score -= 8;
        else if (mode === 'hard' && loss === 0) score += 30;
        else if (mode === 'safe') score += 20;
        else score += 10;
        integrity = Math.max(0, integrity - loss);
        used += finalTokens;
        saved += chunk.tokens - finalTokens;
        round += 1;
        render();
      };

      const finish = () => {
        const won = used <= capacity && integrity >= 90;
        if (won) this.markWin('opentoken');
        this.renderResult('opentoken', won, won ? 'CONTEXT SAVED' : 'CONTEXT FAILED', won ? 'Dense enough, and the important information survived.' : used > capacity ? 'The context window overflowed.' : 'Too much information was destroyed.', [
          ['Tokens', used], ['Saved', saved], ['Integrity', `${integrity}%`], ['Score', score]
        ]);
      };

      render();
    }

    renderResult(key, won, sticker, heading, values) {
      this.stage.replaceChildren();
      const wrap = el('div', { className: `game-result ${won ? 'is-win' : 'is-loss'}` });
      wrap.append(el('span', { className: 'experience-sticker', text: sticker }), el('h3', { text: heading }));
      const grid = el('div', { className: 'result-grid' });
      values.forEach(([label, value]) => grid.append(el('div', {}, [el('span', { text: label }), el('strong', { text: value })])));
      const actions = el('div', { className: 'result-actions' });
      const replay = el('button', { className: 'game-primary', text: 'REPLAY', type: 'button' });
      const architecture = el('button', { className: 'game-secondary', text: 'SEE ARCHITECTURE', type: 'button' });
      replay.addEventListener('click', () => this.renderGame(key));
      architecture.addEventListener('click', () => this.switchTab('architecture'));
      actions.append(replay, architecture);
      wrap.append(grid, actions);
      this.stage.append(wrap);
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
      if (Object.keys(PROJECTS).every((project) => this.progress[project])) {
        this.toast.classList.add('show');
        setTimeout(() => this.toast.classList.remove('show'), 4500);
      }
    }

    renderProgress() {
      const solved = Object.keys(PROJECTS).filter((project) => this.progress[project]).length;
      this.progressBadge.textContent = `${solved}/3 SYSTEMS SOLVED`;
    }
  }

  function boot() {
    ensureSQL();
    try {
      window.yazidGames = new GamesApp();
      console.info('[portfolio] project games booted');
    } catch (error) {
      console.error('[portfolio] game boot failed', error);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();