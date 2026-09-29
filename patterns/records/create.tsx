import { Section, Demo, Rules, Avoid, When, Pin, Btn } from '../../site/kit';
import { Frame, FormPage, pageRegions } from '../shell/shell-kit';
import './foundations.css';
import '../forms/forms.css';

function Created() {
  return (
    <div className="as-a-page">
      <p className="as-crumb">Customers <span>/</span> <b>Customer created</b></p>
      <div className="fm-done">
        <i className="fm-tick">✓</i>
        <p className="m-title">Metro Fuels created.</p>
        <p className="fm-done-s">Cebu · Net 30 · created by Ana, 28 Sep 2026, 9:14 AM</p>
        <div className="fm-next">
          <p className="m-k">When you’re ready</p>
          <p><b>Add contacts,</b> so statements and reminders reach the right person.</p>
          <p><b>Set a credit limit,</b> before the first invoice.</p>
        </div>
        <p className="fm-done-b"><Btn kind="pri">Open Metro Fuels</Btn><Btn>Create another</Btn><Btn kind="quiet">Back to customers</Btn></p>
      </div>
    </div>
  );
}

// The create page: a full page inside the app shell for a new record, what goes in each region, and the rules for
// creating. How the fields themselves are laid out is on Forms › Basic forms; which field to use, on Choosing fields.

export default function CreatePage() {
  return (
    <>
      <Demo wide caption="The create page: only the name is required. Branch and terms are filled in from what the system knows, and everything else is folded under More details, which says what’s inside. Editing an existing record uses a drawer instead: see Edit record.">
        <Frame on="Customers"><FormPage /></Frame>
      </Demo>

      <Demo wide caption={<><b>More details, opened.</b> People who have the contact or credit limit to hand can add it now; everyone else never has to look.</>}>
        <Frame on="Customers"><FormPage plain more /></Frame>
      </Demo>

      <Demo wide caption={<><b>After Create customer:</b> a confirmation page. What was made, by whom and when, what to do next, and Open Metro Fuels as the main way on. See Forms › Submitting.</>}>
        <Frame on="Customers"><Created /></Frame>
      </Demo>

      <Demo wide caption={<><b>After Create and add another:</b> a fresh form, with the confirmation at the top and a link to what was made. The branch and terms stay; the name and TIN clear, with the cursor in the name.</>}>
        <Frame on="Customers"><FormPage plain again /></Frame>
      </Demo>

      <Section title="The create page">
        <When head={['', 'Region', 'What goes there', 'Keep out']} rows={pageRegions.form.map(([r, what, out], i) => [<Pin n={i + 1} />, r, what, out])} />
      </Section>

      <p className="g-see">How the fields are laid out: <a className="m-link" href="#/management/forms/basic">Forms › Basic forms</a>. Which field for which data: <a className="m-link" href="#/management/forms/fields">Choosing fields</a>.</p>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Require only what identifies it.', 'Usually just a name. A customer with no TIN yet is still a customer: this is the system of record, and records start incomplete.'],
            ['Fill in what you can, fold the rest.', 'Branch and terms from what the system knows; everything optional under More details, named for what’s inside.'],
            ['Catch duplicates as they type.', 'Offer the record that already exists before making a second one.'],
            ['Create on a page, from where people are.', 'New customer on the list, New customer in ⌘K, and “+ New customer” inside a lookup, which opens this page in a drawer.'],
            ['Confirm what you made.', 'A confirmation page with Open it as the main action. With Create and add another, a fresh form with the confirmation on top.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Required fields the business doesn’t need yet.', 'People invent a TIN or skip the record entirely, and the system stops being the record.'],
            ['Blank fields the system could have filled.', 'People type the same branch and terms every time, and sometimes mistype them.'],
            ['Finding the duplicate only after saving.', 'A second Metro Fuels gets made, and someone has to clean it up.'],
            ['Creating in a modal.', 'It grows until it scrolls, and can’t be linked or refreshed.'],
            ['Landing back on the list with no word.', 'There’s no sign of the new record, so people wonder if it worked, and create it again.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
