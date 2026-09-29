import type { ReactNode } from 'react';
import { Section, Demo, When, Rules, Avoid, Btn, Pill, Pin, Ini } from '../../site/kit';
import { AgentAva, Me, Steps, ApprovalCard, Source } from '../agents/agent-kit';
import './concepts.css';

// From ask to trail: the path every piece of Agent work follows, drawn with one example, Marco's payment run #0318,
// from Ramon's brief this morning to the history line on each payment. Then the same path for every kind of change.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

type Actor = 'person' | 'agent' | 'sys' | 'skip';
const stepNames = ['Ask', 'Run', 'Draft', 'Decide', 'Change', 'Record'];

/** The six steps as chips, coloured by who acts: a person (ink), an Agent (green), the system (grey), or skipped (dashed). */
function Path({ who, extra }: { who: Actor[]; extra?: string }) {
  return (
    <p className="kc-path">
      {stepNames.map((s, i) => <span key={s} style={{ display: 'contents' }}>{i > 0 && <i>→</i>}<span className={`kc-step ${who[i]}`}>{s}</span></span>)}
      {extra && <><i>→</i><span className="kc-step agent">{extra}</span></>}
    </p>
  );
}

const Person = ({ ini, name }: { ini: string; name: string }) => <span><Ini n={ini} />{name}</span>;
const Marco = () => <span><AgentAva id="marco" size="sm" />Marco</span>;

/** One step: its number and name, who acts, the screen it happens on, and where that screen is covered. */
function Step({ n, name, who, see, children }: { n: number; name: string; who: ReactNode; see: ReactNode; children: ReactNode }) {
  return (
    <div className="kc-cell">
      <p className="kc-cell-h"><Pin n={n} /><b>{name}</b>{who}</p>
      <div className="kc-scr">{children}</div>
      <small>On {see}</small>
    </div>
  );
}

export default function Lifecycle() {
  return (
    <>
      <Demo wide caption={<>One piece of work, start to finish: Marco’s payment run #0318, today, Mon 28 Sep. Ramon asks in chat; Marco runs the steps and drafts the run; Ramon approves on a confirmation page; Marco schedules the 32 payments; and every payment’s history says who approved it and links back to the run. People act at the two ends that matter, the ask and the decision.</>}>
        <div className="kc-life">
          <Path who={['person', 'agent', 'agent', 'person', 'agent', 'sys']} />
          <div className="kc-grid">
            <Step n={1} name="Ask" who={<Person ini="RC" name="Ramon" />} see={link('chat/asking', 'the chat panel')}>
              <p className="m-k">Chat with Marco · Today, 7:38 AM</p>
              <Me>Prepare this week’s payment run. Hold anything you’re not sure about.</Me>
            </Step>
            <Step n={2} name="Run" who={<Marco />} see={link('runs/detail', 'the run detail')}>
              <p className="m-k">Run #0318 · started 7:40 AM</p>
              <Steps items={[[true, 'Read 36 invoices from 35 suppliers, due this week'], [true, 'Matched each to its PO and delivery'], [true, '30 matched cleanly; 5 needed a call'], ['flag', '3 held for a person']]} />
            </Step>
            <Step n={3} name="Draft" who={<Marco />} see={link('approvals/card', 'the approval card')}>
              <ApprovalCard title="Payment run #0318" meta="Pays Tue 29 Sep, 9:00 AM · from BDO ••4471"
                facts={[['To pay', '₱48,650,000.00'], ['Suppliers', '32 of 35'], ['Held', '3']]} />
            </Step>
            <Step n={4} name="Decide" who={<Person ini="RC" name="Ramon" />} see={link('approvals/card', 'a confirmation page, from the card')}>
              <div className="kc-conf">
                <p className="m-k">Agents / Runs / #0318 / Approve</p>
                <p className="m-title">Approve payment run #0318?</p>
                <p>₱48,650,000.00 goes to 32 suppliers on Tue 29 Sep, 9:00 AM, from BDO ••4471.</p>
                <p>The 3 held invoices stay unpaid.</p>
                <p className="kc-btns"><Btn kind="pri">Approve and schedule</Btn><Btn kind="quiet">Cancel</Btn></p>
              </div>
            </Step>
            <Step n={5} name="Change" who={<Marco />} see={link('runs/undo', 'Payments, undoable from the run')}>
              <p className="m-k">Payments · Run #0318 · 32</p>
              <table className="m-tbl">
                <tbody>
                  <tr><td>Bohol Diesel Depot</td><td className="r">₱6,742,000.00</td><td><Pill>Scheduled</Pill></td></tr>
                  <tr><td>Mactan Steel Supply</td><td className="r">₱2,184,500.00</td><td><Pill>Scheduled</Pill></td></tr>
                  <tr><td>30 more suppliers</td><td className="r">₱39,723,500.00</td><td><Pill>Scheduled</Pill></td></tr>
                </tbody>
              </table>
            </Step>
            <Step n={6} name="Record" who={<span>Loans OS</span>} see={link('explaining/history', 'each record’s history')}>
              <p className="m-k">Mactan Steel Supply · History</p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> scheduled ₱2,184,500.00 for Tue 29 Sep<small>Today, 9:43 AM · <Source>Run #0318</Source></small></span></p>
              <p className="as-h"><Ini n="RC" /><span><b>Ramon</b> approved payment run #0318<small>Today, 9:42 AM</small></span></p>
            </Step>
          </div>
        </div>
      </Demo>

      <Section title="The same path for every change">
        <p>There’s no shortcut: every change goes through a draft and a person’s decision. Only work that changes nothing stops early.</p>
        <When head={['Work', 'The path', 'Why']} rows={[
          ['A question, or an analysis', <Path who={['person', 'agent', 'skip', 'skip', 'skip', 'sys']} />, 'Nothing changes, so there’s nothing to decide. The session keeps the answer.'],
          ['Receipt matches, bank lines', <Path who={['person', 'agent', 'agent', 'person', 'agent', 'sys']} />, 'Drafted as one batch, and approved in one go, held lines first.'],
          ['A payment run', <Path who={['person', 'agent', 'agent', 'person', 'agent', 'sys']} />, 'Approved on a confirmation page, such as run #0318.'],
          ['A reminder to a customer', <Path who={['person', 'agent', 'agent', 'person', 'agent', 'sys']} />, 'Sent only once a person approves it, or sends it themselves.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Start from an ask.', 'A person’s brief in chat, or a schedule someone set up, named on the run.'],
            ['Draft in one card.', 'What it did, what it held, and the answers, in one place.'],
            ['Decide on a confirmation page.', 'Approve… says what gets paid, when, and from which account.'],
            ['Link every change to its run.', 'Each payment’s history names the Agent, the approver, and Run #0318.'],
            ['Never skip the decision.', 'Routine work is approved in one go, never left out.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Work from nowhere.', 'A run appears and nobody can say who asked for it, or why.'],
            ['A draft spread over messages.', 'Ramon approves the total without seeing the 3 held invoices.'],
            ['Approving money in one click.', '₱48.65M goes out from a chat bubble, with no page that checks first.'],
            ['Changes with no trail.', 'A payment shows “System” in its history, and nobody can find the run to undo it.'],
            ['A path with no person in it.', 'Bank lines are matched overnight, and a report is the first anyone hears of it.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
