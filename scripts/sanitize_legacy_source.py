from pathlib import Path
import re

path = Path('original.html')
text = path.read_text(encoding='utf-8')
original = text

# Remove the original template award ribbon entirely.
text, ribbon_count = re.subn(
    r'\s*<!-- Awwwards Ribbon -->.*?(?=\s*<!-- Loading Screen -->)',
    '\n',
    text,
    count=1,
    flags=re.S,
)
if ribbon_count != 1:
    raise SystemExit('Expected to remove exactly one Awwwards ribbon block')

# Replace the old structured data with the real, defensible profile.
structured_data = '''<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "El Yazid Hammoubel",
      "jobTitle": "Software Engineering Student",
      "email": "hammoubelyazid@gmail.com",
      "telephone": "+212 649247160",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kenitra",
        "addressCountry": "Morocco"
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "ENSA Kénitra"
      },
      "knowsAbout": ["Software Engineering", "Python", "C", "JavaScript", "TypeScript", "SQL", "HTML", "CSS", "Node.js", "Express", "React", "PostgreSQL", "Linux", "Networks"],
      "sameAs": [
        "https://github.com/MrGray17"
      ]
    }
    </script>'''
text, structured_count = re.subn(
    r'<script type="application/ld\+json">.*?</script>',
    structured_data,
    text,
    count=1,
    flags=re.S,
)
if structured_count != 1:
    raise SystemExit('Expected exactly one JSON-LD block')

replacements = {
    '<title>El Yazid Hammoubel | Software Engineer | Full-Stack & Systems</title>': '<title>El Yazid Hammoubel | Software Engineering Student | Full-Stack & Systems</title>',
    '<meta name="title" content="El Yazid Hammoubel | Software Engineer | Full-Stack & Systems">': '<meta name="title" content="El Yazid Hammoubel | Software Engineering Student | Full-Stack & Systems">',
    '<meta name="description" content="Software Engineer specializing in Full-Stack & Systems, Cybersecurity, eBPF, AI Threat Detection, Networks, and MCP servers. Engineering student at ENSA Kénitra based in Kenitra, Morocco.">': '<meta name="description" content="Engineering student at ENSA Kénitra building backend, full-stack and systems projects with Python, C, JavaScript, TypeScript, SQL, React, Node.js and PostgreSQL.">',
    '<meta name="keywords" content="El Yazid Hammoubel, Software Engineer, Cybersecurity, Full-Stack Developer, Systems Engineer, eBPF, C++, Python, JavaScript, React, Next.js, Node.js, MTD, AI Threat Detection, ENSA Kenitra">': '<meta name="keywords" content="El Yazid Hammoubel, software engineering, Python, C, JavaScript, TypeScript, SQL, HTML, CSS, Node.js, Express, React, PostgreSQL, Linux, networks, ENSA Kenitra">',
    '<meta property="og:url" content="https://github.com/hammoubelyazid">': '<meta property="og:url" content="">',
    '<meta property="og:title" content="El Yazid Hammoubel | Software Engineer | Full-Stack & Systems">': '<meta property="og:title" content="El Yazid Hammoubel | Software Engineering Student | Full-Stack & Systems">',
    '<meta property="og:description" content="Software Engineer specializing in Full-Stack & Systems, Cybersecurity, eBPF, and AI Threat Detection.">': '<meta property="og:description" content="Engineering student building backend, full-stack and systems projects from first principles.">',
    '<meta property="twitter:url" content="https://github.com/hammoubelyazid">': '<meta property="twitter:url" content="">',
    '<meta property="twitter:title" content="El Yazid Hammoubel | Software Engineer">': '<meta property="twitter:title" content="El Yazid Hammoubel | Software Engineering Student">',
    '<meta property="twitter:description" content="Software Engineer specializing in Full-Stack & Systems, Cybersecurity, eBPF, and AI Threat Detection.">': '<meta property="twitter:description" content="Engineering student building backend, full-stack and systems projects from first principles.">',
    '<link rel="canonical" href="https://github.com/hammoubelyazid">': '<link rel="canonical" href="./">',
    'https://github.com/hammoubelyazid': 'https://github.com/MrGray17',
    '<span class="highlight highlight-yellow">hammoubelyazid.com</span>': '<span class="highlight highlight-yellow">this page</span>',
    '<span class="tech-badge"><i class="fas fa-shield-alt"></i> Cybersecurity</span>': '<span class="tech-badge"><i class="fas fa-code-branch"></i> Software Engineering</span>',
    '<span class="tech-badge"><i class="fas fa-code"></i> C++ / C</span>': '<span class="tech-badge"><i class="fas fa-code"></i> C</span>',
    '<span class="tech-badge"><i class="fab fa-react"></i> React / Next.js</span>': '<span class="tech-badge"><i class="fab fa-react"></i> React</span>',
    '<span class="tech-badge"><i class="fab fa-linux"></i> eBPF & Linux</span>': '<span class="tech-badge"><i class="fab fa-linux"></i> Linux</span>',
    '<span class="tech-badge"><i class="fab fa-docker"></i> Docker</span>': '<span class="tech-badge"><i class="fas fa-database"></i> PostgreSQL</span>',
    '<span class="tech-badge"><i class="fas fa-plug"></i> MCP Protocol</span>': '<span class="tech-badge"><i class="fas fa-database"></i> SQL</span>',
    'Systems & Security Lead Architect @ Neuro-Mesh': 'Engineering Internship @ Atos',
    'Designed sub-100ms eBPF/ONNX threat isolation pipeline, 6-step PBFT consensus over UDP, and 12K+ lines C++20 codebase.': 'Worked on automation around a Maroc Telecom Jira workflow, including an AI-assisted component using Llama 3 and PostgreSQL-backed data handling.',
    'Full-Stack & Security Engineer @ AEGIS & OpenToken': 'Building — Rate Limiter · Maw3id · OpenToken',
    'Built AI intrusion detection (99.91% accuracy on CICIDS2017), MTD active defense via NFQUEUE, and open-source MCP token engine.': 'Turning theory into real engineering output across backend systems, a full-stack clinic product, testing, databases and AI tooling.',
    "company: 'Neuro-Mesh & AEGIS'": "company: 'Atos + Independent Projects'",
    "period: '2024 - Present',\n                        role: 'Security Fabric & AI Systems Lead'": "period: '2026 - Present',\n                        role: 'Engineering Internship & Software Projects'",
    'Looking for an internship or collaboration in Cybersecurity & Systems Engineering': 'Open to software engineering internships, collaborations, and conversations about building interesting systems.',
    '<span>Software Engineer | Full-Stack & Systems</span>': '<span>Software Engineering Student | Full-Stack • Backend • Systems</span>',
}

for old, new in replacements.items():
    text = text.replace(old, new)

# Replace the old project showcase wholesale so no obsolete/fake project claims remain in source.
projects_section = '''<section class="section section-compact" id="projects">
            <div class="creator-showcase">
                <p class="creator-label">THREE BUILDS. THREE PROBLEMS. PLAY THEM.</p>
                <div class="creator-projects-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                    <div class="creator-item">
                        <a href="https://github.com/MrGray17/rate-limiter" target="_blank" rel="noreferrer" class="creator-project">
                            <span class="creator-name"><i class="fas fa-gauge-high"></i> Rate Limiter</span>
                        </a>
                        <p class="creator-tagline">TypeScript + Node.js rate limiting built from first principles with HTTP integration and tests.</p>
                        <a href="https://github.com/MrGray17/rate-limiter" target="_blank" rel="noreferrer" class="creator-github"><i class="fab fa-github"></i> View Project</a>
                    </div>
                    <div class="creator-item">
                        <a href="https://github.com/MrGray17/Maw3id" target="_blank" rel="noreferrer" class="creator-project">
                            <span class="creator-name"><i class="fas fa-hospital-user"></i> Maw3id</span>
                        </a>
                        <p class="creator-tagline">Clinic queue and appointment platform for Moroccan workflows using React, TypeScript, Express and PostgreSQL.</p>
                        <a href="https://github.com/MrGray17/Maw3id" target="_blank" rel="noreferrer" class="creator-github"><i class="fab fa-github"></i> View Project</a>
                    </div>
                    <div class="creator-item">
                        <a href="https://github.com/MrGray17/opentoken" target="_blank" rel="noreferrer" class="creator-project">
                            <span class="creator-name"><i class="fas fa-compress-alt"></i> OpenToken</span>
                        </a>
                        <p class="creator-tagline">Experimental TypeScript/Bun tooling exploring token compression for AI workflows with automated checks and tests.</p>
                        <a href="https://github.com/MrGray17/opentoken" target="_blank" rel="noreferrer" class="creator-github"><i class="fab fa-github"></i> View Project</a>
                    </div>
                </div>
            </div>
        </section>'''
text, project_count = re.subn(
    r'<section class="section section-compact" id="projects">.*?</section>',
    projects_section,
    text,
    count=1,
    flags=re.S,
)
if project_count != 1:
    raise SystemExit('Expected exactly one projects section')

# Source-level guardrails: these claims should not survive even if JavaScript is disabled.
forbidden = [
    'Neuro-Mesh',
    'AEGIS',
    'eBPF',
    'AI Threat Detection',
    '99.91%',
    'sub-100ms',
    '12K+ lines',
    'PBFT',
    'NFQUEUE',
    'marjo-ballabani',
    'github.com/hammoubelyazid',
    'hammoubelyazid.com',
    '-55% à -90%',
]
remaining = [item for item in forbidden if item in text]
if remaining:
    raise SystemExit(f'Forbidden legacy claims remain: {remaining}')

if text == original:
    raise SystemExit('Sanitizer made no changes')

path.write_text(text, encoding='utf-8')
print('Sanitized original.html successfully')
