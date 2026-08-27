(() => {
  'use strict';

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
      heroPhoto.src = 'image/profile-avatar.webp';
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
