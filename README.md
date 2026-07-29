# Alberto Garrido's portfolio

Personal portfolio and CV for Alberto Garrido Pacheco, published at
[agarpac.github.io](https://agarpac.github.io/). The site combines an
interactive WebGL introduction with an accessible HTML CV and exports as a
static GitHub Pages site.

## Quick start

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Before proposing a change, verify the supported quality gates:

```bash
npm run lint
npm run build
```

There is no automated test suite. The acceptance gate is `npm run build`
producing a complete `dist/client` export, together with a clean `npm run lint`
run.

## How the site is organized

The root page composes the whole experience:

```text
RootExperience
└── ParticleScroll
    ├── IntroCover
    └── CvDocument
```

- `IntroCover` is the interactive opening section.
- `CvDocument` is the readable portfolio and CV content.
- `ParticleScroll` coordinates the transition between them.
- `/cv` remains compatible by redirecting to `/#cv`.

The application uses a static Next.js export through vinext. `npm run build`
writes the deployable site to `dist/client`. Static export, trailing slashes,
and the GitHub user-site root path must remain intact.

## Change and deployment workflow

1. Create a branch from an up-to-date `main`.
2. Make the change and run `npm run lint` and `npm run build` for executable
   changes.
3. Commit with a conventional commit message, for example
   `feat: improve portfolio introduction`.
4. Push the branch and open a pull request.
5. Merge the reviewed pull request into `main`.

Every push to `main` automatically runs
[Deploy to GitHub Pages](.github/workflows/deploy-pages.yml), builds
`dist/client`, and publishes it to GitHub Pages. Do not deploy the generated
files directly.

To redeploy without a new commit, open **Actions → Deploy to GitHub Pages** in
GitHub and choose **Run workflow**. This invokes the workflow's manual
`workflow_dispatch` trigger.

## Browser experiment

The root layout includes an origin-trial token for Chrome's `HTMLInCanvas`
feature. It is scoped specifically to `https://agarpac.github.io:443` and
expires on **2026-10-20**. Renew or remove the token before that date, while
preserving the HTML fallback for unsupported browsers.

## Attribution

The robot model is “Robot” by jeremy from
[Poly Pizza](https://poly.pizza/m/avY4wqUiyaw), licensed under
[CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). The dithered WebGL
component is adapted from
[Canvas UI — Dithered Object](https://canvasui.dev/docs/components/dithered-object)
under its stated MIT + Commons Clause terms. See
[public/models/ATTRIBUTION.md](public/models/ATTRIBUTION.md) for the full asset
and component notices.

These notices cover the attributed model and component only. This repository
does not declare a repo-wide license.
