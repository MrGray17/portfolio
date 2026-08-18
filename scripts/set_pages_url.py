from pathlib import Path

site = 'https://mrgray17.github.io/portfolio/'
image = site + 'image/img3.jpg'

index = Path('index.html')
html = index.read_text(encoding='utf-8')
replacements = {
    '<meta property="og:url" content="">': f'<meta property="og:url" content="{site}">',
    '<meta property="twitter:url" content="">': f'<meta property="twitter:url" content="{site}">',
    '<link rel="canonical" href="./">': f'<link rel="canonical" href="{site}">',
    '<meta property="og:image" content="image/img3.jpg">': f'<meta property="og:image" content="{image}">',
    '<meta property="twitter:image" content="image/img3.jpg">': f'<meta property="twitter:image" content="{image}">',
}
for old, new in replacements.items():
    if old not in html:
        raise SystemExit(f'Missing expected metadata: {old}')
    html = html.replace(old, new, 1)
index.write_text(html, encoding='utf-8')

seo = Path('seo-fixed.js')
js = seo.read_text(encoding='utf-8')
old = "const currentUrl = `${window.location.origin}${window.location.pathname}`;"
new = f"const currentUrl = '{site}';"
if old not in js:
    raise SystemExit('Missing dynamic currentUrl declaration')
js = js.replace(old, new, 1)
seo.write_text(js, encoding='utf-8')
