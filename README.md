# aurora-viewer.org

The website of [Aurora Viewer](https://github.com/Aurora-Viewer/Aurora-Viewer), served by GitHub Pages from the `main` branch.

It is a single static page: no build step, no framework, no tracking.

```
index.html            the page (English text; French lives in assets/js/site.js)
assets/css/site.css   styles, colours from the viewer's docs/BRANDING.md
assets/js/site.js     language switch, latest release, news, Aurora / Legacy demo
assets/fonts/         Inter 400 and 600 (SIL OFL, see LICENSE-Inter.txt), Latin subset
assets/img/           screenshots, logo, icons, social preview
CNAME                 custom domain for GitHub Pages
```

## What updates by itself

- **Version, date and download buttons.** On load, the page asks the GitHub API
  for the viewer's releases and takes the newest one whose tag starts with `v`
  followed by a digit (so `media-plugins-*` releases are skipped). The Windows
  button links straight to its `windows…zip` file; the Linux button switches
  from the install guide to a direct download as soon as a release carries a
  `linux` file. The answer is kept one hour in the visitor's browser.
- **News.** The page reads `news/en.md` or `news/fr.md` from the viewer
  repository, the same files as the login screen of the viewer, and shows the
  three newest items. Write a news item once: it appears in both places.

If the API cannot be reached, the page keeps the values written in
`index.html`. After a release, updating them there is optional but keeps the
page right for visitors without JavaScript.

## Languages

English is the text of `index.html`. French is in the `FR` table of
`assets/js/site.js`, keyed by each element's `data-i18n`. The language follows
the browser, then the visitor's choice (EN / FR buttons), or `?lang=fr`.

## Images

Screenshots are WebP, each in two widths (`name-1280.webp`, `name-2560.webp`),
used through `srcset`. To replace one, export the new capture at 2560 px wide
(English interface, no readable avatar or region names) and overwrite both
files, keeping the names. `og-image.jpg` (1200 × 630) is the preview shown when
the link is shared.

## Local preview

```bash
python -m http.server 8080
```

Then open http://localhost:8080.
