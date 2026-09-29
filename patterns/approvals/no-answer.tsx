import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill, Field, Ini } from '../../site/kit';
import { AgentFrame, AgentAva, AgentHead } from '../agents/agent-kit';
import { WaitPage, type WaitRow } from './approval-kit';

// When nobody answers: each task says ahead of time who is reminded and when, who else may answer, and when the
// proposal expires, with what happens then. For money, expiry cancels; it never approves.

const ramon: WaitRow[] = [
  { agent: 'marco', kind: 'Proposal', what: 'Payment run #0318: ₱48.65M to 32 suppliers, 3 held', asked: 'Today, 7:40 AM', due: 'Tue 29 Sep, 8:30 AM', note: 'Reminded at 9:40 and 11:40 AM · goes to Liza Tan and the Finance leads at 4:00 PM' },
  { agent: 'marco', kind: 'Proposal', what: 'Run #0319: 6 payment reminders for overdue invoices in Cebu', asked: 'Today, 9:15 AM', due: 'Expires in 3 hours', late: true, note: 'At 5:00 PM they’re dropped, and Marco drafts them again tomorrow' },
];

const liza: WaitRow[] = [
  { agent: 'bea', kind: 'Proposal', what: 'Loan proposal for Talamban Bakery: ₱1,800,000.00 over 18 months', asked: 'Fri 25 Sep, 4:30 PM', due: 'Wed 30 Sep', note: 'You send it; they meet you Thu 1 Oct' },
  { agent: 'marco', kind: 'Proposal', what: 'Payment run #0318: ₱48.65M to 32 suppliers, 3 held', asked: 'Today, 7:40 AM', due: 'Tue 29 Sep, 8:30 AM', note: 'Sent to you at 4:00 PM as a backup: no answer from Ramon Cruz since 7:40 AM' },
];

export default function NoAnswer() {
  return (
    <>
      <Demo wide caption="Ramon’s list at 2:00 PM. The payment run has had two reminders, and the row says what happens next: at 4:00 PM it goes to his backups too. The reminders run expires first, so it says so in red: Expires in 3 hours.">
        <AgentFrame on="Agents" as="lead">
          <WaitPage rows={ramon} who="Ramon Cruz, at 2:00 PM" />
        </AgentFrame>
      </Demo>

      <Demo wide caption="At 4:00 PM, with no answer, the run appears in Liza’s list as well, marked as a backup, with why. Ramon can still answer; whoever answers first decides, and the run leaves both lists.">
        <AgentFrame on="Agents" as="staff" me="LT" bell={2}>
          <WaitPage rows={liza} who="Liza Tan, at 4:05 PM" />
        </AgentFrame>
      </Demo>

      <Demo wide caption="Run #0318’s answer-by, shown on the run page: every step from the card to expiry, the done ones ticked. Anyone looking at the run can see what will happen, and when.">
        <Win title="Payments / Run #0318 · If nobody answers">
          <ul className="apv-steps">
            <li><span>Today, 7:40 AM</span><span><b>Card to Ramon Cruz,</b> in Marco’s chat, Waiting on you, email, and phone.</span></li>
            <li><span>9:40 AM, every 2 hours</span><span><b>A reminder to Ramon,</b> by email and phone, until 6:00 PM. Sent at 9:40 and 11:40 AM.</span></li>
            <li><span>Today, 4:00 PM</span><span><b>Goes to the backups too:</b> Liza Tan, or another Finance lead, may answer. Ramon still can.</span></li>
            <li><span>Tue 29 Sep, 7:30 AM</span><span><b>A last call to all of them,</b> by phone: “Payment run #0318 expires in 1 hour.”</span></li>
            <li className="bad"><span>Tue 29 Sep, 8:30 AM</span><span><b>It expires: the run is cancelled.</b> The bank’s cut-off for 9:00 AM payments has passed, so no supplier is paid on 29 Sep.</span></li>
          </ul>
        </Win>
      </Demo>

      <Demo wide caption="Each of these is set per scheduled task, from the Schedule tab on the Agent’s page, by its owner. Marco’s payment run: who approves, when to remind, who else may answer, and when it expires, with the reason for that time.">
        <AgentFrame on="Agents" as="lead">
          <div className="as-a-page">
            <AgentHead id="marco" on="Schedule" crumb={['Prepare the weekly payment run']} meta={<span>Mondays, 7:40 AM · Marco drafts it, a person approves · owner Ramon Cruz</span>} />
            <p className="as-sech"><span className="m-k">When nobody answers</span></p>
            <div className="apv-set">
              <div className="apv-two">
                <Field label="Approver" value="Ramon Cruz, Finance lead" select />
                <Field label="Remind" value="After 2 hours, then every 2 hours" select hint="Working hours only, 8:00 AM to 6:00 PM." />
              </div>
              <div className="apv-two">
                <Field label="Backups" value="Liza Tan, or another Finance lead" select hint="They may answer too; Ramon still can." />
                <Field label="Send to backups at" value="4:00 PM on the day it’s prepared" select />
              </div>
              <div className="apv-two">
                <Field label="Expires" value="8:30 AM on the payment day" select hint="The bank’s cut-off for 9:00 AM payments." />
                <Field label="When it expires" value="Cancel the run. Nothing is paid." select hint="Money never goes out without a person’s approval." />
              </div>
              <div className="cf-bar"><Btn>Cancel</Btn><span className="as-grow" /><Btn kind="pri">Save</Btn></div>
            </div>
          </div>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="Expired, and it says so: nothing was paid, what Marco did next, and who is now late. The new run waits for a person like any other.">
          <Win title="Payments / Run #0318">
            <p className="as-meta"><Pill tone="bad">Expired</Pill><span>Tue 29 Sep, 8:30 AM · nobody answered</span></p>
            <p className="dl-alt"><b>Nothing was paid.</b> 32 suppliers, ₱48,650,000.00, weren’t paid on 29 Sep.</p>
            <p className="apv-hi"><AgentAva id="marco" size="sm" /><span><b>Marco prepared run #0325</b> with this morning’s balances, to pay Wed 30 Sep. It’s waiting on Ramon, Liza, and the Finance leads.<small>9 suppliers are now past their due date. <a className="m-link">See them</a></small></span><Btn>Open #0325</Btn></p>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Approved by silence. After 24 hours with no answer, the run approved itself: ₱48.65M went out, and nobody ever looked at the 5 calls Marco made.">
          <Win title="Run #0318 · History">
            <div className="apv-hist">
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> sent ₱48,650,000.00 to 32 suppliers<small>Tue 29 Sep, 9:00 AM</small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> approved the run automatically<small>Tue 29 Sep, 7:40 AM · no answer in 24 hours</small></span></p>
            </div>
          </Win>
        </Demo>
      </Pair>

      <Section title="Settings for some tasks">
        <When head={['Task', 'Remind', 'Backups', 'Expires', 'When it expires']} rows={[
          ['Payment run (Marco)', 'After 2 hours, then every 2', 'Liza Tan, or another Finance lead, at 4:00 PM', '8:30 AM on the payment day', 'Cancelled. Nothing is paid; a new run is prepared.'],
          ['Payment reminders to customers (Marco)', 'After 2 hours', 'None', '5:00 PM the same day', 'Not sent. Drafted again tomorrow with fresh balances.'],
          ['Report for leadership (Nico)', 'The next morning', 'None', 'After 7 days', 'Not sent. It stays in Reports.'],
          ['Loan proposal to a borrower (Bea)', 'The day before the meeting', 'Another branch manager', 'At the meeting', 'Not sent. The draft stays with the loan.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Decide ahead, per task.', 'Who approves, when to remind, who else may answer, and when it expires.'],
            ['Remind, then widen.', 'Reminders to the approver first; then backups may answer too.'],
            ['Expire at a real deadline.', 'The bank’s 8:30 AM cut-off, shown with its reason.'],
            ['Never approve by silence.', 'When a money proposal expires, it’s cancelled, and nothing is paid.'],
            ['Say what happened, and what’s next.', 'The expired run: nothing paid, the new run, and who is now late.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Working it out on the day.', 'Ramon is on leave, and the run sits until someone notices.'],
            ['Reminding one person forever.', 'Ten reminders to someone away, and nobody else knows.'],
            ['No expiry, or an arbitrary one.', 'A run approved on Wednesday pays Monday’s balances.'],
            ['Auto-approve after a timeout.', '₱48.65M goes out, and nobody looked at the 5 calls Marco made.'],
            ['A run that quietly disappears.', 'Suppliers call to ask why they weren’t paid, and nobody knows.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
