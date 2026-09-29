import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Field, Pin } from '../../site/kit';
import '../records/foundations.css';
import './forms.css';

// Basic forms: how any form is laid out, wherever it opens (a create page, an edit drawer, a wizard step).
// Sections, labels above, optional marked, help under the field, and the buttons at the foot.

/** One field with its parts pinned: label, input, help, error. */
function Anatomy() {
  return (
    <Win title="Customers / New customer" className="bf-anat">
      <p className="m-k">Details</p>
      <div className="bf-pinrow"><Pin n={1} /><b className="bf-lab">TIN</b></div>
      <div className="bf-pinrow"><Pin n={2} /><span className="m-in bad bf-grow">204-311-58</span></div>
      <div className="bf-pinrow"><Pin n={3} /><span className="m-hint">As printed on the BIR certificate: 12 digits.</span></div>
      <div className="bf-pinrow"><Pin n={4} /><span className="m-err">A TIN has 12 digits. This one has 8.</span></div>
      <div className="bf-pinrow"><Pin n={5} /><b className="bf-lab">Trade name <em>(optional)</em></b></div>
    </Win>
  );
}

export default function BasicForms() {
  return (
    <>
      <Pair>
        <Demo verdict="do" caption="One column, read top to bottom. Headings group the fields, labels sit above, the optional fields say so, and help is under the field it helps.">
          <Win title="Customers / New customer" className="bf-win">
            <p className="m-k">Details</p>
            <Field label="Customer name" value="Metro Fuels" />
            <Field label="TIN" value="204-311-580-000" optional hint="As printed on the BIR certificate: 12 digits." />
            <Field label="Trade name" value="" optional />
            <p className="m-k">Terms</p>
            <Field label="Payment terms" value="Net 30" select hint="The usual for Cebu" />
            <span className="bf-foot"><Btn>Cancel</Btn><span className="as-grow" /><Btn kind="pri">Create customer</Btn></span>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Two columns read in a zigzag, labels squeezed to the left with colons and asterisks, placeholders instead of help, and a Reset button beside Submit.">
          <Win title="Customer Entry Form" className="bf-win">
            <div className="bf-bad">
              <span>Cust. Name*:</span><span className="m-in ph">Enter name</span>
              <span>TIN No.*:</span><span className="m-in ph">Enter TIN</span>
              <span>Trade Name:</span><span className="m-in ph">Enter trade name</span>
              <span>Terms*:</span><span className="m-in ph">Select…<i>▾</i></span>
              <span>Branch*:</span><span className="m-in ph">Select…<i>▾</i></span>
              <span>Remarks:</span><span className="m-in ph">Enter remarks</span>
            </div>
            <span className="bf-foot"><Btn kind="pri">Submit</Btn><Btn kind="pri">Reset</Btn></span>
          </Win>
        </Demo>
      </Pair>

      <Section title="A field, part by part">
        <div className="bf-anat-row">
          <Anatomy />
          <When head={['', 'Part', 'How']} rows={[
            [<Pin n={1} />, 'Label', 'Above the input, short, in the business’s words. No colon, no asterisk.'],
            [<Pin n={2} />, 'Input', 'Sized to the answer. Red outline only when something’s wrong.'],
            [<Pin n={3} />, 'Help', 'Under the input, only when people need it: the format, or where to find the value.'],
            [<Pin n={4} />, 'Error', 'Under the input, in red, saying what’s wrong and how to fix it. See Writing › Errors.'],
            [<Pin n={5} />, 'Optional', 'Fields are required by default. The few that aren’t say “(optional)”.'],
          ]} />
        </div>
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['One column.', 'Two fields share a row only when they’re one thing: a from and to date, a first and last name.'],
            ['Labels above, always visible.', 'Short, in the business’s words. No colon, no asterisk.'],
            ['Group by what people know together.', 'Details, Terms, Contacts: the order of a paper form, not the table’s columns. A heading per group.'],
            ['Mark optional, and help only where it’s needed.', 'Most fields are required, so mark the few that aren’t with “(optional)”. Help goes under the input, for formats and sources.'],
            ['Buttons at the foot, named for what they do.', 'Cancel on the left, Create customer on the right. Enter submits, and Tab moves in reading order.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Two or three columns of fields.', 'People read in a zigzag and skip fields.'],
            ['Placeholders instead of labels.', 'The label vanishes as soon as someone types.'],
            ['Fields in database order, or each in its own box.', 'Nothing shows which fields belong together.'],
            ['Asterisks everywhere, and help on every field.', 'The few things that matter get lost in the noise.'],
            ['A Reset button beside Save, or a Save disabled with no reason.', 'One click wipes the form; the other leaves people guessing what’s missing.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
