# aurora-viewer.org

The website of [Aurora Viewer](https://github.com/Aurora-Viewer/Aurora-Viewer), served by GitHub Pages from the `main` branch.

It is a static site: no build step, no framework, no tracking.

```
index.html               home page
download/index.html      download page: one system at a time, install steps, requirements
support/index.html       community and support: report a bug, ideas, FAQ, guides
privacy/, uninstall/,    policy pages, each written in English and French
code-signing/, ai-policy/
assets/css/site.css      styles, colours from the viewer's docs/BRANDING.md
assets/js/site.js        language switch, latest release, news, window tour,
                         drop-down panels, the download page's system picker
assets/fonts/            Inter 400 and 600 (SIL OFL, see LICENSE-Inter.txt), Latin subset
assets/img/              screenshots, logo, icons, social preview
CNAME                    custom domain for GitHub Pages
```

Every page carries the same header (EN / FR, Discord, GitHub, the Community
and support menu, Download), the same footer and the floating Help and
feedback button. They are written out in each page: when you change one, change
it in all of them.

## What updates by itself

- **Version, date and downloads.** On load, each page reads two sources and
  keeps the newest answer: `latest.json` on this site, and the GitHub API for
  the viewer's releases. Both take the newest stable release whose tag starts
  with `v` followed by a digit (so betas and `media-plugins-*` releases are
  skipped). The version and date, the release notes link and, on the download
  page, each system's button, file name, size and SHA-256 link (the `.sha256`
  file next to it), and the file name in the Linux commands follow that
  release. The answer is kept one hour in the visitor's browser; a tab left
  open asks again when it is shown after that hour. An answer older than the
  version written in the page is ignored.
- **`latest.json`.** The `Latest release` workflow
  (`.github/workflows/latest-release.yml`) writes it every 15 minutes from the
  GitHub API, once the release has its three downloads, and commits it when it
  changed. Run it by hand from the Actions tab right after a release to skip the
  wait. Being on this site, it still works for visitors whose GitHub API calls
  are rate limited (shared addresses, VPNs, mobile networks) or blocked by a
  privacy filter.
- **The visitor's system.** The download page opens on the visitor's system
  (Windows when it cannot tell, for example on a phone) and marks it
  "Detected"; `?os=windows`, `?os=linux` or `?os=macos` picks one.
- **News.** The home page reads `news/en.md` or `news/fr.md` from the viewer
  repository, the same files as the login screen of the viewer, and shows the
  three newest items. Write a news item once: it appears in both places.

If the API cannot be reached, the pages keep the values written in their HTML.
After a release, updating them there (version, date, links, file names, and the
sizes with their `data-bytes`) is optional but keeps the pages right for
visitors without JavaScript.

## Languages

English is the text of the HTML. French is in the `FR` table of
`assets/js/site.js`, keyed by each element's `data-i18n` (`data-i18n-aria`,
`data-i18n-alt` and `data-i18n-placeholder` for attributes); a new key goes next
to a related one. The policy pages hold both languages and show one. The
language follows the browser, then the visitor's choice (EN / FR buttons), or
`?lang=fr`.

## Images

Scene captures (`world`, `build-land`, `login`, `viewfinder`) are WebP in two
widths (`name-1280.webp`, `name-2560.webp`), used through `srcset`; window
captures (`win-*.webp`) are single files at their native size, like
`photo-looks.webp`, the photo filters panel (the viewer's
`docs/screenshots/photo-looks.webp`). To replace one,
overwrite the files, keeping the names, and update the image's `width` and
`height` in the HTML if its size changed. In the photo section, the
`.vf-lock` element is placed over the viewfinder's green AF point in percent
of the picture: move it with a new capture. `og-image.jpg` (1200 × 630) is the
preview shown when the link is shared.

## Local preview

```bash
python -m http.server 8080
```

Then open http://localhost:8080.
