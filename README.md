# FOP Calculator

Tax calculator for Ukrainian sole proprietors (FOP) in group 3. Calculates unified tax (1%, 3%, 5%) and shows totals by quarter and year.

🔗 [fop-calc](https://crazzzzydiamond.github.io/fop-calc/)

## Features

- Add income entries with date, amount, and currency
- Automatic NBU exchange rate fetching for UAH conversion
- Breakdown by quarters and half-years
- Multiple independent accounting books
- Ukrainian and English language support
- All data stored locally in the browser — no tracking, no third parties

## Stack

- React 19, TypeScript
- Tailwind CSS v4
- Vite
- i18next
- mathjs, dayjs

## Development

```bash
pnpm install
pnpm start
```

## Tests

```bash
pnpm test
```

## Deploy

```bash
pnpm deploy
```

Deploys to GitHub Pages via `gh-pages`.
