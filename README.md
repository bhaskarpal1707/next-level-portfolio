# Bhaskar Pal — Next-Level Portfolio

A futuristic, animated, multi-page portfolio built with **React 19 + Vite + Tailwind CSS v4 + Framer Motion**.

## ✨ What's inside

| Route | Page |
|---|---|
| `/` | Home — kinetic hero, rotating role typewriter, dual skill marquees, animated stats, featured projects |
| `/about` | About — bio, photo panel, impact grid, full skills constellation |
| `/experience` | Experience — animated neon timeline (3 internships) |
| `/projects` | Projects — 26 projects, animated category filter with counts |
| `/education` | Education — result cards with CGPA glow + "View Result" links |
| `/certifications` | Certifications — issuer list with sheen hover |
| `/contact` | Contact — address / phone / email channel cards + direct CTA |

Signature interactions: custom neon cursor, aurora background, falling beams,
glassmorphism cards with conic-gradient hover borders, 3D tilt cards, magnetic
buttons, and scroll reveals. Reduced-motion is respected.

## 🗂 Editing content

**Everything lives in one file: [`src/data/portfolio.ts`](src/data/portfolio.ts).**
Update projects, skills, experience, education, certifications, links, and stats
there — the whole site updates automatically.

Drop your resume PDF at `public/resume.pdf` (the navbar "Resume" button points there).

## 🚀 Deploying to GitHub Pages (same flow as your old site)

The app uses **HashRouter**, so deep links (`/about`, `/projects`, …) work on
GitHub Pages without any server rewrites.

1. Build locally:

   ```bash
   bun install
   bun run build
   ```

2. One-time: in `vite.config.ts`, add a base path if you host under a repo
   sub-path (e.g. `https://<user>.github.io/<repo>/`):

   ```ts
   export default defineConfig({
     base: "/<repo>/",   // ← add this line
     // …rest of config
   });
   ```

   If you host at `https://<user>.github.io/` (user site), no base is needed.

3. Publish the `dist` folder — easiest is `gh-pages`:

   ```bash
   bunx gh-pages -d dist -t true
   ```

   …or commit `dist/` to the `gh-pages` branch manually / via GitHub Actions.

4. On GitHub: **Settings → Pages → Source: Deploy from a branch → `gh-pages` / root**.

## 🧞 Local development

```bash
bun install
bun run dev
```
