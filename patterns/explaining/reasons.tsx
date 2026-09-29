import { Section, Demo, Pair, Rules, Avoid, When, Win, Ini } from '../../site/kit';
import { AgentFrame, Line, Reason, Source, HeldPill } from '../agents/agent-kit';
import { RunHead, Box, heldItems } from './explaining-kit';

// Reasons: one plain line beside every call an Agent makes, where the call is shown: under each line of a proposal,
// on the record’s history entry, and under a report figure. The evidence first, then the decision.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

export default function Reasons() {
  return (
    <>
      <Demo wide caption={<>Payment run #0318 on its own page. Every line carries its reason, right under it: the 30 clean matches share one, each judgment call gets its own, and each held invoice says why it’s held. Ramon reads down the page and checks only what surprises him.</>}>
        <AgentFrame on="Agents" as="lead" loud>
          <div className="as-a-page">
            <RunHead />
            <Box title="To pay" note="32 suppliers · ₱48,650,000.00">
              <Line name="30 suppliers, matched to PO and delivery" amount="₱39,723,500.00" why="Invoice, PO, and delivery receipt agree on items, quantity, and price." />
              <Line name="Mactan Steel Supply" amount="₱2,184,500.00" why="Pay. 2 invoices, 1 PO: a split delivery, and both halves arrived." sources={['PO-4410', 'DR-5561', 'DR-5574']} />
              <Line name="Bohol Diesel Depot" amount="₱6,742,000.00" why="Pay. ₱42,000 over PO-4386, but you agreed the new diesel price by email." sources={['Email, 12 Sep']} />
            </Box>
            <Box title="Held" note="3 invoices · ₱3,911,150.00 not paid" tone="held">
              {heldItems.map(h => <Line key={h.inv} held name={`${h.supplier} · ${h.inv}`} amount={h.amount} why={h.why} sources={h.sources} />)}
            </Box>
          </div>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo caption={<>On the record: INV-2291’s history keeps the reason Marco gave when he held it, with the run it came from. Anyone who opens the invoice next week knows why it’s unpaid. See {link('explaining/history', 'In the history')}.</>}>
          <Win title="INV-2291 · Luzon Packaging · History">
            <div className="sw-hist">
              <p className="as-h"><Ini n="MA" agent /><span><span><b>Marco</b> held it from payment run #0318</span><Reason>Still ₱68,750 over PO-4431. Their corrected invoice hasn’t come in.</Reason><span className="sw-meta">Today, 7:40 AM · <Source>Run #0318</Source></span></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><span><b>Marco</b> matched it to PO-4431</span><Reason>Billed ₱1,318,750.00 against a PO for ₱1,250,000.00.</Reason><span className="sw-meta">Wed 23 Sep · <Source>Run #0312</Source></span></span></p>
              <p className="as-h"><Ini n="RC" /><span><span><b>Ramon</b> changed the due date</span><span className="sw-meta">Thu 24 Sep · 25 Sep → 30 Sep</span></span></p>
            </div>
          </Win>
        </Demo>
        <Demo caption="On a report: Nico’s September collections report. The figure that moved has its reason under it, in the row, not in a paragraph at the end. Ramon decides what to do about Baguio.">
          <Win title="Reports / Collections by branch · September 2026">
            <table className="m-tbl sw-rpt">
              <thead><tr><th>Branch</th><th className="r">August</th><th className="r">September</th><th className="r">Change</th></tr></thead>
              <tbody>
                <tr><td>Cebu</td><td className="r">₱12,480,000</td><td className="r">₱12,910,000</td><td className="r">+3%</td></tr>
                <tr className="sw-hi sw-top"><td>Baguio</td><td className="r">₱4,180,000</td><td className="r">₱3,420,000</td><td className="r"><span className="sw-down">−18%</span></td></tr>
                <tr className="sw-hi"><td colSpan={4}><span className="sw-chg"><Ini n="NI" agent />6 restructured loans pay from October, and Route 3 went unvisited 7–18 Sep: ₱595,000 of the ₱760,000 drop. <Source>6 loans</Source> <Source>Route 3</Source></span></td></tr>
                <tr><td>Manila</td><td className="r">₱18,260,000</td><td className="r">₱18,020,000</td><td className="r">−1%</td></tr>
              </tbody>
            </table>
          </Win>
        </Demo>
      </Pair>

      <Section title="Writing a reason">
        <Pair>
          <Demo verdict="do" caption="The evidence, then the decision, in one line. Each names the record, the date, or the amount it rests on, so Ramon can check it in one click.">
            <div className="sw-mini">
              <Box title="Held" tone="held">
                {heldItems.map(h => <Line key={h.inv} held name={h.supplier} amount={h.amount} why={h.why} sources={h.sources} />)}
              </Box>
            </div>
          </Demo>
          <Demo verdict="avoid" caption="No reason, a reason that says nothing, and a paragraph. Ramon has to open every invoice to find out what Marco saw.">
            <div className="sw-mini">
              <Box title="Held" tone="held">
                <div className="ag-line held"><p><span><HeldPill />Cebu Paperworks</span><b>₱186,400.00</b></p></div>
                <Line held name="Luzon Packaging" amount="₱1,318,750.00" why="Based on analysis of the data." />
                <div className="ag-line held"><p><span><HeldPill />Island Grains</span><b>₱2,406,000.00</b></p><p className="sw-para">I reviewed this invoice against the purchase order and all the related records in the system, and while the amounts appear to match the purchase order, I noticed that the delivery status may not yet be complete, so to be safe I have decided to hold the payment until someone can check with the warehouse team whether the goods have arrived.</p></div>
              </Box>
            </div>
          </Demo>
        </Pair>
      </Section>

      <Section title="How long a reason is, by place">
        <When head={['Where', 'How long', 'Example']} rows={[
          ['A line of a proposal', 'One line: the evidence, then the decision.', '“Same items and amount as INV-8807, paid Tue 22 Sep. Looks like a resend.”'],
          ['A held line', 'One line of why, then one of what clears it. See Holds and flags.', '“Clears when the warehouse confirms PO-4452.”'],
          ['A record’s history entry', 'The same line the Agent gave when it decided, word for word.', '“Still ₱68,750 over PO-4431. Their corrected invoice hasn’t come in.”'],
          ['A report figure', 'One line under the figure: what moved, by how much, and why.', '“6 restructured loans pay from October: ₱310,000 of the drop.”'],
          ['A group of routine lines', 'One line for the whole group.', '“Invoice, PO, and delivery receipt agree on items, quantity, and price.”'],
          ['The run’s page', 'A line per step. The longest account lives here, and nowhere else.', 'See Runs › Run detail.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['A reason on every call.', 'Every line paid, held, or changed. Routine lines share one reason for the group.'],
            ['Evidence first, then the decision.', '“Same items and amount as INV-8807, paid Tue 22 Sep. Looks like a resend.”'],
            ['Name the records, dates, and amounts.', 'The invoice it compared, the day it was paid, the peso difference, each a link.'],
            ['One line.', 'Enough to agree or doubt it at a glance. The steps behind it are in the run.'],
            ['Where the decision is shown.', 'Under the line, on the history entry, under the figure. The same words in each place.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A call with no reason.', 'A red Held pill and nothing else. Ramon opens three records to guess why.'],
            ['The verdict alone.', '“Looks like a resend.” Of what? Ramon can’t check it without redoing the work.'],
            ['“Based on analysis of the data.”', 'Says nothing that Ramon can check, agree with, or correct.'],
            ['A paragraph.', 'Five lines of “I reviewed…” on every row, and nobody reads any of them.'],
            ['Reasons in a separate log.', 'The decision is on the card and the why is two screens away, so nobody looks.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
