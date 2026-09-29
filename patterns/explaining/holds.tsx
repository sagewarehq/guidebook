import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Ini } from '../../site/kit';
import { AgentFrame, Day, Msg, Steps, Line, Reason, Source, HeldPill } from '../agents/agent-kit';
import { ConfirmPage } from '../records/confirm-kit';
import { RunHead, Box, Held, heldItems } from './explaining-kit';

// Holds and flags: when an Agent isn’t sure, it holds that one item and lets the rest go ahead. Each hold says what’s
// held, why, what would clear it, and gives the person a button for each way out. A flag is lighter: it went ahead,
// but someone should look.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

export default function Holds() {
  return (
    <>
      <Demo wide caption={<>The Held block on run #0318. Each hold says what’s held and for how much, why, with its records, and what would clear it. The buttons are the ways out: ask the supplier or the warehouse, mark a duplicate, or pay anyway. The other 32 suppliers go ahead when Ramon approves; nothing waits on the holds.</>}>
        <AgentFrame on="Agents" as="lead" loud>
          <div className="as-a-page">
            <RunHead />
            <Box title="To pay" note="32 suppliers · ₱48,650,000.00 · 1 flagged · Show all ▾"><></></Box>
            <Box title="Held" note="3 invoices · ₱3,911,150.00 not paid" tone="held">
              {heldItems.map(h => <Held key={h.inv} item={h} />)}
            </Box>
          </div>
        </AgentFrame>
      </Demo>

      <Demo wide caption="A flag is lighter than a hold. Bohol Diesel Depot is paid in this run, because Ramon agreed the new price by email, but PO-4386 still has the old one. The flag is outlined, not red, and its button fixes the cause, so next month’s invoice matches cleanly.">
        <AgentFrame on="Agents" as="lead" loud>
          <div className="as-a-page">
            <RunHead />
            <Box title="To pay" note="32 suppliers · ₱48,650,000.00 · 1 flagged">
              <Line name="30 suppliers, matched to PO and delivery" amount="₱39,723,500.00" why="Invoice, PO, and delivery receipt agree on items, quantity, and price." sources={['30 invoices']} />
              <Line name="Mactan Steel Supply" amount="₱2,184,500.00" why="Pay. 2 invoices, 1 PO: a split delivery, and both halves arrived." sources={['PO-4410', 'DR-5561', 'DR-5574']} />
              <div className="ag-line">
                <p><span><span className="sw-flag">! Flagged</span>Bohol Diesel Depot</span><b>₱6,742,000.00</b></p>
                <p className="ag-line-s"><Reason>Pay. ₱42,000 over PO-4386, but you agreed the new diesel price by email. PO-4386 still has the old price.</Reason><Source>PO-4386</Source><Source>Email, 12 Sep</Source></p>
                <p className="sw-flag-act"><Btn>Update PO-4386 to the new price</Btn></p>
              </div>
            </Box>
          </div>
        </AgentFrame>
      </Demo>

      <Section title="Hold, flag, or neither">
        <When head={['', 'When', 'What happens', 'Examples']} rows={[
          [<b>Hold</b>, 'The Agent isn’t sure it should happen at all.', 'Not paid. It waits for a person, says what would clear it, and clears on its own when that happens.', 'A likely resend; billed over PO with nothing agreed; goods not received; a supplier’s new bank account'],
          [<b>Flag</b>, 'It’s sure enough to go ahead, but a person should know.', 'Paid with the rest. The flag stays on the line and the invoice until someone opens it.', 'A price over PO that was agreed by email; a PO that needs updating; a supplier paid early'],
          [<b>Neither</b>, 'Everything agrees.', 'Paid, with one reason for the group.', 'Invoice, PO, and delivery receipt match'],
        ]} />
      </Section>

      <Demo wide caption={<>Pay anyway… opens a confirmation page, not a dialog. It repeats Marco’s reason and what could go wrong, and asks for Ramon’s reason, which is kept on INV-3317’s history. See {link('approvals/partial', 'Approvals › Approving part')}.</>}>
        <AgentFrame on="Agents" as="lead">
          <ConfirmPage
            crumb={['Agents', 'Runs', '#0318', 'Pay Island Grains anyway']}
            title="Pay Island Grains anyway?"
            meta="INV-3317 · ₱2,406,000.00 · held by Marco"
            what={[
              'Adds INV-3317 to run #0318, which pays Tue 29 Sep, 9:00 AM, from BDO ••4471, once you approve the run.',
              'Marco held it because the warehouse hasn’t received PO-4452.',
              'If the goods don’t arrive, you’ll need to recover ₱2,406,000.00 from Island Grains.',
            ]}
            reason="Delivered to the Mandaue warehouse on Saturday; the receipt isn’t entered yet."
            back="Keep it held"
            action="Pay ₱2,406,000.00 anyway"
            danger={false}
          />
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo caption="If Ramon pays anyway, INV-3317’s history keeps both sides: why Marco held it, and why Ramon paid it.">
          <Win title="INV-3317 · Island Grains · History">
            <div className="sw-hist">
              <p className="as-h"><Ini n="RC" /><span><span><b>Ramon</b> paid it anyway, with run #0318</span><Reason>“Delivered to the Mandaue warehouse on Saturday; the receipt isn’t entered yet.”</Reason><span className="sw-meta">Today, 9:35 AM</span></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><span><b>Marco</b> held it from payment run #0318</span><Reason>Billed in full, but the warehouse hasn’t received the goods.</Reason><span className="sw-meta">Today, 7:40 AM · <Source>Run #0318</Source></span></span></p>
            </div>
          </Win>
        </Demo>
        <Demo caption="Or the hold clears on its own. The warehouse confirms PO-4452, Marco matches it again, and says so in the chat and on the invoice’s history. No one has to remember to release it.">
          <Win title="Marco · chat">
            <div className="sw-mini">
              <Day label="Today, 2:14 PM" />
              <Steps items={[[true, 'Warehouse confirmed PO-4452 received, 2:10 PM'], [true, 'Matched INV-3317 to PO-4452 and DR-5590']]} />
              <Msg>Island Grains is off hold. ₱2,406,000.00 is in next week’s run, unless you want it paid sooner.</Msg>
            </div>
          </Win>
        </Demo>
      </Pair>

      <Pair>
        <Demo verdict="do" caption="What’s held, why, and what would clear it, with a button for each way out. Ramon knows what to do in one read.">
          <div className="sw-mini"><Box title="Held" tone="held"><Held item={heldItems[2]} /></Box></div>
        </Demo>
        <Demo verdict="avoid" caption="A confidence score on each line. Ramon can’t tell what worried Marco, what to check, or what would change the number.">
          <div className="sw-mini">
            <Box title="Held" tone="held">
              {heldItems.map((h, i) => (
                <div key={h.inv} className="ag-line held">
                  <p><span><HeldPill />{h.supplier}</span><b>{h.amount}</b></p>
                  <p className="ag-line-s"><span className="sw-conf">{['73% sure', '61% sure', '48% sure'][i]}</span><Reason>Needs review.</Reason></p>
                </div>
              ))}
            </Box>
          </div>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Hold only what it isn’t sure about.', 'Three invoices wait; the other 32 suppliers are paid on time.'],
            ['Say why, with the records.', '“Billed in full, but the warehouse hasn’t received the goods.” PO-4452 is a chip.'],
            ['Say what would clear it.', '“Clears when the warehouse confirms PO-4452.” When it does, the hold clears itself.'],
            ['Give the person a button for each way out.', 'Ask Luzon for a corrected invoice, Mark as duplicate…, Pay anyway…'],
            ['Flag what went ahead but needs a look.', 'Outlined, not red, with a button that fixes the cause.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Holding the whole run for one doubt.', '32 suppliers are paid late because one invoice looked odd.'],
            ['A confidence score.', '“73% sure” says Marco is uneasy, not about what, or what Ramon should check.'],
            ['Held, and nothing more.', 'Nobody knows what would release it, so it sits for weeks and the supplier calls.'],
            ['No way to act from the hold.', 'Ramon finds the invoice, then writes to Luzon from his own inbox, and nothing is logged.'],
            ['Flags drawn like holds.', 'Twelve red pills on the run, and the three real holds are lost among them.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
