# SHIVONIX project status

Updated: 26 October 2026

## Architecture

- Next.js App Router, TypeScript, Tailwind CSS v4
- Motion for page enter and the command palette
- React Three Fiber, Three.js, and Drei for the desktop hero prism only
- Content in `src/config` and `src/data`
- Route group `(site)` for the portfolio shell
- Demos under `/demos/*` with their own layouts
- Case studies at `/work/[slug]`

## Milestones

1. Foundation, tokens, shell — implemented
2. Brand, logo, hero, portrait, prism — implemented
3. About, services, skills, project references — implemented
4. Six demos and Creative Lab — implemented
5. Contact, socials, resume, footer — implemented
6. Responsive pass, accessibility, SEO, build verification — done, with the limits below

## Completed

- Portrait saved at `public/images/jyoti-shivonix.png` from the supplied photo (700×1024)
- Milieu Solar reviewed in a browser on 26 Oct 2026: Malaysian solar PV company, photographic hero, quote form, Selangor and Johor offices. Role is not claimed beyond “worked on the site”
- Design system, navigation, command palette, intro, cursor glow, scroll beam
- Eight services with prefilled contact
- Six labeled concept demos
- Creative Lab with filters and a dialog
- Mailto contact form, optional Web3Forms via env
- Resume template PDF
- Sitemap, robots, manifest, Open Graph image, JSON-LD

## Remaining

- Disruptive Doctors link was not inspected; copy stays marked for confirmation
- Confirm Jyoti’s exact role, dates, education, and skill rows
- Replace the resume template before sending it
- Cart quantity click was not exercised in the browser. The Arc Lamp page did render with its concept label and sample price

## Known issues

- Exact contribution on Milieu Solar is a placeholder in `src/data/projects.ts`
- Disruptive Doctors overview is a placeholder
- Timeline education row and several skills are marked `please-confirm` or `confirm`
- Resume must be edited before it is sent to anyone
- No light theme
- Intro overlay covers the first screen for about one second, and can be skipped. Content is already in the page

## Verification

- `npm run build` passed (46 routes)
- `npm run lint` passed
- Browser, 26 Oct 2026: homepage at 390px and 1425px had no sideways scroll. Portrait loaded. Empty contact submit showed inline errors. `/work/milieu-solar`, `/demos/nova-cart`, the resume PDF, sitemap, and robots returned 200
- Dev server: http://localhost:3001 (3000 was already in use)
