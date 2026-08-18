const { test, expect } = require('@playwright/test');

async function loadMain(page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => Boolean(document.body && document.body.classList.contains('experience-personalized')));
  await page.waitForFunction(() => Boolean(window.yazidGames));
  await page.waitForTimeout(1400);
}

test('theme toggle switches and persists the selected theme', async ({ page }) => {
  await loadMain(page);

  const body = page.locator('body');
  const toggle = page.locator('#theme-toggle');
  await expect(toggle).toBeVisible();

  const before = await body.getAttribute('data-theme');
  expect(['light', 'dark']).toContain(before);

  await toggle.click();
  const expected = before === 'dark' ? 'light' : 'dark';
  await expect(body).toHaveAttribute('data-theme', expected);
  expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe(expected);

  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => Boolean(document.body && document.body.classList.contains('experience-personalized')));
  await expect(page.locator('body')).toHaveAttribute('data-theme', expected);
});

test('journey map initializes with a visible Leaflet map and markers', async ({ page }) => {
  await loadMain(page);

  await expect(page.locator('#journey-map')).toBeVisible();
  await expect(page.locator('#journey-map.leaflet-container')).toBeVisible();
  await expect(page.locator('#journey-map .leaflet-marker-icon').first()).toBeVisible();
  expect(await page.locator('#journey-map .leaflet-marker-icon').count()).toBeGreaterThan(0);
  expect(await page.locator('.map-pirate-overlay, .map-profile-overlay').count()).toBe(0);
});

test('main navigation targets exist and internal pages resolve', async ({ page, request }) => {
  await loadMain(page);

  for (const id of ['about', 'experience', 'skills', 'projects', 'contact']) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
    await expect(page.locator(`a[href="#${id}"]`).first()).toBeAttached();
  }

  const terminal = await request.get('/terminal.html');
  expect(terminal.ok()).toBeTruthy();
  const favicon = await request.get('/favicon.svg');
  expect(favicon.ok()).toBeTruthy();
  const photo = await request.get('/image/img3.jpg');
  expect(photo.ok()).toBeTruthy();
});

test('DOM has unique ids and interactive controls have accessible names', async ({ page }) => {
  await loadMain(page);

  const duplicateIds = await page.evaluate(() => {
    const seen = new Set();
    const duplicates = new Set();
    document.querySelectorAll('[id]').forEach((node) => {
      if (seen.has(node.id)) duplicates.add(node.id);
      seen.add(node.id);
    });
    return Array.from(duplicates);
  });
  expect(duplicateIds).toEqual([]);

  const unnamedButtons = await page.evaluate(() => Array.from(document.querySelectorAll('button')).filter((button) => {
    const style = getComputedStyle(button);
    const visible = style.display !== 'none' && style.visibility !== 'hidden';
    if (!visible) return false;
    const name = (button.getAttribute('aria-label') || button.getAttribute('title') || button.textContent || '').trim();
    return !name;
  }).map((button) => button.outerHTML.slice(0, 160)));
  expect(unnamedButtons).toEqual([]);

  const imagesMissingAlt = await page.evaluate(() => Array.from(document.querySelectorAll('img')).filter((img) => !img.hasAttribute('alt')).map((img) => img.src));
  expect(imagesMissingAlt).toEqual([]);
});
