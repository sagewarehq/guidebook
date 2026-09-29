import type { ReactNode } from 'react';
import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Ini, Sk } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import { AgentFrame, Reason, Source, HeldPill } from '../agents/agent-kit';
import '../shell/shell.css';
import './explaining.css';

// In the history: an Agent’s changes sit in the same history as everyone else’s, drawn the same way, told apart only
// by the badge. Each carries the reason the Agent gave, the run it came from, and who approved or asked for it.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

/** One history entry: who, what, and when; then, for an Agent, its reason and a line with the run and who approved or asked. */
function H({ ini, agent, who, what, why, meta }: { ini: string; agent?: boolean; who: string; what: ReactNode; why?: ReactNode; meta: ReactNode }) {
  return (
    <p className="as-h"><Ini n={ini} agent={agent} /><span><span><b>{who}</b> {what}</span>{why && <Reason>{why}</Reason>}<span className="sw-meta">{meta}</span></span></p>
  );
}

/** INV-2291’s history, latest first. */
const inv2291 = (
  <div className="sw-hist">
    <H ini="MA" agent who="Marco" what="held it from payment run #0318" why="Still ₱68,750 over PO-4431. Their corrected invoice hasn’t come in." meta={<>Today, 7:40 AM · <Source>Run #0318</Source></>} />
    <H ini="RC" who="Ramon" what="added a note" why="“Luzon says the corrected invoice comes next week.”" meta="Fri 25 Sep, 4:12 PM" />
    <H ini="RC" who="Ramon" what="changed the due date" meta={<>Thu 24 Sep, 9:30 AM · <span className="sw-diff"><s>25 Sep</s> → <b>30 Sep</b></span></>} />
    <H ini="MA" agent who="Marco," what="for Ramon Cruz, asked Luzon for a corrected invoice" why="Billed ₱68,750 over PO-4431." meta={<>Wed 23 Sep, 3:20 PM · <Source>Run #0312</Source> · Asked by Ramon in chat; sent once he approved it</>} />
    <H ini="MA" agent who="Marco" what="matched it to PO-4431" why="Billed ₱1,318,750.00 against a PO for ₱1,250,000.00." meta={<>Wed 23 Sep, 11:05 AM · <Source>Run #0312</Source> · Approved by Ramon Cruz</>} />
    <H ini="MA" agent who="Marco" what="recorded it" why="Read from the PDF on Luzon’s email." meta={<>Tue 22 Sep, 2:48 PM · <Source>Run #0309</Source> <Source>Email, 22 Sep</Source> · Approved by Ana Reyes</>} />
  </div>
);

type T = [ini: string, who: string, what: ReactNode, why: ReactNode, meta: ReactNode, time: string];
const trail: [string, T[]][] = [
  ['Today', [
    ['MA', 'Marco', <>drafted 6 reminders for overdue invoices in Cebu</>, 'Each 14 days or more overdue, with no reply to the first reminder.', <><Source>Run #0319</Source> · Waiting on Ramon Cruz</>, '9:15 AM'],
    ['MA', 'Marco', <>held <a className="m-link">INV-2291</a> · Luzon Packaging</>, 'Still ₱68,750 over PO-4431. Their corrected invoice hasn’t come in.', <Source>Run #0318</Source>, '7:40 AM'],
    ['MA', 'Marco', <>held <a className="m-link">INV-8863</a> · Cebu Paperworks</>, 'Same items and amount as INV-8807, paid Tue 22 Sep. Looks like a resend.', <Source>Run #0318</Source>, '7:40 AM'],
    ['MA', 'Marco', <>held <a className="m-link">INV-3317</a> · Island Grains</>, 'Billed in full, but the warehouse hasn’t received the goods.', <Source>Run #0318</Source>, '7:40 AM'],
  ]],
  ['Fri 25 Sep', [
    ['NI', 'Nico', <>sent the September collections report to leadership</>, 'Baguio down 18%: 6 restructured loans pay from October, and Route 3 went unvisited.', <><Source>Run #0316</Source> · Approved by Ramon Cruz</>, '5:30 PM'],
  ]],
  ['Thu 24 Sep', [
    ['BE', 'Bea', <>started a proposal for <a className="m-link">Cebu Grains</a></>, 'Pricing from 14 past deals with grain traders.', <><Source>Run #0315</Source> · Asked by Liza Tan in chat</>, '3:05 PM'],
    ['MA', 'Marco', <>matched 214 of 216 September delivery receipts</>, '2 held: quantities differ from the POs.', <><Source>Run #0314</Source> · Approved by Ramon Cruz</>, '8:00 AM'],
  ]],
];

export default function History() {
  return (
    <>
      <Demo wide caption={<>INV-2291, Luzon Packaging’s invoice, with its history in the side panel. Marco’s entries and Ramon’s sit in one list, latest first, drawn alike: only the AI badge tells them apart. Each of Marco’s carries the reason he gave and its run; the one he did for Ramon says so. Each run chip opens the run: see {link('runs/detail', 'Runs › Run detail')}.</>}>
        <AgentFrame on="Invoices" as="lead" loud>
          <div className="sw-work">
            <div className="as-a-page">
              <p className="as-crumb">Invoices <span>/</span> From suppliers <span>/</span> <b>INV-2291</b></p>
              <div className="as-a-head">
                <div><p className="m-title">INV-2291 · Luzon Packaging</p><p className="as-meta"><HeldPill>Held by Marco</HeldPill><span>PO-4431 · due 30 Sep</span></p></div>
                <span className="as-acts"><Btn kind="quiet">•••</Btn><Btn>Pay anyway…</Btn><Btn kind="pri">Ask Luzon for a corrected invoice</Btn></span>
              </div>
              <p className="as-a-tabs"><span className="on">Overview</span><span>Items 3</span><span>Payments</span><span>Documents 1</span></p>
              <div className="as-a-content">
                <p className="as-facts"><span><small>Amount</small>₱1,318,750.00</span><span><small>PO-4431</small>₱1,250,000.00</span><span><small>Over PO</small><b>₱68,750.00</b></span></p>
                <p className="as-sech"><span className="m-k">Supplier and terms</span><a className="m-link">Edit</a></p>
                <Sk w="70%" /><Sk w="56%" />
                <p className="as-sech"><span className="m-k">Items</span><a className="m-link">Edit</a></p>
                <Sk w="80%" /><Sk w="64%" /><Sk w="72%" />
              </div>
            </div>
            <div className="as-a-panel sw-panel">
              <p className="m-k">Related</p>
              <div className="as-rel">{[['Supplier', 'Luzon Packaging'], ['Purchase order', 'PO-4431'], ['Delivery', 'DR-5552'], ['Payment run', '#0318']].map(([k, v]) => <p key={k}><span>{k}</span><a>{v}</a></p>)}</div>
              <p className="m-k">History</p>
              {inv2291}
            </div>
          </div>
        </AgentFrame>
      </Demo>

      <Demo wide caption={<>Administration › Audit trail with Agents only switched on: every change an Agent made, across every record, each with its reason, its run, and who approved or asked. Carlo can narrow it to one Agent. Without the switch, these rows sit among everyone else’s. See <a className="m-link" href="#/management/users/audit-trail">User management › Audit trail</a>.</>}>
        <Frame loud as="admin" on="" nav={<>
          <p className="as-nav">Home <em>3</em></p>
          <p className="as-grp">Work</p>
          {['Invoices', 'Payments', 'Customers', 'Loans', 'Agents'].map(x => <p key={x} className="as-nav">{x}</p>)}
          <p className="as-grp">Analytics</p>
          <p className="as-nav">Reports</p>
        </>} foot={<><p className="as-nav">Jobs</p><p className="as-nav">Settings</p><p className="as-nav on">Administration</p><p className="as-nav">Help</p></>}>
          <div className="as-a-page sw-trail">
            <p className="as-crumb">Administration <span>/</span> <b>Audit trail</b></p>
            <div className="as-a-head"><div><p className="m-title">Audit trail</p><p className="as-meta"><span>Agents only · last 7 days · 7 changes</span></p></div><span className="as-acts"><Btn>Export</Btn></span></div>
            <p className="as-filters"><span className="as-chip">Any Agent ▾</span><span className="as-chip">Any record ▾</span><span className="as-chip">Any change ▾</span><span className="as-chip">Last 7 days ▾</span><span className="au-toggle sw-toggle-on"><i />Agents only</span></p>
            <div className="au-days">
              {trail.map(([d, rows]) => (
                <div key={d}>
                  <p className="m-k">{d}</p>
                  <div className="au-list">{rows.map(([ini, who, what, why, meta, t], k) => (
                    <p key={k} className="au-row"><Ini n={ini} agent /><span><b>{who}</b> {what}<small><Reason>{why}</Reason></small><small>{meta}</small></span><small className="au-t">{t}</small></p>
                  ))}</div>
                </div>
              ))}
            </div>
          </div>
        </Frame>
      </Demo>

      <Section title="What the entry says">
        <When head={['What happened', 'The history reads']} rows={[
          ['An Agent held or flagged it, in a draft', '“Marco held it from payment run #0318”, its reason, and the run. Nothing on the record changed.'],
          ['An Agent’s draft was approved', 'The change, its reason, and the run, plus “Approved by Ramon Cruz”. Marco drafted it; Ramon made the call.'],
          ['A person asked, then approved', '“Marco, for Ramon Cruz, asked Luzon for a corrected invoice”, plus “Asked by Ramon in chat; sent once he approved it”.'],
          ['A person did it', '“Ramon changed the due date: 25 Sep → 30 Sep.” No run; a note only if they gave one.'],
          ['A person undid an Agent’s change', <>“Ramon undid Marco’s change”, with the run, now marked Undone. See {link('runs/undo', 'Runs › Undoing a run')}.</>],
        ]} />
      </Section>

      <Pair>
        <Demo verdict="do" caption="Ramon’s change and Marco’s, drawn the same way. The badge says who is an Agent; the reason and run say why.">
          <Win title="INV-2291 · History">
            <div className="sw-hist">
              <H ini="RC" who="Ramon" what="changed the due date" meta={<>Thu 24 Sep · <span className="sw-diff"><s>25 Sep</s> → <b>30 Sep</b></span></>} />
              <H ini="MA" agent who="Marco" what="matched it to PO-4431" why="Billed ₱1,318,750.00 against a PO for ₱1,250,000.00." meta={<>Wed 23 Sep · <Source>Run #0312</Source></>} />
            </div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="“System” as the author. Was it Marco, a scheduled job, or an import? Nobody can say, and nobody can ask.">
          <Win title="INV-2291 · History">
            <div className="sw-hist">
              <p className="as-h"><span className="sw-sys">⚙</span><span><span><b>System</b> updated the status</span><span className="sw-meta">Today, 7:40 AM · Open → Held</span></span></p>
              <p className="as-h"><span className="sw-sys">⚙</span><span><span><b>System</b> updated the record</span><span className="sw-meta">Wed 23 Sep</span></span></p>
            </div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Agent rows tinted and set apart. The history reads like a warning, and people start to distrust every change in green.">
          <Win title="INV-2291 · History">
            <div className="sw-hist sw-tint">
              <p className="as-h sw-ai"><Ini n="MA" agent /><span><span><b>AI activity</b> held it</span><span className="sw-meta">Today, 7:40 AM</span></span></p>
              <p className="as-h"><Ini n="RC" /><span><span><b>Ramon</b> changed the due date</span><span className="sw-meta">Thu 24 Sep</span></span></p>
            </div>
          </Win>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Name the Agent as the author.', '“Marco held it”, in the same history as people, in the same order.'],
            ['Only the badge sets it apart.', 'Same row, size, and colour as a person’s change. The AI badge on the initials does the rest.'],
            ['Keep the reason it gave.', 'Word for word, the line it showed when it decided.'],
            ['Link the run, and who approved or asked.', '“Run #0318 · Approved by Ramon Cruz”, or “Asked by Ramon in chat”.'],
            ['Filter the audit trail to Agents.', 'Administration › Audit trail, Agents only, then one Agent, one record, or one week.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['“System” as the author.', 'Nobody can tell whether Marco, a scheduled job, or an import held the invoice.'],
            ['Agent rows in their own colour or tab.', 'People check two places, or read every Agent change as a warning.'],
            ['A change with no why.', '“Marco changed the status.” Ramon has to open the chat to find out why.'],
            ['No link to the run.', 'Nobody can see what else it changed that morning, or undo it all at once.'],
            ['Agent work buried in a year of trail.', 'Finding what Marco did last week means reading everyone’s changes.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
