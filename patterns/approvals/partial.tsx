import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill } from '../../site/kit';
import { AgentFrame } from '../agents/agent-kit';
import { RunPage, ApproveRun, Until } from './approval-kit';

// Approving part: a checkbox on every line of the run, Marco’s held lines starting unticked, and an Until on each
// line left out, so nothing just drops. The confirmation page says what’s paid and what happens to the rest.

const bar = (n: number, total: string, out: number) => (
  <p className="apv-selbar"><b>{n} of 35 suppliers ticked · {total}</b><span>{out} left out, each with what happens next</span><span className="as-grow" /><Btn kind="pri">{`Approve ${n}…`}</Btn></p>
);

export default function Partial() {
  return (
    <>
      <Demo wide caption="Every line has a checkbox. Marco’s 3 held lines start unticked, and each line left out has an Until: what happens to it next. Ramon can tick a held line to pay it, or untick one Marco would pay. The bar keeps the count and total, and the button says how many.">
        <AgentFrame on="Payments" as="lead">
          <RunPage checks bar={bar(32, '₱48,650,000.00', 3)} acts={<Btn>Suggest changes</Btn>} />
        </AgentFrame>
      </Demo>

      <Demo wide caption="Ramon wants to reread the email about Bohol Diesel’s new price before paying it, so he unticks it and sets it to the next run. The totals drop at once: 31 suppliers, ₱41,908,000.00, 4 left out.">
        <AgentFrame on="Payments" as="lead">
          <RunPage checks bar={bar(31, '₱41,908,000.00', 4)} acts={<Btn>Suggest changes</Btn>}
            untick={{ 'Bohol Diesel Depot': <Until>Next run, Mon 5 Oct</Until> }}
            facts={[['To pay', '₱41,908,000.00'], ['Suppliers', '31 of 35'], ['Left out', <b>4 · ₱10,653,150.00</b>]]} />
        </AgentFrame>
      </Demo>

      <Demo wide caption="Approve 31… opens the confirmation page. It says both halves: who is paid, and what happens to each line left out, with the date it comes back.">
        <AgentFrame on="Payments" as="lead">
          <ApproveRun facts={[['Paying', '₱41,908,000.00'], ['Suppliers', '31 of 35'], ['Sent', 'Tue 29 Sep, 9:00 AM']]}
            what={[
              <><b>31 suppliers are paid ₱41,908,000.00</b> from BDO ••4471, tomorrow, Tue 29 Sep, at 9:00 AM.</>,
              <><b>Bohol Diesel Depot, ₱6,742,000.00, moves to the next run,</b> Mon 5 Oct, where it waits for approval again.</>,
              <><b>Cebu Paperworks stays held.</b> Marco reminds you on Thu 1 Oct to decide whether it’s a resend of INV-8807.</>,
              <><b>Luzon Packaging and Island Grains stay held</b> until the corrected invoice and the goods arrive. Marco adds each to the next run then, and tells you.</>,
              <><b>The run is marked Approved in part by Ramon Cruz:</b> 31 paid, 4 left out, each with its reason.</>,
            ]}
            action="Approve and pay ₱41.91M" />
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="After approval, the run says what was paid and where each line left out went. Nothing is forgotten: each has a date or a condition, and a link to it.">
          <Win title="Payments / Run #0318">
            <p className="as-meta"><Pill tone="ok">Approved in part</Pill><span>By Ramon Cruz, today 9:42 AM</span></p>
            <table className="m-tbl apv-tbl">
              <tbody>
                <tr><td><b>31 suppliers</b></td><td><span className="apv-pays">Pays Tue 29 Sep, 9:00 AM</span></td><td className="r">₱41,908,000.00</td></tr>
                <tr><td>Bohol Diesel Depot</td><td>Next run, Mon 5 Oct</td><td className="r apv-muted">₱6,742,000.00</td></tr>
                <tr><td>Cebu Paperworks</td><td>Reminder to you, Thu 1 Oct</td><td className="r apv-muted">₱186,400.00</td></tr>
                <tr><td>Luzon Packaging</td><td>When the corrected invoice arrives</td><td className="r apv-muted">₱1,318,750.00</td></tr>
                <tr><td>Island Grains</td><td>When the goods are received</td><td className="r apv-muted">₱2,406,000.00</td></tr>
              </tbody>
            </table>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="All or nothing. To leave out one supplier, Ramon has to reject the whole run and wait for Marco to prepare it again, and 31 suppliers are paid late over one line.">
          <Win title="Marco · Chat">
            <div className="apv-bare">
              <p><b>Payment run #0318</b> · 36 invoices · ₱48,650,000.00</p>
              <p className="apv-muted">To change a line, reject the run and ask me to prepare it again.</p>
              <span><Btn kind="pri">Approve all</Btn><Btn>Reject all</Btn></span>
            </div>
          </Win>
        </Demo>
      </Pair>

      <Section title="What happens to a line left out">
        <When head={['Until', 'What happens', 'In run #0318']} rows={[
          ['Next run', 'It goes into the next run on its own, and waits for approval there.', 'Bohol Diesel Depot, Mon 5 Oct'],
          ['Remind me on a date', 'It stays held; the Agent asks the person again that morning, in Waiting on you.', 'Cebu Paperworks, Thu 1 Oct'],
          ['When something arrives', 'The Agent watches for the document or delivery, then adds it to the next run and says so.', 'Luzon Packaging, Island Grains'],
          ['Don’t pay', 'The invoice is marked Not paid, with the reason, and never goes into a run again.', 'Cebu Paperworks, if it is a resend'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['A checkbox on every line.', 'Held lines start unticked; the person can tick or untick any line.'],
            ['Keep the count and total in view.', 'The bar and the button say how many, and how much: Approve 31….'],
            ['Every line left out gets an Until.', 'Next run, a reminder, when something arrives, or don’t pay.'],
            ['Say both halves before approving.', 'The confirmation page lists who’s paid and where each line left out goes.'],
            ['Show the result on the run.', 'Approved in part, with each line left out and its date or condition.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Approve all, or reject all.', 'One doubtful line holds up 31 suppliers, or gets paid with the rest.'],
            ['A button that just says Approve.', 'Ramon can’t tell whether his untick counted, or how much is going out.'],
            ['Lines that just drop.', 'Bohol Diesel is never paid, and nobody notices until they call.'],
            ['A confirmation that only counts what’s paid.', 'Nobody knows the other 4 are still waiting, or on whom.'],
            ['A run marked Approved when part was left out.', 'The runs list says done, and the 4 left out are forgotten.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
