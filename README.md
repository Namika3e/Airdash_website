# AirDash

The existing Vite + React app, expanded with eleven distinct destinations and a cinematic homepage. No backend has been replaced or modified. The starting repository had a single page with hash links; the requested page URLs have been added with React Router.

## Run and verify

- `npm install`
- `npm run dev`
- `npm run build`
- `npx playwright install chromium` (first test run)
- `npm test`
- `npm run media:optimize` after replacing source imagery

Configure your static host to serve `index.html` for unknown paths, so direct visits to `/coverage`, `/waitlist`, and other React routes work. Vite development/preview already supports this. Do not rewrite actual media/assets to HTML.

## Replace the placeholders

`src/data/media.js` is the only asset manifest. Replace the image paths, responsive `srcSet`, and alt descriptions there. The CGI aircraft is a single transparent WebP reused across the experience. Keep its framing and transparent padding consistent when swapping it.

Source PNGs are in `design/source-media/`, outside the public/build directories. `scripts/optimize-media.mjs` makes 900px and 1680px WebP variants. Files referenced by the site are in `public/media/`. Generated imagery is concept material, not documentary photography or approved aircraft design. See `design/ASSETS.md` for provenance and prompts.

`src/data/pages.js` owns supporting-page copy and destinations. Coverage is an illustrative map with unconfirmed service availability, not a live eligibility API. App states and flight times are illustrative.

## Forms

No original submission endpoints existed. With blank environment variables, the contact/waitlist forms clearly explain that they save a draft locally and send nothing to AirDash. Each requires consent and includes a clear-saved-details action. Connect approved POST JSON URLs in `.env.local` using `.env.example` when ready. The endpoint must validate inputs and consent, handle spam/rate limits and persistence, and return a successful response only after accepting the submission. No secrets belong in `VITE_` variables.

The payload is `{ name, email, consent, neighbourhood, interest }` for waitlist and `{ name, email, consent, message }` for contact. Interest is `customer`, `merchant`, or `community`. A non-2xx or network failure shows an error and retains the fields.

## Motion architecture

- `components/motion/animation.js`: GSAP registration, context ownership, responsive media queries, pinned scene timeline helper.
- `NavigationMotion.jsx`: a single Lenis instance driven by the GSAP RAF ticker, ScrollTrigger synchronization, cleanup, route/history scroll restoration and page transition line.
- `Primitives.jsx`: SplitType headings, masked/parallax imagery, aircraft, CTA and chapter-label components.
- `HeroRouteScene.jsx`: one city image moves from hero to road/direct route comparison, then zooms into the destination image.
- `DestinationAppScene.jsx`: the same full-screen aerial image is clipped into the device, then one device cycles through the app states.
- `TetherSequence.jsx`: 0–100 timeline with shared package/cable geometry; no frame download or WebGL dependency. Reverse scroll reverses the physical descent.
- `EverydayScenes.jsx`: food gallery, coverage, partner pathways and closing.

Desktop uses weighted wheel scrolling. Touch keeps native scrolling with shorter scene durations. Reduced motion disables Lenis, pins, scrubbing and parallax; CSS presents readable static story states. GSAP media-query contexts revert on unmount, hot reload and media preference changes. Image load, fonts and viewport resizing refresh scene geometry.

Add `?motionDebug` in development to see ScrollTrigger markers. Production builds cannot enable them.

The original unused homepage component files and logo/video assets remain available; their old wheel-blocking implementation is no longer mounted. Existing useful anchors `#top`, `#fleet`, `#mission`, `#tracking`, and `#contact` still resolve. There were no backend/API integrations or existing routed pages to remove.

Implementation references: [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/), [Lenis GSAP synchronization](https://github.com/darkroomengineering/lenis#gsap-scrolltrigger). The interaction brief references [pear.no](https://pear.no); no branding, copy or assets were imported from it.
