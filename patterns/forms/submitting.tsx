import { Section, Demo, Rules, Avoid, When, Btn, Field } from '../../site/kit';
import { Frame, FormPage } from '../shell/shell-kit';
import '../records/foundations.css';
import './forms.css';

// Submitting: while the form is sending, the button is disabled and shows it's working, so nothing is sent twice.
// After, a confirmation says what happened and what comes next. If it fails, everything they typed is kept.

type St = 'sending' | 'confirm' | 'created' | 'failed';

const Loading = ({ children }: { children: string }) => <Btn kind="pri" className="fm-loading"><i className="fm-spin" />{children}</Btn>;

function Form({ st }: { st: 'sending' | 'failed' }) {
  const off = st === 'sending';
  return (
    <div className="as-a-page">
      <p className="as-crumb">Loans <span>/</span> <b>New application</b></p>
      <p className="m-title">New loan application</p>
      {st === 'failed' && <p className="fm-fail"><b>Couldn’t submit the application.</b> The connection dropped. Everything you entered is still here. <a className="m-link">Try again</a></p>}
      <div className={`vl-fields${off ? ' fm-off' : ''}`}>
        <Field label="Borrower" value="Abad Trucking" select />
        <Field label="Amount" value="₱2,400,000.00" />
        <Field label="Term" value="24 months" select />
      </div>
      <div className="as-a-actbar">
        <Btn className={off ? 'off' : undefined}>Cancel</Btn><span className="as-grow" />
        {off ? <Loading>Submitting…</Loading> : <Btn kind="pri">Submit application</Btn>}
      </div>
    </div>
  );
}

function Confirmation() {
  return (
    <div className="as-a-page">
      <p className="as-crumb">Loans <span>/</span> <b>Application submitted</b></p>
      <div className="fm-done">
        <i className="fm-tick">✓</i>
        <p className="m-title">Application LN-2240 submitted.</p>
        <p className="fm-done-s">Abad Trucking · ₱2,400,000.00 · 24 months · submitted by Ana, 28 Sep 2026, 10:05 AM</p>
        <div className="fm-next">
          <p className="m-k">What happens next</p>
          <p><b>Liza, Cebu branch manager, reviews it.</b> Usually within a working day.</p>
          <p><b>You’ll be notified</b> when it’s approved, or if anything’s missing.</p>
        </div>
        <p className="fm-done-b"><Btn kind="pri">Open LN-2240</Btn><Btn>New application</Btn><Btn kind="quiet">Back to loans</Btn></p>
      </div>
    </div>
  );
}


const captions: Record<St, string> = {
  sending: 'The button is disabled, shows a spinner, and says what it’s doing. The fields and Cancel are locked too, so nothing changes mid-send and nothing is sent twice.',
  confirm: 'A page with its own URL: what was submitted, its reference, who handles it next, and where to go now. The same for a new record: Metro Fuels created, with Open Metro Fuels.',
  created: 'When people are making several, skip the confirmation page: a fresh form, with the confirmation at the top and a link to what was made.',
  failed: 'The button comes back, everything typed is kept, and the message says what happened and offers Try again.',
};

export default function Submitting() {
  return (
    <>
      <Demo wide caption={<><b>1 · While it sends.</b> {captions.sending}</>}>
        <Frame on="Loans"><Form st="sending" /></Frame>
      </Demo>

      <Demo wide caption={<><b>2 · Then, a confirmation page.</b> {captions.confirm}</>}>
        <Frame on="Loans"><Confirmation /></Frame>
      </Demo>

      <Demo wide caption={<><b>Or, with Create and add another.</b> {captions.created}</>}>
        <Frame on="Customers"><FormPage plain again /></Frame>
      </Demo>

      <Demo wide caption={<><b>If it fails.</b> {captions.failed}</>}>
        <Frame on="Loans"><Form st="failed" /></Frame>
      </Demo>

      <Section title="Where people land after submitting">
        <When head={['The form', 'Land on', 'Example']} rows={[
          ['Sends something to someone else to act on', 'A confirmation page: reference, who’s next, and links on', 'Loan application, leave request, purchase request'],
          ['Creates a record', 'A confirmation page, with Open it as the main action', 'New customer, New invoice'],
          ['Creates a record, with Create and add another', 'A fresh form, with the confirmation at the top', 'Entering several customers from a list'],
          ['Changes part of a record, in a drawer', 'The record, updated in place, with a short toast', 'Edit terms'],
          ['Does something that can’t be undone', 'Its confirmation page first, then the result', 'Void, approve, release'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Disable the button the moment it’s pressed.', 'Spinner and a label that says what’s happening: Submitting…, Creating customer…'],
            ['Lock the form while it sends.', 'Fields and Cancel wait too, so what was sent is what’s on screen.'],
            ['Confirm with a page.', 'What was submitted, its reference, who handles it next, and where to go now.'],
            ['Land somewhere useful.', 'The confirmation page, or a fresh form with the confirmation on top. Never an empty form with no word.'],
            ['If it fails, keep everything.', 'Bring the button back, say what happened, and offer Try again.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A button that stays live while sending.', 'A second click, or an impatient Enter, creates two applications.'],
            ['Fields people can edit mid-send.', 'What they see isn’t what was saved.'],
            ['A toast that vanishes as the only confirmation.', 'People look away, miss it, and submit again to be sure.'],
            ['Returning to a blank form.', 'People can’t tell if it worked, or where their application went.'],
            ['Clearing the form on an error.', 'People type it all again, and some give up.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
