# Tahmid Zaman Tahi — Research Portfolio

This repository contains the source for [tahmidzee.github.io](https://tahmidzee.github.io), an academic portfolio built with the [al-folio](https://github.com/alshedivat/al-folio) Jekyll starter.

## Content map

- `_pages/` — home, research, publications, projects, CV, and writing
- `_bibliography/papers.bib` — hand-checked publication metadata
- `_projects/` — selected research project pages
- `_news/` — dated announcements shown on the home page
- `_posts/` — research notes and writing beyond research
- `_data/cv.yml` — RenderCV source used for the web CV and downloadable PDF

## Local preview

```bash
docker compose up
```

Open `http://localhost:8080`.

## Publishing

Changes pushed to `main` are built by GitHub Actions and deployed to the `gh-pages` branch. GitHub Pages should be configured to publish from that branch.

## Updating content

1. Edit the relevant Markdown, YAML, or BibTeX source.
2. Run `npm run lint:prettier`.
3. Run `bundle exec jekyll build`.
4. Commit and push to `main`.

Publication and manuscript status must be verified before it is made public. Private repository details should not be added without confirming they are safe to disclose.
