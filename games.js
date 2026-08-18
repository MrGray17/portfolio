(() => {
  const PROJECTS = {
    "rate-limiter": {
      title: "Rate Limiter",
      kicker: "TRAFFIC CONTROL / BACKEND SYSTEMS",
      repo: "https://github.com/MrGray17/rate-limiter",
      overview:
        "APIs do not fail only because they are slow. They fail when too much work arrives at once. My rate limiter project is where I am learning how request limits, windows, HTTP behavior, tests, and eventually distributed state fit together.",
      architecture: [
        "A client key identifies who is consuming capacity.",
        "A fixed time window tracks how many requests that key has made.",
        "Requests inside the limit pass; excess requests are rejected.",
        "Tests cover acceptance, rejection, reset behavior, and HTTP integration.",
        "Next: sliding windows, token bucket, Redis-backed atomic state, and benchmarks.",
      ],
      game: "rateLimiter",
    },
    maw3id: {
      title: "Maw3id",
      kicker: "REAL-WORLD QUEUES / FULL-STACK PRODUCT",
      repo: "https://github.com/MrGray17/Maw3id",
      overview:
        "Maw3id is built around a real clinic workflow: phone appointments, walk-ins, one daily queue, doctor state, and the ability to discover nearby doctors with shorter waits. The challenge is not drawing a calendar. It is coordinating a living queue.",
      architecture: [
        "Reception staff add appointments and walk-ins into one operational queue.",
        "The doctor advances patients through waiting, called, consultation, and done states.",
        "PostgreSQL holds the durable clinic, patient, appointment, and queue state.",
        "The React/TypeScript client consumes an Express API and map data.",
        "Nearby-doctor discovery turns queue data into a useful patient decision.",
      ],
      game: "maw3id",
    },
    opentoken: {
      title: "OpenToken",
      kicker: "AI TOOLING / INFORMATION DENSITY",
      repo: "https://github.com/MrGray17/opentoken",
      overview:
        "OpenToken explores a simple pressure in AI systems: context is finite and repeated structure is expensive. The interesting engineering question is not just how much you can remove, but how much useful information survives the transformation.",
      architecture: [
        "A TypeScript/Bun monorepo separates reusable compression logic from integrations.",
        "Inputs can contain repeated structure such as tool schemas, logs, JSON, and agent traces.",
        "Compression is useful only when the downstream system still has the information it needs.",
        "The repository runs type checks, linting, regex-safety checks, and tests as part of its build.",
        "The long-term question is measurable: token savings versus information loss and latency.",
      ],
      game: "openToken",
    },
  };

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  class PortfolioExperience {
    constructor() {
      this.modal = qs("#project-experience");
      this.stage = qs("#experience-stage");
      this.title = qs("#experience-title");
      this.kicker = qs("#experience-kicker");
      this.currentProject = null;
      this.currentCleanup = null;
      this.progress = this.loadProgress();
      if (!this.modal || !this.stage) return;
      this.bind();
      this.renderProgress();
    }

    bind() {
      qsa("[data-open-project]").forEach((button) => {
        button.addEventListener("click", () => this.open(button.dataset.openProject, "play"));
      });
      qsa("[data-project-overview]").forEach((button) => {
        button.addEventListener("click", () => this.open(button.dataset.projectOverview, "overview"));
      });
      qsa("[data-experience-tab]", this.modal).forEach((button) => {
        button.addEventListener("click", () => this.switchTab(button.dataset.experienceTab));
      });
      qs("[data-close-experience]", this.modal)?.addEventListener("click", () => this.close());
      qs(".experience-backdrop", this.modal)?.addEventListener("click", () => this.close());
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && this.modal.classList.contains("is-open")) this.close();
      });
    }

    open(projectKey, tab = "play") {
      const project = PROJECTS[projectKey];
      if (!project) return;
      this.cleanupGame();
      this.currentProject = projectKey;
      this.title.textContent = project.title;
      this.kicker.textContent = project.kicker;
      this.modal.classList.add("is-open");
      this.modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("experience-open");
      this.switchTab(tab);
      qs("[data-close-experience]", this.modal)?.focus();
    }

    close() {
      this.cleanupGame();
      this.modal.classList.remove("is-open");
      this.modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("experience-open");
    }

    cleanupGame() {
      if (typeof this.currentCleanup === "function") this.currentCleanup();
      this.currentCleanup = null;
    }

    switchTab(tab) {
      if (!this.currentProject) return;
      this.cleanupGame();
      qsa("[data-experience-tab]", this.modal).forEach((button) => {
        button.classList.toggle("is-active", button.dataset.experienceTab === tab);
      });
      const project = PROJECTS[this.currentProject];
      if (tab === "overview") this.renderOverview(project);
      else if (tab === "architecture") this.renderArchitecture(project);
      else if (tab === "code") this.renderCode(project);
      else this.renderGame(project);
    }

    renderOverview(project) {
      this.stage.innerHTML = `
        <div class="experience-copy">
          <span class="experience-sticker">WHY IT EXISTS</span>
          <h3>${project.title} in plain English</h3>
          <p>${project.overview}</p>
          <button class="game-primary" data-jump-play>PLAY THE IDEA →</button>
        </div>`;
      qs("[data-jump-play]", this.stage)?.addEventListener("click", () => this.switchTab("play"));
    }

    renderArchitecture(project) {
      this.stage.innerHTML = `
        <div class="experience-copy">
          <span class="experience-sticker">UNDER THE HOOD</span>
          <h3>How I think about the system</h3>
          <div class="architecture-stack">
            ${project.architecture.map((item, index) => `<div class="architecture-row"><span>0${index + 1}</span><p>${item}</p></div>`).join("")}
          </div>
        </div>`;
    }

    renderCode(project) {
      this.stage.innerHTML = `
        <div class="experience-copy code-door">
          <span class="experience-sticker">NO MAGIC BEHIND THE CURTAIN</span>
          <h3>Inspect the actual repository.</h3>
          <p>The game is the metaphor. The repository is the evidence.</p>
          <a class="game-primary game-link" href="${project.repo}" target="_blank" rel="noreferrer">OPEN GITHUB ↗</a>
        </div>`;
    }

    renderGame(project) {
      const gameFactory = {
        rateLimiter: () => this.rateLimiterGame(),
        maw3id: () => this.maw3idGame(),
        openToken: () => this.openTokenGame(),
      }[project.game];
      if (gameFactory) this.currentCleanup = gameFactory();
    }

    loadProgress() {
      try {
        return JSON.parse(localStorage.getItem("yazidPortfolioWins")) || {};
      } catch {
        return {};
      }
    }

    markWin(projectKey) {
      this.progress[projectKey] = true;
      localStorage.setItem("yazidPortfolioWins", JSON.stringify(this.progress));
      this.renderProgress();
      if (Object.keys(PROJECTS).every((key) => this.progress[key])) {
        const toast = qs("#experience-achievement");
        if (toast) {
          toast.classList.add("is-visible");
          setTimeout(() => toast.classList.remove("is-visible"), 6000);
        }
      }
    }

    renderProgress() {
      const solved = Object.keys(PROJECTS).filter((key) => this.progress[key]).length;
      qsa("[data-experience-progress]").forEach((el) => {
        el.textContent = `${solved}/3 SYSTEMS SOLVED`;
      });
      qsa("[data-project-card]").forEach((card) => {
        card.classList.toggle("is-solved", Boolean(this.progress[card.dataset.projectCard]));
      });
    }

    rateLimiterGame() {
      this.stage.innerHTML = `
        <div class="game-shell rate-game">
          <div class="game-intro">
            <div><span class="experience-sticker">PACKET PANIC</span><h3>Keep the server alive.</h3></div>
            <p>Every 5-second window, watch each client's request count. If a client exceeds <strong>5 requests</strong>, throttle it before the window closes. Throttling normal users costs points.</p>
          </div>
          <div class="game-hud">
            <div><span>SERVER</span><strong id="rl-health">100%</strong></div>
            <div><span>SCORE</span><strong id="rl-score">0</strong></div>
            <div><span>WINDOW</span><strong id="rl-window">1/6</strong></div>
          </div>
          <div class="server-health"><div id="rl-health-bar"></div></div>
          <div class="client-grid" id="rl-clients"></div>
          <div class="game-log" id="rl-log">Window opened. Watch the counters.</div>
        </div>`;

      const clientsEl = qs("#rl-clients", this.stage);
      const logEl = qs("#rl-log", this.stage);
      const scoreEl = qs("#rl-score", this.stage);
      const healthEl = qs("#rl-health", this.stage);
      const healthBar = qs("#rl-health-bar", this.stage);
      const windowEl = qs("#rl-window", this.stage);
      const names = ["client.alpha", "client.beta", "client.gamma"];
      const state = {
        score: 0,
        health: 100,
        window: 1,
        tick: 0,
        ended: false,
        clients: names.map((name) => ({ name, count: 0, target: 0, throttled: false })),
      };

      const rollTargets = () => {
        const abusiveIndex = Math.floor(Math.random() * state.clients.length);
        const safeIndex = (abusiveIndex + 1 + Math.floor(Math.random() * 2)) % state.clients.length;
        state.clients.forEach((client, index) => {
          client.count = 0;
          client.throttled = false;
          if (index === abusiveIndex) client.target = 8 + Math.floor(Math.random() * 5);
          else if (index === safeIndex) client.target = 2 + Math.floor(Math.random() * 3);
          else client.target = Math.random() > 0.45 ? 6 + Math.floor(Math.random() * 4) : 3 + Math.floor(Math.random() * 3);
        });
      };

      const renderClients = () => {
        clientsEl.innerHTML = state.clients.map((client, index) => `
          <button class="client-card ${client.throttled ? "is-throttled" : ""}" data-client-index="${index}">
            <div class="client-top"><span>${client.name}</span><b>${client.count}</b></div>
            <div class="request-meter"><div style="width:${clamp((client.count / 10) * 100, 4, 100)}%"></div></div>
            <small>${client.count <= 5 ? "within limit" : "LIMIT EXCEEDED"}</small>
            <strong>${client.throttled ? "THROTTLED ✓" : "CLICK TO THROTTLE"}</strong>
          </button>`).join("");
        qsa("[data-client-index]", clientsEl).forEach((button) => {
          button.addEventListener("click", () => {
            if (state.ended) return;
            const client = state.clients[Number(button.dataset.clientIndex)];
            client.throttled = !client.throttled;
            renderClients();
          });
        });
      };

      const updateHud = () => {
        scoreEl.textContent = state.score;
        healthEl.textContent = `${state.health}%`;
        healthBar.style.width = `${state.health}%`;
        windowEl.textContent = `${state.window}/6`;
      };

      const evaluateWindow = () => {
        const summary = [];
        state.clients.forEach((client) => {
          const abusive = client.target > 5;
          if (abusive && client.throttled) {
            const blocked = client.target - 5;
            state.score += 80 + blocked * 5;
            summary.push(`${client.name}: ${blocked} excess requests blocked`);
          } else if (abusive && !client.throttled) {
            const damage = (client.target - 5) * 6;
            state.health = clamp(state.health - damage, 0, 100);
            state.score -= 30;
            summary.push(`${client.name}: overload hit server (-${damage}% health)`);
          } else if (!abusive && client.throttled) {
            state.score -= 45;
            summary.push(`${client.name}: false positive — normal user throttled`);
          } else {
            state.score += 25;
            summary.push(`${client.name}: served normally`);
          }
        });
        logEl.textContent = summary.join(" • ");
        updateHud();
      };

      const finish = () => {
        state.ended = true;
        const win = state.health >= 55 && state.score > 0;
        if (win) this.markWin("rate-limiter");
        this.stage.innerHTML = `
          <div class="game-result ${win ? "is-win" : "is-loss"}">
            <span class="experience-sticker">${win ? "SERVER SURVIVED" : "SERVER OVERLOADED"}</span>
            <h3>${win ? "You found the noisy clients." : "Too much traffic got through."}</h3>
            <div class="result-grid"><div><span>Health</span><strong>${state.health}%</strong></div><div><span>Score</span><strong>${state.score}</strong></div></div>
            <p>This manual game is the human version of what the real limiter automates per client key.</p>
            <div class="result-actions"><button class="game-primary" data-replay>REPLAY</button><button class="game-secondary" data-learn>SEE ARCHITECTURE</button></div>
          </div>`;
        qs("[data-replay]", this.stage)?.addEventListener("click", () => this.switchTab("play"));
        qs("[data-learn]", this.stage)?.addEventListener("click", () => this.switchTab("architecture"));
      };

      rollTargets();
      renderClients();
      updateHud();
      const interval = setInterval(() => {
        if (state.ended) return;
        state.tick += 1;
        state.clients.forEach((client) => {
          client.count = clamp(Math.round((client.target * state.tick) / 5), 0, client.target);
        });
        renderClients();
        if (state.tick >= 5) {
          evaluateWindow();
          if (state.health <= 0 || state.window >= 6) {
            clearInterval(interval);
            finish();
            return;
          }
          state.window += 1;
          state.tick = 0;
          rollTargets();
          updateHud();
          renderClients();
        }
      }, 1000);
      return () => clearInterval(interval);
    }

    maw3idGame() {
      this.stage.innerHTML = `
        <div class="game-shell maw3id-game">
          <div class="game-intro">
            <div><span class="experience-sticker">QUEUE CHAOS</span><h3>Run the morning clinic.</h3></div>
            <p>Choose who the doctor sees next. Respect appointments, do not starve walk-ins, and redirect long waits when a nearby doctor is genuinely faster.</p>
          </div>
          <div class="game-hud">
            <div><span>TIME</span><strong id="mq-time">08:30</strong></div>
            <div><span>SCORE</span><strong id="mq-score">0</strong></div>
            <div><span>SEEN</span><strong id="mq-seen">0</strong></div>
          </div>
          <div class="nearby-doctor" id="mq-nearby"></div>
          <div class="queue-board"><div class="queue-heading"><span>WAITING ROOM</span><small>call or redirect one patient</small></div><div id="mq-queue" class="patient-list"></div></div>
          <div class="game-log" id="mq-log">The doctor is ready. Make the first call.</div>
        </div>`;

      const queueEl = qs("#mq-queue", this.stage);
      const nearbyEl = qs("#mq-nearby", this.stage);
      const logEl = qs("#mq-log", this.stage);
      const timeEl = qs("#mq-time", this.stage);
      const scoreEl = qs("#mq-score", this.stage);
      const seenEl = qs("#mq-seen", this.stage);
      const names = ["Amal", "Youssef", "Khadija", "Omar", "Sara", "Hamza", "Nadia", "Mehdi", "Salma", "Anas", "Lina", "Ilyas"];
      let patientId = 0;
      const state = { minute: 510, turn: 0, score: 0, seen: 0, redirected: 0, totalWait: 0, ended: false, queue: [] };
      const formatTime = (minute) => `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
      const makePatient = (offset = 0) => {
        const appointment = Math.random() > 0.45;
        const arrival = state.minute - Math.floor(Math.random() * 18);
        const slot = appointment ? state.minute + offset + (Math.floor(Math.random() * 3) - 1) * 10 : null;
        return { id: ++patientId, name: names[patientId % names.length], type: appointment ? "appointment" : "walk-in", arrival, slot };
      };
      state.queue = [makePatient(0), makePatient(10), makePatient(-10), makePatient(20)];
      const waitOf = (patient) => Math.max(0, state.minute - patient.arrival);
      const urgency = (patient) => waitOf(patient) + (patient.type === "appointment" && state.minute >= patient.slot - 5 ? 28 : 0) + (patient.type === "appointment" && state.minute > patient.slot + 15 ? 8 : 0);
      const nearbyWait = () => 7 + ((state.turn * 5 + 3) % 14);

      const updateHud = () => {
        timeEl.textContent = formatTime(state.minute);
        scoreEl.textContent = state.score;
        seenEl.textContent = state.seen;
        nearbyEl.innerHTML = `<div><span>NEARBY</span><strong>Dr. Amrani ★ 4.7</strong></div><div><span>EST. WAIT</span><strong>${nearbyWait()} min</strong></div>`;
      };

      const renderQueue = () => {
        if (!state.queue.length) {
          queueEl.innerHTML = `<div class="empty-queue">Waiting room clear ✨</div>`;
          return;
        }
        queueEl.innerHTML = state.queue.map((patient) => {
          const wait = waitOf(patient);
          const label = patient.type === "appointment" ? `APPT ${formatTime(patient.slot)}` : `WALK-IN ${formatTime(patient.arrival)}`;
          return `<div class="patient-card">
            <div class="patient-main"><span class="patient-avatar">${patient.type === "appointment" ? "📅" : "🚶"}</span><div><strong>${patient.name}</strong><small>${label}</small></div></div>
            <div class="patient-wait"><span>WAIT</span><strong>${wait}m</strong></div>
            <div class="patient-actions"><button data-call="${patient.id}">CALL</button><button data-redirect="${patient.id}">REDIRECT</button></div>
          </div>`;
        }).join("");
        qsa("[data-call]", queueEl).forEach((button) => button.addEventListener("click", () => choosePatient(Number(button.dataset.call), false)));
        qsa("[data-redirect]", queueEl).forEach((button) => button.addEventListener("click", () => choosePatient(Number(button.dataset.redirect), true)));
      };

      const addArrivals = () => {
        state.queue.push(makePatient(10));
        if (state.turn % 3 === 1) state.queue.push(makePatient(20));
      };

      const finish = () => {
        state.ended = true;
        const averageWait = state.seen ? Math.round(state.totalWait / state.seen) : 0;
        const win = state.score >= 130 && averageWait <= 35;
        if (win) this.markWin("maw3id");
        this.stage.innerHTML = `
          <div class="game-result ${win ? "is-win" : "is-loss"}">
            <span class="experience-sticker">${win ? "CLINIC FLOWING" : "WAITING ROOM MELTDOWN"}</span>
            <h3>${win ? "You kept the queue moving." : "The queue needs a better policy."}</h3>
            <div class="result-grid"><div><span>Patients seen</span><strong>${state.seen}</strong></div><div><span>Avg wait</span><strong>${averageWait}m</strong></div><div><span>Redirected</span><strong>${state.redirected}</strong></div><div><span>Score</span><strong>${state.score}</strong></div></div>
            <p>The real product turns these changing states into one shared operational queue for staff and patients.</p>
            <div class="result-actions"><button class="game-primary" data-replay>REPLAY</button><button class="game-secondary" data-learn>SEE ARCHITECTURE</button></div>
          </div>`;
        qs("[data-replay]", this.stage)?.addEventListener("click", () => this.switchTab("play"));
        qs("[data-learn]", this.stage)?.addEventListener("click", () => this.switchTab("architecture"));
      };

      const choosePatient = (id, redirect) => {
        if (state.ended) return;
        const patient = state.queue.find((item) => item.id === id);
        if (!patient) return;
        const best = [...state.queue].sort((a, b) => urgency(b) - urgency(a))[0];
        const wait = waitOf(patient);
        if (redirect) {
          const usefulRedirect = wait >= 25 && nearbyWait() + 8 < wait;
          state.score += usefulRedirect ? 24 : -18;
          state.redirected += 1;
          logEl.textContent = usefulRedirect ? `${patient.name} can be seen faster nearby. Good redirect.` : `${patient.name} did not need redirecting. The local queue could have handled it.`;
        } else {
          const bestChoice = best?.id === patient.id;
          state.score += bestChoice ? 32 : -12;
          state.seen += 1;
          state.totalWait += wait;
          logEl.textContent = bestChoice ? `${patient.name} was the strongest next choice.` : `${patient.name} was seen, but someone else had higher queue urgency.`;
        }
        state.queue = state.queue.filter((item) => item.id !== id);
        state.turn += 1;
        state.minute += 10;
        if (state.turn >= 10) {
          finish();
          return;
        }
        addArrivals();
        updateHud();
        renderQueue();
      };

      updateHud();
      renderQueue();
      return () => { state.ended = true; };
    }

    openTokenGame() {
      const chunks = [
        { name: "Tool schema", tokens: 320, redundancy: 0.82, icon: "🧰" },
        { name: "Chat history", tokens: 260, redundancy: 0.55, icon: "💬" },
        { name: "Repeated logs", tokens: 300, redundancy: 0.88, icon: "📜" },
        { name: "User request", tokens: 130, redundancy: 0.10, icon: "🧑" },
        { name: "JSON payload", tokens: 280, redundancy: 0.62, icon: "{}" },
        { name: "System rules", tokens: 180, redundancy: 0.15, icon: "⚖️" },
        { name: "Tool traces", tokens: 260, redundancy: 0.75, icon: "🔧" },
        { name: "Recent context", tokens: 210, redundancy: 0.35, icon: "🧠" },
      ];
      const state = { round: 0, used: 0, capacity: 1120, integrity: 100, saved: 0, score: 0, ended: false };
      this.stage.innerHTML = `
        <div class="game-shell token-game">
          <div class="game-intro">
            <div><span class="experience-sticker">CONTEXT CRUNCH</span><h3>Fit the context. Keep the meaning.</h3></div>
            <p>You have <strong>${state.capacity} tokens</strong>. High-redundancy chunks tolerate stronger compression. Critical low-redundancy chunks do not. Finish under capacity with at least <strong>90% integrity</strong>.</p>
          </div>
          <div class="game-hud">
            <div><span>CONTEXT</span><strong id="ot-used">0/${state.capacity}</strong></div>
            <div><span>INTEGRITY</span><strong id="ot-integrity">100%</strong></div>
            <div><span>SAVED</span><strong id="ot-saved">0</strong></div>
          </div>
          <div class="context-meter"><div id="ot-context-bar"></div></div>
          <div id="ot-card"></div>
          <div class="game-log" id="ot-log">Inspect the first chunk.</div>
        </div>`;

      const cardEl = qs("#ot-card", this.stage);
      const logEl = qs("#ot-log", this.stage);
      const usedEl = qs("#ot-used", this.stage);
      const integrityEl = qs("#ot-integrity", this.stage);
      const savedEl = qs("#ot-saved", this.stage);
      const contextBar = qs("#ot-context-bar", this.stage);

      const updateHud = () => {
        usedEl.textContent = `${state.used}/${state.capacity}`;
        integrityEl.textContent = `${state.integrity}%`;
        savedEl.textContent = state.saved;
        contextBar.style.width = `${clamp((state.used / state.capacity) * 100, 0, 100)}%`;
        contextBar.classList.toggle("is-over", state.used > state.capacity);
      };

      const finish = () => {
        state.ended = true;
        const win = state.used <= state.capacity && state.integrity >= 90;
        if (win) this.markWin("opentoken");
        this.stage.innerHTML = `
          <div class="game-result ${win ? "is-win" : "is-loss"}">
            <span class="experience-sticker">${win ? "CONTEXT SAVED" : "CONTEXT FAILED"}</span>
            <h3>${win ? "Dense enough. Meaning intact." : state.used > state.capacity ? "The context window overflowed." : "Too much information was destroyed."}</h3>
            <div class="result-grid"><div><span>Final tokens</span><strong>${state.used}</strong></div><div><span>Saved</span><strong>${state.saved}</strong></div><div><span>Integrity</span><strong>${state.integrity}%</strong></div><div><span>Score</span><strong>${state.score}</strong></div></div>
            <p>That trade-off — representation cost versus retained information — is the interesting part of the real project.</p>
            <div class="result-actions"><button class="game-primary" data-replay>REPLAY</button><button class="game-secondary" data-learn>SEE ARCHITECTURE</button></div>
          </div>`;
        qs("[data-replay]", this.stage)?.addEventListener("click", () => this.switchTab("play"));
        qs("[data-learn]", this.stage)?.addEventListener("click", () => this.switchTab("architecture"));
      };

      const process = (mode) => {
        if (state.ended) return;
        const chunk = chunks[state.round];
        let finalTokens = chunk.tokens;
        let integrityLoss = 0;
        if (mode === "safe") {
          const reduction = 0.08 + chunk.redundancy * 0.35;
          finalTokens = Math.round(chunk.tokens * (1 - reduction));
          state.score += Math.round(chunk.redundancy * 30);
        } else if (mode === "hard") {
          const reduction = clamp(0.35 + chunk.redundancy * 0.5, 0, 0.82);
          finalTokens = Math.round(chunk.tokens * (1 - reduction));
          integrityLoss = chunk.redundancy >= 0.6 ? 0 : Math.ceil((0.6 - chunk.redundancy) * 18);
          state.integrity = clamp(state.integrity - integrityLoss, 0, 100);
          state.score += integrityLoss === 0 ? 45 : -integrityLoss * 8;
        } else {
          state.score += chunk.redundancy < 0.25 ? 28 : -10;
        }
        const saved = chunk.tokens - finalTokens;
        state.used += finalTokens;
        state.saved += saved;
        logEl.textContent = `${chunk.name}: ${chunk.tokens} → ${finalTokens} tokens${integrityLoss ? `, integrity -${integrityLoss}%` : ""}.`;
        state.round += 1;
        updateHud();
        if (state.round >= chunks.length) finish();
        else renderChunk();
      };

      const renderChunk = () => {
        const chunk = chunks[state.round];
        const redundancyPct = Math.round(chunk.redundancy * 100);
        cardEl.innerHTML = `
          <div class="token-card">
            <div class="token-card-head"><span class="token-icon">${chunk.icon}</span><div><small>CHUNK ${state.round + 1}/${chunks.length}</small><h4>${chunk.name}</h4></div><strong>${chunk.tokens} TOKENS</strong></div>
            <div class="redundancy-row"><span>STRUCTURAL REDUNDANCY</span><strong>${redundancyPct}%</strong></div>
            <div class="redundancy-meter"><div style="width:${redundancyPct}%"></div></div>
            <div class="compression-actions">
              <button data-compress="keep"><span>KEEP</span><small>0% risk · 0% savings</small></button>
              <button data-compress="safe"><span>SAFE</span><small>moderate savings · meaning preserved</small></button>
              <button data-compress="hard"><span>HARD</span><small>big savings · risky on unique text</small></button>
            </div>
          </div>`;
        qsa("[data-compress]", cardEl).forEach((button) => button.addEventListener("click", () => process(button.dataset.compress)));
      };

      updateHud();
      renderChunk();
      return () => { state.ended = true; };
    }
  }

  document.addEventListener("DOMContentLoaded", () => new PortfolioExperience());
})();
