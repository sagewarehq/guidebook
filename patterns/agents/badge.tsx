import type { ReactNode } from 'react';
import { Section, Demo, Pair, Rules, Avoid, When, Win, Ini } from '../../site/kit';
import { AgentFrame, AgentAva, Reason, Source } from './agent-kit';

// Telling Agents apart: wherever an Agent’s name appears, the AI badge and the word Agent go with it, and anything it
// sends outside says it was prepared by an Agent, for a named person. Drawn in a list, the history, and an email.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

const Marco = () => <span className="bd-by"><AgentAva id="marco" size="sm" /><b>Marco</b><em>Agent</em></span>;
const Ana = () => <span className="bd-by"><span className="bd-ini"><Ini n="AR" /></span><b>Ana Reyes</b></span>;

const rows: [string, string, string, string, ReactNode][] = [
  ['INV-1038', 'Metro Fuels', '2 Sep', '₱420,000', <><Marco /><small>Mon 21 Sep</small></>],
  ['INV-1044', 'Northstar Supply', '9 Sep', '₱2,940,000', <><Ana /><small>Thu 24 Sep</small></>],
  ['INV-1047', 'Pacific Cartons', '12 Sep', '₱318,000', <><Marco /><small>Mon 21 Sep</small></>],
  ['INV-1052', 'Mandaue Glassworks', '15 Sep', '₱1,405,000', <><small className="bd-pre">Drafted by</small><Marco /><small>waiting on you · <a className="m-link">#0319</a></small></>],
];

function Mail({ posing }: { posing?: boolean }) {
  return (
    <Win title="Email">
      <div className="bd-mail">
        <p className="bd-mh"><small>From</small>{posing ? 'Marco Villanueva <marco@metrolending.ph>' : 'Metro Lending Collections <collections@metrolending.ph>'}</p>
        <p className="bd-mh"><small>To</small>Joy Santos, Metro Fuels</p>
        <p className="bd-mh"><small>Subject</small>INV-1038 is 19 days overdue</p>
        <div className="bd-body">
          <p>Hi Joy,</p>
          <p>INV-1038 for ₱1,180,000.00 was due on 2 Sep. Thank you for the ₱760,000.00 on 18 Sep; ₱420,000.00 is still to pay.</p>
          {posing
            ? <p className="bd-sig">Best regards,<br /><b>Marco Villanueva</b><br />Accounts Officer, Metro Lending</p>
            : <p className="bd-sig"><b>Ramon Cruz</b>, Finance lead, Metro Lending<small>Prepared by Marco (Agent) for Ramon Cruz. Reply to this email to reach Ramon.</small></p>}
        </div>
        {posing && <p className="bd-reply"><b>Joy Santos</b> replied: “Hi Marco, can we meet on Thursday to talk about terms?”</p>}
      </div>
    </Win>
  );
}

export default function Badge() {
  return (
    <>
      <Demo wide caption={<>The overdue invoices, with who sent the last reminder. Marco’s rows carry his initials with the AI badge and the word Agent; Ana’s carry her initials alone. A reminder he’s drafted but Ramon hasn’t approved says so, with its run.</>}>
        <AgentFrame on="Invoices" as="lead" loud>
          <div className="as-a-page">
            <p className="as-crumb">Invoices <span>/</span> <b>Overdue in Cebu</b></p>
            <div className="as-a-head"><div><p className="m-title">Invoices</p><p className="as-meta"><span>Overdue in Cebu · 12 invoices</span></p></div></div>
            <table className="m-tbl bd-tbl">
              <thead><tr><th>Invoice</th><th>Customer</th><th>Due</th><th className="r">Balance</th><th>Last reminder</th></tr></thead>
              <tbody>{rows.map(([no, c, d, b, by]) => <tr key={no}><td><a className="m-link">{no}</a></td><td>{c}</td><td>{d}</td><td className="r">{b}</td><td><span className="bd-cell">{by}</span></td></tr>)}</tbody>
            </table>
          </div>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption={<>In the history, Marco’s change sits with everyone else’s, badged, with who approved it and the run behind it. See {link('explaining/history', 'Showing the work › In the history')}.</>}>
          <Win title="INV-1038 · History">
            <div className="bd-hist">
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> (Agent) sent a payment reminder<small>21 Sep · approved by Ramon Cruz · <Source>Run #0301</Source></small><Reason>19 days overdue, and no reply to the first.</Reason></span></p>
              <p className="as-h"><Ini n="AR" /><span><b>Ana</b> recorded ₱760,000<small>18 Sep</small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> (Agent) matched PO-2211<small>28 Aug · <Source>Run #0266</Source></small></span></p>
            </div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="The same history with Marco drawn like a colleague. Ana asks who Marco is, and nobody can tell the reminder went out on an Agent’s work.">
          <Win title="INV-1038 · History">
            <div className="bd-hist">
              <p className="as-h"><Ini n="MV" /><span><b>Marco V.</b> sent a payment reminder<small>21 Sep</small></span></p>
              <p className="as-h"><Ini n="AR" /><span><b>Ana</b> recorded ₱760,000<small>18 Sep</small></span></p>
              <p className="as-h"><Ini n="SY" /><span><b>System</b> matched PO-2211<small>28 Aug</small></span></p>
            </div>
          </Win>
        </Demo>
      </Pair>

      <Pair>
        <Demo verdict="do" caption="Anything that leaves the business goes out in a person’s name, from a shared address, and says an Agent prepared it for them. Replies reach Ramon.">
          <Mail />
        </Demo>
        <Demo verdict="avoid" caption="The Agent poses as a person: a surname, a job title, its own mailbox. Joy asks “Marco” to a meeting, and nobody at Metro Lending sees it.">
          <Mail posing />
        </Demo>
      </Pair>

      <Section title="Where the badge goes">
        <When head={['Where', 'How the Agent is shown', 'Example']} rows={[
          ['Initials, anywhere', 'The AI badge on the corner, in the accent colour.', <Ini n="MA" agent />],
          ['Lists and tables', 'Initials with the badge, the name, and the word Agent.', 'Last reminder: Marco, Agent · Mon 21 Sep'],
          ['Record history and the audit trail', 'Badged, with who approved it and the run.', 'Marco (Agent) sent a payment reminder · approved by Ramon Cruz · Run #0301'],
          ['Documents and emails sent out', 'In a person’s name, with a line saying the Agent prepared it.', 'Prepared by Marco (Agent) for Ramon Cruz'],
          ['Notifications', 'Badged initials, and what it needs or did.', 'Marco needs you: 6 reminders ready to send'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Badge every Agent’s initials.', 'The AI badge goes wherever its initials do: chat, lists, history, notifications.'],
            ['Say “Agent” beside the name.', 'In lists and history: Marco, Agent. A first name only, never a surname or job title.'],
            ['Say who approved it.', 'Each change it made shows the person who approved it, and the run behind it.'],
            ['Send in a person’s name.', 'Emails and documents say “Prepared by Marco (Agent) for Ramon Cruz”.'],
            ['Send replies to that person.', 'From a shared address, so a reply reaches Ramon, never an Agent’s inbox.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Plain initials for an Agent.', 'Marco looks like a new hire, and people message him about lunch.'],
            ['An Agent posing as a person.', '“Marco Villanueva, Accounts Officer”: customers think they’ve met him.'],
            ['Changes with nobody behind them.', '“System matched PO-2211”: nobody can tell which Agent did it, or who said yes.'],
            ['Agent work sent with no name on it.', 'The customer can’t tell who stands behind the reminder.'],
            ['An Agent with its own mailbox.', 'A customer asks for a meeting, and nobody reads it.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
