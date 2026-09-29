import { Section, Demo, Pair, Rules, Avoid, When, Btn, Field, Win } from '../../site/kit';
import { Frame, DetailPage } from './shell-kit';
import '../forms/forms.css';
import './shell.css';

// Modals: a small centred box over a dimmed page. Only for a question about unsaved work (leave without saving,
// discard a draft). Fields go in a drawer; consequential actions go on a confirmation page.

/** A small window with the page dimmed behind a centred modal. */
function Stage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Win title={title} className="md-win">
      <div className="md-stage"><div className="md-box">{children}</div></div>
    </Win>
  );
}

export default function Modals() {
  return (
    <>
      <Demo wide caption="Ramon changed the terms, then pressed ×. The modal sits in the middle of the window, over the drawer, and the page dims. One question about the unsaved work, and two answers. Esc or Keep editing goes back to the drawer.">
        <Frame on="Invoices" as="lead">
          <div className="pd-big">
            <div className="pd-under"><DetailPage plain /></div>
            <div className="pd-side">
              <p className="pd-side-h"><b>Edit customer and terms</b><span>×</span></p>
              <p className="pd-side-s">INV-1038 · Metro Fuels</p>
              <Field label="Payment terms" value="Net 45" select />
              <Field label="Due date" value="17 Sep 2026" calc />
              <span className="pd-foot"><Btn>Cancel</Btn><Btn kind="pri">Save terms</Btn></span>
            </div>
            <div className="pd-modal">
              <b>Leave without saving?</b>
              <p>Your change to the terms of INV-1038 will be lost.</p>
              <span className="pd-foot"><Btn>Keep editing</Btn><Btn kind="pri">Leave</Btn></span>
            </div>
          </div>
        </Frame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="One question that names the work, and buttons that answer it. Keep editing is where Esc goes.">
          <Stage title="Loans / New application">
            <b>Discard this draft?</b>
            <p>The application for Abad Trucking, started today at 10:05 AM, will be deleted.</p>
            <span className="pd-foot"><Btn>Keep draft</Btn><Btn kind="pri">Discard</Btn></span>
          </Stage>
        </Demo>
        <Demo verdict="avoid" caption="A form in a modal. It can’t grow, can’t be linked to, and on a phone turns into a small scrolling box. This belongs in a drawer or on a create page.">
          <Stage title="Customers">
            <b>New customer</b>
            <Field label="Customer name" value="" />
            <Field label="TIN" value="" />
            <Field label="Payment terms" value="Net 30" select />
            <span className="pd-foot"><Btn>Cancel</Btn><Btn kind="pri">Save</Btn></span>
          </Stage>
        </Demo>
      </Pair>

      <Pair>
        <Demo verdict="do" caption="Voiding checks what depends on the invoice and says what will happen, so it gets a confirmation page at its own address. See Records › Record actions.">
          <Win title="Invoices / INV-1072 / Void" className="md-win">
            <div className="md-page">
              <p className="as-crumb">Invoices <span>/</span> INV-1072 <span>/</span> <b>Void</b></p>
              <b>Void INV-1072?</b>
              <p>Metro Fuels will owe ₱538,000.00 less: ₱1,104,000.00 instead of ₱1,642,000.00.</p>
              <span className="pd-foot"><Btn>Back to INV-1072</Btn><Btn kind="danger">Void invoice</Btn></span>
            </div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="The same void in a modal. It can’t show what depends on the invoice, and people press OK by habit.">
          <Stage title="Invoices / INV-1072">
            <b>Are you sure?</b>
            <p>This action cannot be undone.</p>
            <span className="pd-foot"><Btn>Cancel</Btn><Btn kind="pri">OK</Btn></span>
          </Stage>
        </Demo>
      </Pair>

      <Section title="A modal, or something else">
        <When head={['When people are', 'Use', 'See']} rows={[
          ['Leaving a drawer or page with unsaved changes', 'A modal', 'This page'],
          ['Throwing away a draft', 'A modal', 'This page'],
          ['Voiding, approving, sending, or deleting', 'A confirmation page, at its own URL', 'Records › Record actions'],
          ['Filling in fields', 'A drawer, or a create page', 'App shell › Drawers'],
          ['Being told something happened', 'A toast, or a banner on the page', 'Writing › Feedback'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Only for unsaved work.', 'Leave without saving, discard a draft. Everything else has a better home: see the table.'],
            ['One question, answered by the buttons.', '“Leave without saving?” is answered by Keep editing and Leave, not OK and Cancel.'],
            ['Nothing to fill in.', 'No fields, no lists, no tabs. If it needs an input, it’s a drawer.'],
            ['Esc keeps the work.', 'Esc and the left button go back to what people were doing. A tap outside does nothing.'],
            ['Small and centred, one at a time.', 'About 400px wide, the page dimmed behind it, on a desktop and a phone. Never a modal on a modal.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Confirming a void or a delete in a modal.', 'It can’t check what depends on the record, or say what will happen.'],
            ['“Are you sure?” with OK and Cancel.', 'People click through by habit, and can’t tell what either button does.'],
            ['A form in a modal.', 'It can’t grow or be linked to, and on a phone it’s a small scrolling box.'],
            ['A tap outside that throws the work away.', 'One stray tap, and the edits are gone.'],
            ['Modals that open more modals.', 'People lose track of where they are, and Back can’t unwind them.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
