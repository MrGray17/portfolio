from pathlib import Path

source = Path('original.html')
target = Path('index.html')
robots = Path('robots.txt')

html = source.read_text(encoding='utf-8')

style_links = '''
    <link rel="stylesheet" href="experience-preview.css?v=12">
    <link rel="stylesheet" href="project-title-fix.css?v=12">
'''
script_links = '''
    <script src="personalize-fixed.js?v=12"></script>
    <script src="seo-fixed.js?v=12"></script>
    <script src="games-fixed.js?v=12"></script>
    <script src="game-ui-stability.js?v=12"></script>
'''

if 'experience-preview.css' not in html:
    html = html.replace('</head>', style_links + '</head>', 1)
if 'games-fixed.js' not in html:
    html = html.replace('</body>', script_links + '</body>', 1)

if 'fetch(\'original.html' in html or 'document.write(' in html:
    raise SystemExit('Runtime-loader code unexpectedly present in promoted source')

required = [
    'personalize-fixed.js',
    'seo-fixed.js',
    'games-fixed.js',
    'game-ui-stability.js',
    'experience-preview.css',
    'project-title-fix.css',
]
missing = [item for item in required if item not in html]
if missing:
    raise SystemExit(f'Missing production assets in index: {missing}')

forbidden = [
    'Neuro-Mesh', 'AEGIS', 'eBPF', 'AI Threat Detection', '99.91%',
    'sub-100ms', '12K+ lines', 'PBFT', 'NFQUEUE', 'marjo-ballabani',
    'github.com/hammoubelyazid', 'hammoubelyazid.com', '-55% à -90%'
]
remaining = [item for item in forbidden if item in html]
if remaining:
    raise SystemExit(f'Forbidden legacy claims remain in production index: {remaining}')

target.write_text(html, encoding='utf-8')
source.unlink()
robots.write_text('User-agent: *\nAllow: /\n', encoding='utf-8')
print('Promoted cleaned static portfolio to index.html')
