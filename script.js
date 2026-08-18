class TerminalResume {
  constructor() {
    this.output = document.getElementById("output");
    this.input = document.getElementById("command-input");
    this.projectsModal = document.getElementById("projects-modal");
    this.skillsModal = document.getElementById("skills-modal");
    this.themeModal = document.getElementById("theme-modal");
    this.themeToggle = document.getElementById("theme-toggle");
    this.history = [];
    this.historyIndex = -1;
    this.matrixInterval = null;

    this.projects = [
      {
        title: "Rate Limiter",
        description:
          "TypeScript/Node.js rate limiter built from first principles. Current work covers fixed-window request limiting, HTTP integration, rejection behavior, window resets, and tests.",
        technologies: ["TypeScript", "Node.js", "HTTP", "Testing"],
        repo: "https://github.com/MrGray17/rate-limiter",
      },
      {
        title: "Maw3id",
        description:
          "Clinic queue and appointment platform for Morocco with receptionist-managed appointments and walk-ins, a daily queue, doctor workflow, and nearby-doctor discovery.",
        technologies: ["React", "TypeScript", "Express", "PostgreSQL", "MapLibre"],
        repo: "https://github.com/MrGray17/Maw3id",
      },
      {
        title: "OpenToken",
        description:
          "Open-source TypeScript/Bun tooling exploring token compression for AI workflows, structured as a monorepo with automated checks and tests.",
        technologies: ["TypeScript", "Bun", "Open Source", "Testing"],
        repo: "https://github.com/MrGray17/opentoken",
      },
    ];

    this.skills = {
      Languages: ["Python", "C", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
      "Web / Backend": ["Node.js", "Express", "React", "REST / HTTP", "PostgreSQL"],
      "Foundations / Tools": ["Git", "GitHub", "Linux", "Networks & Telecommunications", "Testing"],
    };

    this.commands = [
      "help",
      "about",
      "experience",
      "education",
      "skills",
      "skills-visual",
      "projects",
      "contact",
      "clear",
      "matrix",
      "stop-matrix",
      "calc",
    ];

    this.init();
  }

  init() {
    this.setupEvents();
    this.applyTheme(localStorage.getItem("theme") || "default");
    this.printWelcome();
    this.input?.focus();
  }

  setupEvents() {
    if (this.input) {
      this.input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          this.handleCommand();
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          this.navigateHistory(1);
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          this.navigateHistory(-1);
        } else if (event.key === "Tab") {
          event.preventDefault();
          this.autocomplete();
        } else if (event.ctrlKey && event.key.toLowerCase() === "l") {
          event.preventDefault();
          this.clear();
        }
      });
    }

    this.themeToggle?.addEventListener("click", () => this.showModal(this.themeModal));

    document.querySelectorAll(".theme-option").forEach((option) => {
      option.addEventListener("click", () => {
        this.applyTheme(option.dataset.theme || "default");
        this.closeModal(this.themeModal);
      });
    });

    document.querySelectorAll(".close-button").forEach((button) => {
      button.addEventListener("click", () => this.closeModal(button.closest(".modal")));
    });

    window.addEventListener("click", (event) => {
      if (event.target?.classList?.contains("modal")) this.closeModal(event.target);
    });
  }

  applyTheme(theme) {
    document.body.dataset.theme = theme;
    document.body.className = document.body.className
      .split(" ")
      .filter((name) => !name.startsWith("theme-"))
      .concat(`theme-${theme}`)
      .join(" ");
    localStorage.setItem("theme", theme);
  }

  showModal(modal) {
    if (modal) modal.style.display = "block";
  }

  closeModal(modal) {
    if (modal) modal.style.display = "none";
  }

  navigateHistory(direction) {
    if (!this.history.length || !this.input) return;

    this.historyIndex = Math.min(
      this.history.length - 1,
      Math.max(-1, this.historyIndex + direction)
    );

    this.input.value =
      this.historyIndex === -1
        ? ""
        : this.history[this.history.length - 1 - this.historyIndex];
  }

  autocomplete() {
    const value = this.input.value.trim().toLowerCase();
    if (!value) return;
    const matches = this.commands.filter((command) => command.startsWith(value));
    if (matches.length === 1) this.input.value = matches[0];
    else if (matches.length > 1) this.print(`Possible commands: ${matches.join("  ")}`, "info");
  }

  handleCommand() {
    const raw = this.input.value.trim();
    if (!raw) return;

    this.history.push(raw);
    this.historyIndex = -1;
    this.print(`➜ ${raw}`, "command");
    this.input.value = "";

    const [command, ...args] = raw.split(/\s+/);
    const cmd = command.toLowerCase();

    const handlers = {
      help: () => this.showHelp(),
      about: () => this.showAbout(),
      experience: () => this.showExperience(),
      education: () => this.showEducation(),
      skills: () => this.showSkills(),
      "skills-visual": () => this.showSkillsVisual(),
      projects: () => this.showProjects(),
      contact: () => this.showContact(),
      clear: () => this.clear(),
      matrix: () => this.startMatrix(),
      "stop-matrix": () => this.stopMatrix(),
      calc: () => this.calculate(args.join(" ")),
    };

    if (handlers[cmd]) handlers[cmd]();
    else this.print(`Command not found: ${cmd}. Type "help".`, "error");
  }

  print(text, className = "") {
    if (!this.output) return;
    const line = document.createElement("div");
    line.className = className;
    line.style.whiteSpace = "pre-wrap";
    line.innerHTML = text;
    this.output.appendChild(line);
    this.output.scrollTop = this.output.scrollHeight;
  }

  printWelcome() {
    this.print(
      `<span style="color:#ffff00;font-weight:700;">El Yazid Hammoubel</span>\n` +
        `<span style="color:#00ffff;">Software Engineering Student • Full-Stack • Backend • Systems</span>\n\n` +
        `This terminal is the compact version of my portfolio.\nType <span style="color:#98fb98;">help</span> to explore.`,
      "info"
    );
  }

  showHelp() {
    this.print(
      `<span style="color:#ffff00;font-weight:700;">Available commands</span>\n\n` +
        `about           who I am\n` +
        `experience      internship + current build work\n` +
        `education       ENSA Kénitra + certifications\n` +
        `skills          technologies I actually use\n` +
        `skills-visual   skill categories\n` +
        `projects        Rate Limiter / Maw3id / OpenToken\n` +
        `contact         email + GitHub\n` +
        `calc 2+2        tiny calculator\n` +
        `matrix          because terminals need one silly command\n` +
        `clear           clear the terminal\n\n` +
        `Tip: Tab autocompletes commands. Ctrl+L clears.`
    );
  }

  showAbout() {
    this.print(
      `<span style="color:#00ffff;font-weight:700;">About</span>\n\n` +
        `I'm El Yazid, an engineering student at ENSA Kénitra in Morocco. ` +
        `I got interested in software after I stopped treating computers like black boxes and started asking what sits underneath the abstraction.\n\n` +
        `I'm currently using real projects to get stronger at backend engineering, full-stack development, systems thinking, databases and testing. ` +
        `This portfolio intentionally avoids claims I can't defend in an interview.`
    );
  }

  showExperience() {
    this.print(
      `<span style="color:#ffff00;font-weight:700;">Experience & Current Build Work</span>\n\n` +
        `<span style="color:#00ffff;">Atos — Engineering Internship Project</span>\n` +
        `2026 · Morocco\n` +
        `Worked on automation around a Maroc Telecom Jira workflow, including an AI-assisted component and PostgreSQL-backed data handling.\n\n` +
        `<span style="color:#00ffff;">Current Projects</span>\n` +
        `• Rate Limiter — TypeScript / Node.js backend & systems project\n` +
        `• Maw3id — React / TypeScript / Express / PostgreSQL full-stack product\n` +
        `• OpenToken — TypeScript / Bun open-source AI tooling`
    );
  }

  showEducation() {
    this.print(
      `<span style="color:#ff8c00;font-weight:700;">Education</span>\n\n` +
        `<strong>ENSA Kénitra</strong>\n` +
        `Cycle Ingénieur — Réseaux & Télécommunications\n` +
        `2025 — Present · Kénitra, Morocco\n\n` +
        `<span style="color:#ff8c00;">Certifications</span>\n` +
        `• Google Cybersecurity Professional Certificate\n` +
        `• IBM QRadar SIEM Foundation`
    );
  }

  showSkills() {
    const lines = Object.entries(this.skills)
      .map(([group, values]) => `<span style="color:#00ffff;">${group}</span>\n${values.map((value) => `• ${value}`).join("\n")}`)
      .join("\n\n");
    this.print(`<span style="color:#ffff00;font-weight:700;">Technologies I Use</span>\n\n${lines}`);
  }

  showProjects() {
    const container = this.projectsModal?.querySelector(".projects-container");
    if (!container) return;

    container.innerHTML = this.projects
      .map(
        (project) => `
          <article class="project-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-technologies">
              ${project.technologies.map((tech) => `<span>${tech}</span>`).join("")}
            </div>
            <a href="${project.repo}" target="_blank" rel="noreferrer">View repository ↗</a>
          </article>`
      )
      .join("");

    this.showModal(this.projectsModal);
  }

  showSkillsVisual() {
    const container = this.skillsModal?.querySelector(".skills-container");
    if (!container) return;

    container.innerHTML = Object.entries(this.skills)
      .map(
        ([group, values]) => `
          <div class="skill-category">
            <h3>${group}</h3>
            <div class="skill-list">
              ${values.map((value) => `<div class="skill-item"><span>${value}</span></div>`).join("")}
            </div>
          </div>`
      )
      .join("");

    this.showModal(this.skillsModal);
  }

  showContact() {
    this.print(
      `<span style="color:#ff8c00;font-weight:700;">Contact</span>\n\n` +
        `Email: <a href="mailto:hammoubelyazid@gmail.com" style="color:#fff;">hammoubelyazid@gmail.com</a>\n` +
        `GitHub: <a href="https://github.com/MrGray17" target="_blank" style="color:#fff;">github.com/MrGray17</a>`
    );
  }

  calculate(expression) {
    if (!expression) {
      this.print("Usage: calc 2 * (3 + 4)", "error");
      return;
    }

    if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
      this.print("Calculator only accepts numbers and basic arithmetic operators.", "error");
      return;
    }

    try {
      const result = Function(`"use strict"; return (${expression})`)();
      if (typeof result !== "number" || !Number.isFinite(result)) throw new Error("Invalid result");
      this.print(`${expression} = ${result}`, "info");
    } catch {
      this.print("Could not evaluate that expression.", "error");
    }
  }

  startMatrix() {
    if (this.matrixInterval) return;

    const line = document.createElement("div");
    line.id = "matrix-line";
    line.style.color = "#00ff00";
    line.style.fontFamily = "monospace";
    this.output.appendChild(line);

    const chars = "01{}[]<>/\\|*+-=TSJSPYSQLC";
    this.matrixInterval = setInterval(() => {
      line.textContent = Array.from({ length: 64 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    }, 80);
  }

  stopMatrix() {
    if (this.matrixInterval) clearInterval(this.matrixInterval);
    this.matrixInterval = null;
    document.getElementById("matrix-line")?.remove();
    this.print("Matrix stopped.", "info");
  }

  clear() {
    if (this.output) this.output.innerHTML = "";
    this.printWelcome();
  }
}

document.addEventListener("DOMContentLoaded", () => new TerminalResume());
