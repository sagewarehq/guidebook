import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Field, Ini } from '../../site/kit';
import { AgentFrame, ChatPage, Day, Me, Msg, Steps, Line, Reason, Source } from '../agents/agent-kit';
import { RunPage, RunCard } from './approval-kit';

// Changing before approving: two ways in. A line the person can fix themselves opens a drawer on the run page; a
// change that needs the Agent’s work goes back as a chat message, and the Agent returns a revised card. Either way
// the change is logged as the person’s, and the run still waits for Approve….

/** The drawer from Change on Island Grains: the warehouse has since confirmed the delivery. */
const drawer = (
  <div className="apv-drawer">
    <p className="apv-dh"><b>Change Island Grains</b><span>×</span></p>
    <p className="apv-ds">Run #0318 · INV-3317 · PO-4452</p>
    <div className="dl-alt"><b>Marco held it:</b> billed in full, but the warehouse hadn’t received the goods. <b>Since then:</b> <a className="m-link">DR-5590</a>, all 1,200 sacks received today at 9:05 AM.</div>
    <div className="apv-radio">
      <label>In this run</label>
      <p className="on"><i /><span>Pay in full<small>₱2,406,000.00, paid with the rest on Tue 29 Sep</small></span></p>
      <p><i /><span>Pay part<small>Choose an amount; the rest stays held</small></span></p>
      <p><i /><span>Keep held</span></p>
    </div>
    <Field label="Amount" value="₱2,406,000.00" hint="Matches INV-3317 and PO-4452." />
    <Field label="Reason" value="Warehouse confirmed delivery, DR-5590." hint="Kept in the run’s history, with your name." />
    <div>
      <p className="m-k">The run after this change</p>
      <p className="apv-after">
        <span><small>To pay</small>₱51,056,000.00<em>was ₱48,650,000.00</em></span>
        <span><small>Suppliers</small>33 of 35<em>was 32</em></span>
        <span><small>Held</small>2<em>was 3</em></span>
      </p>
    </div>
    <span className="pd-foot"><Btn>Cancel</Btn><Btn kind="pri">Save change</Btn></span>
  </div>
);

const mine = <span className="apv-chg"><Ini n="RC" />Your change</span>;

export default function EditFirst() {
  return (
    <>
      <Demo wide caption="Marco held Island Grains because the goods hadn’t arrived. At 9:05 the warehouse logged them. Ramon clicks Change on the line, and a drawer opens over the run at /payments/runs/0318/lines/island-grains: why it was held, what’s changed since, the choice, a reason, and the new totals before he saves. Saving updates the run; it still waits for Approve….">
        <AgentFrame on="Payments" as="lead" overlay={drawer}>
          <RunPage edit />
        </AgentFrame>
      </Demo>

      <Demo wide caption="Some changes need Marco’s work: splitting an invoice means re-checking it against its PO. Suggest changes opens the chat with the run attached; Ramon says what he wants in plain words, and Marco comes back with a revised card. The changed line is marked as Ramon’s, and the totals are new.">
        <AgentFrame on="Agents" as="lead">
          <ChatPage agent="marco" status="Waiting on you · payment run #0318, revised">
            <Day label="Today" />
            <Me>Pay Luzon Packaging up to the PO, ₱1,250,000.00. Keep the ₱68,750.00 over it held until their corrected invoice comes in.</Me>
            <Steps items={[[true, 'Checked PO-4431: ₱1,250,000.00 agreed'], [true, 'Split INV-2291: ₱1,250,000.00 to pay, ₱68,750.00 held'], [true, 'Rebuilt the totals']]} />
            <Msg>Done. Here’s the revised run. Only Luzon Packaging changed.</Msg>
            <div className="apv-w">
              <RunCard title="Payment run #0318 · revised" meta="Revised 9:31 AM, at your request · pays Tue 29 Sep, 9:00 AM"
                facts={[['To pay', '₱49,900,000.00'], ['Suppliers', '33 of 35'], ['Held', '2, and ₱68,750.00']]}
                extra={[<Line name={<>Luzon Packaging {mine}</>} amount="₱1,250,000.00" why="Pay up to the PO, as you asked." sources={['PO-4431', 'INV-2291']} />]}
                held={<>
                  <Line held name="Cebu Paperworks" why="Same items and amount as INV-8807, paid Tue 22 Sep. Looks like a resend." sources={['INV-8807']} />
                  <Line held name="Luzon Packaging, the ₱68,750.00 over PO" why="Until their corrected invoice comes in." sources={['INV-2291']} />
                  <Line held name="Island Grains" why="Billed in full, but the warehouse hasn’t received the goods." sources={['PO-4452']} />
                </>} />
            </div>
          </ChatPage>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="The run’s history keeps Marco’s call and Ramon’s change apart. Anyone can see that Island Grains was held by Marco, released by Ramon, and why.">
          <Win title="Run #0318 · History">
            <div className="apv-hist">
              <p className="as-h"><Ini n="RC" /><span><b>Ramon</b> approved the run: ₱51,056,000.00 to 33 suppliers<small>Today, 9:42 AM</small></span></p>
              <p className="as-h"><Ini n="RC" /><span><b>Ramon</b> changed Island Grains from Held to Pay, ₱2,406,000.00<small>Today, 9:20 AM · <q>Warehouse confirmed delivery, DR-5590.</q> <Source>DR-5590</Source></small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> held Island Grains<small>Today, 7:40 AM · <Reason>Billed in full, but the warehouse hasn’t received the goods.</Reason></small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> prepared the run: ₱48,650,000.00 to 32 suppliers, 3 held<small>Today, 7:40 AM</small></span></p>
            </div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Ramon’s change is folded into Marco’s proposal. The history now says Marco paid for goods that hadn’t arrived, and nobody can tell who released Island Grains, or why.">
          <Win title="Run #0318 · History">
            <div className="apv-hist">
              <p className="as-h"><Ini n="RC" /><span><b>Ramon</b> approved the run<small>Today, 9:42 AM</small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> prepared the run: ₱51,056,000.00 to 33 suppliers, 2 held<small>Today, 7:40 AM · edited</small></span></p>
            </div>
          </Win>
        </Demo>
      </Pair>

      <Section title="Change it, or ask for it">
        <When head={['The change', 'Do it with', 'In run #0318']} rows={[
          ['One line, and you know the answer', 'Change on the line: a drawer on the run page', 'Pay Island Grains now the warehouse has confirmed'],
          ['An amount on a line', 'Change on the line: Pay part, with the amount', 'Pay Island Grains for the 900 sacks received so far'],
          ['Needs the Agent to re-check or rework', 'Suggest changes: a message, and a revised card', 'Split Luzon Packaging’s invoice at its PO'],
          ['The whole run is wrong', 'Suggest changes, saying why. The run stays unapproved.', 'Wrong week: prepare it for the 5 Oct due dates'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Change a line where it is.', 'Change on the line opens a drawer; the rest of the run stays in view.'],
            ['Show the new totals before saving.', 'To pay, suppliers, and held, each with what it was.'],
            ['Ask for a reason, and keep it.', 'One line, saved in the run’s history with the person’s name.'],
            ['Send rework back to the Agent.', 'Suggest changes is a chat message; the Agent returns a revised card, the change marked.'],
            ['Log the change as the person’s.', 'The history keeps the Agent’s call and the person’s change apart.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Reject, then start over.', 'One wrong line throws away the 34 good ones, and the morning.'],
            ['Totals that change only after saving.', 'Ramon saves, then finds the run is ₱2.4M bigger than he thought.'],
            ['A change with no reason.', 'Next month, nobody knows why goods not received were paid.'],
            ['Reworking by hand what the Agent checks.', 'Ramon splits the invoice himself, and nobody re-checks it against the PO.'],
            ['Changes credited to the Agent.', 'The history says Marco paid for goods that hadn’t arrived.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
