(() => {
  'use strict';

  const portfolioAvatar = 'data:image/webp;base64,' +
    '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';

  function addCoolToolsSection() {
    if (document.querySelector('#cool-tools')) return;

    const projects = document.querySelector('#projects');
    if (!projects) return;

    const section = document.createElement('section');
    section.className = 'section fade-in';
    section.id = 'cool-tools';

    const title = document.createElement('h2');
    title.className = 'section-title';
    title.textContent = 'COOL TOOLS I VIBECODED';

    const showcase = document.createElement('div');
    showcase.className = 'creator-showcase';

    const label = document.createElement('p');
    label.className = 'creator-label';
    label.textContent = 'SIDE QUESTS I BUILT BECAUSE I WANTED THEM TO EXIST.';

    const grid = document.createElement('div');
    grid.className = 'creator-projects-grid experience-project-grid';

    const card = document.createElement('div');
    card.className = 'creator-item';

    const status = document.createElement('div');
    status.className = 'project-status-strip';

    const category = document.createElement('span');
    category.textContent = 'LOCAL-FIRST DESKTOP TOOL';

    const signal = document.createElement('span');
    signal.className = 'project-signal';
    signal.textContent = 'VIBECODED';

    status.append(category, signal);

    const projectTitle = document.createElement('a');
    projectTitle.className = 'creator-project';
    projectTitle.href = 'https://github.com/MrGray17/Launchpad';
    projectTitle.target = '_blank';
    projectTitle.rel = 'noreferrer';
    projectTitle.title = 'Open Launchpad on GitHub';
    projectTitle.setAttribute('aria-label', 'Open Launchpad on GitHub');

    const name = document.createElement('span');
    name.className = 'creator-name';
    name.style.display = 'inline-flex';
    name.style.alignItems = 'center';
    name.style.gap = '0.35em';

    const icon = document.createElement('img');
    icon.src = 'https://raw.githubusercontent.com/MrGray17/Launchpad/main/src-tauri/icons/64x64.png';
    icon.alt = '';
    icon.setAttribute('aria-hidden', 'true');
    icon.width = 48;
    icon.height = 48;
    icon.style.width = '1em';
    icon.style.height = '1em';
    icon.style.objectFit = 'contain';
    icon.style.flex = '0 0 auto';

    name.append(icon, document.createTextNode('Launchpad'));
    projectTitle.append(name);

    const description = document.createElement('p');
    description.className = 'creator-tagline';
    description.textContent = 'A local-first desktop home for the things I build. It remembers projects, next quests and checkpoints, inspects Git state and package scripts, and lets me jump back into work without turning into another productivity dashboard.';

    const tags = document.createElement('div');
    tags.className = 'tech-tags';
    ['Tauri 2', 'React', 'TypeScript', 'Rust', 'SQLite'].forEach((value) => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = value;
      tags.append(tag);
    });

    const actions = document.createElement('div');
    actions.className = 'project-experience-actions';

    const repo = document.createElement('a');
    repo.className = 'creator-github';
    repo.href = 'https://github.com/MrGray17/Launchpad';
    repo.target = '_blank';
    repo.rel = 'noreferrer';
    repo.textContent = 'VIEW REPO ↗';
    actions.append(repo);

    card.append(status, projectTitle, description, tags, actions);
    grid.append(card);
    showcase.append(label, grid);
    section.append(title, showcase);

    projects.insertAdjacentElement('afterend', section);
  }

  function applyStableIds() {
    const progress = document.querySelector('.experience-progress-badge');
    if (progress) progress.id = 'experience-progress';

    const achievement = document.querySelector('.experience-achievement');
    if (achievement) achievement.id = 'experience-achievement';

    const heroPhoto = document.querySelector('.hero-photo');
    if (heroPhoto) {
      heroPhoto.src = portfolioAvatar;
      heroPhoto.alt = 'El Yazid Hammoubel';
    }

    const email = 'hammoubelyazid@gmail.com';
    document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
      link.href = `mailto:${email}`;
    });

    const contactEmail = document.querySelector('#contact a.contact-card[href^="mailto:"] span');
    if (contactEmail) contactEmail.textContent = email;

    addCoolToolsSection();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyStableIds, { once: true });
  } else {
    applyStableIds();
  }
})();