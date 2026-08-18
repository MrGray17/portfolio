(() => {
  'use strict';

  const output = document.getElementById('output');
  const input = document.getElementById('command-input');
  const terminalContent = document.querySelector('.terminal-content');
  const themeModal = document.getElementById('theme-modal');
  const themeToggle = document.getElementById('theme-toggle');

  const PROFILE = {
    skills: ['Python', 'C', 'JavaScript', 'TypeScript', 'SQL', 'HTML', 'CSS', 'Node.js', 'Express', 'React', 'PostgreSQL', 'Git / GitHub', 'Linux', 'Networks'],
    projects: [
      {
        name: 'Rate Limiter',
        description: 'TypeScript + Node.js rate limiter built from first principles with fixed-window limiting, HTTP integration and tests.',
        repo: 'https://github.com/MrGray17/rate-limiter'
      },
      {
        name: 'Maw3id',
        description: 'Clinic queue and appointment platform for Moroccan workflows using React + TypeScript, Express and PostgreSQL.',
        repo: 'https://github.com/MrGray17/Maw3id'
      },
      {
        name: 'OpenToken',
        description: 'Experimental TypeScript/Bun tooling exploring token compression for AI workflows with tests and measurable evaluation.',
        repo: 'https://github.com/MrGray17/opentoken'
      }
    ]
  };

  let matrixTimer = null;
  const history = [];
  let historyIndex = 0;

  function scrollToBottom() {
    requestAnimationFrame(() => {
      terminalContent.scrollTop = terminalContent.scrollHeight;
    });
  }

  function print(text = '', className = '') {
    const line = document.createElement('div');
    line.className = className;
    line.textContent = text;
    line.style.whiteSpace = 'pre-wrap';
    output.appendChild(line);
    scrollToBottom();
    return line;
  }

  function printLink(label, href) {
    const line = document.createElement('div');
    const anchor = document.createElement('a');
    anchor.textContent = label;
    anchor.href = href;
    anchor.target = href.startsWith('http') ? '_blank' : '_self';
    anchor.rel = href.startsWith('http') ? 'noreferrer' : '';
    anchor.style.color = 'var(--text-bright)';
    anchor.style.textDecoration = 'none';
    line.appendChild(anchor);
    output.appendChild(line);
    scrollToBottom();
  }

  function separator() {
    print('────────────────────────────────────────────────────────');
  }

  function welcome() {
    print('El Yazid Hammoubel — Software Engineering Student', 'success');
    print('Full-Stack • Backend • Systems');
    print('Type "help" to explore.');
    separator();
  }

  function showHelp() {
    print('AVAILABLE COMMANDS', 'success');
    print('  about       who I am');
    print('  experience  engineering experience');
    print('  education   education');
    print('  skills      technical stack');
    print('  projects    real projects + repositories');
    print('  contact     email, phone and GitHub');
    print('  calc        arithmetic, e.g. calc (12 * 4) / 3');
    print('  matrix      start a tiny matrix effect');
    print('  stop-matrix stop the matrix effect');
    print('  clear       clear the terminal');
  }

  function showAbout() {
    print('ABOUT', 'success');
    print('I am an engineering student at ENSA Kénitra who learns by building. I care about what sits underneath abstractions: APIs, databases, networks, runtimes and the trade-offs that make software hold up in the real world.');
  }

  function showExperience() {
    print('EXPERIENCE', 'success');
    print('2026 — Engineering Internship @ Atos');
    print('Worked on automation around a Maroc Telecom Jira workflow, including an AI-assisted component using Llama 3 and PostgreSQL-backed data handling.');
    print('');
    print('2026 — Independent Engineering Projects');
    print('Building Rate Limiter, Maw3id and OpenToken to turn systems/software theory into defendable engineering output.');
  }

  function showEducation() {
    print('EDUCATION', 'success');
    print('ENSA Kénitra — Cycle Ingénieur, Réseaux & Télécommunications');
    print('2025 — Present · Kenitra, Morocco');
    print('Coursework spans networks, telecommunications, databases, algorithms, systems and software engineering.');
  }

  function showSkills() {
    print('TECHNICAL STACK', 'success');
    print(PROFILE.skills.join(' · '));
    print('');
    print('Engineering focus: Backend Systems · Distributed Systems · System Design · AI Systems');
  }

  function showProjects() {
    print('PROJECTS', 'success');
    PROFILE.projects.forEach((project, index) => {
      print(`${index + 1}. ${project.name}`);
      print(`   ${project.description}`);
      printLink(`   ${project.repo}`, project.repo);
      if (index < PROFILE.projects.length - 1) print('');
    });
  }

  function showContact() {
    print('CONTACT', 'success');
    printLink('Email: hammoubelyazid@gmail.com', 'mailto:hammoubelyazid@gmail.com');
    printLink('Phone: +212 649247160', 'tel:+212649247160');
    printLink('GitHub: github.com/MrGray17', 'https://github.com/MrGray17');
  }

  function calculate(expression) {
    if (!expression) {
      print('Usage: calc <arithmetic expression>', 'error');
      return;
    }
    if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
      print('Calculator accepts numbers and arithmetic operators only.', 'error');
      return;
    }
    try {
      const result = Function(`"use strict"; return (${expression});`)();
      if (typeof result !== 'number' || !Number.isFinite(result)) throw new Error('Invalid result');
      print(`${expression} = ${result}`, 'success');
    } catch {
      print('Could not evaluate that expression.', 'error');
    }
  }

  function startMatrix() {
    if (matrixTimer) {
      print('Matrix already running.', 'info');
      return;
    }
    const chars = '01{}[]<>/\\$#@*&';
    print('matrix: online', 'success');
    matrixTimer = window.setInterval(() => {
      let row = '';
      for (let i = 0; i < 48; i += 1) row += chars[Math.floor(Math.random() * chars.length)];
      print(row, 'success');
      while (output.children.length > 45) output.firstElementChild?.remove();
    }, 180);
  }

  function stopMatrix() {
    if (matrixTimer) {
      clearInterval(matrixTimer);
      matrixTimer = null;
      print('matrix: offline', 'info');
    } else {
      print('Matrix is not running.', 'info');
    }
  }

  function clearTerminal() {
    output.replaceChildren();
    welcome();
  }

  function runCommand(rawCommand) {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;
    print(`➜ ${trimmed}`, 'command');
    const [command, ...args] = trimmed.split(/\s+/);
    const cmd = command.toLowerCase();

    switch (cmd) {
      case 'help': showHelp(); break;
      case 'about': showAbout(); break;
      case 'experience': showExperience(); break;
      case 'education': showEducation(); break;
      case 'skills': showSkills(); break;
      case 'projects': showProjects(); break;
      case 'contact': showContact(); break;
      case 'calc':
      case 'calculate': calculate(args.join(' ')); break;
      case 'matrix': startMatrix(); break;
      case 'stop-matrix': stopMatrix(); break;
      case 'clear': clearTerminal(); break;
      default: print(`Command not found: ${cmd}. Type "help".`, 'error');
    }
  }

  function applyTheme(theme) {
    document.body.classList.remove('theme-dracula', 'theme-solarized', 'theme-nord');
    if (theme !== 'default') document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('terminalTheme', theme);
    document.querySelectorAll('.theme-option').forEach((option) => {
      option.classList.toggle('active', option.dataset.theme === theme);
    });
  }

  function openThemeModal() {
    themeModal.classList.add('active');
    themeModal.setAttribute('aria-hidden', 'false');
  }

  function closeThemeModal() {
    themeModal.classList.remove('active');
    themeModal.setAttribute('aria-hidden', 'true');
    input.focus();
  }

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const command = input.value;
      if (command.trim()) {
        history.push(command);
        historyIndex = history.length;
      }
      input.value = '';
      runCommand(command);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (history.length) {
        historyIndex = Math.max(0, historyIndex - 1);
        input.value = history[historyIndex] || '';
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (history.length) {
        historyIndex = Math.min(history.length, historyIndex + 1);
        input.value = historyIndex === history.length ? '' : history[historyIndex];
      }
    } else if (event.key.toLowerCase() === 'l' && event.ctrlKey) {
      event.preventDefault();
      clearTerminal();
    }
  });

  themeToggle?.addEventListener('click', openThemeModal);
  themeModal?.querySelector('.close-button')?.addEventListener('click', closeThemeModal);
  themeModal?.addEventListener('click', (event) => {
    if (event.target === themeModal) closeThemeModal();
  });
  document.querySelectorAll('.theme-option').forEach((option) => {
    option.addEventListener('click', () => {
      applyTheme(option.dataset.theme || 'default');
      closeThemeModal();
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && themeModal?.classList.contains('active')) closeThemeModal();
  });
  terminalContent.addEventListener('click', () => input.focus());

  applyTheme(localStorage.getItem('terminalTheme') || 'default');
  welcome();
  input.focus();
})();
