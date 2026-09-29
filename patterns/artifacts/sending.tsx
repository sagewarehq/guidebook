import { Section, Demo, Rules, Avoid, When, Btn, Field, Pill, Sk } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import '../records/foundations.css';
import '../forms/forms.css';
import '../shell/shell.css';
import './artifacts.css';

// Sending and delivery: a document is sent from its record, in a drawer, to the record's contact, with the
// document attached. What happened to it (sent, delivered, opened, bounced) shows on the Documents tab.

export default function Sending() {
  return (
    <>
      <Demo wide caption="Send statement opens a drawer over the customer. It’s addressed to the customer’s billing contact, the subject and message come from the template, and the statement is attached, generated from the record as it is now.">
        <Frame on="Customers">
          <div className="pd-big">
            <div className="as-a-page pd-under">
              <p className="as-crumb">Customers <span>/</span> <b>Metro Fuels</b></p>
              <div className="as-a-head"><div><p className="m-title">Metro Fuels</p><p className="as-meta"><Pill tone="bad">3 unpaid</Pill><span>Cebu · TIN 204-311-580-000</span></p></div><span className="as-acts"><Btn kind="quiet">•••</Btn><Btn>Send statement</Btn><Btn kind="pri">New invoice</Btn></span></div>
              <p className="as-a-tabs"><span className="on">Overview</span><span>Invoices 38</span><span>Payments 61</span><span>Documents 7</span></p>
              {[70, 56, 64, 48].map(w => <Sk key={w} w={`${w}%`} />)}
            </div>
            <div className="pd-side">
              <p className="pd-side-h"><b>Send statement</b><span>×</span></p>
              <p className="pd-side-s">Metro Fuels · September 2026</p>
              <Field label="To" value="Joy Santos <joy.santos@metrofuels.ph>" hint="Billing contact" />
              <Field label="Subject" value="Metro Lending: your September statement" />
              <div className="m-field"><label>Message</label><span className="m-in tp-area">Hi Joy, your statement for September is attached: 3 unpaid invoices, ₱1,642,000.00 owing. Reply to this email with any questions. Ana</span></div>
              <p className="sd-att"><i className="ar-type pdf">PDF</i><span><b>Statement ST-2026-09-0412.pdf</b><small>128 KB · generated just now</small></span><a className="m-link">Preview</a></p>
              <span className="pd-foot"><Btn>Cancel</Btn><Btn kind="pri">Send statement</Btn></span>
            </div>
          </div>
        </Frame>
      </Demo>

      <Demo wide caption="Back on the Documents tab: what happened to each one. Sent, delivered, and opened, or bounced, in red, with what to do about it.">
        <div className="ar-docs sd-log">
          <p className="ar-doc"><i className="ar-type pdf">PDF</i><span><b>Statement, September 2026</b><small>Sent by Ana to joy.santos@metrofuels.ph · 28 Sep, 9:14 AM</small></span><Pill tone="ok">Opened 9:40 AM</Pill><a className="m-link">Resend</a></p>
          <p className="ar-doc"><i className="ar-type pdf">PDF</i><span><b>Notice of overdue balance</b><small>Sent by Liza to joy.santos@metrofuels.ph · 28 Sep, 9:20 AM</small></span><Pill>Delivered</Pill><a className="m-link">Resend</a></p>
          <p className="ar-doc"><i className="ar-type pdf">PDF</i><span><b>Statement, August 2026</b><small>Sent to accounts@metrofuels.com · 1 Sep · the address no longer exists</small></span><Pill tone="bad">Bounced</Pill><a className="m-link">Fix the contact</a></p>
        </div>
      </Demo>

      <Section title="Delivery states">
        <When head={['State', 'Means']} rows={[
          [<Pill>Sending</Pill>, 'Queued with the email service'],
          [<Pill>Delivered</Pill>, 'Accepted by the customer’s mail server'],
          [<Pill tone="ok">Opened</Pill>, 'Opened at least once, with the first time'],
          [<Pill tone="bad">Bounced</Pill>, 'Refused: the address is wrong or full. Says why, with Fix the contact'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Send from the record.', 'Send statement on the customer, Send invoice on the invoice, in a drawer over the record.'],
            ['Address it from the record.', 'To the contact with the right role, billing for statements, filled in and changeable.'],
            ['Attach what the record says now.', 'Generated as the drawer opens, with Preview before sending.'],
            ['Keep the delivery on the Documents tab.', 'Who sent it, to whom, when, and whether it was delivered, opened, or bounced.'],
            ['Bounces say what to fix.', 'In red, with the reason and Fix the contact, and the sender is notified.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Download, then attach it in Gmail.', 'Nothing records that it was sent, or to whom.'],
            ['Typing the address every time.', 'A typo sends the statement to the wrong company.'],
            ['Attaching last week’s PDF.', 'The customer pays a balance that’s already changed.'],
            ['“Sent” with nothing after.', 'Nobody knows the statement bounced until the customer is overdue.'],
            ['Bounces nobody sees.', 'A dead address keeps getting every statement, for months.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
