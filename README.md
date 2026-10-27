# SHIVONIX

Portfolio and digital studio site for Jyoti Agarwal. It runs locally with no API keys.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run start
npm run lint
```

## Edit content

- `src/config/site.ts` — email, phone, social links, availability, site URL
- `src/data/skills.ts` — technologies and the daily / exploring labels
- `src/data/projects.ts` — case studies, including Milieu Solar and Disruptive Doctors
- `src/data/services.ts`, `src/data/timeline.ts`, `src/data/home.ts`
- `public/images/jyoti-shivonix.png` — portrait
- `public/resume/Jyoti-Agarwal-Resume.pdf` — replace the template before sharing it

The resume is a one-page template. Every line marked CONFIRM needs a real value. Regenerate the starter file with:

```bash
node scripts/write-resume.mjs
```

## Contact form

By default, submit opens an email draft to contactjyotiiagarwal@gmail.com. The message is not delivered until that draft is sent.

To use the free [Web3Forms](https://web3forms.com) tier, create `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_public_access_key
```

That key is a public form key, not a server secret. If the request fails, the form says so and does not pretend the message was sent.

## Hosting

The site is a static-friendly Next.js app and does not need a database.

- **Cloudflare Pages** or **Netlify**: free tiers suitable for a personal or freelance site. Watch build minutes and bandwidth on the current plan.
- **Vercel Hobby**: free for many personal projects. Check the current plan terms before using it for client work; commercial use has been restricted on the hobby tier.

Set `NEXT_PUBLIC_SITE_URL` to the public origin so canonical URLs, the sitemap, and Open Graph resolve correctly. The local default is `http://localhost:3000`.

## Notes

Dark theme only. The 3D prism loads on desktop when WebGL is available and motion is allowed. Phones, reduced motion, and low-memory devices get the SVG prism.
