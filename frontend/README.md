# EatRest Frontend

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## GitHub Pages deployment

This app is configured for GitHub Pages project hosting using the repository name in the Vite base path.

If your repository is:
`https://github.com/<username>/<repo>`

Then the Pages base should be:
`/repo/`

For this project, it is set to:
`/EatRest/`

Update the base path in `vite.config.js` if your GitHub repo name changes.
