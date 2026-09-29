import { Section, Demo, Rules, Avoid, When, Btn, Field } from '../../site/kit';
import { Frame, FormPage, DetailPage } from '../shell/shell-kit';
import '../records/foundations.css';
import './forms.css';

// The general rule for every form: which container it opens in. A page to create, a drawer to edit part of a
// record, a confirmation page for actions, and a modal only for unsaved work. Then how to tell, how each behaves, and the traps.

export default function Choosing() {
  return (
    <>
      <Demo wide caption={<><b>Page.</b> Creating a record, or a long or multi-step form. It takes the whole content area, has its own URL (/customers/new), and ends on the new record.</>}>
        <Frame on="Customers"><FormPage plain /></Frame>
      </Demo>

      <Demo wide caption={<><b>Drawer.</b> Editing one section of a record. It slides in from the right, the full height of the window, about a third of the width; the invoice stays readable behind it. /invoices/1038/terms opens it.</>}>
        <Frame on="Invoices">
          <div className="pd-big">
            <div className="pd-under"><DetailPage plain /></div>
            <div className="pd-side">
              <p className="pd-side-h"><b>Edit customer and terms</b><span>×</span></p>
              <p className="pd-side-s">INV-1038 · Metro Fuels</p>
              <Field label="Customer" value="Metro Fuels" select />
              <Field label="Payment terms" value="Net 45" select focus />
              <Field label="Due date" value="17 Sep 2026" calc hint="Worked out from the invoice date and the terms." />
              <Field label="PO number" value="PO-2211" optional />
              <span className="pd-foot"><Btn>Cancel</Btn><Btn kind="pri">Save terms</Btn></span>
            </div>
          </div>
        </Frame>
      </Demo>

      <Demo wide caption={<><b>Modal.</b> Only for one quick question about what’s on screen, with nothing to check: here, closing a drawer with unsaved changes. Anything that acts on a record, such as voiding or deleting, gets a confirmation page instead: see Records › Record actions.</>}>
        <Frame on="Invoices">
          <div className="pd-big">
            <div className="pd-under"><DetailPage plain /></div>
            <div className="pd-modal">
              <b>Leave without saving?</b>
              <p>Your changes to the terms of INV-1038 will be lost.</p>
              <span className="pd-foot"><Btn>Keep editing</Btn><Btn kind="pri">Leave</Btn></span>
            </div>
          </div>
        </Frame>
      </Demo>

      <Section title="How to tell">
        <p>Ask the questions in order. The first yes decides.</p>
        <When head={['Question', 'If yes', 'Example']} rows={[
          ['Does it act on a record, and can’t be undone, or touch money?', 'Confirmation page', 'Void INV-1072, Approve payment run, Delete Metro Fuel Corp'],
          ['Is it a quick question about unsaved work?', 'Modal', 'Leave without saving? Discard this draft?'],
          ['Is it a new record?', 'Page', 'New customer, New loan application'],
          ['Does it have steps, or more than one section?', 'Page', 'Loan application, Payment run'],
          ['Is it part of a record people are looking at?', 'Drawer', 'Edit terms, Add a contact, Change the owner'],
          ['Anything else', 'Page. When in doubt, a page is never wrong.', ''],
        ]} />
      </Section>

      <Section title="How each one behaves">
        <When head={['', 'Page', 'Drawer', 'Modal']} rows={[
          ['Size', 'The whole content area', 'About a third of the screen, from the right, the full height of the window', 'Narrow, centred, no scrolling'],
          ['Fields', 'Any number, in sections or steps', 'Up to about eight, one section', 'None, or one: a reason, a date'],
          ['URL', '/customers/new', '/invoices/1038/terms, so a link opens it and Back closes it', 'None'],
          ['Behind it', 'Nothing: it replaces the page', 'The record, dimmed but readable', 'The page, dimmed'],
          ['Buttons', 'In the action bar at the foot', 'At the foot of the drawer', 'At the foot: Cancel, then the verb'],
          ['After saving', 'Open the new record', 'Close, update the section, toast', 'Close, toast, with Undo when it can'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Creating gets a page.', 'Even a short create form: it’s linkable, it survives a refresh, and it lands on the new record.'],
            ['A modal is only for unsaved work.', 'Leave without saving, discard a draft. Voids, approvals, and deletes get a confirmation page. See App shell › Modals.'],
            ['A drawer edits one section, with its record in view.', 'People edit terms while reading the invoice they belong to.'],
            ['Drawers and pages get a URL.', 'So a link opens the same drawer, Back closes it, and a refresh doesn’t lose the place.'],
            ['Never stack them.', 'Finish or close one first. A modal over a drawer, to confirm leaving it, is the one exception.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A create form in a modal that grows until it scrolls.', 'It can’t be linked, and a refresh loses it.'],
            ['Confirming a void, approval, or delete in a modal.', 'It can’t check first, has no room, and has no URL.'],
            ['Editing a whole record in one drawer.', 'It grows wider than the page it covers. At that point, it’s a page.'],
            ['A drawer with no URL, or part of a record in a new tab.', 'Back leaves the page, a refresh loses the place, and tabs pile up.'],
            ['A modal on a modal, or a drawer in a drawer.', 'People lose track of which one they’re in, and what Cancel will cancel.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
