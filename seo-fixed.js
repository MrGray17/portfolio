(() => {
  'use strict';

  const productionUrl = 'https://mrgray17.github.io/portfolio/';
  const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const currentUrl = isLocal
    ? `${window.location.origin}${window.location.pathname}`
    : productionUrl;
  const title = 'El Yazid Hammoubel | Software Engineering Student | Full-Stack & Systems';
  const description = 'Engineering student at ENSA Kénitra building backend, full-stack and systems projects with Python, C, JavaScript, TypeScript, SQL, React, Node.js and PostgreSQL.';

  document.title = title;

  const setMeta = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) node.setAttribute('content', value);
  };

  setMeta('meta[name="title"]', title);
  setMeta('meta[name="description"]', description);
  setMeta('meta[property="og:title"]', title);
  setMeta('meta[property="og:description"]', description);
  setMeta('meta[property="og:url"]', currentUrl);
  setMeta('meta[property="twitter:title"]', title);
  setMeta('meta[property="twitter:description"]', description);
  setMeta('meta[property="twitter:url"]', currentUrl);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = currentUrl;

  const structured = document.querySelector('script[type="application/ld+json"]');
  if (structured) {
    structured.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'El Yazid Hammoubel',
      jobTitle: 'Software Engineering Student',
      email: 'hammoubelyazid@gmail.com',
      telephone: '+212 649247160',
      url: productionUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kenitra',
        addressCountry: 'Morocco'
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'ENSA Kénitra'
      },
      knowsAbout: [
        'Software Engineering', 'Python', 'C', 'JavaScript', 'TypeScript', 'SQL',
        'HTML', 'CSS', 'Node.js', 'Express', 'React', 'PostgreSQL', 'Linux', 'Networks'
      ],
      sameAs: ['https://github.com/MrGray17']
    });
  }
})();
