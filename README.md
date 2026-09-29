# Sageware Guidebook

How Sageware engineers design and build Intelligent Management Systems: the system a business runs on, the portal its customers use, and the Agents that work inside it. It starts with UX, in three parts (Management Systems, Customer Portals, Agent Interfaces); engineering practices join as they're written.

Internal. Not for clients.

## Run it

You need [Node.js](https://nodejs.org/) 20 or later and npm.

```bash
git clone git@github.com:sagewarehq/guidebook.git
cd guidebook
npm install
npm run dev
```

Then open <http://localhost:8766/>. Pages reload as you edit. Routes live in the URL hash, so a link like `http://localhost:8766/#/management/shell/skeleton` opens that page.

Read it on a desktop browser; the site has no phone layout.

## Other commands

| Command | What it does |
|---|---|
| `npm run check` | Type-checks every page. Run it before you push. |
| `npm run build` | Writes `dist/index.html`: the whole guidebook in one self-contained file that opens straight from disk (`file://`). Don't edit or commit `dist/`. |

## Where things are

| Path | What it holds |
|---|---|
| `catalog.ts` | Every part, chapter, and page, with its rule and status. Change the structure here. |
| `patterns/<chapter>/<id>.tsx` | One page. The file name matches the page's `id` in `catalog.ts`. |
| `site/` | The site itself: sidebar, search, page layout, and the parts every page is built from. |
| `STYLE.md` | Voice, words, colour, and type. |
| `CLAUDE.md` | The detailed conventions and the decisions behind them. Read it before writing a page. |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for branches, pull requests, and keeping your branch up to date.
