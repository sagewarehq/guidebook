import type React from 'react';
import { Section, Demo, Rules, Avoid, When, Btn, Pin, Pill, Sk, Win, Field } from '../../site/kit';
import { Frame } from './shell-kit';
import './shell.css';

// Where buttons go: every place a button can sit in the shell, what belongs there, and the order within it.

/** Outlines the buttons at one place, with its number on the corner. */
const H = ({ n, children, className }: { n: number; children: React.ReactNode; className?: string }) => (
  <span className={`sh-hl ${className ?? ''}`}><Pin n={n} className="sh-hlp" />{children}</span>
);

function Page() {
  return (
    <div className="as-a-page sh-map">
      <p className="as-crumb">Customers <span>/</span> <b>Metro Fuels</b></p>
      <div className="as-a-head">
        <div><p className="m-title">Metro Fuels</p><p className="as-meta"><Pill tone="bad">1 overdue</Pill><span>Cebu · TIN 204-311-580-000</span></p></div>
        <H n={1}><Btn kind="quiet">•••</Btn><Btn>Add note</Btn><Btn kind="pri">Send statement</Btn></H>
      </div>
      <p className="as-sech"><span className="m-k">Contact and terms</span><H n={2}><a className="m-link">Edit</a></H></p>
      <Sk w="60%" /><Sk w="44%" />
      <p className="as-sech"><span className="m-k">Invoices · 38</span><a className="m-link">View all</a></p>
      <H n={3} className="block"><p className="as-bulk"><b>2 selected</b><span className="as-grow" /><Btn>Send reminder</Btn><Btn>Export</Btn><Btn kind="quiet">Clear</Btn></p></H>
      <table className="m-tbl">
        <tbody>
          <tr><td><i className="as-cb on" /> INV-1038</td><td>Overdue 26 days</td><td className="r">₱420,000.00</td><td className="sh-rowact"><H n={4}><Btn kind="quiet">Record payment</Btn><Btn kind="quiet">•••</Btn></H></td></tr>
          <tr><td><i className="as-cb on" /> INV-1061</td><td>Open</td><td className="r">₱684,000.00</td><td className="sh-rowact"><Btn kind="quiet">•••</Btn></td></tr>
        </tbody>
      </table>
    </div>
  );
}

export default function Buttons() {
  return (
    <>
      <Demo wide caption="A customer’s page, with each group of buttons outlined and numbered. The closer a button sits to something, the less it acts on: 1 this customer, 2 one section, 3 the selected rows, 4 one row. Creating a new record starts from its list, or from ⌘K.">
        <Frame on="Customers"><Page /></Frame>
      </Demo>

      <div className="sh-three">
        <Demo caption={<><Pin n={5} /> <b>Form foot.</b> Stuck to the bottom of a create page: Cancel left, extra actions, the primary far right.</>}>
          <Win title="Customers / New customer" className="sh-small">
            <Sk w="70%" /><Sk w="50%" />
            <p className="sh-bar"><Btn>Cancel</Btn><span className="as-grow" /><Btn>Create and add another</Btn><Btn kind="pri">Create customer</Btn></p>
          </Win>
        </Demo>
        <Demo caption={<><Pin n={6} /> <b>Drawer foot.</b> At the bottom of the drawer, always visible: Cancel, then Save.</>}>
          <Win title="Edit contact and terms" className="sh-small">
            <Field label="Payment terms" value="Net 45" select />
            <p className="sh-bar end"><Btn>Cancel</Btn><Btn kind="pri">Save terms</Btn></p>
          </Win>
        </Demo>
        <Demo caption={<><Pin n={7} /> <b>Confirmation page foot.</b> Back to the record on the left, the verb on the right. Red only when it can’t be undone.</>}>
          <Win title="Invoices / INV-1072 / Void" className="sh-small">
            <p className="sh-dtext">Void INV-1072? Metro Fuels owes ₱538,000.00 less.</p>
            <p className="sh-bar"><Btn>Back to INV-1072</Btn><span className="as-grow" /><Btn kind="danger">Void invoice</Btn></p>
          </Win>
        </Demo>
      </div>

      <Section title="What goes where">
        <When head={['', 'Place', 'Acts on', 'Holds', 'Order']} rows={[
          [<Pin n={1} />, 'Page header', 'This record or list', 'The one primary action, one or two secondary, and ••• for the rest', '•••, secondary, primary at the far right'],
          [<Pin n={2} />, 'Section heading', 'One section', 'Edit, which opens its drawer; View all for a related list', 'Right-aligned, as quiet links'],
          [<Pin n={3} />, 'Bulk bar', 'The selected rows', 'Actions that work on many, and Clear', 'Count first, then actions, Clear last'],
          [<Pin n={4} />, 'Row', 'One row', 'At most one quiet action, and ••• for the rest', 'At the row’s right end'],
          [<Pin n={5} />, 'Form foot', 'The form', 'Cancel, extra saves, and the primary', 'Cancel left, primary far right'],
          [<Pin n={6} />, 'Drawer foot', 'The drawer’s section', 'Cancel and Save', 'Right-aligned, primary last'],
          [<Pin n={7} />, 'Confirmation page foot', 'The one action', 'Back to the record, and the verb', 'Back left, verb far right'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['A button sits with what it acts on.', 'The closer the button, the smaller what it touches: the page header acts on the whole record, a row on one row.'],
            ['One primary per view.', 'The page header’s primary is the only dark button on the page. A drawer has its own, while it’s open.'],
            ['Primary last, Cancel first.', 'The primary sits far right in headers and footers. Cancel comes before it (far left on a form, just before Save in a drawer), and is never primary.'],
            ['Rare and dangerous go in •••.', 'Duplicate, Download PDF, Archive, Delete. The dangerous one is last, in red, after a line.'],
            ['Never in the sidebar or the breadcrumb.', 'Those are for moving, not doing.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Floating action buttons in the corner.', 'They act on nothing in particular, so people can’t tell what they touch.'],
            ['Save at both the top and the bottom of a form.', 'Two primaries for one form, and people wonder whether they differ.'],
            ['The primary in a different place on each page.', 'People hunt for it, and hit Cancel by habit.'],
            ['A row of icon-only buttons.', 'Nobody can tell what they do, and Delete sits one slip from Duplicate.'],
            ['Actions in the sidebar.', 'People expect a click there to move them, and it changes a record instead.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
