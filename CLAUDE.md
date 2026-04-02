# CLAUDE.md — company-website

This is the source repo for the **Hallman Data Consulting marketing website** at `hallmandata.com`. It is one of five repos in the Hallman Data Consulting infrastructure — see `~/.claude/CLAUDE.md` for the full picture.

---

## What this repo is

A static marketing website targeting non-technical small business owners. Its job is lead generation and credibility — not a portfolio or resume. The entire site is three files: `index.html`, `styles.css`, `main.js`. No build step, no framework, no dependencies.

---

## Key files

| File | Purpose |
|---|---|
| `index.html` | The full site (261 lines). One page, seven sections: Nav, Hero, Pain Points, What We Do, How It Works, Demo, About, Contact, Footer. |
| `styles.css` | All styling (731 lines). Mobile-first, breakpoints at 900px and 640px. Uses CSS custom properties for bar heights in the hero chart. |
| `main.js` | Mobile nav toggle only (18 lines). Toggles `.open` on `.nav-links` and sets `aria-expanded`. |
| `CONTEXT.md` | Business goals, target audience, tone guidelines, Ironforge demo details. Read this before changing copy. |
| `CNAME` | Contains `hallmandata.com` — tells GitHub Pages to serve the site at the custom domain. |

### Ignore these — template scaffolding, not used by the site
`src/`, `data/`, `notebooks/`, `dashboards/`, `infrastructure/`, `docs/`, `.env.example`

These were inherited from `client-template` and have never been used in this repo. Do not populate or reference them for website work.

---

## Deployment pipeline

```
this repo (source)
    ↓  git push
hallman-data-consulting.github.io (~/Code/hallman-data-consulting.github.io)
    ↓  GitHub Pages serves from that repo
hallmandata.com (DNS → GitHub Pages)
    ↓  Nginx on EC2 (18.214.89.223) proxies hallmandata.com → GitHub Pages
monitor.hallmandata.com (tracks all traffic including this site)
```

**To deploy:** Push changes here, then sync the content to the `.github.io` repo. The site is not auto-deployed from this repo directly — the `.github.io` repo is the actual GitHub Pages host.

---

## Design system

**Color palette:**
- Navy (primary): `#1e3560`
- Blue (accent / CTA): `#2b7de9`
- Light background: `#f0f4fb`
- Gray (secondary text): `#64748b`
- Text: `#1a1a2e`
- Footer background: `#0f1d3a`

**Typography:** Inter (Google Fonts), weights 400/500/600/700.

**Layout:** `.container` = `max-width: 1100px`, `padding: 0 24px`. Section padding is `96px 0` on desktop, `64px 0` on mobile.

---

## Copy conventions

The audience is non-technical small business owners. Strict rules from `CONTEXT.md`:
- **Never use:** ETL, K-Means, RFM, Pandas, pipeline, ML, algorithm, or any technical term
- **Always use:** Business outcomes — retention, revenue, customers, decisions
- **Tone:** Professional but approachable, confident, not salesy
- **CTA:** Single contact point — `levi.m.hallman@gmail.com`

---

## Pending work in the site

- **Demo screenshot placeholder** (`index.html:172`): The `.demo-preview` div currently shows "Screenshot coming soon". Replace with `<img src="assets/ironforge-screenshot.png" alt="Ironforge Fitness dashboard screenshot" />` once the screenshot is captured.
- The live Ironforge dashboard is linked as `http://18.214.89.223:8501` (direct IP). This should be updated to `https://ironforge.hallmandata.com` once that subdomain is confirmed stable.

---

## Related repos

| Repo | Relation |
|---|---|
| `~/Code/hallman-data-consulting.github.io` | GitHub Pages host — content from this repo is deployed there |
| `~/Code/server-infrastructure` | EC2/Nginx config that proxies `hallmandata.com` and hosts client dashboards |
| `~/Code/ironforge-fitness-example` | The demo project linked in the Demo section of this site |
| `~/Code/client-template` | The template this repo was initialized from (the scaffolding folders) |
