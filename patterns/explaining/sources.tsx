import { Section, Demo, Pair, Rules, Avoid, When, Win, Pill, Ini } from '../../site/kit';
import { AgentFrame, ChatPanel, Msg, ApprovalCard, Line, Reason, Source } from '../agents/agent-kit';
import { RunHead, Box, Drawer, Locked, heldItems } from './explaining-kit';

// Sources: every figure an Agent used links to the record it came from, as a chip under the reason. A chip opens the
// record beside the proposal, never instead of it. Records the viewer can’t open are counted, never named.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

export default function Sources() {
  return (
    <>
      <Demo wide caption={<>Ramon clicks PO-4410 under Mactan Steel Supply. The PO opens in a drawer from the right, and the run moves over to make room, so the line and its record sit side by side. The rows Marco compared are marked, and the line’s other sources are tabs across the top. Open full page leaves the run; nothing else does.</>}>
        <div className="sw-with-drawer">
          <AgentFrame on="Agents" as="lead" loud overlay={
            <Drawer title="PO-4410 · Mactan Steel Supply" sub="Purchase order · ordered Wed 2 Sep · ₱2,184,500.00" tabs={[['PO-4410', true], ['DR-5561'], ['DR-5574']]}>
              <p className="sw-note">Marco compared these: 100 t of steel sheet ordered at ₱21,845.00 a tonne, delivered in two halves, and billed once for each.</p>
              <table className="m-tbl">
                <thead><tr><th>Delivery</th><th className="r">Received</th><th>Invoice</th><th className="r">Billed</th></tr></thead>
                <tbody>
                  <tr className="sw-mark"><td><a className="m-link">DR-5561</a> · 14 Sep</td><td className="r">60 t</td><td><a className="m-link">INV-8791</a></td><td className="r">₱1,310,700.00</td></tr>
                  <tr className="sw-mark"><td><a className="m-link">DR-5574</a> · 21 Sep</td><td className="r">40 t</td><td><a className="m-link">INV-8834</a></td><td className="r">₱873,800.00</td></tr>
                  <tr><td><b>Total</b></td><td className="r"><b>100 of 100 t</b></td><td /><td className="r"><b>₱2,184,500.00</b></td></tr>
                </tbody>
              </table>
              <p className="sw-foot"><span>As it is now · last changed 21 Sep</span><a className="m-link">Open full page ↗</a></p>
            </Drawer>}>
            <div className="as-a-page">
              <RunHead acts={false} />
              <Box title="To pay" note="32 suppliers · ₱48,650,000.00">
                <Line name="30 suppliers, matched to PO and delivery" amount="₱39,723,500.00" why="Invoice, PO, and delivery receipt agree on items, quantity, and price." sources={['30 invoices']} />
                <div className="ag-line">
                  <p><span>Mactan Steel Supply</span><b>₱2,184,500.00</b></p>
                  <p className="ag-line-s"><Reason>Pay. 2 invoices, 1 PO: a split delivery, and both halves arrived.</Reason><a className="ag-src sw-src-on">↗ PO-4410</a><Source>DR-5561</Source><Source>DR-5574</Source></p>
                </div>
                <Line name="Bohol Diesel Depot" amount="₱6,742,000.00" why="Pay. ₱42,000 over PO-4386, but you agreed the new diesel price by email." sources={['PO-4386', 'Email, 12 Sep']} />
              </Box>
            </div>
          </AgentFrame>
        </div>
      </Demo>

      <Demo wide caption={<>In the chat, the panel already takes the right, so a source opens in the page behind it. Ramon clicks INV-8807 on the Cebu Paperworks line: the paid invoice opens on the left, the held one stays on the right, and he can see they match. See {link('chat/open-screen', 'Chat › Open the real screen')}.</>}>
        <div className="sw-with-chat">
          <AgentFrame on="Invoices" as="lead" loud overlay={
            <ChatPanel agent="marco" status="Waiting on you · payment run #0318" onPage="INV-8807 · Cebu Paperworks">
              <Msg>Payment run #0318 is ready. I held 3 invoices; here’s why.</Msg>
              <ApprovalCard
                title="Payment run #0318"
                meta="Pays Tue 29 Sep, 9:00 AM · prepared by Marco, 7:40 AM"
                facts={[['To pay', '₱48,650,000.00'], ['Suppliers', '32 of 35'], ['Held', '3']]}
                held={<>{heldItems.map(h => <Line key={h.inv} held name={h.supplier} amount={h.amount} why={h.why} sources={h.sources} />)}</>}
                note="You approve, as Finance lead. Held invoices stay unpaid until someone clears them."
              />
            </ChatPanel>}>
            <div className="as-a-page">
              <p className="as-crumb">Invoices <span>/</span> From suppliers <span>/</span> <b>INV-8807</b></p>
              <div className="as-a-head"><div><p className="m-title">INV-8807 · Cebu Paperworks</p><p className="as-meta"><Pill tone="ok">Paid Tue 22 Sep</Pill><span>PO-4371 · <a className="m-link">PAY-7712</a></span></p></div></div>
              <p className="sw-note">Opened from Marco’s run #0318. He compared it with <a className="m-link">INV-8863</a>: same items, same quantities, same total, dated 3 days apart.</p>
              <table className="m-tbl sw-rec-lines">
                <thead><tr><th>Item</th><th className="r">Qty</th><th className="r">Price</th><th className="r">Amount</th></tr></thead>
                <tbody>
                  <tr className="sw-mark"><td>Copy paper, A4, ream</td><td className="r">920</td><td className="r">₱185.00</td><td className="r">₱170,200.00</td></tr>
                  <tr className="sw-mark"><td>Folders, long, box of 50</td><td className="r">1,800</td><td className="r">₱9.00</td><td className="r">₱16,200.00</td></tr>
                  <tr><td><b>Total</b></td><td /><td /><td className="r"><b>₱186,400.00</b></td></tr>
                </tbody>
              </table>
            </div>
          </AgentFrame>
        </div>
      </Demo>

      <Section title="What a chip opens">
        <When head={['Source', 'The chip reads', 'Opens']} rows={[
          ['An invoice, PO, or delivery receipt', 'Its number: INV-8807, PO-4410, DR-5561', 'The record in a drawer, the rows the Agent compared marked'],
          ['An email', 'Email, 12 Sep', 'The email in a drawer: sender, date, and the sentence it relied on marked'],
          ['A group of routine records', '30 invoices', 'The list, filtered to exactly those 30'],
          ['A report figure', 'Collections, August', 'The report with the same period, branch, and slicing'],
          ['A past deal', 'LN-3120', 'The loan in a drawer, with its rate and terms marked'],
          ['A record you can’t open', '1 record you can’t open', 'Nothing. Not a link, and no number, name, or branch'],
        ]} />
      </Section>

      <Pair>
        <Demo verdict="do" caption="Each line carries its own sources, under its own reason. Ramon checks the Bohol call by opening one email.">
          <div className="sw-mini">
            <Box title="To pay">
              <Line name="Mactan Steel Supply" amount="₱2,184,500.00" why="Pay. 2 invoices, 1 PO: a split delivery, and both halves arrived." sources={['PO-4410', 'DR-5561', 'DR-5574']} />
              <Line name="Bohol Diesel Depot" amount="₱6,742,000.00" why="Pay. ₱42,000 over PO-4386, but you agreed the new diesel price by email." sources={['PO-4386', 'Email, 12 Sep']} />
            </Box>
          </div>
        </Demo>
        <Demo verdict="avoid" caption="Every source piled at the foot of the card, with no links. Nobody can tell which email backs the Bohol call, so nobody checks.">
          <div className="sw-mini">
            <Box title="To pay">
              <Line name="Mactan Steel Supply" amount="₱2,184,500.00" why="Pay. 2 invoices, 1 PO: a split delivery, and both halves arrived." />
              <Line name="Bohol Diesel Depot" amount="₱6,742,000.00" why="Pay. ₱42,000 over PO, but you agreed the new diesel price by email." />
              <p className="sw-dump">Sources used: 36 invoices, 35 purchase orders, 34 delivery receipts, 6 emails.</p>
            </Box>
          </div>
        </Demo>
      </Pair>

      <Section title="Records you can’t open">
        <Pair>
          <Demo verdict="do" caption={<>Liza manages Cebu. Bea priced the rate from three loans, and one is in Manila, which Liza can’t open. The chip says a third record exists, so the reason still adds up, but not which one or whose. Search leaves such records out altogether (see Access › Only what you may see); a reason can’t, because it rests on them.</>}>
            <Win title="Proposal for Cebu Grains · draft by Bea">
              <div className="sw-mini">
                <Box title="Terms">
                  <div className="ag-line"><p><span>Rate</span><b>1.9% a month</b></p><p className="ag-line-s"><Reason>Same as your last 3 loans to grain traders this size.</Reason><Source>LN-3120</Source><Source>LN-3187</Source><Locked /></p></div>
                  <Line name="Term" amount="12 months" why="Matches their two harvests a year, from the meeting notes." sources={['Meeting notes, 24 Sep']} />
                </Box>
              </div>
            </Win>
          </Demo>
          <Demo verdict="avoid" caption="The chip names the Manila loan and its borrower, then refuses to open. Liza now knows who Manila lends to, and at what rate.">
            <Win title="Proposal for Cebu Grains · draft by Bea">
              <div className="sw-mini">
                <Box title="Terms">
                  <div className="ag-line"><p><span>Rate</span><b>1.9% a month</b></p><p className="ag-line-s"><Reason>Same as your last 3 loans to grain traders this size.</Reason><Source>LN-3120</Source><Source>LN-3187</Source><span className="sw-leak">LN-2954 · Pasig Rice Traders · Manila · no access</span></p></div>
                  <Line name="Term" amount="12 months" why="Matches their two harvests a year, from the meeting notes." sources={['Meeting notes, 24 Sep']} />
                </Box>
              </div>
            </Win>
          </Demo>
        </Pair>
      </Section>

      <Pair>
        <Demo verdict="do" caption="The drawer shows the record as it is now. If it changed after the Agent read it, the drawer says so, and by whom.">
          <Win title="DR-5574 · Delivery receipt">
            <div className="sw-mini">
              <p className="sw-note changed"><b>Changed after Marco read it.</b> Ana corrected the quantity, 40 t → 38 t, today at 10:05 AM. <a className="m-link">Ask Marco to check the line</a></p>
              <p className="as-h"><Ini n="AR" /><span><b>Ana</b> changed Received<small>Today, 10:05 AM · 40 t → 38 t</small></span></p>
            </div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="A copy frozen when the run was prepared. It still says 40 t, so Ramon approves a payment for 2 t that never arrived.">
          <Win title="DR-5574 · snapshot, 7:40 AM">
            <div className="sw-mini">
              <p className="as-h"><Ini n="MA" agent /><span><b>Received: 40 t</b><small>As read by Marco, today, 7:40 AM</small></span></p>
              <p className="sw-dump">Snapshot taken when the run was prepared.</p>
            </div>
          </Win>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['A chip for every record behind a line.', 'Under its reason, named by the record’s number: PO-4410, DR-5561, Email, 12 Sep.'],
            ['Open it beside the proposal.', 'A drawer from the right; from the chat, the page behind it. The line stays in view.'],
            ['Mark what the Agent compared.', 'The rows, amounts, or sentence it relied on, not the whole record unmarked.'],
            ['Show the record as it is now.', 'If it changed after the Agent read it, say so, by whom, and when.'],
            ['Count records the viewer can’t open.', '“1 record you can’t open”: no link, number, name, or branch.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A pile of sources at the foot.', '“36 invoices, 34 POs, 6 emails.” Nobody can tell which backs which call.'],
            ['Links that leave the proposal.', 'A new tab for each record, and Ramon loses his place in the run.'],
            ['The whole PDF.', 'Fourteen pages of PO to find the one quantity Marco checked.'],
            ['A copy frozen at run time.', 'Ana corrected the delivery at 10:05, and the drawer still shows the old figure.'],
            ['Names of records someone can’t open.', '“LN-2954 · Pasig Rice Traders · Manila” tells Liza what she isn’t allowed to know.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
