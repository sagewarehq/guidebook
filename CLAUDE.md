# Sageware Guidebook

How Sageware engineers design and build Intelligent Management Systems. It starts with UX, in three parts: Management Systems (staff), Customer Portals (the business’s customers), and Agent Interfaces. Engineering practices (working with Agents, project layout, testing, deployment) join as parts when there’s real content, not as empty chapters. Each pattern gets a page: the rule as a headline, live lo-fi mock-ups (Do / Avoid), and numbered guidelines beside what to avoid. For full-stack engineers (Laravel, Django, React). Internal, not for clients.

Moved out of the `decks` repo (its `guidelines/` folder) on 2026-09-29 (Jesse). It began 2026-09-28, growing out of the UX guidelines deck in `decks/ux_guidelines/`.

Read on a desktop browser (Jesse, 2026-09-28): the site has no phone layout.

## Run and build

- `npm install` once. Then `npm run dev` and open `http://localhost:8766/`. Routes live in the hash: `#/management/shell/skeleton`.
- `npm run build` writes `dist/index.html`, one self-contained file that opens from `file://`. Never edit `dist/`.
- `npm run check` type-checks everything.
- Hosting is undecided; local only for now.

## Layout

| Path | What it holds |
|---|---|
| `catalog.ts` | The whole guidebook as data: parts (called editions in the code) → chapters → patterns, each with a name, the rule (`title`), a summary, and a status. Change the structure here. |
| `site/Site.tsx` | The shell: sidebar (search, then every part as a heading that folds, its chapters and pages), a breadcrumb on every page, and the home, part, chapter, and pattern pages. |
| `site/kit.tsx` | Page parts (`Section`, `Demo`, `Pair`, `Rules`, `Avoid`, `When`) and mock-up pieces (`Win`, `Btn`, `Pill`, `Field`, `Sk`, `Toast`, `Ini`). Build pages from these. |
| `site/site.css`, `site/mock.css` | Site styles (`.g-*`) and mock-up styles (`.m-*`), in rem. Colours are the tokens in `styles/tokens.css`. |
| `styles/tokens.css`, `lib/cx.ts` | Colour and type tokens, and the class-name helper; copied from `decks/shared/` at the move. |
| `STYLE.md` | Voice, terminology, colour, and type (copied from the decks repo; this copy is now the one for the guidebook). |
| `patterns/<chapter>/<id>.tsx` | A written pattern page. The file name must match the pattern’s `id` in `catalog.ts`, and its folder the chapter’s `id`. |
| `patterns/<chapter>/<chapter>.css` | Mock-up styles for that chapter’s pages, each page with its own class prefix. `*-kit.tsx` files hold shared drawings and have no catalog entry. |

## Statuses

- **Written:** has a page in `patterns/`. Set `status: 'written'` in `catalog.ts` when you add one.
- **Draft:** has a page, but it’s imagined and not settled; the page shows a Draft banner.
- **Planned:** named, with its rule and summary, but no page yet.

## Writing a pattern page

- Follow `STYLE.md` for voice and colour: plain words, sentence-case headlines with full stops, green for right, red for wrong, no raw hex beyond `#EEF0F3` inside mock-ups.
- Order: a Do / Avoid pair (or a set of demos), then Guidelines (`Rules`) and Avoid side by side in a `<div className="g-duo">`: at most 5 guidelines, and the same number of Avoid items in the same order, so Avoid n is the mistake behind guideline n. Each Avoid item is a bold lead and one line (Jesse, 2026-09-28). No build notes (Jesse, 2026-09-28: removed from every page). Add a `When` table when choosing between options.
- Use the shared cast and records so examples agree across pages: Metro Lending’s Loans OS; Ana Reyes (Collections, Cebu, staff), Ramon Cruz (Finance lead, all branches), Liza Tan (Cebu branch manager), Carlo Mendoza (admin); Agents Marco, Nico, and Bea; customer Metro Fuels (contact Joy Santos) with INV-1038.
- Every page has a breadcrumb; the site adds it from the route. Cross-reference other patterns by chapter and name (“See Essentials › Actions”).

## Management Systems (Jesse, 2026-09-28)

Chapter and edition pages list their patterns as plain links with a short line each, not cards. Keep summaries in `catalog.ts` to a few words.

Deliberately short: start from what a team needs first, and add patterns only when a project asks for them. Chapters, in order (reordered 2026-09-28 so Settings, Administration, User management, and Access sit together):

- **Authentication (6):** its own chapter, first, because it’s the client’s first touch point. Standard layouts that already look good: a centred card in the client’s name (`auth-kit.tsx`, `AuthScreen`). The sign-in layout, Sign in, Forgotten passwords, Two-step sign-in (both sides: the code screens, and which roles must use it; merged with User management’s page, Jesse 2026-09-28), Signed out, Use the framework.
- **App shell (11):** The skeleton, Navigation, Breadcrumbs, Pagination, Where buttons go, User preferences, Account switcher (tenancy), Account balances, Notifications, Drawers, Modals (only for unsaved work). Three places to change things (Jesse, 2026-09-28): User preferences (profile menu; only your own experience), System settings (sidebar foot, labelled Settings; how the business works: terms, numbering, templates, products, limits), System administration (sidebar foot, labelled Administration; who can use it and keeping it safe: users and roles, audit, security, snapshots, export everything, schedules, integrations, billing). User management, snapshots, and full export live under Administration. The sidebar foot reads Jobs · Settings · Administration · Help. `shell/three-kit.tsx` draws the comparison table.
- **Records (9; pages named Create record, List records, View record, Edit record, Delete record):** Archived records (out of everyday lists, never out of the numbers; restorable, with Undo) and Trash (deleted records wait 30 days) added; records say Archive, people say Deactivate (Jesse, 2026-09-28). Create page, List page, Detail page, Edit page (a drawer per section, Jesse’s preference), Delete page, Record actions (on the detail page), Batch actions (from the list’s bulk bar). Folder `patterns/records/`, which also holds `foundations.css`, the shared mock-up styles.
- **Forms (6):** Where forms open (the general rule, first), Basic forms (layout of any form), Choosing fields, Validation and errors, Submitting, Wizards.
- **Global search (5):** Search box and ⌘K, What it matches, Results, Commands, All results (/search?q=, a tab per record type with counts). “metro” counts agree across search and Access pages: Ramon 152, Ana 106. Only what you may see moved to Access. The palette is drawn by `patterns/search/palette-kit.tsx`.
- **System settings (4; its own chapter, just before System administration, Jesse 2026-09-28):** Overview (how Settings is laid out, with examples), Record IDs (readable, format per record type, typed or suggested, changeable with the old ID kept for search; parallel to Numbering; moved from Records), Numbering and Headers and footers (both moved from Artifact generation, where Documents links to them), Custom fields (the business adds its own fields to most records; they show on the record, folded under More details on create, as list columns and filters, in reports, exports, and search; removing one archives it). Folder `patterns/settings/`.
- **System administration (6):** Overview, Security, Snapshots, Restoring a snapshot, Export everything, Plan and billing (Care or Care+, usage at cost as it accrues, warnings before a jump, invoices from Sageware). `admin/admin-kit.tsx` draws the Administration layout.
- **User management (6; its own chapter again, Jesse 2026-09-28):** Users and invites (with what the invitee sees; merged with Authentication’s Invites, Jesse 2026-09-28), User roles (the Role builder), Password resets (one click, never a password), User impersonation (reason, time limit, a banner across the top, logged as “Carlo, acting as Ana”, money actions off), Audit trail (full screen), Sign-in history. Folder `patterns/users/`.
- **Access (4; its own chapter, Jesse 2026-09-28):** Record scope, Record access (both from Records), Checking access (from User management), Only what you may see (from Global search). Who sees which records, and what happens when they can’t. Folder `patterns/access/`.
- **Integrations (6):** Integrations page, Adding a provider (a drawer of every provider, always with Generic: SMTP, HTTPS, webhook, file), Email, SMS, Payments (each an ordered list of any number of providers; the first working one is used), Integration logs.
- **Reports and analytics (8, all written):** Reports list (opening a report shows its saved versions first), Report page, Date ranges and slicing, Statements and tables, Drill-down, Saving and sharing (with email schedules), Home and key numbers (with when to use a chart). Our reports are shaped ahead of time for one purpose; people change only the period, slicing, comparison, and branch (Jesse, 2026-09-28). Choosing a chart was cut. The Profit and loss drawing and its figures live in `patterns/reports/report-kit.tsx`, and they add up.
- **Artifact generation (5, all written):** Where artifacts are found (a Documents tab on the record; generate from its ••• menu), Documents (DOCX, PDF; anatomy: title top left, branding top right, footer; drawn by `artifacts/doc-kit.tsx`), Spreadsheets (XLSX for people, CSV for machines), Headers and footers (Jesse, 2026-09-28: one fixed template per record type, very little the business can change; reusable footers in Settings, stacked and ordered on each record, with defaults per customer, like Manager.io; always a preview), Sending and delivery (a drawer from the record; delivery states on the Documents tab), Generating in batches, Numbering. The Artifact layer of the Record-Up Method.
- **System jobs (was Background jobs):** Scheduled jobs added (set up in Administration › Schedules, Jesse 2026-09-28, though the page stays in this chapter; runs as a named person; Pause, Run now). How jobs run (anything slow: exports, batches, imports, snapshots, bulk updates; a Job record with state and result), Jobs page (sidebar foot, labelled Jobs; Done, Needs attention, Failed), and Full data export (the client can take everything, any time; zip of CSVs, files, README, manifest).
- **Jobs, detail (older note):** How exports run (always a background job: an Export record, built by a worker under the requester’s access, uploaded to the record’s file field, then a notification) and the Data exports page (sidebar foot; files kept 7 days).
- **Writing (8), last:** Voice, Buttons and questions, Errors, Empty and no results, Feedback, Labels and values, Numbers and dates, Words we use. The before-and-after examples live in `patterns/writing/writing-kit.tsx`.
- **How much on one screen (Jesse, 2026-09-29):** keep drawings and the screens they describe calm: a title, one primary action, one warning at most, three key numbers, three to five blocks, one table. When a page holds more, split it into a summary that links to a page per part (Plan and billing is the example). Written up in App shell › The skeleton.
- **Decisions behind it:** Actions covers actions only (no “status follows”). Deleting: every delete goes through a confirmation page, and a record anything depends on can’t be deleted at all; the page lists what depends on it in red, each linking to its list filtered to this record, and offers deactivate or void instead (soft deletes that hide rows from every query are the trap). The side panel on a detail page holds Related and History (App shell, region 10).
- **Creating records (Jesse, 2026-09-28):** require the bare minimum, usually just a name; a record may start empty or as a placeholder, because this is the system of record. Fill in what the system knows, fold the rest under More details. After Create: a confirmation page; after Create and add another: a fresh form with the confirmation on top.
- **Confirmation pages, not dialogs (Jesse, 2026-09-28):** deletes and every consequential record action (void, approve, send, deactivate) open a routed confirmation page (/invoices/1072/void) that checks first, says what will happen, and holds the one red button; a blocked action shows why, with no button. A dialog is used only for unsaved work (Leave without saving?). Drawn by `patterns/records/confirm-kit.tsx`.
- **Who’s signed in, in drawings:** `Frame as="staff" | "lead" | "admin"` (Ana, Ramon, Carlo). The sidebar foot shows only what that role can open: staff see Jobs · Help; leads add Settings; admins add Administration. Jobs has a badge for your jobs running or needing you; admins get an Everyone tab.
- **Helper files:** `*-kit.tsx` files (such as `shell/shell-kit.tsx`) hold shared mock-up pieces. They sit in `patterns/` but have no catalog entry, so the site never shows them as pages.
- **Cut for now:** boards, calendars, bulk and import, documents, settings, the audit log as its own page, accessibility and phone layouts as pages, status, the five states, feedback. Their drafts stay in `patterns/records/` (`status.tsx`, `states.tsx`, `feedback.tsx`, `numbers-dates.tsx`, `accessibility.tsx`, `responsive.tsx`) but aren’t in `catalog.ts`. Fold their best parts into the pages above.

## Written so far

- **App shell:** the general skeleton every page shares. Regions 1 to 5 are the frame; 6 to 10 are the page (breadcrumb, header, toolbar, content, side panel), always in the same places. Each page type’s own layout lives on its pattern (Jesse, 2026-09-28).
- **Create, List, and Detail pages:** each shows its page type inside the frame (drawn quietly), a region table numbered 1 to 5, and its core rules. The shared frame and page layouts are in `patterns/shell/shell-kit.tsx`.
- **Deleting:** the confirmation page drawn twice, allowed and blocked, then delete, deactivate, or void.
- **Where forms open, Choosing fields, Wizards:** Choosing fields is drawn before and after like Writing, grouped by kind of data, with a lookup table. Forms styles are in `patterns/forms/forms.css`.
- **Actions**, and every **Writing** page: each example is drawn as the UI it appears in, before and after (Jesse, 2026-09-28: “be exhaustive with our examples”).
- **Authentication** and **Global search**: every page.

Reports are saveable by default (Jesse, 2026-09-28): the Filters and saved reports pattern says so.

## Agent Interfaces (Jesse, 2026-09-29)

Rebuilt to be practical, not conceptual: every page draws the screens an engineer builds, in the Loans OS shell, with Marco (Finance Operations Agent, owner Ramon), Nico (Reporting and Analytics Agent, owner Ramon), and Bea (Business Development Agent, owner Liza). The route stays `#/agentic/…`; the edition is named Agent Interfaces.

- **Key concepts:** The words we use, From ask to trail, Sessions at the same time.
- **Examples:** Reconciling a bank statement, Slicing the numbers, Asking about a record, Turning a document into a record, Chasing overdue customers, Cleaning up the data, Drafting a proposal, Catching up.
- **Agents in the app:** Where the Agent lives, Agents page, Agent profile, Telling Agents apart, Giving an Agent access, Scheduled tasks, Drafts, never changes.
- **Chat:** The chat panel, Asking an Agent, What the Agent can see, Agent replies, When it asks back, Tables and charts in chat, Open the real screen, Chat on a record, Record and chat, full screen, Inline Agent notes.
- **Slash commands:** Using a command, Built-in commands, Making a command, Commands list.
- **Reports and analysis:** Answering from reports, Measures and dimensions, Pivot tables, Going beyond the reports, Saving an analysis.
- **Approvals:** Approval card, Approving a batch, Changing before approving, Approving part, Waiting on you, Approving by email or phone, When nobody answers.
- **Runs:** Runs list, Run detail, Long runs, Runs that half-work, Undoing a run.
- **Showing the work:** Reasons, Sources, Holds and flags, In the history.
- **Control and safety:** Pausing an Agent, Decommissioning an Agent, When it fails, Assigning work, Taking over.
- **Teaching and improving:** Correcting an Agent, Skills, Agent memory, Agent report.
- **Kit:** `patterns/agents/agent-kit.tsx` (`AgentFrame` puts the Agents button in the top bar; `AgentHead` is the Agent page header with its six tabs; `SessionList`; `ChatPanel`, `ChatPage`, `Me`, `Msg`, `Steps`, `Ask`, `ApprovalCard`, `Line`, `Reason`, `Source`, `HeldPill`, `RunTable`), styles in `agents.css` (`ag-`).
- **Shared facts:** payment run #0318, prepared 28 Sep 2026: ₱48,650,000.00 to 32 of 35 suppliers, 3 held (Cebu Paperworks, a likely resend; Luzon Packaging, over PO; Island Grains, goods not received). Its suppliers are not the site’s customers.

## Customer Portals (Jesse, 2026-09-29)

Its own edition, not a chapter: a different set of rules from Management Systems. The same system of record, seen by the business’s customers, who act on their own few records now and then, mostly on a phone. It shares Records, Artifacts, Access, and Writing; it differs in sign-up (claiming an account), task-first navigation, plainer words, and phone first. Chapters (all planned): Basics (How a portal differs, Phone first, Customer words), Getting in (Claiming an account, Signing in), Home and records (Portal home, Their records, Application status), Tasks (Sending documents, Paying online, Statements and receipts). Folders are `patterns/portal-*/`.

### Decisions for Agent Interfaces (Jesse, 2026-09-29)

- **Agents only draft.** An Agent reads, answers, analyses, and drafts on its own. Every change to a record, anything sent outside, and all money is a draft a person approves, rejects, or edits. No trial phase and no autonomy levels (“false sense of trust”).
- **Sessions run in parallel.** One Agent, many sessions (one per piece of work). Conflicts use optimistic concurrency (last modified vs last read): reads never wait; a save checks nothing changed since it was read; if it did, the Agent re-reads and redoes the step, or asks. Short claims only for sending money or a batch to the bank.
- **Where the Agent lives:** an Agents button in the top bar, right side, just before the user’s initials (bell · Agents · initials), with the waiting-on-you count; not in the sidebar. It opens a right bar for quick asks beside any page, and an Agents window (sessions left, chat middle, detail drawer right). The list of all Agents is reached from the top of the sessions column.
- **An Agent’s page:** tabs Instructions · Sessions · Schedule · Memory · Skills · Commands. Instructions is a plain textbox the owner edits (light history, Restore). Skills are what the Agent learns, visible and editable. Memory is facts it remembers. Commands are saved asks people make (/slash). Other views (Limits, Runs, Report) open from ••• as their own pages.
- **Context:** the page, filters, selection, and anything open go with a message and can be removed; recent activity only when shared, one switch per session.
- **Reports:** answer from the system’s reports first; pivots and deeper analysis only over the system’s defined measures and dimensions, read-only, labelled, and repeatable; only a person saves an analysis as a report.
- **No limits or budgets for now (Jesse, 2026-09-29):** no value caps, spend caps, AI usage budgets, or caps on sessions running at once. Agents read what their role allows, and only draft.
- **Draft status:** pages marked `draft` in `catalog.ts` show a Draft banner: imagined, not settled (the Agent report is one).

