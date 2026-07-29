# Project rules for agents

Keep this portfolio deployable as a static GitHub user site and preserve its
accessible fallback experience.

## Content and architecture

- Write technical artifacts and code comments in English.
- Keep user-visible copy in Spanish.
- Preserve the root composition: `RootExperience` combines `IntroCover` and
  `CvDocument` through `ParticleScroll`.
- Preserve `/cv` → `/#cv` and `/v2` → `/` compatibility.
- Preserve the HTML fallback, reduced-motion behavior, and WebGL resource
  cleanup.
- Do not remove unused starter scaffolding piecemeal. Treat cleanup as a
  deliberate, separately scoped change.

## Static-site constraints

- Preserve `output: "export"`, `trailingSlash: true`, and root-relative paths
  for the `agarpac.github.io` user site.
- Do not introduce server-only features, request-time APIs, or runtime
  dependencies that cannot work in a static export.
- The deployable output is `dist/client`.
- Do not edit generated directories, including `dist/`, `.next/`, or
  `node_modules/`.

## Verification and deployment

- After executable changes, run `npm run lint` and `npm run build`.
- `npm test` is stale and is not a valid gate for the current site.
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
