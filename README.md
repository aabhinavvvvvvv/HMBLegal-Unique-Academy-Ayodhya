# Unique Academy, Ayodhya — Website

Official website of **Unique Academy, Ayodhya Branch** — the seventh branch of the Unique Group of Schools.
*Come Unique, Be Unique.*

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and Motion.

---

## Run locally

Requires Node.js 20.9 or newer. In WSL, run commands from inside Ubuntu (not through the
`\\wsl.localhost\…` Windows path) for fast file watching.

```bash
npm install
npm run dev          # http://localhost:3000
```

Production check:

```bash
npm run typecheck
npm run build
npm start            # serves the production build on port 3000
```

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | Our Story — about, the blend of modern education and timeless values, journey (`#journey`), the Unique Difference (`#difference`), motto |
| `/vision-mission` | Vision (`#vision`), Mission (`#mission`), the Unique Philosophy (`#philosophy`), Meet the Future (`#future`) |
| `/campus` | Why Unique Academy — the seven strengths, each with its own anchor (`#ai-lab`, `#classrooms`, `#technology`, `#faculty`, `#indoor-games`, `#co-curricular`, `#holistic`) |
| `/student-life` | Education Beyond the Classroom, Meet the Future (`#future`) |
| `/admissions` | Welcome, A Promise to Every Parent (`#promise`), admission enquiry form (`#enquiry`) |
| `/contact` | Address, map, directions, contact form |
| `/gallery` | Appears automatically once photos are added (returns 404 until then) |
| `/privacy` | Privacy notice for the forms |
| `/api/enquiry` | Form endpoint (POST) |

Also generated: `/sitemap.xml`, `/robots.txt`, favicon and app icons, School + Breadcrumb structured data.

## Editing content

All school content lives in `src/content/` — UI components never hard-code facts.

| File | What it holds |
|---|---|
| `site.ts` | Name, tagline, motto, address, map query, **phone / email / WhatsApp / hours / social**. Phone and email are set; WhatsApp, hours and social are still `null`. Fill them in and they appear in the header, footer, contact and admissions pages, form notices and structured data automatically. |
| `school.ts` | All page copy, taken from the school's content document |
| `navigation.ts` | Header dropdowns and footer links |
| `media.ts` | Photographs and gallery |

### Photographs

School photos live in `public/images/school/` (watermarks cropped, camera/GPS metadata removed).
The originals as supplied are kept, unserved, in `assets-source/photos-original/`.

All placements are set in `src/content/media.ts`:

- `library` — every photo with its alt text, caption and focal point (`position`).
- `photos` — the image for each strength on the "Why Unique" page. `aiLab`, `technology` and
  `indoorGames` are `null` (no matching photo yet) and show an illustration panel.
- `heroPhotos`, `introPhotos`, `homeMosaic`, `studentLifeMosaic` — page placements.
- `gallery` — the Gallery page, with Celebrations / Cultural Programmes / Learning filters.

To add a photo: put it in `public/images/school/`, add an entry to `library` (with real
`width`/`height` and descriptive `alt`), then reference it where it should appear.
Next.js resizes and serves AVIF/WEBP automatically.

## Forms (admission enquiry & contact)

Forms are validated in the browser and delivered by email through [Web3Forms](https://web3forms.com).
The form's public access key is set in `src/lib/web3forms.ts`. It is meant to be used in the browser,
so it is safe to commit. Choose the receiving inbox, spam filtering and auto-replies in the Web3Forms dashboard
(Settings), where submissions can also be viewed and exported. The free plan allows a limited number of
submissions per month.

A visitor sees the thank-you message only after Web3Forms confirms delivery. Otherwise they are asked to
try again or to call the school. A hidden honeypot field silently drops bot submissions.

**Alternative (Resend):** set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=` (empty) to switch Web3Forms off. The
forms then post to `/api/enquiry`, which sends through Resend when these are set:

```
RESEND_API_KEY=...
ENQUIRY_TO_EMAIL=school-inbox@your-domain
ENQUIRY_FROM_EMAIL="Unique Academy Website <website@your-domain>"
```

With neither configured, a valid submission tells the visitor plainly that online enquiries are not
connected yet. It never pretends the message was sent.

## Deploy

**Vercel (recommended):** import the repository, add the environment variables above, deploy.
Any Node host also works: `npm run build && npm start` behind a reverse proxy.
Set `NEXT_PUBLIC_SITE_URL` so canonical URLs, the sitemap and social previews use the real domain.

## Structure

```
src/
  app/                 routes, layout, metadata, sitemap, robots, API route
  components/
    layout/            Header (dropdowns, mobile menu), Footer, PageHero (breadcrumbs)
    sections/          page sections (hero, timeline, feature blocks, section nav, gallery, map…)
    forms/             EnquiryForm
    motion/            Reveal / Stagger / Counter / Parallax / MotionProvider
    ui/                Button, Logo, SectionHeading, Visual, Rays
  content/             all school data
  lib/                 validation schema, icons, utilities
assets-source/         original logo files (not served)
```

Animations respect the visitor's "reduce motion" setting, and content stays visible without JavaScript.
