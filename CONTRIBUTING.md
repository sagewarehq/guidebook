# Contributing

Every change goes through a pull request into `main`. Nobody pushes to `main` directly.

## Before you start

- Read `CLAUDE.md` (how pages are built, and the decisions behind them) and `STYLE.md` (voice, words, colour).
- Check the page's entry in `catalog.ts`. Its `title` is the rule your page has to show; its `status` says whether it's planned, a draft, or written.
- One pull request per page or per topic. Small ones get reviewed faster.

## 1. Make a branch

Start from an up-to-date `main`:

```bash
git switch main
git pull
git switch -c page/agents-schedule
```

Name branches for what they change:

| Prefix | For |
|---|---|
| `page/` | A new or rewritten page, e.g. `page/portal-claiming` |
| `fix/` | A correction to an existing page, e.g. `fix/billing-totals` |
| `site/` | The site itself: sidebar, search, layout, e.g. `site/search-by-rule` |
| `docs/` | README, CONTRIBUTING, CLAUDE.md, STYLE.md |

## 2. Make the change

- Run `npm run dev` and keep the page open while you work.
- A new page is `patterns/<chapter>/<id>.tsx`. When it's ready, set its `status` to `'written'` in `catalog.ts` (or `'draft'` if it's a sketch to discuss).
- Put its styles in `patterns/<chapter>/<chapter>.css` under a class prefix nobody else uses (search the repo for it first).
- Create any stylesheet or helper file **before** you import it. The site loads every page at once, so one broken import takes the whole site down for everyone running it.
- Keep the figures believable and make them add up. Reuse the cast and records in `CLAUDE.md` so pages agree with each other.

## 3. Check it

```bash
npm run check
npm run build
```

Both must pass. Then look at the page in the browser, including any Do/Avoid pairs, and make sure nothing spills out of its frame.

## 4. Commit

Commit in small steps with messages that say what changed and why, in the imperative:

```
Add the Scheduled tasks page for Agents
Fix Plan and billing totals so September adds up
```

Don't commit `dist/` or `node_modules/` (both are in `.gitignore`).

## 5. Keep your branch up to date: rebase

If `main` moved on while you worked, rebase your branch onto it rather than merging `main` into your branch. It keeps the history a straight line.

```bash
git fetch origin
git rebase origin/main
```

If git stops on a conflict:

1. Open the files it lists, and keep the right version of each conflicted part. `catalog.ts` is the usual one: two people added pages to the same chapter, so keep both lines.
2. Mark each file resolved and carry on:

   ```bash
   git add catalog.ts
   git rebase --continue
   ```

3. To give up and go back to where you were: `git rebase --abort`.

After a rebase, run `npm run check` again, then update your pull request. A rebase rewrites your branch, so push with lease:

```bash
git push --force-with-lease
```

`--force-with-lease` refuses to overwrite anything someone else pushed to your branch in the meantime. Never force-push to `main`.

## 6. Open a pull request

```bash
git push -u origin page/agents-schedule
gh pr create --fill
```

Or open it on GitHub. In the description, say:

- Which page or pages it adds or changes, with their routes (e.g. `#/agentic/agents/schedule`).
- Any decision it relies on, and whether it's recorded in `CLAUDE.md`.
- A screenshot of the main demo.

## 7. Review and merge

- One approval is enough. Reviewers check the page against its rule in `catalog.ts`, `STYLE.md`, and the decisions in `CLAUDE.md`.
- Answer review comments with new commits; rebase again if `main` moved.
- Merge with **Squash and merge**, so each pull request lands as one commit on `main`. Delete the branch afterwards.

## Recording decisions

When a pull request changes how something works, not just how it's drawn (for example "Agents only draft"), add a line to the matching section of `CLAUDE.md` with the date and who decided. Future pages follow what's written there.
