# Jack — 3D Creator Portfolio

Landing page built with React, TypeScript, Tailwind CSS, Framer Motion, and Lucide React.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    buttons/ContactButton.tsx      gradient pill CTA
    LiveProjectButton.tsx  ghost outline pill button
    FadeIn.tsx              scroll/mount fade-in wrapper (Framer Motion)
    Magnet.tsx               mouse-following magnetic hover effect
    AnimatedText.tsx        character-by-character scroll reveal
  sections/
    HeroSection.tsx
    MarqueeSection.tsx
    AboutSection.tsx
    ServicesSection.tsx
    ProjectsSection.tsx
    ProjectCard.tsx          sticky-stacking card used by ProjectsSection
  data/
    marqueeImages.ts
    services.ts
    projects.ts
  App.tsx
  main.tsx
  index.css
```

## Notes

- All imagery (portrait, decorative 3D icons, marquee GIFs, project screenshots)
  is pulled from the external URLs specified in the original brief. Swap the
  URLs in `src/data/*.ts` and the two hero image constants in
  `HeroSection.tsx` / `AboutSection.tsx` to use your own assets.
- The `.hero-heading` gradient-text class lives in `src/index.css`.
- Colors used: background `#0A0A0A`, text `#E8E9EB`, gradient text stops
  `#646973 → #BBCCD7`, contact-button gradient
  `#18011F → #B600A8 → #7621B0 → #BE4C00`.
- Respect for `prefers-reduced-motion` is included via a global CSS rule.
