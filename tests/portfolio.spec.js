const { test, expect } = require('@playwright/test');

function diagnostics(page) {
  const state = { pageErrors: [], consoleErrors: [], badLocalResponses: [] };
  page.on('pageerror', (error) => state.pageErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') state.consoleErrors.push(message.text());
  });
  page.on('response', (response) => {
    try {
      const url = new URL(response.url());
      if (url.origin === 'http://127.0.0.1:4173' && response.status() >= 400) {
        state.badLocalResponses.push(`${response.status()} ${url.pathname}`);
      }
    } catch {}
  });
  return state;
}

async function loadMain(page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => Boolean(document.body && document.body.classList.contains('experience-personalized')));
  await page.waitForFunction(() => Boolean(window.yazidGames));
  await page.waitForTimeout(1400);
}

async function expectCleanRuntime(state) {
  expect(state.pageErrors, `page errors: ${state.pageErrors.join(' | ')}`).toEqual([]);
  expect(state.consoleErrors, `console errors: ${state.consoleErrors.join(' | ')}`).toEqual([]);
  expect(state.badLocalResponses, `bad local responses: ${state.badLocalResponses.join(' | ')}`).toEqual([]);
}

test('main portfolio content, metadata and visual contract are launch-safe', async ({ page }) => {
  const state = diagnostics(page);
  await loadMain(page);

  await expect(page.locator('.hero-name')).toContainText('El Yazid Hammoubel');
  await expect(page.locator('.hero-description')).toContainText('engineering student at ENSA Kénitra');

  await expect(page.locator('body')).not.toContainText('Neuro-Mesh');
  await expect(page.locator('body')).not.toContainText('AEGIS');
  await expect(page.locator('body')).not.toContainText('[COMPANY A]');
  expect(await page.locator('#awwwards').count()).toBe(0);

  await expect(page.locator('a[href="tel:+212649247160"]').first()).toBeAttached();
  await expect(page.locator('a[href="mailto:hammoubelyazid@gmail.com"]').first()).toBeAttached();
  await expect(page.locator('a[href="https://github.com/MrGray17"]').first()).toBeAttached();

  const heroSQL = page.locator('.hero .tech-badge').filter({ hasText: /^SQL$/ });
  await expect(heroSQL).toHaveCount(1);

  const skillBoxes = page.locator('#skills .skill-box');
  await expect(skillBoxes).toHaveCount(6);
  for (let i = 0; i < 6; i += 1) await expect(skillBoxes.nth(i)).toBeVisible();
  await expect(page.locator('#skills')).toContainText('SQL');
  await expect(page.locator('#skills')).toContainText('PostgreSQL');
  await expect(page.locator('#skills')).toContainText('Networks');

  const projectTitles = page.locator('.experience-project-card .project-title-button');
  await expect(projectTitles).toHaveCount(3);
  const backgrounds = await projectTitles.evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).backgroundColor));
  expect(backgrounds.every((value) => value === 'rgb(255, 217, 61)')).toBeTruthy();

  await expect(page.locator('[data-project-card="rate-limiter"]')).toContainText('Rate Limiter');
  await expect(page.locator('[data-project-card="maw3id"]')).toContainText('Maw3id');
  await expect(page.locator('[data-project-card="opentoken"]')).toContainText('OpenToken');

  expect(await page.locator('.map-pirate-overlay, .map-profile-overlay').count()).toBe(0);

  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
  expect(canonical).toBe('http://127.0.0.1:4173/');
  expect(await page.locator('meta[property="og:url"]').getAttribute('content')).toBe('http://127.0.0.1:4173/');
  const structured = await page.locator('script[type="application/ld+json"]').textContent();
  expect(structured).toContain('https://github.com/MrGray17');
  expect(structured).not.toContain('eBPF');

  const rendered = await page.locator('html').evaluate((node) => node.innerHTML);
  expect(rendered).not.toContain('marjoballabani.me');
  expect(rendered).not.toContain('github.com/hammoubelyazid');
  expect(await page.locator('body').innerText()).not.toMatch(/<\/?(?:div|span|script|button)\b/i);

  await expectCleanRuntime(state);
});

test('all three project games can be completed and persist progress', async ({ page }) => {
  const state = diagnostics(page);
  await loadMain(page);
  await page.evaluate(() => localStorage.removeItem('yazidPortfolioWins'));
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => Boolean(window.yazidGames));
  await page.waitForTimeout(1400);

  await page.getByRole('button', { name: 'PLAY PACKET PANIC' }).click();
  await expect(page.locator('#project-experience')).toHaveClass(/is-open/);
  for (const action of ['ALLOW', 'ALLOW', 'RATE LIMIT', 'RATE LIMIT', 'ALLOW']) {
    await page.getByRole('button', { name: action, exact: true }).click();
  }
  await expect(page.locator('#experience-stage')).toContainText('SERVER SURVIVED');
  await expect(page.locator('#experience-progress')).toHaveText('1/3 SYSTEMS SOLVED');
  await page.keyboard.press('Escape');

  await page.getByRole('button', { name: 'PLAY QUEUE CHAOS' }).click();
  for (const patient of ['Hassan', 'Youssef', 'Salma', 'Amina']) {
    const card = page.locator('.patient-card', { hasText: patient });
    await expect(card).toBeVisible();
    await card.getByRole('button', { name: 'CALL', exact: true }).click();
  }
  await expect(page.locator('#experience-stage')).toContainText('CLINIC FLOWING');
  await expect(page.locator('#experience-progress')).toHaveText('2/3 SYSTEMS SOLVED');
  await page.keyboard.press('Escape');

  await page.getByRole('button', { name: 'PLAY CONTEXT CRUNCH' }).click();
  for (const action of ['HARD', 'KEEP', 'HARD', 'HARD', 'KEEP']) {
    await page.getByRole('button', { name: action, exact: true }).click();
  }
  await expect(page.locator('#experience-stage')).toContainText('CONTEXT SAVED');
  await expect(page.locator('#experience-progress')).toHaveText('3/3 SYSTEMS SOLVED');

  const progress = await page.evaluate(() => JSON.parse(localStorage.getItem('yazidPortfolioWins')));
  expect(progress).toEqual({ 'rate-limiter': true, maw3id: true, opentoken: true });

  await expectCleanRuntime(state);
});

test('project modal overview, architecture, code and close controls work', async ({ page }) => {
  const state = diagnostics(page);
  await loadMain(page);

  await page.locator('[data-project-overview="rate-limiter"]').click();
  await expect(page.locator('#experience-stage')).toContainText('Rate Limiter in plain English');

  await page.getByRole('button', { name: 'ARCHITECTURE', exact: true }).click();
  await expect(page.locator('.architecture-row')).toHaveCount(4);

  await page.getByRole('button', { name: 'CODE', exact: true }).click();
  await expect(page.getByRole('link', { name: 'OPEN GITHUB ↗' })).toHaveAttribute('href', 'https://github.com/MrGray17/rate-limiter');

  await page.keyboard.press('Escape');
  await expect(page.locator('#project-experience')).not.toHaveClass(/is-open/);
  await expectCleanRuntime(state);
});

test('mobile layout has no horizontal overflow and game modal stays inside viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const state = diagnostics(page);
  await loadMain(page);

  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 2);

  await expect(page.locator('#skills .skill-box').first()).toBeVisible();
  await page.getByRole('button', { name: 'PLAY PACKET PANIC' }).click();
  const box = await page.locator('.experience-window').boundingBox();
  expect(box).not.toBeNull();
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(390);
  await page.keyboard.press('Escape');

  await expectCleanRuntime(state);
});

test('terminal and raw public source contain only launch-safe profile data', async ({ page, request }) => {
  const state = diagnostics(page);
  await page.goto('/terminal.html', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#output')).toContainText('El Yazid Hammoubel');

  const command = page.locator('#command-input');
  await command.fill('experience');
  await command.press('Enter');
  await expect(page.locator('#output')).toContainText('Engineering Internship @ Atos');
  await expect(page.locator('#output')).not.toContainText('[COMPANY A]');

  await command.fill('projects');
  await command.press('Enter');
  await expect(page.locator('#output')).toContainText('Rate Limiter');
  await expect(page.locator('#output')).toContainText('Maw3id');
  await expect(page.locator('#output')).toContainText('OpenToken');
  await expect(page.locator('#output')).not.toContainText('Neuro-Mesh');
  await expect(page.locator('#output')).not.toContainText('AEGIS');

  await command.fill('skills');
  await command.press('Enter');
  await expect(page.locator('#output')).toContainText('SQL');

  await command.fill('contact');
  await command.press('Enter');
  await expect(page.locator('#output')).toContainText('+212 649247160');
  await expect(page.locator('#output')).toContainText('github.com/MrGray17');

  await page.locator('#theme-toggle').click();
  await page.locator('.theme-option[data-theme="dracula"]').click();
  await expect(page.locator('body')).toHaveClass(/theme-dracula/);

  const scriptResponse = await request.get('/script.js');
  expect(scriptResponse.ok()).toBeTruthy();
  const scriptText = await scriptResponse.text();
  expect(scriptText).not.toContain('4331a27995f4c5b5e8d1eab1ed3d88b4');
  expect(scriptText).not.toContain('Neuro-Mesh');
  expect(scriptText).not.toContain('[COMPANY A]');

  const indexResponse = await request.get('/index.html');
  expect(indexResponse.ok()).toBeTruthy();
  const indexText = await indexResponse.text();
  for (const forbidden of [
    'Neuro-Mesh', 'AEGIS', 'eBPF', 'AI Threat Detection', '99.91%', 'sub-100ms',
    '12K+ lines', 'PBFT', 'NFQUEUE', 'marjo-ballabani', 'github.com/hammoubelyazid',
    'hammoubelyazid.com', '-55% à -90%'
  ]) {
    expect(indexText).not.toContain(forbidden);
  }
  expect(indexText).not.toContain("fetch('original.html");
  expect(indexText).not.toContain('document.write(');
  expect(indexText).toContain('personalize-fixed.js');
  expect(indexText).toContain('games-fixed.js');

  const original = await request.get('/original.html');
  expect(original.status()).toBe(404);
  const cname = await request.get('/CNAME');
  expect(cname.status()).toBe(404);
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(404);
  const robots = await request.get('/robots.txt');
  const robotsText = await robots.text();
  expect(robotsText).toContain('Allow: /');
  expect(robotsText).not.toContain('Disallow: /original.html');

  await expectCleanRuntime(state);
});
