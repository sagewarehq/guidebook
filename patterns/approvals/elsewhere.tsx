import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Ini } from '../../site/kit';
import { AgentAva } from '../agents/agent-kit';
import { RunCard, calls, held, cleanTotal, link } from './approval-kit';

// Approving by email or phone: the email and the notification carry the card’s facts, so Ramon can judge it where he
// is. Money and anything customer-facing opens the app, at the card, and is approved on the confirmation page;
// small internal answers, like sending Nico’s report to leadership, can be given from the email itself.

/** A phone’s lock screen with one notification. `acts` are its buttons. */
function Lock({ title, body, acts, bad }: { title: string; body: string; acts: string[]; bad?: boolean }) {
  return (
    <div className="apv-phone lock">
      <p className="apv-clock">7:41</p>
      <p className="apv-date">Monday 28 September</p>
      <div className="apv-note">
        <p><span>Loans OS</span><span>now</span></p>
        <p><b>{title}</b></p>
        <p>{body}</p>
      </div>
      <p className="apv-nacts">{acts.map((a, i) => <span key={a} className={bad && i === 0 ? 'bad' : undefined}>{a}</span>)}</p>
    </div>
  );
}

export default function Elsewhere() {
  return (
    <>
      <Demo wide caption="The email Ramon gets at 7:40 AM carries what the card carries: the totals, each call with its reason, what’s held, when it pays, and when he must answer by. He can judge it from the email. Review and approve opens run #0318 in Loans OS; the approving happens there.">
        <Win title="Mail">
          <div className="apv-mail">
            <div className="apv-mh">
              <b>Payment run #0318 needs you: ₱48,650,000.00 to 32 suppliers, 3 held</b>
              <span>From Marco (AI), Finance Operations Agent, via Loans OS · to Ramon Cruz · today, 7:40 AM</span>
            </div>
            <p>Ramon, this week’s payment run is ready. It pays Tue 29 Sep at 9:00 AM from BDO ••4471. Please answer by 8:30 AM that day, the bank’s cut-off.</p>
            <p className="apv-mfacts"><span><small>To pay</small>₱48,650,000.00</span><span><small>Suppliers</small>32 of 35</span><span><small>Held</small>3</span></p>
            <ul>
              <li><b>30 suppliers, matched to PO and delivery:</b> {cleanTotal}</li>
              {calls.map(c => <li key={c.name}><b>{c.name}, {c.amount}:</b> {c.why}</li>)}
              {held.map(h => <li key={h.name}><b>Held, {h.name}:</b> {h.why}</li>)}
            </ul>
            <p><Btn kind="pri">Review and approve</Btn></p>
            <small>Payments are approved in Loans OS, never from email. The button opens run #0318; you may be asked to sign in first.</small>
          </div>
        </Win>
      </Demo>

      <Demo wide caption="On his phone: the notification says what, how much, and by when. Review opens the app at the card, not at Home. Approve… opens the same confirmation page as on a desktop, sized for the phone.">
        <div className="apv-phones">
          <Lock title="Marco needs you: payment run #0318" body="₱48.65M to 32 suppliers, 3 held. Answer by Tue 8:30 AM." acts={['Review', 'Remind me at 9:00']} />
          <div className="apv-phone">
            <p className="apv-ptop"><span>‹ Waiting on you</span><AgentAva id="marco" size="sm" /></p>
            <RunCard facts={[['To pay', '₱48.65M'], ['Suppliers', '32 of 35'], ['Held', '3']]} note="You approve, as Finance lead." />
          </div>
          <div className="apv-phone">
            <p className="apv-ptop"><span>‹ Run #0318</span><span /></p>
            <div className="apv-mail">
              <p className="m-title">Approve payment run #0318?</p>
              <p className="apv-mfacts"><span><small>Paying</small>₱48.65M</span><span><small>To</small>32</span><span><small>Held</small>3</span></p>
              <ul>
                <li><b>32 suppliers are paid ₱48,650,000.00</b> from BDO ••4471, Tue 29 Sep, 9:00 AM.</li>
                <li><b>3 stay held:</b> Cebu Paperworks, Luzon Packaging, Island Grains.</li>
                <li><b>Each supplier gets a remittance email.</b></li>
              </ul>
              <Btn kind="pri">Approve and pay ₱48.65M</Btn>
              <Btn>Back to run #0318</Btn>
            </div>
          </div>
        </div>
      </Demo>

      <Demo wide caption="Nico’s report goes only to Metro Lending’s own leadership, and nothing leaves the business, so Ramon can answer from the email. Send to leadership sends it and shows a page saying it’s sent; the card in Nico’s chat shows the answer, as it would if he’d answered there.">
        <Win title="Mail">
          <div className="apv-mail">
            <div className="apv-mh">
              <b>September collections report, ready to send to leadership</b>
              <span>From Nico (AI), Reporting and Analytics Agent, via Loans OS · to Ramon Cruz · Fri 25 Sep, 4:10 PM</span>
            </div>
            <p className="apv-mfacts"><span><small>Collected</small>₱34,350,000.00</span><span><small>vs August</small>−2%</span><span><small>To</small>4 leaders</span></p>
            <ul><li><b>Baguio collections fell 18%:</b> 6 restructured loans pay from October, and Route 3 went unvisited 7–18 Sep.</li></ul>
            <p><Btn kind="pri">Send to leadership</Btn> <Btn>Open report</Btn></p>
            <small>Sent inside Metro Lending only. You can also answer in Loans OS.</small>
          </div>
        </Win>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="Review opens the card. The notification gives enough to know it matters and by when.">
          <Lock title="Marco needs you: payment run #0318" body="₱48.65M to 32 suppliers, 3 held. Answer by Tue 8:30 AM." acts={['Review', 'Remind me at 9:00']} />
        </Demo>
        <Demo verdict="avoid" caption="“Approval needed” with an Approve button. Ramon can’t tell what it is, and one tap in a pocket pays ₱48.65M, with no card, no held lines, and no confirmation page.">
          <Lock title="Approval needed" body="You have 1 item awaiting approval." acts={['Approve', 'Decline']} bad />
        </Demo>
      </Pair>

      <Section title="What can be answered where">
        <When head={['The decision', 'In the app', 'By email', 'By phone notification']} rows={[
          ['Money out: payment runs, loan releases', 'Approve… and its confirmation page', 'The facts, and Review and approve', 'The facts, and Review'],
          ['Reaches customers or suppliers: reminders, proposals', 'Approve… and its confirmation page', 'The facts, and Review', 'The facts, and Review'],
          ['Internal, and easily undone: send a report to leadership', 'The card’s answer', 'The card’s answer', 'Open, then the card’s answer'],
          [<>A question with options. See {link('chat/asking-back', 'Chat › When it asks back')}</>, 'The options, in the chat', 'The options', 'The options, when there are three or fewer'],
        ]} />
      </Section>

      <Section title="Once it’s answered">
        <Win title="Mail · Payment run #0318 needs you">
          <p className="apv-hi"><Ini n="RC" /><span><b>Already approved by you,</b> today at 9:42 AM, in Loans OS. Payments go out Tue 29 Sep, 9:00 AM.<small>This email’s button now opens the approved run.</small></span><Btn>Open run #0318</Btn></p>
        </Win>
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Carry the card’s facts.', 'Totals, each call and its reason, held lines, and the answer-by, in the email and notification.'],
            ['Money and customers open the app.', 'Review and approve opens the card; the confirmation page is where it’s approved.'],
            ['Small internal answers, where you are.', 'Send Nico’s report to leadership from the email.'],
            ['Link straight to the card.', 'Review opens /payments/runs/0318, after sign-in if needed.'],
            ['Answer once, everywhere.', 'An answer anywhere clears the row, the badge, and every email’s buttons.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['“Approval needed.”', 'Ramon must open the app just to learn whether it’s ₱5,000 or ₱48M.'],
            ['A one-tap Approve for money.', 'A tap in a pocket pays 32 suppliers, with nothing checked.'],
            ['The app for everything.', 'A report for leadership waits until Ramon is back at his desk.'],
            ['A link to Home.', 'People hunt for the run on a small screen, and give up.'],
            ['Buttons that still work after an answer.', 'An old email changes a run that’s already approved.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
