import { Section, Demo, Rules, Avoid, When, Btn, Field } from '../../site/kit';
import { Frame, DetailPage } from '../shell/shell-kit';
import './foundations.css';
import '../forms/forms.css';

// The edit page: editing is done a section at a time, in a drawer that opens over the record, with its own URL.
// Calculated fields, saving, and a colleague who changed it first.

function EditDrawer({ conflict }: { conflict?: boolean }) {
  return (
    <Frame on="Invoices">
      <div className="pd-big">
        <div className="pd-under"><DetailPage plain /></div>
        <div className="pd-side">
          <p className="pd-side-h"><b>Edit customer and terms</b><span>×</span></p>
          <p className="pd-side-s">INV-1038 · Metro Fuels</p>
          {conflict && <p className="ed-conflict"><b>Ramon changed the terms 2 minutes ago,</b> from Net 30 to Net 45. Your change is to Net 60. <span><a className="m-link">Use mine</a> · <a className="m-link">Keep Ramon’s</a></span></p>}
          <Field label="Customer" value="Metro Fuels" select />
          <Field label="Payment terms" value={conflict ? 'Net 60' : 'Net 45'} select focus={!conflict} error={conflict ? 'Changed since you opened it.' : undefined} />
          <Field label="Due date" value={conflict ? '2 Oct 2026' : '17 Sep 2026'} calc hint={conflict ? undefined : 'Worked out from the invoice date and the terms.'} />
          {!conflict && <Field label="PO number" value="PO-2211" optional />}
          <span className="pd-foot"><Btn>Cancel</Btn><Btn kind="pri">Save terms</Btn></span>
        </div>
      </div>
    </Frame>
  );
}

export default function EditPage() {
  return (
    <>
      <Demo wide caption="Edit on the Customer and terms section opens a drawer over the invoice, at /invoices/1038/terms. Only that section’s fields; the due date is worked out, so it shows but can’t be typed. Saving closes the drawer and updates the section in place.">
        <EditDrawer />
      </Demo>

      <Demo wide caption="Ramon changed the terms while the drawer was open. Nothing is overwritten: the drawer says who changed what, and lets people choose.">
        <EditDrawer conflict />
      </Demo>

      <Section title="When a drawer isn’t enough">
        <When head={['The edit', 'Use', 'Example']} rows={[
          ['One section of a record', 'A drawer, from the section’s Edit', 'Customer and terms, Contact details'],
          ['One field, often changed', 'Edit in place, on the detail page', 'Assign to, a status with its own action'],
          ['The whole record at once, with many sections', 'A full edit page, like the create page', 'Rare: a loan application being corrected before submitting'],
          ['Many records at once', 'A batch action from the list', 'Assign 12 invoices to Ana'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Edit one section, in a drawer.', 'Each section has its own Edit, which opens a drawer from the right with just its fields. The record stays in view to check against.'],
            ['The drawer has a URL.', '/invoices/1038/terms. A link opens it, Back closes it, and a refresh keeps it.'],
            ['Calculated fields show, but aren’t typed.', 'The due date follows the terms. Show it, marked as worked out, and update it as they change the terms.'],
            ['Save closes it and shows the change.', 'The section updates in place, with a short “Terms saved” toast. The change goes in the history.'],
            ['Never overwrite a colleague.', 'If the record changed since the drawer opened, say who changed what, and let people choose.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Editing the whole record at once, or in a modal.', 'A small change puts every field at risk, and a modal hides the record people check against.'],
            ['A drawer with no URL.', 'A refresh loses the edit, and nobody can send a link to it.'],
            ['A due date people can type over.', 'It stops following the terms, and nobody can tell.'],
            ['Saving to a reload of the whole page.', 'People lose their place, and can’t see what changed.'],
            ['Last save wins, silently.', 'Ramon’s change to the terms is lost, and nobody knows.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
