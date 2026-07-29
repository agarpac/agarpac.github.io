# Project rules for agents

Keep this portfolio deployable as a static GitHub user site and preserve its
accessible fallback experience.

## Content and architecture

- Write technical artifacts and code comments in English.
- Keep user-visible copy in Spanish.
- Preserve the root composition: `RootExperience` combines `IntroCover` and
  `CvDocument` through `ParticleScroll`.
- Preserve `/cv` → `/#cv` compatibility.
- There is no real route-to-route navigation. Only `/` and `/cv` exist, `/cv`
  is a redirect stub, and the six `CvNavigation` entries plus the intro CTA are
  all fragments. RSC client-side navigation buys nothing here.
- Keep `effectStart="#cv"` on `ParticleScroll`. The dissolve must not apply to
  the intro cover. `rowTargetFor` masks rows in document space with a
  `smoothstep` over the boundary and holds excluded rows at progress `1`, the
  existing pass-through value.
- Do not try to disable the effect by skipping a draw. There is no
  `gl.clear()`; the base fullscreen quad is the clear, so it must always run.
- Preserve the HTML fallback, reduced-motion behavior, and WebGL resource
  cleanup.
- Do not remove unused starter scaffolding piecemeal. Treat cleanup as a
  deliberate, separately scoped change.

## Static-site constraints

- Preserve `output: "export"`, `trailingSlash: true`, and root-relative paths
  for the `agarpac.github.io` user site.
- Keep `vinext` pinned inside the `0.0.51`–`0.0.52` window; it is currently
  `0.0.52`. Below `0.0.51`, any in-page fragment link triggers an infinite
  navigation loop. From `0.0.53` on, the prerenderer gets a `308` for `/cv`
  under `trailingSlash: true` and treats it as a skipped dynamic route, so the
  export silently loses `cv/index.html` and `404.html`.
- Validate any `vinext` bump by asserting that `cv/index.html` and `404.html`
  exist in `dist/client`. The build exits 0 either way, so lint and build
  status alone will not catch the regression.
- Known cost of `0.0.52`: the client still requests `/.rsc` for the root and
  gets a 404, because the `toRscRequestPath` guard fails on `"/"`. Upstream
  fixed this in `0.0.55`, which the export regression puts out of reach.
- Do not introduce server-only features, request-time APIs, or runtime
  dependencies that cannot work in a static export.
- The deployable output is `dist/client`.
- Do not edit generated directories, including `dist/`, `.next/`, or
  `node_modules/`.

## Verification and deployment

- After executable changes, run `npm run lint` and `npm run build`.
- There is no test suite. The acceptance gate is a successful `npm run build`
  that produces `dist/client`, plus a clean `npm run lint`.
- Deploy only through `.github/workflows/deploy-pages.yml` after changes reach
  `main`; never publish generated output directly.
- The workflow may also be started manually with `workflow_dispatch`.

## External assets and browser features

- Preserve attribution and license notices in
  `public/models/ATTRIBUTION.md` when changing the robot model or adapted
  Dithered Object component.
- Do not claim a repo-wide license; the existing notices apply to their named
  assets and component.
- The `HTMLInCanvas` origin-trial token is scoped to
  `https://agarpac.github.io:443` and expires on **2026-10-20**. Renew or
  remove it before expiry without weakening fallback behavior.
- The particle effect only runs in Chromium under that trial, gated on
  `drawElementImage` being present. Every other browser renders the plain-DOM
  fallback with no effect, so treat the effect as an enhancement and never the
  only path to content.
