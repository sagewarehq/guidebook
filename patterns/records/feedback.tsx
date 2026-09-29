import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill, Sk, Toast } from '../../site/kit';
import './foundations.css';

// Say what happened, where it happened: inline changes, toasts with Undo, errors that stay, and background work.

export default function Feedback() {
  return (
    <>
      <Pair>
        <Demo verdict="do" caption="The change shows where it happened: the status turns Paid and the payment appears in place. A toast confirms it, and offers Undo for a few seconds.">
          <Win title="Invoices / INV-1038" className="fb-win">
            <div className="m-row"><p className="m-title">INV-1038 · Metro Fuels</p><Pill tone="ok">Paid</Pill></div>
            <p className="fb-new"><span>PAY-0921 · 28 Sep · Check #20417</span><b>₱420,000</b></p>
            <Sk w="70%" /><Sk w="54%" />
            <div className="fb-toast"><Toast action="Undo">Payment recorded. INV-1038 is paid.</Toast></div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="A confirm box before, a success box after, and nothing on the page changes. Two extra clicks, and no way back.">
          <Win title="Invoices / INV-1038" className="fb-win fb-dim">
            <div className="m-row"><p className="m-title">INV-1038 · Metro Fuels</p><Pill tone="bad">Overdue</Pill></div>
            <Sk w="70%" /><Sk w="54%" />
            <div className="fb-alert"><b>Success!</b><p>The operation completed successfully.</p><span><Btn kind="pri">OK</Btn></span></div>
          </Win>
        </Demo>
      </Pair>

      <Section title="Which feedback">
        <When head={['What happened', 'Show it', 'Example']} rows={[
          ['A change on this screen', 'Change it in place. A toast only if the change is easy to miss.', 'Status turns Paid; the payment appears in the list.'],
          ['A change that can be undone', 'A toast with Undo, for 6 to 8 seconds.', 'Metro Fuels archived. Undo'],
          ['A change that can’t be undone', 'Ask first, in a dialog that names it. Then confirm in place.', 'Void PAY-0921? The invoice goes back to Overdue.'],
          ['A field that’s wrong', 'Beside the field, until it’s fixed.', 'A TIN has 12 digits. This one has 8.'],
          ['Something failed', 'Where it failed, in words, with what to do next. It stays until dismissed.', 'Couldn’t save the terms. Your changes are kept. Try again'],
          ['Work that takes a while', 'Start it, let people leave, and tell them when it’s done.', 'Your export is ready. Download'],
          ['Saved automatically', 'A quiet note by the title.', 'Saved · just now'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
        <Rules items={[
          ['Show the result, where it happened.', 'The best confirmation is the screen itself changing. A toast is backup, not the message.'],
          ['Undo beats “Are you sure?”.', 'If it can be taken back, do it at once and offer Undo. Ask first only when it can’t be.'],
          ['Say what, and to what.', '“Payment recorded. INV-1038 is paid.” Not “Success!”.'],
          ['Errors stay; successes go.', 'A toast may fade. An error stays until it’s fixed or dismissed, and never only in a toast.'],
          ['Respond within a tenth of a second.', 'Every click shows something at once: a pressed button, a spinner in the button, the row updating.'],
          ['Long work runs in the background.', 'Exports, imports, and big runs start, free the screen, and notify when done, even if the person has left the page.'],
        ]} />
      </Section>
        <Section title="Avoid">
        <Avoid items={[
          'Success dialogs that must be clicked away.',
          'Toasts for errors people need to act on.',
          'Several toasts stacked at once. Combine them: “3 invoices archived. Undo”.',
          'Undo that silently fails once the toast is gone. After it closes, the way back is Restore.',
        ]} />
      </Section>
      </div>

    </>
  );
}
