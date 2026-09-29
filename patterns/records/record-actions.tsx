import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill, Sk } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import { ConfirmPage } from './confirm-kit';
import './foundations.css';

// Actions: one primary per view, naming the verb, where each action sits, the ••• menu, and confirming only what can't be undone.

type Ex = 'approve' | 'send' | 'release' | 'void';
const captions: Record<Ex, string> = {
  approve: 'Most confirmations are good news. Approve on a run Marco prepared opens /payments/runs/0318/approve: how much goes to whom, when, from which account, and what stays held. The button names the amount. It’s the primary colour, not red: approving is the job, not a danger.',
  send: 'Anything that reaches someone outside the business gets a page first: who receives it, exactly what it says, and where the copy is kept.',
  release: 'Money leaving the business: the page shows the net amount, the account, and what happens next, and the button repeats the amount.',
  void: 'Void invoice… in the ••• menu opens /invoices/1072/void. It says exactly what will happen and asks for a reason. The button is red because a void can’t be taken back.',
};

export default function RecordActions() {
  return (
    <>
      <Pair>
        <Demo verdict="do" caption="The one thing people come here to do is the only dark button. Common actions are outlined; rare ones wait in the ••• menu.">
          <Win title="Invoices / INV-1038" className="pa-win">
            <div className="m-row">
              <div><p className="m-title">INV-1038</p><Pill tone="bad">Overdue 26 days</Pill></div>
              <span className="pa-acts">
                <span className="pa-more">
                  <Btn kind="quiet">•••</Btn>
                  <span className="pa-menu"><p>Download PDF</p><p>Duplicate</p><p>Change owner</p><p className="bad">Void invoice…</p></span>
                </span>
                <Btn>Send reminder</Btn><Btn kind="pri">Record payment</Btn>
              </span>
            </div>
            <Sk w="80%" /><Sk w="64%" /><Sk w="72%" /><Sk w="50%" />
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Every action shouts, so none does. “Submit” and “OK” don’t say what happens, and Delete sits one click from Save.">
          <Win title="Invoices / INV-1038">
            <div className="m-row">
              <p className="m-title">INV-1038</p>
              <span className="pa-acts"><Btn kind="pri">Submit</Btn><Btn kind="pri">OK</Btn><Btn kind="pri">Print</Btn><Btn kind="danger">Delete</Btn></span>
            </div>
            <Sk w="80%" /><Sk w="64%" />
          </Win>
        </Demo>
      </Pair>

      <Demo wide caption={captions.approve}>
        <Frame on="Payments" as="lead">
          <ConfirmPage crumb={['Payments', 'Payment runs', 'Run #0318', 'Approve']} title="Approve payment run #0318?" meta="Prepared by Marco, Finance Agent, today at 7:40 AM" facts={[['Paying', '₱48,650,000.00'], ['Suppliers', '32 of 35'], ['Sent', '29 Sep, 9:00 AM']]}
            what={[
              <><b>32 suppliers are paid ₱48,650,000.00</b> from BDO ••4471, tomorrow, 29 Sep, at 9:00 AM.</>,
              <><b>3 invoices stay held,</b> as Marco flagged them: Luzon Packaging and 2 more. They wait for the next run.</>,
              <><b>Each supplier gets a remittance email</b> once their payment is sent.</>,
            ]}
            back="Back to run #0318" action="Approve and pay ₱48.65M" danger={false} />
        </Frame>
      </Demo>

      <Demo wide caption={captions.send}>
        <Frame on="Customers">
          <ConfirmPage crumb={['Customers', 'Metro Fuels', 'Send statement']} title="Send Metro Fuels their statement?" meta="Statement to 28 Sep 2026, to Joy Santos, joy.santos@metrofuels.ph" facts={[['Owing', '₱1,642,000.00'], ['Unpaid', '3 invoices'], ['Period', '1 to 28 Sep 2026']]}
            what={[
              <><b>Joy Santos gets a PDF statement</b> for 1 to 28 Sep: 3 unpaid invoices, ₱1,642,000.00 owing.</>,
              <><b>INV-1038 is shown as 26 days overdue,</b> with ₱420,000.00 still to pay.</>,
              <><b>A copy goes in Metro Fuels’ documents,</b> and the send goes in its history.</>,
            ]}
            back="Back to Metro Fuels" action="Send statement" danger={false} />
        </Frame>
      </Demo>

      <Demo wide caption={captions.release}>
        <Frame on="Loans" as="lead">
          <ConfirmPage crumb={['Loans', 'LN-2240', 'Release']} title="Release LN-2240?" meta="Abad Trucking · approved by Liza, Cebu branch manager" facts={[['Released', '₱2,376,000.00'], ['Term', '24 months'], ['First due', '28 Oct 2026']]}
            what={[
              <><b>₱2,376,000.00 goes to Abad Trucking’s BPI account</b> ••0912: the loan less the ₱24,000.00 processing fee.</>,
              <><b>The first payment, ₱118,400.00, falls due on 28 Oct 2026,</b> and the schedule is sent to the borrower.</>,
              <><b>The loan moves to Active,</b> and counts in Cebu’s releases for September.</>,
            ]}
            back="Back to LN-2240" action="Release ₱2,376,000.00" danger={false} />
        </Frame>
      </Demo>

      <Demo wide caption={captions.void}>
        <Frame on="Invoices" as="lead">
          <ConfirmPage crumb={['Invoices', 'INV-1072', 'Void']} title="Void INV-1072?" meta="Metro Fuels · issued 14 Sep 2026 · Open" facts={[['Amount', '₱538,000.00'], ['Metro Fuels owes', '₱1,104,000.00'], ['Was', '₱1,642,000.00']]}
            what={[
              <><b>INV-1072 is marked Void.</b> It stays in lists, reports, and history, marked Void, and its number is never reused.</>,
              <><b>Metro Fuels owes ₱538,000.00 less:</b> ₱1,104,000.00 instead of ₱1,642,000.00.</>,
              <><b>Joy Santos is emailed a void notice,</b> with the reason below.</>,
            ]}
            reason="Issued to the wrong customer" back="Back to INV-1072" action="Void invoice" />
        </Frame>
      </Demo>

      <Demo wide caption="When the action can’t be done yet, the same page says why, links to what’s in the way, and has no action button at all.">
        <Frame on="Invoices" as="lead">
          <ConfirmPage crumb={['Invoices', 'INV-1038', 'Void']} title="INV-1038 can’t be voided yet." meta="Metro Fuels · ₱1,180,000.00 · issued 3 Aug 2026 · Overdue"
            what={[<><b><a className="m-link">PAY-0921</a> paid ₱760,000.00 against it.</b> Voiding the invoice would leave that payment against nothing.</>]}
            blocked={<><b>Void or move the payment first.</b> Then come back to void the invoice.</>}
            back="Back to INV-1038" />
        </Frame>
      </Demo>

      <Section title="How each action is confirmed">
        <When head={['The action', 'Confirm with', 'Example']} rows={[
          ['Can be taken back', 'Nothing. Do it at once, and offer Undo in the toast.', 'Assign to Ana, Add a tag, Archive'],
          ['Can’t be taken back, touches money, or reaches someone outside', 'A confirmation page, with its own URL', 'Void invoice, Approve payment run, Send statement, Delete'],
          ['Throws away what someone is typing', 'A small modal, the only one we use', 'Leave without saving?'],
        ]} />
      </Section>

      <Section title="Why a page, not a modal">
        <Rules items={[
          ['It checks before it asks.', 'The page loads from the server, so it can work out what the action will touch, and refuse when something’s in the way, before anyone presses anything.'],
          ['It has room to say what happens.', 'Balances, emails, related records, and a reason field fit on a page. A modal squeezes them or leaves them out.'],
          ['It has a URL.', '/invoices/1072/void can be sent to the person who should approve it, opened from an email or ⌘K, and survives a refresh.'],
          ['It works the same on a phone.', 'A page is already full screen. A modal with a reason field and consequences becomes a cramped box.'],
          ['The button repeats the outcome.', 'Approve and pay ₱48.65M, Release ₱2,376,000.00, Send statement. Primary for the everyday job; red only for what can’t be taken back, such as a void.'],
          ['Nothing happens by accident.', 'Opening the page does nothing; only its button acts. No stray Enter or double click voids an invoice from the record.'],
        ]} />
      </Section>

      <Section title="The four kinds">
        <When head={['Kind', 'Use for', 'Looks like']} rows={[
          ['Primary', 'The one action this view exists for. At most one visible at a time.', <Btn kind="pri">Record payment</Btn>],
          ['Secondary', 'Other common actions, and Cancel.', <Btn>Send reminder</Btn>],
          ['Quiet', 'Low-stakes actions inside content: Edit on a section, Clear filters.', <Btn kind="quiet">Edit</Btn>],
          ['Destructive', 'Only on the confirmation page for something that can’t be taken back.', <Btn kind="danger">Void invoice</Btn>],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['One primary per view.', 'If two actions both feel primary, the view is doing two jobs. Split it, or pick the one people do most.'],
            ['Name the result, not the gesture.', '“Create customer”, “Record payment”, “Archive”. Never Submit, OK, Yes, or Confirm.'],
            ['Actions sit with what they act on.', 'Page actions in the header, a section’s on the section, a row’s on the row. Rare ones go in the ••• menu, the destructive one last, in red.'],
            ['Confirm on a page, only what matters.', 'If it can be taken back, do it and offer Undo. If it can’t, or it touches money or someone outside, open its confirmation page.'],
            ['A disabled button says why.', 'Put the reason beside it (“3 unpaid invoices must be paid first”). If there’s no good reason to show it, hide it.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Two dark buttons side by side.', 'Every action shouts, so none does.'],
            ['Submit, OK, Yes, or Confirm.', 'They don’t say what happens, so people click without knowing.'],
            ['Actions in the sidebar, or every rare one on show.', 'People hunt for the button, and Delete sits one click from Save.'],
            ['A destructive button styled as primary on the page itself.', 'One stray click voids an invoice, with nothing checked first.'],
            ['A disabled button with no reason, or only a tooltip.', 'People can’t tell what’s in the way, and phones have no hover.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
