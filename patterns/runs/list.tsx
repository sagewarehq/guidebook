import { Section, Demo, Rules, Avoid, When, Win, Btn, Pill } from '../../site/kit';
import { AgentFrame, AgentHead, ChatPanel, Day, Me, Msg, RunTable } from '../agents/agent-kit';
import type { RunRowData } from '../agents/agent-kit';
import './runs.css';

// The runs list: every piece of Agent work as a numbered record, found at Agents › Runs and, filtered, on each
// Agent’s profile. It follows List records: saved views, one search, filters as chips, and each row opens the run.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

/** The last 14 days of runs at Metro Lending, newest first. Numbers and states match the overview. */
const rows: RunRowData[] = [
  { no: '#0319', agent: 'marco', task: 'Reminders for overdue invoices in Cebu', started: 'Today, 9:15 AM', state: 'Waiting on you', result: '6 reminders drafted' },
  { no: '#0318', agent: 'marco', task: 'This week’s payment run', started: 'Today, 7:40 AM', state: 'Waiting on you', result: '₱48.65M to 32 suppliers, 3 held' },
  { no: '#0317', agent: 'marco', task: 'Match bank lines to invoices, 21–25 Sep', started: 'Fri 25 Sep', state: 'Undone', result: '212 matched; undone by Ramon today, 9:05 AM', by: 'Ramon Cruz' },
  { no: '#0316', agent: 'nico', task: 'September collections report', started: 'Fri 25 Sep', state: 'Done', result: 'Sent to leadership', by: 'Ramon Cruz' },
  { no: '#0315', agent: 'bea', task: 'Proposal for Cebu Grains', started: 'Thu 24 Sep', state: 'Running', result: 'Pricing from 14 past deals' },
  { no: '#0314', agent: 'marco', task: 'Match September delivery receipts', started: 'Thu 24 Sep', state: 'Partly done', result: '214 of 216 matched, 2 held', by: 'Ramon Cruz' },
  { no: '#0313', agent: 'nico', task: 'Why did Baguio collections drop in September?', started: 'Wed 23 Sep', state: 'Done', result: 'Table, chart, and 3 reasons' },
  { no: '#0312', agent: 'marco', task: 'Match this week’s supplier invoices to POs', started: 'Wed 23 Sep', state: 'Done', result: '41 matched; Luzon Packaging over PO, asked for a corrected invoice', by: 'Ramon Cruz' },
  { no: '#0311', agent: 'bea', task: 'Proposal for Talisay Hardware', started: 'Tue 22 Sep', state: 'Done', result: 'Sent to the customer', by: 'Liza Tan' },
  { no: '#0310', agent: 'marco', task: 'Import BDO statement, 14–18 Sep', started: 'Tue 22 Sep', state: 'Failed', result: 'BDO portal timed out; handed to Ramon' },
];

/** A narrow runs table, for side-by-side demos: run, task, state, and result. */
const tone = { 'Waiting on you': undefined, Running: undefined, Done: 'ok', 'Partly done': 'bad', Failed: 'bad', Undone: 'off' } as const;
const MiniRuns = ({ rows }: { rows: RunRowData[] }) => (
  <table className="m-tbl rn-tbl rn-mini">
    <thead><tr><th>Run</th><th>Task</th><th>State</th></tr></thead>
    <tbody>{rows.map(r => <tr key={r.no}><td><a className="m-link">{r.no}</a></td><td>{r.task}<small>{r.result}</small></td><td><Pill tone={tone[r.state]}>{r.state}</Pill></td></tr>)}</tbody>
  </table>
);

export default function RunsList() {
  return (
    <>
      <Demo wide caption={<>Agents › Runs, open on All with the last 14 days. Saved views come first, with Waiting on you beside All; one search box across run number, task, record, and amount; quick filters for Agent, state, and who asked. The two runs waiting on Ramon are tinted, and they’re the 2 on the Agents badge. Every row opens its run: see {link('runs/detail', 'Run detail')}.</>}>
        <AgentFrame on="Agents" as="lead">
          <div className="as-a-page">
            <p className="as-crumb">Agents <span>/</span> <b>Runs</b></p>
            <div className="as-a-head">
              <div><p className="m-title">Runs</p><p className="as-meta"><span>Every piece of work your Agents have done, newest first</span></p></div>
              <span className="as-acts"><Btn kind="quiet">•••</Btn><Btn>Export</Btn></span>
            </div>
            <p className="as-views2">
              <span className="on">All<em>319</em></span><span>Waiting on you<em>2</em></span><span>Running<em>1</em></span>
              <span>★ Needs a look<em>3</em></span><span>★ Marco’s payment runs<em>38</em></span><span className="add">+ Save view</span>
            </p>
            <div className="as-a-bar">
              <p className="as-filters"><span className="as-lsearch2">⌕ Search runs: number, task, a record it touched, amount…</span></p>
              <p className="rn-qf"><span className="dd">Agent ▾</span><span className="dd">State ▾</span><span className="dd">Asked by ▾</span><span className="as-chip">Started: last 14 days ×</span><span className="as-chip add">+ Filter</span></p>
            </div>
            <RunTable rows={rows} />
            <p className="as-a-foot2"><span>1–10 of 29</span><span className="as-pages"><i>‹</i><i className="on">1</i><i>2</i><i>3</i><i>›</i></span></p>
          </div>
        </AgentFrame>
      </Demo>

      <Demo wide verdict="do" caption={<>The same list from ••• on Marco’s page, Agents / Marco / Runs, already filtered to him: same columns, same states, same links. Ramon finds last Friday’s bank matching by its number, and opens it.</>}>
        <Win title="Loans OS">
          <div className="as-a-page rn-view"><AgentHead id="marco" view="Runs" /></div>
          <MiniRuns rows={rows.filter(r => r.agent === 'marco').slice(0, 5)} />
        </Win>
      </Demo>
      <Demo wide verdict="avoid" caption={<>Runs that live only in chat scrollback. To find what Marco matched last Friday, Ramon scrolls. There’s no number to link to, nothing to filter, no state, and nothing to open or undo.</>}>
        <div className="rn-chat">
          <ChatPanel agent="marco" status="Working">
            <Day label="Friday" />
            <Me>Match this week’s bank lines.</Me>
            <Msg>Done! Matched 212 bank lines to invoices and sent the receipts.</Msg>
            <Me>Thanks. Also check the delivery receipts.</Me>
            <Msg>On it. Most of them match. A couple look off, I’ll keep an eye on them.</Msg>
            <Day label="Today" />
            <Me>Prepare this week’s payment run.</Me>
            <Msg>Sure! Working on it now…</Msg>
          </ChatPanel>
        </div>
      </Demo>

      <Section title="What each state means on the list">
        <When head={['State', 'Means', 'The row’s result says', 'Next']} rows={[
          [<Pill>Waiting on you</Pill>, 'Ready, and a person must decide', 'What’s drafted: ₱48.65M to 32 suppliers, 3 held', 'Open it and approve, or suggest changes'],
          [<Pill>Running</Pill>, 'Still working', 'Where it is: Pricing from 14 past deals', 'Nothing. It notifies whoever asked when it’s done'],
          [<Pill tone="ok">Done</Pill>, 'Finished, and approved if it needed approval', 'What came of it: Sent to leadership', 'Nothing, unless something looks wrong'],
          [<Pill tone="bad">Partly done</Pill>, 'Some worked; some are held or failed', 'How much: 214 of 216 matched, 2 held', 'Review what’s held; retry what failed'],
          [<Pill tone="bad">Failed</Pill>, 'Nothing could be done, and it’s been handed to a person', 'Why, in plain words, and who has it', 'Whoever has it picks it up'],
          [<Pill tone="off">Undone</Pill>, 'Someone rolled back what it changed', 'What it did, and who undid it', 'Nothing. The run stays, for the record'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Every run is a numbered record.', 'Its Agent, task, when it started, state, result, and who approved, in one row.'],
            ['Put what waits on you first.', 'A Waiting on you view beside All, those rows tinted, and the same count as the Agents badge.'],
            ['Follow the List records rules.', 'Saved views, one search across number, task, and records touched, and filters as chips.'],
            ['Say the result in words.', 'Each row says what came of it: ₱48.65M to 32 suppliers, 3 held; not just Done.'],
            ['One list, two ways in.', 'Agents › Runs for all of them, and the same list, filtered, from ••• on each Agent’s page.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Runs only in chat scrollback.', 'Nobody can find, link to, check, or undo last Friday’s work.'],
            ['Waiting runs mixed in by date.', 'A payment run waits for days because it sat under three finished reports.'],
            ['A list you can only scroll.', 'Ramon can’t pull up every run that touched INV-1038, or every failed run this month.'],
            ['A state and nothing else.', 'Ten rows say Done, and each one has to be opened to see what it did.'],
            ['A different list for each Agent.', 'Marco’s runs have an Approved by column, Nico’s don’t, and nobody sees the whole picture.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
