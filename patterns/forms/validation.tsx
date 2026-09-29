import { Section, Demo, Pair, Rules, Avoid, When, Btn, Field, Win } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import '../records/foundations.css';
import './forms.css';

// Validation and errors: when to check, where the message goes, keeping what people typed, and errors only the
// server can find, shown the same way as the rest.

function Submitted() {
  return (
    <div className="as-a-page">
      <p className="as-crumb">Customers <span>/</span> <b>New customer</b></p>
      <p className="m-title">New customer</p>
      <div className="vl-summary">
        <b>2 things to fix before Metro Fuels can be saved.</b>
        <span><a className="m-link">TIN</a> · <a className="m-link">Email</a></span>
      </div>
      <div className="vl-fields">
        <Field label="Customer name" value="Metro Fuels" />
        <Field label="TIN" value="204-311-58" error="A TIN has 12 digits. This one has 8." focus />
        <Field label="Email" value="joy.santos@metrofuels" error="That address is missing its ending, such as .com or .ph." />
        <Field label="Payment terms" value="Net 30" select />
      </div>
      <div className="as-a-actbar"><Btn>Cancel</Btn><span className="as-grow" /><Btn kind="pri">Create customer</Btn></div>
    </div>
  );
}

export default function Validation() {
  return (
    <>
      <Demo wide caption="After Create customer, with two problems. A short summary at the top names them, each a link to its field; each field says what’s wrong beside it; focus moves to the first one. Everything they typed is still there.">
        <Frame on="Customers"><Submitted /></Frame>
      </Demo>

      <Section title="When to check">
        <When head={['Check', 'When', 'Example']} rows={[
          ['The format of one field', 'When they leave the field, not while they type', 'A TIN with 8 digits, an email with no ending'],
          ['Rules they’re working towards', 'As they type, as ticks, never as errors', 'Password: ✓ 12 or more characters'],
          ['Required fields', 'When they press Save, or leave a field they started', 'Customer name left empty'],
          ['Fields that depend on each other', 'When they press Save', 'The end date is before the start date'],
          ['What only the server knows', 'When they press Save, shown beside the field like any other error', 'That TIN already belongs to Metro Fuels'],
        ]} />
      </Section>

      <Pair>
        <Demo verdict="do" caption="Checked when they leave the field. The error says what’s wrong and how to fix it, beside the field.">
          <Win title="New customer" className="vl-win">
            <Field label="Email" value="joy.santos@metrofuels" error="That address is missing its ending, such as .com or .ph." />
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Checked on the first keystroke. They’re told they’re wrong before they’ve finished typing.">
          <Win title="New customer" className="vl-win">
            <Field label="Email" value="jo" error="Invalid email." focus />
          </Win>
        </Demo>
      </Pair>

      <Pair>
        <Demo verdict="do" caption="An error only the server can find, shown on the field it’s about, with a way forward.">
          <Win title="New customer" className="vl-win">
            <Field label="TIN" value="204-311-580-000" error="Metro Fuels already has this TIN." />
            <p className="vl-next"><a className="m-link">Open Metro Fuels</a> or check the number.</p>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="The same error as a toast with a code. Which field? What now? And the form was cleared.">
          <Win title="New customer" className="vl-win">
            <Field label="TIN" value="" placeholder="" />
            <p className="m-toast">Error 422: Unprocessable Entity</p>
          </Win>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Check when they leave the field.', 'Format and required fields are checked on leaving, or on Save. Rules they’re working towards tick as they type.'],
            ['Say it beside the field.', 'Under the input, in red: what’s wrong, then how to fix it. “A TIN has 12 digits. This one has 8.”'],
            ['Sum it up on Save.', 'A short line at the top naming each problem as a link, and focus on the first field to fix.'],
            ['Keep what they typed.', 'Nothing clears on an error, not even the fields that were wrong.'],
            ['Server errors look the same.', 'Duplicates and business rules come back keyed by field, shown beside it, with a way forward.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Errors on the first keystroke.', 'People are told they’re wrong before they’ve finished.'],
            ['“Invalid input.”', 'It says something is wrong, but not what, or how to fix it.'],
            ['Errors only in a list at the top.', 'People have to match each message to a field, and scroll back and forth.'],
            ['Clearing the form on an error.', 'People type it all again, and some give up.'],
            ['Codes and toasts for field problems.', '“Error 422” in a toast names no field and disappears.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
