# CLAUDE.md — company-website

This is the source repo for the **Hallman Data Consulting marketing website** at `hallmandata.com`. It is one of eight repos in the Hallman Data Consulting infrastructure — see `~/.claude/CLAUDE.md` for the full picture.

---

## What this repo is

A static marketing website targeting non-technical small business owners. Its job is lead generation and credibility — not a portfolio or resume. The entire site is four files: `index.html`, `products.html`, `styles.css`, `main.js`, plus screenshots in `assets/`. No build step, no framework, no dependencies.

---

## Key files

| File | Purpose |
|---|---|
| `index.html` | Home page. Nav, Hero, Pain Points, Core Products (2x2 grid of all four products), What We Do, About, Contact, Footer. |
| `products.html` | Products page. One detailed section per product, each with a tabbed screenshot gallery. |
| `styles.css` | All styling. Mobile-first, breakpoints at 900px and 640px. Uses CSS custom properties for bar heights in the hero chart. |
| `main.js` | Mobile nav toggle, plus the screenshot tab galleries (`[data-shot-tabs]`). Panels are hidden with the `hidden` attribute, so every screenshot is still in the markup if the script never runs. |
| `assets/screens/` | Product screenshots, captured at 1440x900. Regenerate them whenever a dashboard's look changes — a stale screenshot is worse than none. |
| `assets/hdc-mark.png` | The HDC logo mark. Favicon here, and the browser-tab icon in all four Streamlit apps. |
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

**To deploy:** commit and push `main` from this repo. That is the whole deploy.

There is no second repo to sync to. `~/Code/Hallman-Data-Consulting.github.io` is a
*second local clone of this same GitHub repo*, not a separate host — check
`git remote -v` in both if that ever looks doubtful. It goes stale because
nothing pulls it; `git pull` it after a deploy or ignore it.

**Bump the `?v=` on `styles.css` and `main.js` in both HTML files with every
deploy.** Cloudflare serves the HTML uncached but caches CSS and JS for four
hours, so without a new version string a deploy ships new markup against the
previous release's stylesheet and script — which silently breaks anything
depending on new CSS classes or new JS, for up to four hours, with no error
anywhere. This has happened once already.

---

## Design system

See `BRAND.md` for the authoritative version.

**Color palette:**
- Navy (primary): `#1b2a4a`
- Gold (accent): `#c4972a`
- Cream (light background): `#f9f7f3`
- Charcoal (body text): `#1a1a18`
- Slate (secondary text): `#6b6a65`

**Typography:** Cormorant Garamond for headings, DM Sans for body (both Google Fonts).

**No emoji anywhere**, on the site or in the dashboards. Bullets and markers are drawn in CSS rather than typed as glyphs, because a glyph renders as a colour emoji on some platforms.

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

- **Fort Wayne screenshot**: the sentiment product is the only one still using a drawn CSS graphic instead of a real screenshot, because its database lives on EC2 and the dashboard is behind Google OAuth, so it cannot be captured locally. Take one from the live site and drop it in as `assets/screens/fortwayne-*.png`, then give it a `[data-shot-tabs]` gallery like the other three.
- **Two demos ask for a Google sign-in.** Ironforge and Fort Wayne sit behind oauth2-proxy, but any Google account gets in — there is no allowlist on those two (only `monitor.hallmandata.com` is restricted). Their `.product-access` notes say so explicitly, because "sign-in required" reads as "you cannot see this" and costs clicks.

---

## Related repos

| Repo | Relation |
|---|---|
| `~/Code/hallman-data-consulting.github.io` | GitHub Pages host — content from this repo is deployed there |
| `~/Code/server-infrastructure` | EC2/Nginx config that proxies `hallmandata.com` and hosts client dashboards |
| `~/Code/ironforge-fitness-example` | The demo project linked in the Demo section of this site |
| `~/Code/client-template` | The template this repo was initialized from (the scaffolding folders) |
