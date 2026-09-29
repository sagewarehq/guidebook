import { Section, Demo, Pair, Rules, Avoid, When, Btn, Pill } from '../../site/kit';
import { ListPage } from '../shell/shell-kit';
import { AgentFrame, ChatPanel, Day, Me, Msg, HeldPill } from '../agents/agent-kit';
import './chat.css';

// Open the real screen: when a result has its own page (a payment run, a report, a filtered list), the reply sums it
// up and links to it, rather than redrawing the page inside the chat. The page is the one everyone else uses.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

/** Marco’s reply once the run is ready: the sums, and the way to the run. */
function Summary() {
  return (
    <div className="ag-card ct-sum">
      <div className="ag-card-h"><b>Payment run #0318</b><small>Pays Tue 29 Sep, 9:00 AM, from BDO ••4471</small></div>
      <p className="ag-facts"><span><small>To pay</small>₱48,650,000.00</span><span><small>Suppliers</small>32 of 35</span><span><small>Held</small>3</span></p>
      <p className="ag-acts"><Btn kind="pri">Open run #0318</Btn><Btn>Approve…</Btn><small>The 2 judgment calls and 3 held are at the top of the run. Approve… opens the same confirmation page as the run.</small></p>
    </div>
  );
}

// The run’s five lines that need a look: Marco’s two calls, then the three he held. Held amounts are not in the total.
const calls: [string, string, string, string, boolean?][] = [
  ['Mactan Steel Supply', 'INV-8791, INV-8834', 'Pay. 2 invoices, 1 PO: a split delivery, and both halves arrived.', '₱2,184,500.00'],
  ['Bohol Diesel Depot', 'INV-5518', 'Pay. ₱42,000 over PO, but you agreed the new price by email.', '₱6,742,000.00'],
  ['Cebu Paperworks', 'INV-8863', 'Same items and amount as INV-8807, paid Tue 22 Sep.', '₱186,400.00', true],
  ['Luzon Packaging', 'INV-2291', 'Still ₱68,750 over PO. The corrected invoice hasn’t come in.', '₱1,318,750.00', true],
  ['Island Grains', 'INV-3317', 'Billed in full; goods not received on PO-4452.', '₱2,406,000.00', true],
];

// A few of the 30 clean lines, for the Avoid example that pastes them all into the chat.
const clean: [string, string][] = [
  ['Abad Hardware', '₱412,300.00'], ['Bacolod Sugar Traders', '₱2,960,000.00'], ['Cagayan Cold Storage', '₱1,118,400.00'],
  ['Davao Pallets', '₱286,750.00'], ['Ecoprint Cebu', '₱94,200.00'], ['Fernandez Trucking', '₱1,730,000.00'],
  ['Golden Harvest Rice', '₱3,412,000.00'], ['Iligan Industrial Gas', '₱648,900.00'],
];

export default function OpenScreen() {
  return (
    <>
      <Demo wide caption={<>The run has its own page, so Marco’s reply sums it up (the total, the count, what’s held) and links to it. Open run #0318 opens the page everyone else uses; Approve… opens the same confirmation page as the run’s own button.</>}>
        <div className="ct-short">
          <AgentFrame as="lead" loud overlay={
            <ChatPanel agent="marco" status="Waiting on you · payment run #0318" onPage="Invoices · Overdue in Cebu">
              <Day label="Today" />
              <Me>Prepare this week’s payment run. Hold anything you’re not sure about.</Me>
              <Msg>
                <span className="ct-fold"><i>✓</i>5 steps · 3 min 12 s ▸</span>
                <span><b>Payment run #0318 is ready.</b> I made 2 judgment calls and held 3.</span>
                <Summary />
              </Msg>
            </ChatPanel>}>
            <ListPage plain />
          </AgentFrame>
        </div>
      </Demo>

      <Demo wide caption={<>Open run #0318 opens the run in the app, with the chat still beside it, now looking at the run. The five lines that need a look are first; all 36 invoices are one tab away, with filters, sorting, and the run’s own Approve….</>}>
        <div className="ct-mid">
          <AgentFrame as="lead" on="Agents" loud overlay={
            <ChatPanel agent="marco" status="Waiting on you · payment run #0318" onPage="Run #0318 · Payment run">
              <Msg>
                <span><b>Payment run #0318 is ready.</b> I made 2 judgment calls and held 3.</span>
                <Summary />
              </Msg>
              <Me>Why is Island Grains held?</Me>
              <Msg>They billed the full ₱2,406,000.00 on PO-4452, but the warehouse hasn’t received the goods. I’ll pay it next week once the delivery receipt is in.</Msg>
            </ChatPanel>}>
            <div className="ct-under ct-run">
              <p className="as-crumb">Agents <span>/</span> Runs <span>/</span> <b>#0318</b></p>
              <div className="as-a-head">
                <div><p className="m-title">Payment run #0318</p><p className="as-meta"><Pill>Waiting on you</Pill><span>Marco · pays Tue 29 Sep</span></p></div>
              </div>
              <p className="as-a-tabs"><span className="on">Needs a look 5</span><span>All 36</span></p>
              <table className="m-tbl">
                <thead><tr><th>Supplier</th><th className="r">Amount</th></tr></thead>
                <tbody>{calls.map(([s, inv, why, amt, held]) => (
                  <tr key={s}><td>{held && <HeldPill />} {s}<small>{inv} · {why}</small></td><td className="r">{held ? <span className="ag-none">not paid</span> : amt}</td></tr>
                ))}</tbody>
                <tfoot><tr><td>To pay, 32 suppliers</td><td className="r">₱48,650,000.00</td></tr></tfoot>
              </table>
              <span className="as-acts"><Btn kind="pri">Approve…</Btn><Btn>Suggest changes</Btn></span>
            </div>
          </AgentFrame>
        </div>
      </Demo>

      <Pair>
        <Demo verdict="do" caption={<>The sums and a link. The run page holds the 36 invoices, and anything changed there shows here too.</>}>
          <div className="ct-box">
            <ChatPanel agent="marco" status="Waiting on you · payment run #0318" onPage="Invoices · Overdue in Cebu">
              <Msg>
                <span><b>Payment run #0318 is ready.</b> I made 2 judgment calls and held 3.</span>
                <Summary />
              </Msg>
            </ChatPanel>
          </div>
        </Demo>
        <Demo verdict="avoid" caption={<>The run redrawn in the chat, line by line. The question scrolls away, the copy goes stale when anyone edits the run, and Approve all skips the confirmation page.</>}>
          <div className="ct-box">
            <ChatPanel agent="marco" status="Waiting on you · payment run #0318" onPage="Invoices · Overdue in Cebu">
              <Msg>
                <span>Here is the full payment run:</span>
                <table className="m-tbl ct-long">
                  <tbody>{clean.map(([s, a]) => <tr key={s}><td>{s}</td><td className="r">{a}</td></tr>)}</tbody>
                </table>
                <p className="ct-more">…and 28 more lines</p>
                <span className="ct-acts"><Btn kind="pri">Approve all</Btn></span>
              </Msg>
            </ChatPanel>
          </div>
        </Demo>
      </Pair>

      <Section title="Draw it in chat, or open the page">
        <When head={['The result is…', 'In the chat', 'Link to']} rows={[
          ['A figure or a short answer', 'The answer, with the figure.', 'The record it came from.'],
          ['A few rows that add up', 'A small table and its total. See Tables and charts in chat.', 'The report behind it.'],
          ['A record with its own page: a run, an invoice, a report', 'Its sums: total, count, what’s held.', <>The page: “Open run #0318”.</>],
          ['A list of records', 'The count and the total: “12 invoices, ₱11,642,000.”', 'The list, filtered to those 12.'],
          ['Anything to edit or decide line by line', 'What needs a look, in one line.', <>The page, where each line can be changed. See {link('approvals/partial', 'Approvals › Approving part')}.</>],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Link to the real page.', '“Open run #0318” opens the page everyone else uses.'],
            ['Sums in chat, lines on the page.', 'The total, the count, and what’s held; the 36 invoices stay on the run.'],
            ['Keep the chat beside it.', 'The page opens under the panel, which now says “Looking at Run #0318”.'],
            ['One Approve, everywhere.', 'Approve… in the chat and on the run open the same confirmation page.'],
            ['Link lists filtered.', '“Open 12 invoices” opens Invoices filtered to those 12.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A copy of the page in the chat.', 'It goes stale the moment someone edits the run.'],
            ['Every line in the chat.', 'Thirty-six lines push the question out of sight.'],
            ['Closing the chat to open the page.', 'People lose the thread they were in the middle of.'],
            ['An Approve that only the chat has.', 'It skips the confirmation page and the checks on it.'],
            ['A link to the whole list.', 'People hunt for 12 invoices among 131.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
