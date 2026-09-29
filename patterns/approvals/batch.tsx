import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill } from '../../site/kit';
import { AgentFrame } from '../agents/agent-kit';
import { RunPage, RunCard, link } from './approval-kit';

// Approving a batch: payment run #0318 is 35 suppliers, but only 5 need a person’s eye. The run page puts the 3 held
// and the 2 judgment calls first, and sums the 30 clean matches in one line that opens.

const bad: [string, string, string][] = [
  ['Lapu-Lapu Lumber', 'PO-4398', '₱4,815,000.00'],
  ['Consolacion Cement', 'PO-4402', '₱3,960,250.00'],
  ['Mactan Steel Supply', 'PO-4410', '₱1,092,250.00'],
  ['Mactan Steel Supply', 'PO-4410', '₱1,092,250.00'],
  ['Danao Hardware', 'PO-4417', '₱2,742,800.00'],
  ['Cebu Paperworks', 'PO-4388', '₱186,400.00'],
  ['Talisay Printing Press', 'PO-4420', '₱2,118,400.00'],
];

export default function Batch() {
  return (
    <>
      <Demo wide caption={<>The run page, /payments/runs/0318. The 5 suppliers Marco made a call on come first: 3 held, then 2 paid on his judgment, each with its reason and sources. The 30 that matched cleanly are one line, with their total. Ramon reads 5 lines, not 35, and the header’s Approve… covers the run.</>}>
        <AgentFrame on="Payments" as="lead">
          <RunPage />
        </AgentFrame>
      </Demo>

      <Demo wide caption="Show all 30 opens the clean matches in place, largest first, so Ramon can spot-check the big ones. Each links to its PO. They stay one line in the approval: there’s nothing to decide about them one by one.">
        <AgentFrame on="Payments" as="lead">
          <RunPage open />
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption={<>In the chat, the card does the same: one summed line for the 30, then the calls, then what’s held. See {link('approvals/card', 'Approval card')}.</>}>
          <Win title="Marco · Chat">
            <div className="apv-w narrow"><RunCard /></div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="36 rows that look the same, in invoice order, each with its own Approve. The possible duplicate from Cebu Paperworks sits at row 6, looking like every other row, and Mactan Steel’s split delivery reads like a double payment.">
          <Win title="Payments / Run #0318">
            <p className="as-meta"><Pill>Waiting on you</Pill><span>36 invoices · 0 approved</span></p>
            <table className="m-tbl apv-tbl">
              <thead><tr><th>Supplier</th><th>PO</th><th className="r">Amount</th><th /></tr></thead>
              <tbody>
                {bad.map(([s, po, a], i) => <tr key={i}><td>{s}</td><td>{po}</td><td className="r">{a}</td><td className="r"><Btn>Approve</Btn></td></tr>)}
                <tr><td colSpan={4}><span className="apv-muted">1–7 of 36 · next page ›</span></td></tr>
              </tbody>
            </table>
          </Win>
        </Demo>
      </Pair>

      <Section title="What goes where on a batch">
        <When head={['Lines', 'Show them', 'In run #0318']} rows={[
          ['Held: the Agent wouldn’t decide', 'First, in red, each with why and what would clear it. Not part of the approval.', 'Cebu Paperworks, Luzon Packaging, Island Grains'],
          ['Judgment calls: decided, but not by the book', 'Next, one line each, with the reason and sources.', 'Mactan Steel Supply, Bohol Diesel Depot'],
          ['Routine: matched the rule exactly', 'Last, summed in one line with a count and total. Open it to spot-check.', '30 suppliers, ₱39,723,500.00'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Put the exceptions first.', 'Held lines, then judgment calls, above anything routine.'],
            ['Sum the routine in one line.', 'A count and a total: 30 suppliers, ₱39,723,500.00.'],
            ['Let people open the sum.', 'Show all 30 lists them in place, largest first, each linked to its PO.'],
            ['Group by the call, not by supplier.', 'Mactan Steel’s 2 invoices are one line, with why they’re both paid.'],
            ['One approval for the batch.', 'Approve… in the header covers every line not held; leaving some out is its own step.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Exceptions in invoice order.', 'The likely duplicate sits at row 6, looking like every other row.'],
            ['36 identical rows to click through.', 'People stop reading by row 10 and click Approve on the rest.'],
            ['Routine lines hidden with no way in.', 'Nobody can check the big payments, so nobody trusts the total.'],
            ['One row per invoice.', 'A split delivery shows as two payments to one supplier, and looks like a double payment.'],
            ['An Approve on every row.', '36 clicks for one decision, and a run left half approved when someone stops.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
