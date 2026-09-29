# Sageware style guide

How every Sageware deck looks and reads. `COMPANY.md` says what is true; this file says how to say it and show it. Every deck in this repo follows it. If a deck needs to break a rule, change the rule here first.

The implementation is `shared/`: tokens in `shared/styles/tokens.css`, type and the slide frame in `shared/styles/base.css`, and React components in `shared/components/`. Every deck builds on them rather than inventing its own.

## Voice

- Plain language for a business owner, not a technical buyer. Short sentences. Concrete examples over abstractions.
- Speak to the reader as "you" and "your team". Sageware is "we".
- Blame the tools, never the client's people.
- Agents assist, people decide. Every Agent slide ends on who makes the decision.
- Label example figures as illustrative on the slide itself.
- Explain before pitching. No false scarcity, no deadlines, no discount styling: no strikethroughs, no "Free" labels, no "bonus" wording.

## Terminology

| Use | Avoid |
|---|---|
| Agent, Agents, capitalised | bot, assistant, lowercase agent |
| The Record-Up Method | the framework, the stack |
| Record, Access, Action, Artifact, Analytics, Agents; Intelligence for the top layer, humans and Agents together (was Users, 2026-09-28) | other layer names, Insight (renamed Analytics, 2026-09-27) |
| The Typical Project | package, bundle, Scale Without Hiring, the Foundation |
| System Analysis, the System Analysis Report | Process Reengineering (renamed 2026-09-27), Discovery, Discovery Workshop, Systems Discovery, audit, assessment, consultation |
| Care, Care+, Ad-Hoc; together, Support plans | Hypercare, retainer, maintenance plan, operations plans |
| ₱80k, ₱2.2M, no space after ₱ | PHP on slides, spelled-out amounts |
| Staff Training | Train the Trainers (renamed 2026-09-27), training on its own |

## Writing on slides

- **Headlines** are sentence case and end with a full stop: "One step at a time." Two short sentences are fine: "Agents prepare. You approve."
- **Labels** (the eyebrow above a headline) are two or three words, sentence case in the source, set in capitals by CSS: "Our approach", "After go-live".
- **Ledes** are one or two sentences under the headline.
- **Body lines** are one line where possible, two at most. Put detail in the written quote, not on the slide.
- **Punctuation:** curly quotes and apostrophes (’ “ ”). Use `&nbsp;` to keep a name with its noun, such as `AI&nbsp;Agents`.
- **Numbers:** ₱120k, ₱1.8M, 24 weeks, weeks 4 to 8. Time saved reads before → after: "2 days → 15 minutes".

## Colour

Use the tokens, never raw hex. Values live in `:root` of `shared/styles/tokens.css`.

| Token | Value | Use |
|---|---|---|
| `--dark` | `#111418` | Dark slide background |
| `--light` | `#F6F7F9` | Light slide background |
| `--ink` | `#111418` | Primary text on light |
| `--ink-2` | `#3D434D` | Secondary text on light |
| `--muted` | `#6B727D` | Captions, notes, labels |
| `--rule` | `#D8DCE2` | Rules on light |
| `--paper-ink` | `#EEF1F4` | Primary text on dark |
| `--paper-2` | `#A2A9B4` | Secondary text on dark |
| `--paper-rule` | `#2C323B` | Rules on dark |
| `--accent` | `#2E6B4F` | Accent, sage green |
| `--accent-soft` | `#7DC4A0` | Accent on dark |
| `--alert` | `#B8372B` | Warnings only |
| `--gold` | `#A8843C` | The guarantee seal only |

- Sage green is the only accent colour. Use `--accent` on light slides and `--accent-soft` on dark ones. Agents use the accent too.
- One exception: `--gold` for the seal on the guarantee slide, flat, no shine or gradient (Jesse, 2026-09-27). Nowhere else.
- Red (`--alert`) is for warnings and errors only: held, flagged, Pause, a correction mark. Never decoration.
- Neutrals are cool graphite. No warm cream, olive greys, or terracotta: they read as too close to Claude's look (changed 2026-09-27).
- Light surfaces inside a mock-up (sidebars, chat bubbles) may use `#EEF0F3`, one step off `--light`.
- Client screens on a proof slide keep the client’s own brand colours (BHF navy and yellow, Kinto teal, VCM violet), set once as local variables in that slide’s CSS.

## Light and dark slides

Most slides are light. Dark marks the moments that matter: the cover, the Agents and working with them, the first step, the guarantee, and the close. A mock-up of an app window stays light on a dark slide.

## Type

| Role | Font | Size | Notes |
|---|---|---|---|
| Cover headline (`h1`) | Newsreader 400 | 8.2cqi | Up to 17ch wide |
| Slide headline (`h2`) | Newsreader 400 | 5cqi | Up to 20ch wide, tight tracking (−.035em), line height 1.02 |
| Label (`.eyebrow`) | Plus Jakarta Sans 500 | 1.2cqi | Capitals, tracking .16em, `--muted` |
| Lede (`.lede`) | Plus Jakarta Sans 400 | 2cqi | Line height 1.42, `--ink-2`, up to 40ch |
| Note (`.note`) | Newsreader 400 | 2.2cqi | A pull line in the serif |
| Table cell | Plus Jakarta Sans | 1.6cqi | Headers 1.15cqi capitals, `--muted` |
| Small print (`.small`) | Plus Jakarta Sans | 1.35cqi | |
| Price (`.price`) | Plus Jakarta Sans 800 | Per slide | Accent colour, tracking −.04em. One style everywhere a price appears |

- **Serif** (Newsreader) for headlines and pull lines. **Sans** (Plus Jakarta Sans) for everything else. No third typeface.
- Highlight a key phrase with `.fill`: semibold accent text on an accent wash (18% on light, 24% on dark; strengthened 2026-09-27). Serif headlines keep their weight. One per slide.
- Figures that line up in columns use `font-variant-numeric: tabular-nums`.

## Layout

- Slides are 16:9. Size everything in `cqi` (a percentage of slide width) so the slide scales as one piece, from phone to 1920×1080 print. No `px` inside a slide, except 1px and 1.5px rules.
- Content sits in `.in`: 5.6cqi top, 7.4cqi sides, 5.4cqi bottom.
- Label, then headline, then lede, top left. Content below or to the right.
- Rules are 1px `--rule` (or `--paper-rule` on dark). A heavier 1.5px `--ink` rule marks a total or a table header.
- Corners are small: .3cqi to .4cqi for chips and buttons, about 1cqi for app windows.
- Print is part of the design: every slide must print as one 1920×1080 page.
- Blurred shadows (`box-shadow` with a blur, `filter: drop-shadow`) print as flat grey or black boxes in the PDF. Any slide that uses one turns it off in its CSS with `@media print{ … {box-shadow:none} }`. Crisp shadows with no blur, and inset ones, print fine.

## Drawings

- Line drawings and line icons, not photos or filled illustrations. Lo-fi screens, paper, charts, and people.
- Stroke in `--ink` on light slides (`--paper-ink` on dark), round caps and joins, about 2.2 in a 100-unit viewBox.
- People come from `shared/assets/sprites.svg` (`#p1` to `#p6`, drawn with `<Person>` and `<Avatar>`), so the same faces recur across slides and decks.
- Green picks out the thing that is right or done. Red marks the thing that is wrong. Everything else is ink.
- Numbers inside a mock-up are illustrative and must read as believable.

## Components

Shared pieces in `shared/`, reused before new ones are made. Use the component; the class is what it renders.

| Component | Class | What it is |
|---|---|---|
| `<Slide label dark>` | `.slide`, `.slide.dark`, `.in` | A 16:9 slide and its padded content area |
| `<Eyebrow>`, `<Lede>`, `<Note>` | `.eyebrow`, `.lede`, `.note` | Type roles above. `.small` and `.muted` are classes only |
| `<Fill>` | `.fill` | Highlighted phrase |
| `<Price amount>` | `.price` | A price, written by `peso()`: ₱120k, ₱1.8M |
| `<Avatar person large>` | `.ava`, `.ava.lg` | Round portrait, with the Agent badge unless `agent={false}` |
| `<Person id>` | `.peeps`, `.peep` | A standing figure; a row of them in `.peeps` |
| `<LfBtn primary>` | `.lf-btn`, `.lf-btn.pri` | Lo-fi button in a mock-up; primary is the main action |
| `<LfWin title tag>` | `.lf-win` | Lo-fi app window with a title bar. Use it for illustrations instead of icons; it stays light on dark slides |
| `<Sk w>` | `.sk` | A skeleton bar standing in for text in a mock-up |
| `<Pin n>` | `.pin` | A numbered callout on a mock-up, matched to a numbered list beside it |
| `<code>` | `code` | A command, file, or path in running text. Set in the sans, on a faint wash |
| `<AgentChat>`, `<ChatLog>`, `<RunCard>`… | `.mc-*` | Agent chat window: sidebar, feed, approval card |

A style used by one slide goes in that slide's `.css`, scoped to it. Move it to `shared/styles/components.css` once a second slide needs it.

## Checklist before sending

- [ ] Every fact, price, and name matches `COMPANY.md`.
- [ ] Only tokens, no raw hex (outside `#EEF0F3` in mock-ups).
- [ ] Green is the only accent. Red appears only on warnings.
- [ ] Headlines end with a full stop. Terminology matches the table above.
- [ ] Prints cleanly: one slide per page, nothing clipped.
