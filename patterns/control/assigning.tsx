import type { ReactNode } from 'react';
import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill, Sk, Toast, Ini } from '../../site/kit';
import { AgentFrame, AgentAva, Source, Reason } from '../agents/agent-kit';
import './control.css';

// Assigning work: the Assigned to field takes people and Agents alike, lists and records show who holds the work with
// the AI badge, only Agents whose role covers the record are offered, and Assign to me takes it back in one click.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

/** Who holds a record, as a list cell or a value: initials, with the badge for an Agent, and a name. */
const Holder = ({ ini, name, agent }: { ini: string; name: string; agent?: boolean }) => (
  <span className="cs-ini"><Ini n={ini} agent={agent} />{name}</span>
);

/** An invoice’s detail page, drawn for this chapter: header, key facts with Assigned to, sections, and the side panel. */
function Invoice({ no, customer, overdue, facts, assigned, acts, extra, history, foot }: {
  no: string; customer: string; overdue: string; facts: [string, string][]; assigned: ReactNode; acts: ReactNode;
  extra?: ReactNode; history: ReactNode; foot?: ReactNode;
}) {
  return (
    <div className="as-a-work">
      <div className="as-a-page">
        <p className="as-crumb">Invoices <span>/</span> Overdue in Cebu <span>/</span> <b>{no}</b></p>
        <div className="as-a-head">
          <div><p className="m-title">{no} · {customer}</p><p className="as-meta"><Pill tone="bad">{overdue}</Pill><span>Cebu · Net 30</span></p></div>
          <span className="as-acts">{acts}</span>
        </div>
        <p className="as-facts">{facts.map(([k, v]) => <span key={k}><small>{k}</small>{v}</span>)}</p>
        {assigned}
        {extra}
        <p className="as-sech"><span className="m-k">Customer and terms</span><a className="m-link">Edit</a></p>
        <Sk w="70%" /><Sk w="56%" />
        {foot}
      </div>
      <div className="as-a-panel">
        <p className="m-k">History</p>
        {history}
      </div>
    </div>
  );
}

export default function Assigning() {
  return (
    <>
      <Demo wide caption={<>Ana hands INV-1047 to Marco from its Assigned to field, the same field she’d use for a colleague. People come first, then Agents, each with what it will do with an invoice. Only Marco is offered: invoices aren’t in Nico’s or Bea’s roles, and the picker says so. The ••• menu has the same choice, as Assign to Marco. See {link('agents/access', 'Agents in the app › Giving an Agent access')}.</>}>
        <div className="cs-roomy">
        <AgentFrame on="Invoices" as="staff" waiting={0}>
          <Invoice no="INV-1047" customer="Pacific Cartons" overdue="Overdue 16 days"
            facts={[['Amount', '₱318,000'], ['Balance', '₱318,000'], ['Due', '12 Sep 2026']]}
            acts={<><Btn kind="quiet">•••</Btn><Btn>Send reminder</Btn><Btn kind="pri">Record payment</Btn></>}
            assigned={
              <div className="cs-asg">
                <div className="m-field"><label>Assigned to</label><span className="m-in focus"><Holder ini="AR" name="Ana Reyes (you)" /><i>▴</i></span></div>
                <div className="cs-pick">
                  <p className="m-k">People</p>
                  <p className="on"><Ini n="AR" /><span><b>Ana Reyes (you)</b><small>Collections, Cebu</small></span><em>✓</em></p>
                  <p><Ini n="RC" /><span><b>Ramon Cruz</b><small>Finance lead</small></span></p>
                  <p><Ini n="LT" /><span><b>Liza Tan</b><small>Cebu branch manager</small></span></p>
                  <p className="m-k">Agents</p>
                  <p><AgentAva id="marco" size="sm" /><span><b>Marco</b><small>Chases payment: a reminder every 10 days, and hands it back if the customer replies.</small></span></p>
                  <p className="cs-note">Nico and Bea aren’t offered: invoices aren’t in their roles.</p>
                </div>
              </div>}
            history={<>
              <p className="as-h"><Ini n="AR" /><span><b>Ana</b> sent a payment reminder<small>15 Sep</small></span></p>
              <p className="as-h"><Ini n="AR" /><span><b>Ana</b> created it<small>13 Aug</small></span></p>
            </>}
            foot={<><Sk w="64%" /><Sk w="48%" /><Sk w="58%" /></>} />
        </AgentFrame>
        </div>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="The list shows who holds each invoice, person or Agent, in one column. Marco’s carry the AI badge, and Assigned to: Marco is a filter like any other.">
          <Win title="Invoices / Overdue in Cebu">
            <table className="m-tbl cs-agents">
              <thead><tr><th>Invoice</th><th>Customer</th><th className="r">Balance</th><th>Assigned to</th></tr></thead>
              <tbody>
                <tr><td><a className="m-link">INV-1038</a></td><td>Metro Fuels</td><td className="r">₱420,000</td><td><Holder ini="MA" name="Marco" agent /></td></tr>
                <tr><td><a className="m-link">INV-1044</a></td><td>Northstar Supply</td><td className="r">₱2,940,000</td><td><Holder ini="AR" name="Ana Reyes" /></td></tr>
                <tr><td><a className="m-link">INV-1047</a></td><td>Pacific Cartons</td><td className="r">₱318,000</td><td><Holder ini="MA" name="Marco" agent /></td></tr>
                <tr><td><a className="m-link">INV-1052</a></td><td>Mandaue Glassworks</td><td className="r">₱1,405,000</td><td><Holder ini="RC" name="Ramon Cruz" /></td></tr>
              </tbody>
            </table>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Work an Agent holds shows as nobody’s, or as “Automation”. Ana can’t tell Metro Fuels is being chased, and calls them the morning Marco’s reminder goes out.">
          <Win title="Invoices / Overdue in Cebu">
            <table className="m-tbl cs-agents">
              <thead><tr><th>Invoice</th><th>Customer</th><th className="r">Balance</th><th>Assigned to</th></tr></thead>
              <tbody>
                <tr><td><a className="m-link">INV-1038</a></td><td>Metro Fuels</td><td className="r">₱420,000</td><td><span className="cs-none">—</span></td></tr>
                <tr><td><a className="m-link">INV-1044</a></td><td>Northstar Supply</td><td className="r">₱2,940,000</td><td><Holder ini="AR" name="Ana Reyes" /></td></tr>
                <tr><td><a className="m-link">INV-1047</a></td><td>Pacific Cartons</td><td className="r">₱318,000</td><td><span className="cs-none">Automation</span></td></tr>
                <tr><td><a className="m-link">INV-1052</a></td><td>Mandaue Glassworks</td><td className="r">₱1,405,000</td><td><Holder ini="RC" name="Ramon Cruz" /></td></tr>
              </tbody>
            </table>
          </Win>
        </Demo>
      </Pair>

      <Demo wide caption={<>While Marco holds INV-1038, the record says so, and what he’ll do next and when. Metro Fuels has just called Ana to say they’ll pay on Friday, so she takes it back with Assign to me. There’s no confirmation page: taking work back is always safe.</>}>
        <AgentFrame on="Invoices" as="staff" waiting={0}>
          <Invoice no="INV-1038" customer="Metro Fuels" overdue="Overdue 26 days"
            facts={[['Amount', '₱1,180,000'], ['Balance', '₱420,000'], ['Due', '2 Sep 2026']]}
            acts={<><Btn kind="quiet">•••</Btn><Btn>Assign to me</Btn><Btn kind="pri">Record payment</Btn></>}
            assigned={
              <div className="cs-held">
                <AgentAva id="marco" />
                <span><b>Marco holds this invoice, since 18 Sep. Ana assigned it.</b><span>Next: a second reminder to Metro Fuels, Thu 1 Oct, 9:00 AM. He hands it back if they reply.</span></span>
              </div>}
            history={<>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> sent a payment reminder<small>21 Sep · <Reason>19 days overdue.</Reason> <Source>Run #0301</Source></small></span></p>
              <p className="as-h"><Ini n="AR" /><span><b>Ana</b> assigned it to Marco<small>18 Sep</small></span></p>
              <p className="as-h"><Ini n="AR" /><span><b>Ana</b> recorded ₱760,000<small>18 Sep</small></span></p>
              <p className="as-h"><Ini n="RC" /><span><b>Ramon</b> created it<small>3 Aug</small></span></p>
            </>} />
        </AgentFrame>
      </Demo>

      <Demo wide caption={<>One click later. INV-1038 is Ana’s, Marco’s Thursday reminder is cancelled, and the history says who took it back, and from whom. Undo in the toast gives it back to Marco.</>}>
        <AgentFrame on="Invoices" as="staff" waiting={0}>
          <Invoice no="INV-1038" customer="Metro Fuels" overdue="Overdue 26 days"
            facts={[['Amount', '₱1,180,000'], ['Balance', '₱420,000'], ['Due', '2 Sep 2026']]}
            acts={<><Btn kind="quiet">•••</Btn><Btn>Send reminder</Btn><Btn kind="pri">Record payment</Btn></>}
            assigned={<div className="m-field cs-asg"><label>Assigned to</label><span className="m-in"><Holder ini="AR" name="Ana Reyes (you)" /><i>▾</i></span></div>}
            history={<>
              <p className="as-h"><Ini n="AR" /><span><b>Ana</b> took it back from Marco<small>Today, 10:30 AM</small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> sent a payment reminder<small>21 Sep · <Source>Run #0301</Source></small></span></p>
              <p className="as-h"><Ini n="AR" /><span><b>Ana</b> assigned it to Marco<small>18 Sep</small></span></p>
            </>}
            foot={<p className="cs-toast"><Toast action="Undo">INV-1038 is yours. Marco’s reminder for Thu 1 Oct is cancelled.</Toast></p>} />
        </AgentFrame>
      </Demo>

      <Section title="What each Agent can hold">
        <When head={['Agent', 'Can be assigned', 'Never holds']} rows={[
          [<Holder ini="MA" name="Marco" agent />, 'Overdue invoices, to chase payment. Supplier invoices, to match to PO and delivery. Payment runs, to prepare.', 'Approving or sending a payment.'],
          [<Holder ini="NI" name="Nico" agent />, 'Report requests, to build and explain.', 'Any record: he reads them, and changes none.'],
          [<Holder ini="BE" name="Bea" agent />, 'Loan proposals for business borrowers, to draft and price.', 'Sending a proposal, or approving a loan: Liza does both.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Show who holds it, everywhere.', 'An Assigned to column and field, with the AI badge when it’s an Agent.'],
            ['Assign an Agent like a person.', 'The same Assigned to field, Agents after people; ••• has Assign to Marco too.'],
            ['Offer only Agents whose role covers it.', 'Nico and Bea aren’t listed on an invoice, and the picker says why.'],
            ['Say what the Agent will do next.', 'On the record: its next step, when, and when it hands back.'],
            ['Take it back in one click.', 'Assign to me, no page: its next steps are cancelled, and the history says so.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Agent work that looks unassigned.', 'Ana calls Metro Fuels the same morning Marco’s reminder goes out.'],
            ['A separate “Automate” screen.', 'People can’t tell which records went there, or find them again.'],
            ['Every Agent in every picker.', 'An invoice assigned to Nico sits untouched, because reports are all he does.'],
            ['An Agent holding work quietly.', 'Nobody knows a reminder is due Thursday, so the customer hears from two people.'],
            ['A form to take work back.', 'People leave the Agent on it rather than fill one in, and the reminder goes anyway.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
