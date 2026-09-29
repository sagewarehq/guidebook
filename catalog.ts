// The whole guidebook as data: its parts (called editions in the code), their chapters, and every pattern in each.
// A pattern is `written` when it has a page in patterns/<chapter>/<id>.tsx, `draft` when it has a page that is
// imagined and not settled yet (shown with a Draft banner), and `planned` otherwise.

export type Status = 'written' | 'draft' | 'planned';

export type Pattern = {
  id: string;
  /** Short name in the sidebar and search. */
  name: string;
  /** The rule, written as a headline. */
  title: string;
  /** One or two sentences: what it covers. */
  summary: string;
  status: Status;
};

export type Chapter = { id: string; name: string; summary: string; layer?: string; patterns: Pattern[] };
export type Edition = { id: string; name: string; summary: string; chapters: Chapter[] };

const p = (id: string, name: string, title: string, summary: string, status: Status = 'planned'): Pattern =>
  ({ id, name, title, summary, status });

export const editions: Edition[] = [
  {
    id: 'management',
    name: 'Management Systems',
    summary: 'The system a business runs on: sign-in, the app shell, records, forms, search, system administration, reports, artifacts, jobs, and writing.',
    chapters: [
      {
        id: 'auth', name: 'Authentication',
        summary: 'Sign-in and the pages around it.',
        patterns: [
          p('layout', 'The sign-in layout', 'A centred card, in the client’s name.', 'The standard centred card.', 'written'),
          p('sign-in', 'Sign in', 'One vague error, and land where they were going.', 'Signing in, and when it fails.', 'written'),
          p('passwords', 'Forgotten passwords', 'Never say whether an account exists.', 'Forgot password and reset.', 'written'),
          p('two-factor', 'Two-step sign-in', 'Required by role, with an app, not SMS.', 'Codes, setup, recovery, and who must use it.', 'written'),
          p('signed-out', 'Signed out', 'Never lose their place, or their work.', 'Timed out while working.', 'written'),
          p('framework', 'Use the framework', 'Style its pages, never write our own.', 'What Laravel and Django give us.', 'written'),
        ],
      },
      {
        id: 'shell', name: 'App shell',
        summary: 'The frame every page sits in, and what goes where.',
        patterns: [
          p('skeleton', 'The skeleton', 'Every screen sits in the same frame.', 'The regions of every page.', 'written'),
          p('navigation', 'Navigation', 'People always know where they are, and how to get anywhere.', 'Sidebar, top bar, tabs, and links.', 'written'),
          p('breadcrumbs', 'Breadcrumbs', 'Every page says where it lives.', 'The trail at the top of every page.', 'written'),
          p('pagination', 'Pagination', 'Say which rows are showing, and let people jump.', 'Pages under a list.', 'written'),
          p('buttons', 'Where buttons go', 'A button sits with what it acts on.', 'Which button goes where.', 'written'),
          p('preferences', 'User preferences', 'Preferences change only your own experience.', 'Each person’s own settings.', 'written'),
          p('tenancy', 'Account switcher', 'Always show which account you’re in.', 'Switching accounts and branches.', 'written'),
          p('balances', 'Account balances', 'Put a balance where people act on it.', 'Where a balance goes.', 'written'),
          p('notifications', 'Notifications', 'Each notification links to where it happened.', 'The bell, and links to what happened.', 'written'),
          p('drawers', 'Drawers', 'Prefer a drawer from the right.', 'Editing beside the page, on desktop and phone.', 'written'),
          p('modals', 'Modals', 'A modal only asks about unsaved work.', 'Leave without saving, and nothing else.', 'written'),
        ],
      },
      {
        id: 'records', name: 'Records',
        summary: 'The pages every record type gets.',
        patterns: [
          p('create', 'Create record', 'Ask for the least, then confirm what you made.', 'Making a new record.', 'written'),
          p('list', 'List records', 'A list is a tool for finding things.', 'Finding and working through records.', 'written'),
          p('detail', 'View record', 'Lead with what the reader came for.', 'One record, read and acted on.', 'written'),
          p('edit', 'Edit record', 'Edit one section at a time, in a drawer.', 'Changing a record, in a drawer.', 'written'),
          p('delete', 'Delete record', 'Delete only what nothing depends on.', 'Deleting, and when you can’t.', 'written'),
          p('archived', 'Archived records', 'Out of everyday lists, never out of the numbers.', 'Records you’re finished with, and restoring them.', 'written'),
          p('trash', 'Trash', 'Deleted records wait 30 days before they’re gone.', 'The Trash view, and restoring.', 'written'),
          p('record-actions', 'Record actions', 'One primary action per view.', 'Actions on one record, and confirming them.', 'written'),
          p('batch-actions', 'Batch actions', 'Select many, act once, and say what happened.', 'Acting on many records at once.', 'written'),
        ],
      },
      {
        id: 'forms', name: 'Forms', layer: 'Action',
        summary: 'How to lay out forms and pick fields.',
        patterns: [
          p('choosing', 'Where forms open', 'Pick the container by the size of the job.', 'A page, a drawer, or a modal.', 'written'),
          p('basic', 'Basic forms', 'One column, labels above, and nothing extra.', 'Laying out any form.', 'written'),
          p('fields', 'Choosing fields', 'Pick the field for the data, not the database column.', 'Which field for which data.', 'written'),
          p('validation', 'Validation and errors', 'Check early, explain plainly, keep what they typed.', 'Checking input and showing errors.', 'written'),
          p('submitting', 'Submitting', 'Show it’s working, then confirm what happened.', 'The loading button, and the confirmation after.', 'written'),
          p('wizards', 'Wizards', 'Use steps only when the answers change what comes next.', 'Forms in steps.', 'written'),
        ],
      },
      {
        id: 'search', name: 'Global search',
        summary: 'The one search box that finds anything.',
        patterns: [
          p('palette', 'Search box and ⌘K', 'One box finds anything, from anywhere.', 'The search box and ⌘K.', 'written'),
          p('matching', 'What it matches', 'Search the way people remember.', 'What a search finds.', 'written'),
          p('results', 'Results', 'Show enough to pick the right one.', 'How results show.', 'written'),
          p('commands', 'Commands', 'Type what you want to do.', 'Doing things from the search box.', 'written'),
          p('results-page', 'All results', 'When the box isn’t enough, open the page.', 'Every match, on one page.', 'written'),
        ],
      },
      {
        id: 'settings', name: 'System settings',
        summary: 'How the business works: terms, numbering, products, limits. For business leads.',
        patterns: [
          p('overview', 'Overview', 'Settings shape how the business works.', 'How Settings is laid out, with examples.', 'written'),
          p('record-ids', 'Record IDs', 'A readable ID, in the business’s own format.', 'Formats, typed codes, and changing an ID.', 'written'),
          p('custom-fields', 'Custom fields', 'Let the business add its own fields to most records.', 'Adding a field, where it shows, and what it can’t change.', 'written'),
          p('numbering', 'Numbering', 'One series per document, no gaps, never reused.', 'Invoice, receipt, and statement numbers.', 'written'),
          p('templates', 'Headers and footers', 'Layouts are fixed; headers and footers are yours.', 'Where documents can change, set in Settings › Documents.', 'written'),
        ],
      },
      {
        id: 'admin', name: 'System administration',
        summary: 'Keeping the system and its data safe. For the owner and IT.',
        patterns: [
          p('overview', 'Overview', 'Administration decides who can use it, and keeps it safe.', 'The Administration area, and what’s in it.', 'written'),
          p('security', 'Security', 'Safe defaults, changed with care.', 'Session length and password rules.', 'written'),
          p('snapshots', 'Snapshots', 'Take a snapshot before anything big.', 'Nightly and on-demand copies of the whole account.', 'written'),
          p('restoring', 'Restoring a snapshot', 'Restore into a copy first; over live only with care.', 'Loading a snapshot back.', 'written'),
          p('export', 'Export everything', 'The client can take all of their data, any time.', 'Every record and file, in one download.', 'written'),
          p('billing', 'Plan and billing', 'No surprises on the bill.', 'The plan, usage, and invoices from us.', 'written'),
        ],
      },
      {
        id: 'users', name: 'User management',
        summary: 'Who can sign in, what they can do, and helping them get in. In System administration.',
        patterns: [
          p('people', 'Users and invites', 'Invite with roles; deactivate, never delete.', 'The people list, invites, and leaving.', 'written'),
          p('roles', 'User roles', 'Build roles from what the system can do; give people one or more.', 'The Role builder, and roles that add up.', 'written'),
          p('resets', 'Password resets', 'Every fix is one click, and never a password.', 'Locked out, forgot, lost a phone.', 'written'),
          p('impersonation', 'User impersonation', 'Act as someone with a reason, a banner, and a time limit.', 'Seeing the system as someone else does, to help them.', 'written'),
          p('audit-trail', 'Audit trail', 'Every change says who, what, and when.', 'The full-screen trail, with filters.', 'written'),
          p('sign-in-history', 'Sign-in history', 'Show who signed in, from where.', 'Sign-ins, failures, and lockouts.', 'written'),
        ],
      },
      {
        id: 'access', name: 'Access',
        summary: 'Who sees which records, and what happens when they can’t.',
        patterns: [
          p('scope', 'Record scope', 'Role says what; scope says which.', 'Which records each person reaches: their branch, or more.', 'written'),
          p('record-access', 'Record access', 'Say who can, and the record’s real state.', 'Records and pages someone can’t open, and why.', 'written'),
          p('enforce', 'Checking access', 'Hide it on screen, refuse it on the server.', 'Three checks on every request.', 'written'),
          p('permissions', 'Only what you may see', 'Search never shows what a role can’t open.', 'Only what each role may see.', 'written'),
        ],
      },
      {
        id: 'integrations', name: 'Integrations',
        summary: 'Email, SMS, and payment providers, in order, set up in System administration.',
        patterns: [
          p('overview', 'Integrations page', 'See everything connected, and its health.', 'Every integration, its providers, and when it last worked.', 'written'),
          p('providers', 'Adding a provider', 'Pick from many, or use Generic.', 'The provider drawer, and a Generic option for every kind.', 'written'),
          p('email', 'Email', 'Providers in order; the first working one sends.', 'Email providers, including Generic SMTP.', 'written'),
          p('sms', 'SMS', 'Providers in order, with credits in sight.', 'SMS providers, including a Generic HTTPS gateway.', 'written'),
          p('payments', 'Payments', 'Several live at once, each for its methods.', 'Payment providers, test then live.', 'written'),
          p('logs', 'Integration logs', 'Every call, what it was for, and what came back.', 'Tracing a failed email, text, or payment.', 'written'),
        ],
      },
      {
        id: 'reports', name: 'Reports and analytics', layer: 'Analytics',
        summary: 'Reports shaped for one purpose, with the parts people can change.',
        patterns: [
          p('list', 'Reports list', 'Each report answers one question.', 'Reports grouped by who uses them.', 'written'),
          p('report-page', 'Report page', 'The shape is fixed. The period is yours.', 'The parts of a report.', 'written'),
          p('parameters', 'Slicing reports', 'The shape is fixed; slice it any way it allows.', 'By period, month, branch, or against last year.', 'written'),
          p('statements', 'Statements and tables', 'Every total adds up on the page.', 'Laying out the figures.', 'written'),
          p('drill-down', 'Drill-down', 'Every figure opens its records.', 'From a figure to its records.', 'written'),
          p('saving', 'Saving and sharing', 'Save the period and slicing, and who sees it.', 'Saving, sharing, and emailing reports.', 'written'),
          p('home', 'Home and key numbers', 'Start from what needs me today.', 'Home, key numbers, and charts.', 'written'),
        ],
      },
      {
        id: 'artifacts', name: 'Artifact generation', layer: 'Artifact',
        summary: 'The documents and files the system makes from its records.',
        patterns: [
          p('where', 'Where artifacts are found', 'A document lives with the record it came from.', 'On the record, in its menu, and after an action.', 'written'),
          p('documents', 'Documents', 'Generated from the record, in the client’s name.', 'Invoices, statements, and receipts, as PDF or DOCX.', 'written'),
          p('spreadsheets', 'Spreadsheets', 'Numbers stay numbers, and say what they are.', 'Reports and lists as XLSX or CSV.', 'written'),
          p('sending', 'Sending and delivery', 'Send it from the record, and keep the receipt.', 'Emailing documents, and who received them.', 'written'),
          p('batches', 'Generating in batches', 'Confirm the count, then make them in the background.', 'Monthly statements for every customer.', 'written'),
        ],
      },
      {
        id: 'jobs', name: 'System jobs',
        summary: 'Work the system does in the background, now or on a schedule. It shows in Jobs.',
        patterns: [
          p('how', 'How jobs run', 'Start it, carry on, and come back to the result.', 'Exports, batches, imports, and snapshots, in the background.', 'written'),
          p('page', 'Jobs page', 'Every job waits in one place.', 'Where people follow jobs and collect results.', 'written'),
          p('scheduled', 'Scheduled jobs', 'Every recurring job says when it runs next.', 'Setting up and pausing jobs that repeat.', 'written'),
        ],
      },
      {
        id: 'writing', name: 'Writing',
        summary: 'The words on every screen.',
        patterns: [
          p('voice', 'Voice', 'Write like a helpful colleague.', 'How we write.', 'written'),
          p('buttons', 'Buttons and questions', 'Buttons say what happens.', 'Buttons and confirmations.', 'written'),
          p('errors', 'Errors', 'Say what’s wrong, and how to fix it.', 'Error messages.', 'written'),
          p('empty', 'Empty and no results', 'Say why it’s empty, and what to do next.', 'Empty lists and no results.', 'written'),
          p('feedback', 'Feedback', 'Say what happened, to what.', 'Saying what happened.', 'written'),
          p('labels', 'Labels and values', 'Short labels, in the business’s words.', 'Labels, help, and statuses.', 'written'),
          p('numbers', 'Numbers and dates', 'One format for each kind of value, everywhere.', 'Money, dates, and numbers.', 'written'),
          p('words', 'Words we use', 'One word for one thing.', 'The words we use.', 'written'),
        ],
      },
    ],
  },
  {
    id: 'portal',
    name: 'Customer Portals',
    summary: 'The same system, seen by the business’s customers: their own records, a few tasks, on a phone.',
    chapters: [
      {
        id: 'portal-basics', name: 'Basics',
        summary: 'What changes when the person is a customer, not staff.',
        patterns: [
          p('overview', 'How a portal differs', 'A portal is the same system, seen from outside.', 'What changes for customers, and what doesn’t.'),
          p('phone', 'Phone first', 'Design for the phone, then widen.', 'One column, big targets, one task per screen.'),
          p('words', 'Customer words', 'No staff terms on a customer’s screen.', 'Plain names for statuses, records, and steps.'),
        ],
      },
      {
        id: 'portal-access', name: 'Getting in',
        summary: 'Signing up and signing in, for people the business already knows.',
        patterns: [
          p('claiming', 'Claiming an account', 'Sign up with something only they have.', 'A reference number and an email, not an open form.'),
          p('sign-in', 'Signing in', 'A link or a code, not another password to forget.', 'Email links, one-time codes, and staying signed in.'),
        ],
      },
      {
        id: 'portal-home', name: 'Home and records',
        summary: 'What the customer sees, and where things stand.',
        patterns: [
          p('home', 'Portal home', 'Lead with what they need to do next.', 'Tasks first: pay, upload, check status.'),
          p('my-records', 'Their records', 'Only their own, in their own words.', 'Loans, invoices, and applications.'),
          p('status', 'Application status', 'Say where it is, and what happens next.', 'Steps, who has it now, and when to expect news.'),
        ],
      },
      {
        id: 'portal-tasks', name: 'Tasks',
        summary: 'The few things customers come to do.',
        patterns: [
          p('uploads', 'Sending documents', 'Say what’s needed, and what’s still missing.', 'Checklists, photos from a phone, and rejected files.'),
          p('payments', 'Paying online', 'Say the amount, the fee, and what it pays.', 'Paying an invoice or an instalment, and the receipt.'),
          p('documents', 'Statements and receipts', 'The same documents staff see.', 'Downloading what the system generated.'),
        ],
      },
    ],
  },
  {
    id: 'agentic',
    name: 'Agent Interfaces',
    summary: 'The screens where people work with Agents: Agents prepare the work, people decide.',
    chapters: [
      {
        id: 'concepts', name: 'Key concepts', layer: 'Intelligence',
        summary: 'The words for working with Agents, and how the pieces connect.',
        patterns: [
          p('terms', 'The words we use', 'One word for each piece, used the same everywhere.', 'Agent, owner, role, instructions, session, skill, memory, command, draft, approval, run, hold, trail.', 'written'),
          p('lifecycle', 'From ask to trail', 'Every piece of Agent work follows the same path.', 'Ask, run, propose, decide, change, record.', 'written'),
          p('sessions', 'Sessions at the same time', 'Sessions run side by side; a change checks nothing moved since it was read.', 'Parallel sessions, and what happens when two touch one record.', 'written'),
        ],
      },
      {
        id: 'examples', name: 'Examples',
        summary: 'Eight workflows that save the most time, each worked through.',
        patterns: [
          p('reconcile', 'Reconciling a bank statement', 'Upload the statement; the Agent checks it, matches it, and drafts the fixes.', 'From a file to matched payments, with what to fix.', 'written'),
          p('slicing', 'Slicing the numbers', 'Ask for the cut you need, and get a table or a chart back.', 'Aggregates, pivots, and bar charts from a question.', 'written'),
          p('lookup', 'Asking about a record', 'Ask about a customer; the Agent checks which one, then sums it up.', 'Which one, a short summary, and a link to the full page.', 'written'),
          p('intake', 'Turning a document into a record', 'Hand it the paper; get a drafted record to check.', 'A form, photo, or PDF becomes a draft, with what’s missing.', 'written'),
          p('by-asking', 'Changing records by asking', 'Say what should change; check the drafted edit before it’s saved.', 'Creating or editing a record in a sentence, shown as a draft.', 'written'),
          p('reminders', 'Chasing overdue customers', 'One ask drafts every reminder; a person sends them.', 'Drafted reminders for each overdue customer, approved in one go.', 'written'),
          p('cleanup', 'Cleaning up the data', 'The Agent finds the mess; a person approves each fix.', 'Duplicates, missing TINs, and odd values, with drafted fixes.', 'written'),
          p('proposal', 'Drafting a proposal', 'From meeting notes to a priced proposal, with the risks flagged.', 'Bea drafts; Liza edits and sends.', 'written'),
          p('catch-up', 'Catching up', 'Ask what changed, and get only what matters to you.', 'What happened on your records since you were last in.', 'written'),
        ],
      },
      {
        id: 'agents', name: 'Agents in the app', layer: 'Intelligence',
        summary: 'Where Agents show up, and how people tell them apart.',
        patterns: [
          p('overview', 'Where the Agent lives', 'A right bar for quick asks; a window of its own for real work.', 'The right bar, and the Agents window: sessions, chat, and a detail drawer.', 'written'),
          p('agents-page', 'Agents page', 'See every Agent, what it’s doing, and what waits on you.', 'The list of Agents, their status, and Pause.', 'written'),
          p('profile', 'Agent profile', 'Instructions are one textbox the owner writes and saves.', 'The Instructions box with light history, and the Sessions tab.', 'written'),
          p('badge', 'Telling Agents apart', 'An Agent is always marked as an Agent.', 'Badges in avatars, lists, history, and documents.', 'written'),
          p('access', 'Giving an Agent access', 'An Agent gets its own role, narrower than a person’s.', 'The Role builder, and an accountable owner.', 'written'),
          p('schedule', 'Scheduled tasks', 'Every task an Agent does on its own says when it runs next.', 'The Agent’s recurring work, its next run, and pausing one task.', 'written'),
          p('autonomy', 'Drafts, never changes', 'An Agent only drafts; a person approves, rejects, or edits every change.', 'What an Agent does on its own (read, answer, draft), and what always waits for a person.', 'written'),
        ],
      },
      {
        id: 'chat', name: 'Chat',
        summary: 'Asking an Agent for work, and reading what it did.',
        patterns: [
          p('panel', 'The chat panel', 'Chat opens beside the work, from the right.', 'Where the chat lives, on desktop and phone.', 'written'),
          p('asking', 'Asking an Agent', 'Brief it like a colleague.', 'The message box, suggested asks, and attachments.', 'written'),
          p('context', 'What the Agent can see', 'It sees the page you’re on; your recent activity only when you share it.', 'The page, filters, and selection as context, and activity on request.', 'written'),
          p('replies', 'Agent replies', 'Show the steps, the result, and what comes next.', 'Step lines, results, and links in a reply.', 'written'),
          p('asking-back', 'When it asks back', 'Ask with choices; never guess.', 'A question with options, and waiting for the answer.', 'written'),
          p('cards', 'Tables and charts in chat', 'Show a table, not a paragraph.', 'Results drawn with the same parts as the app.', 'written'),
          p('open-screen', 'Open the real screen', 'Link to the page when one exists.', 'When to draw it in chat, and when to open it.', 'written'),
          p('on-record', 'Chat on a record', 'The conversation stays with the record.', 'Threads on an invoice, a loan, or a report.', 'written'),
          p('focus', 'Record and chat, full screen', 'When the work is one record, give it the screen and keep the chat beside it.', 'The focus view: the record or file large, the chat on the right.', 'written'),
          p('inline', 'Inline Agent notes', 'Pin an Agent’s note to what it’s about, not a whole chat.', 'Notes on rows, fields, and sections, with Continue in chat.', 'written'),
        ],
      },
      {
        id: 'commands', name: 'Slash commands',
        summary: 'Type / for the work you ask for often.',
        patterns: [
          p('using', 'Using a command', 'Type / to pick a command, and see what it will do before it runs.', 'The / menu, arguments, and the preview.', 'written'),
          p('built-in', 'Built-in commands', 'The same few commands work with every Agent.', '/new, /status, /runs, /pause, /share, and /help.', 'written'),
          p('making', 'Making a command', 'Turn an ask that worked into a command.', 'Save from a session: name, inputs, and who can use it.', 'written'),
          p('library', 'Commands list', 'Every command says what it does, who made it, and who can use it.', 'Yours and the team’s, per Agent, with use and edits.', 'written'),
        ],
      },
      {
        id: 'analysis', name: 'Reports and analysis', layer: 'Analytics',
        summary: 'Answering from the system’s reports first, and going further, safely.',
        patterns: [
          p('from-reports', 'Answering from reports', 'Start from the reports everyone already uses.', 'Answers that open the same report, with the same figures.', 'written'),
          p('measures', 'Measures and dimensions', 'The Agent only counts what the system defines.', 'Named measures and ways to slice them, with access applied.', 'written'),
          p('pivots', 'Pivot tables', 'Slice the same numbers any way the data allows.', 'Rows, columns, and values the Agent sets and people change.', 'written'),
          p('beyond', 'Going beyond the reports', 'Further analysis is labelled, read-only, and repeatable.', 'Trends, comparisons, and outliers, with how it was worked out.', 'written'),
          p('saving', 'Saving an analysis', 'A person turns an analysis into a report.', 'Save as report, who sees it, and keeping it up to date.', 'written'),
        ],
      },
      {
        id: 'approvals', name: 'Approvals',
        summary: 'Where people make the call on an Agent’s work.',
        patterns: [
          p('card', 'Approval card', 'Big decisions wait for a person.', 'What’s proposed, what’s held, and the two answers.', 'written'),
          p('batch', 'Approving a batch', 'Approve the routine; look at the exceptions.', 'Exceptions first, the rest summed up.', 'written'),
          p('edit-first', 'Changing before approving', 'Change it, then approve it.', 'Editing the proposal in place, or asking for changes.', 'written'),
          p('partial', 'Approving part', 'Approve some, hold the rest.', 'Line-by-line decisions, and what happens to the rest.', 'written'),
          p('waiting', 'Waiting on you', 'Everything waiting on you, in one list.', 'The list of proposals and questions, and its badge.', 'written'),
          p('elsewhere', 'Approving by email or phone', 'Approve from wherever you are, with the same facts.', 'Emails, phone notifications, and what they may do.', 'written'),
          p('no-answer', 'When nobody answers', 'Decide ahead what happens when no one answers.', 'Reminders, escalation, and expiry.', 'written'),
        ],
      },
      {
        id: 'runs', name: 'Runs',
        summary: 'Every piece of Agent work as a record you can open.',
        patterns: [
          p('list', 'Runs list', 'Every run is a record.', 'Runs with their Agent, state, result, and who approved.', 'written'),
          p('detail', 'Run detail', 'Open a run and see all of it.', 'What it was asked, its steps, what it changed, and cost.', 'written'),
          p('progress', 'Long runs', 'Show where a long run is.', 'Steps, time left, and a notification when it’s done.', 'written'),
          p('partial', 'Runs that half-work', 'Say what worked and what didn’t.', 'Done, held, and failed, each with what’s next.', 'written'),
          p('undo', 'Undoing a run', 'Roll back what a run changed.', 'A confirmation page, and the trail kept.', 'written'),
        ],
      },
      {
        id: 'explaining', name: 'Showing the work',
        summary: 'What the Agent did, why, and how sure it is.',
        patterns: [
          p('reasons', 'Reasons', 'A reason beside every call.', 'One plain line per decision, where the decision is shown.', 'written'),
          p('sources', 'Sources', 'Every figure links to the record it came from.', 'Links to invoices, POs, and emails it used.', 'written'),
          p('holds', 'Holds and flags', 'Say what it isn’t sure about, and leave it for a person.', 'Held items, why, and what would clear them.', 'written'),
          p('history', 'In the history', 'Every change says an Agent made it, and why.', 'Record history, the audit trail, and the run behind each change.', 'written'),
        ],
      },
      {
        id: 'control', name: 'Control and safety',
        summary: 'Pausing, limits, failures, and taking over.',
        patterns: [
          p('pause', 'Pausing an Agent', 'Pause any Agent, at once, from anywhere it appears.', 'What stops, what finishes, and resuming.', 'written'),
          p('decommission', 'Decommissioning an Agent', 'Retire an Agent for good, and keep everything it did.', 'Access removed, open work handed back, history kept.', 'written'),
          p('failures', 'When it fails', 'When it can’t, it hands the work to a person.', 'Errors, hand-back, and who gets it.', 'written'),
          p('assigning', 'Assigning work', 'Anyone can see who holds the work, person or Agent.', 'Handing work to an Agent, and taking it back.', 'written'),
          p('take-over', 'Taking over', 'Take over mid-run, and finish it yourself.', 'Stopping a run and keeping what it did.', 'written'),
        ],
      },
      {
        id: 'teaching', name: 'Teaching and improving',
        summary: 'Agents that learn, where you can see it.',
        patterns: [
          p('corrections', 'Correcting an Agent', 'A correction in chat becomes a skill you can see and undo.', 'From “that’s wrong” to a learned skill, shown at once.', 'written'),
          p('skills', 'Skills', 'Skills are what an Agent learns, and anyone accountable can see them.', 'Learned skills, where each came from, when it’s used, and Edit, Turn off, Forget.', 'written'),
          p('memory', 'Agent memory', 'Anyone accountable can see what an Agent remembers, and why.', 'Facts it remembers, where each came from, and forgetting.', 'written'),
          p('performance', 'Agent report', 'Show whether it’s helping.', 'Time saved, holds, corrections, and cost over time.', 'draft'),
        ],
      },
    ],
  },
];

/** Every pattern with its edition and chapter, for search and routing. */
export const allPatterns = editions.flatMap(e => e.chapters.flatMap(c => c.patterns.map(pt => ({ edition: e, chapter: c, pattern: pt }))));
