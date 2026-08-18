(() => {
  'use strict';

  function applyStableIds() {
    const progress = document.querySelector('.experience-progress-badge');
    if (progress) progress.id = 'experience-progress';

    const achievement = document.querySelector('.experience-achievement');
    if (achievement) achievement.id = 'experience-achievement';

    const email = 'hammoubelyazid@gmail.com';
    document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
      link.href = `mailto:${email}`;
    });

    const contactEmail = document.querySelector('#contact a.contact-card[href^="mailto:"] span');
    if (contactEmail) contactEmail.textContent = email;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyStableIds, { once: true });
  } else {
    applyStableIds();
  }
})();
